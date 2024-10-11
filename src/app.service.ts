import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './app.entity';
import { Book } from './book.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  getAuthorWithBooksExplicitly(id: number) {
    return this.authorRepository.findOne({
      where: { id },
      relations: ['books'], // Assurez-vous que les relations sont définies correctement
    });
  }

  getAuthorWithBooksEager(id: number) {
    return this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }

  getAuthorWithBooksLazy(id: number) {
    return this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }
}
