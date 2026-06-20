import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { get } from 'http';
import type { bookmark } from './bookmark.model';
import { url } from 'inspector';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
    constructor(private BookmarksService:BookmarksService){}

 @Get()  
find(@Query()GetBookmarkDto: GetBookmarkDto):bookmark[]{
   if(Object.keys(GetBookmarkDto).length){
      return this.BookmarksService.find(GetBookmarkDto);
   }
   return this.BookmarksService.findAll();
}

@Get('/:id')
findByTd(@Param('id') id:string):bookmark{
   return this.BookmarksService.findByTd(id)
}

@Post()
createBookmark(@Body() CreateBookmarkDto: CreateBookmarkDto): bookmark {
 return this.BookmarksService.createbookmark(CreateBookmarkDto);
}

@Delete('/:id')
deleteBookmark(@Param('id')id: string):void{
return this.BookmarksService.deleteBookmark(id);
 }
 @Patch('/:id/description')
 updateBookmarkDescription(@Param('id')id: string, @Body('description') description: string):bookmark{
   return this.BookmarksService.updateBookmarkDescription(id,description)
 }
}
