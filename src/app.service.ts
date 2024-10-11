import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { Book } from './book.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async createAuthor(name: string): Promise<Author> {
    const author = this.authorsRepository.create({ name });
    return this.authorsRepository.save(author);
  }

  async createBook(authorId: number, title: string): Promise<Book> {
    const author = await this.authorsRepository.findOneBy({ id: authorId });
    const book = this.booksRepository.create({ title, author });
    return this.booksRepository.save(book);
  }

  async findAuthorsWithBooksEager(): Promise<Author[]> {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async findAuthorWithBooksLazy(authorId: number): Promise<Author> {
    return this.authorsRepository.findOneBy({ id: authorId });
  }

  async findAuthorWithBooksExplicit(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne({ where: { id } });
    if (author) {
      author.books = await this.booksRepository.find({
        where: { author: { id } },
      });
    }
    return author;
  }
}
