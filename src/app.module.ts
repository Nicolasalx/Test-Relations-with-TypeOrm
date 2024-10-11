import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorsController } from './author.controller';
import { Book } from './book.entity';
import { AuthorsService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pwd',
      database: 'database3',
      entities: [Author, Book],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Author, Book]),
  ],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AppModule {}
