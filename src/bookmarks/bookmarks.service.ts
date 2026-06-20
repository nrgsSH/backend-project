import { Injectable } from '@nestjs/common';
import { url } from 'inspector';
import { bookmark } from './bookmark.model';
import { v4 as uuid } from "uuid";
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

type NewType = bookmark;

@Injectable()
export class BookmarksService {
    private bookmarks:bookmark[] =[]

    findAll():bookmark[]{
        return this.bookmarks;
    }

    find(GetBookmarkDto: GetBookmarkDto): bookmark[] {
     let bookmarks=this.findAll();
     const {url,description}=GetBookmarkDto;

     if(url){
      bookmarks =bookmarks.filter((bookmark) => bookmark.url.toLowerCase().includes(url));
     }

     if(description){
        bookmarks =bookmarks.filter((bookmark) => bookmark.description.toLowerCase().includes(description) );
     }
        return bookmarks;

    }


    findByTd(id:string): NewType {
       // return this.bookmarks.find((bookmark) => bookmark.id == id);
        return this.bookmarks.find(b => b.id === id)!;
    }


    createbookmark(CreateBookmarkDto:CreateBookmarkDto):bookmark{
        const{url,description,} =CreateBookmarkDto
        const Bookmark:bookmark={
id:uuid(),
url,
description
        }
        this.bookmarks.push(Bookmark);

        return Bookmark;
    }
    deleteBookmark(id:string):void{
        this.bookmarks=this.bookmarks.filter((bookmark)=>bookmark.id !==id)

    }

    updateBookmarkDescription(id: string, description: string): bookmark {
        const bookmark =this.findByTd(id);
        bookmark.description = description
        return bookmark;

    }
}
