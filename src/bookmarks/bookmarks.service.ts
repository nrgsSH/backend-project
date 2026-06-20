import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Injectable()
export class BookmarksService {

  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepo: Repository<Bookmark>,
  ) {}

  // CREATE
  createbookmark(dto: CreateBookmarkDto) {
    const bookmark = this.bookmarkRepo.create(dto);
    return this.bookmarkRepo.save(bookmark);
  }

  // FIND ALL + FILTER
  findAll(query?: GetBookmarkDto) {
    if (!query) {
      return this.bookmarkRepo.find();
    }

    const qb = this.bookmarkRepo.createQueryBuilder('bookmark');

    if (query.url) {
      qb.andWhere('bookmark.url LIKE :url', {
        url: `%${query.url}%`,
      });
    }

    if (query.description) {
      qb.andWhere('bookmark.description LIKE :description', {
        description: `%${query.description}%`,
      });
    }

    return qb.getMany();
  }

  // FIND BY ID
  findById(id: number) {
    return this.bookmarkRepo.findOne({
      where: { id },
    });
  }

  // DELETE
  deleteBookmark(id: number) {
    return this.bookmarkRepo.delete(id);
  }

  // UPDATE
  updateBookmarkDescription(id: number, description: string) {
    return this.bookmarkRepo.update(id, { description });
  }
}