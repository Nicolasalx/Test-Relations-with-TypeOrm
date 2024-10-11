import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }
}
