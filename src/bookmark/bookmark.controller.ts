import { Controller, Get } from '@nestjs/common';

@Controller('bookmarks')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}
    
}