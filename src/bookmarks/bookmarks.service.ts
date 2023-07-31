import { Injectable } from '@nestjs/common';
import { BookmarkRepository } from './bookmarks.repository';
import { S3Service } from 'src/common/s3/s3.service';
import { BookmarksEntity } from './bookmarks.entity'

@Injectable()
export class BookmarksService {
    constructor(
    private readonly bookRepo: BookmarkRepository,
    private readonly s3Service: S3Service){}
    async createBookmark(bookmark: BookmarksEntity): Promise<BookmarksEntity> {
        return this.bookRepo.createBookmark(bookmark);
      }
    
      async getBookmarksByUserId(userId: string): Promise<BookmarksEntity[]> {
        return this.bookRepo.getBookmarksByuserId(userId);
      }
    
      async deleteBookmark(userId: string, landmarkId: number): Promise<void> {
        await this.bookRepo.deleteBookmark(userId, landmarkId);
      }
    }
