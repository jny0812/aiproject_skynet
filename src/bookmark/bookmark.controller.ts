import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkEntity } from './bookmark.entity';



@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}
    @Post()
    async createBookmark(@Body() bookmark: BookmarkEntity): Promise<BookmarkEntity> {
        return this.bookmarkService.createBookmark(bookmark);
    }
    @Get()
    async getBookmarksByUserId(@Param('userId') userId: string ): Promise<BookmarkEntity[]> {
        return this.bookmarkService.getBookmarksByUserId();
        }
    @Delete()
    async deleteBookmark(@Param()): Promise<void> {
        }
   
}