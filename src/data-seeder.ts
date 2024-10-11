import { DataSource } from 'typeorm';
import { Author } from './author.entity';
import { Book } from './book.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pwd',
    database: 'database3',
    entities: [Author, Book],
    synchronize: true,
  });

  await dataSource.initialize();

  const valueLoop = 10;

  for (let i = 0; i < valueLoop; ++i) {
    const author1 = new Author();
    author1.name = 'J.K. Rowling';

    const author2 = new Author();
    author2.name = 'George R.R. Martin';

    await dataSource.manager.save(author1);
    await dataSource.manager.save(author2);

    const book1 = new Book();
    book1.title = "Harry Potter and the Philosopher's Stone";
    book1.author = author1;

    const book2 = new Book();
    book2.title = 'A Game of Thrones';
    book2.author = author2;

    await dataSource.manager.save(book1);
    await dataSource.manager.save(book2);
  }
  console.log('Seeding completed.');
  await dataSource.destroy();
}

seed().catch(console.error);
