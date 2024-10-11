import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthorsService } from './app.service';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async createAuthor(@Body('name') name: string): Promise<Author> {
    return this.authorsService.createAuthor(name);
  }

  @Post(':id/books')
  async createBook(@Param('id') id: number, @Body('title') title: string) {
    return this.authorsService.createBook(id, title);
  }

  @Get('eager')
  async findAuthorsWithBooksEager() {
    return this.authorsService.findAuthorsWithBooksEager();
  }

  @Get(':id/lazy')
  async findAuthorWithBooksLazy(@Param('id') id: number) {
    const author = await this.authorsService.findAuthorWithBooksLazy(id);
    await author.books;
    return author;
  }

  @Get(':id/explicit')
  async findAuthorWithBooksExplicit(@Param('id') id: number) {
    return this.authorsService.findAuthorWithBooksExplicit(id);
  }
}
