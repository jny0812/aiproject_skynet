import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksEntity } from './bookmarks.entity';



@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarksService) {}
    @Post()
    async createBookmark(@Body() bookmark: BookmarksEntity): Promise<BookmarksEntity> {
        return this.bookmarkService.createBookmark(bookmark);
    }
    @Get()
    async getBookmarksByUserId(@Param('userId') userId: string ): Promise<BookmarksEntity[]> {
        return this.bookmarkService.getBookmarksByUserId();
        }
    @Delete()
    async deleteBookmark(@Param()): Promise<void> {
        }
   
}