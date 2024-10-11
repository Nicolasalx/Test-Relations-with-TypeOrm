import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './app.entity';
import { AuthorController } from './app.controller';
import { AuthorService } from './app.service';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pwd',
      database: 'database',
      entities: [Book, Author],  // Spécifiez ici toutes vos entités
      synchronize: true,  // Pour synchroniser la base de données avec les entités
    }),
    TypeOrmModule.forFeature([Author, Book])  // Import du repository spécifique
  ],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AppModule {}
