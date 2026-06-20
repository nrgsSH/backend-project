import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  // GET + FILTER
  @Get()
  find(@Query() query: GetBookmarkDto) {
    return this.bookmarksService.findAll(query);
  }

  // GET BY ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookmarksService.findById(Number(id));
  }

  // CREATE
  @Post()
  create(@Body() dto: CreateBookmarkDto) {
    return this.bookmarksService.createbookmark(dto);
  }

  // DELETE
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookmarksService.deleteBookmark(Number(id));
  }

  // UPDATE DESCRIPTION
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('description') description: string,
  ) {
    return this.bookmarksService.updateBookmarkDescription(
      Number(id),
      description,
    );
  }
}