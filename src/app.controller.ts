import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from './app.service';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get(':id/explicit')
  getAuthorExplicit(@Param('id') id: string) {
    return this.authorService.getAuthorWithBooksExplicitly(+id);
  }

  @Get(':id/eager')
  getAuthorEager(@Param('id') id: string) {
    return this.authorService.getAuthorWithBooksEager(+id);
  }

  @Get(':id/lazy')
  getAuthorLazy(@Param('id') id: string) {
    return this.authorService.getAuthorWithBooksLazy(+id);
  }
}
