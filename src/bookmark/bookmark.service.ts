import { Injectable } from '@nestjs/common';
import { BookmarkRepository } from './bookmark.repository';
import { S3Service } from 'src/common/s3/s3.service';
import { BookmarkEntity } from './bookmark.entity'

@Injectable()
export class BookmarkService {
    constructor(
    private readonly bookRepo: BookmarkRepository,
    private readonly s3Service: S3Service){}
    async createBookmark(bookmark: BookmarkEntity): Promise<BookmarkEntity> {
        return this.bookRepo.createBookmark(bookmark);
      }
    
      async getBookmarksByUserId(userId: string): Promise<BookmarkEntity[]> {
        return this.bookRepo.getBookmarksByuserId(userId);
      }
    
      async deleteBookmark(userId: string, landmarkId: number): Promise<void> {
        await this.bookRepo.deleteBookmark(userId, landmarkId);
      }
    }
