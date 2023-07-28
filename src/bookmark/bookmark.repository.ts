import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service';
import { BookmarkEntity } from "./bookmark.entity";
import { plainToClass } from "class-transformer";
import { Bookmark } from ".prisma/client"

@Injectable()
export class BookmarkRepository{
    constructor(private readonly prisma: PrismaService){}

    async createBookmark(bookmark: BookmarkEntity): Promise<BookmarkEntity> {
        const createdBookmark = await this.prisma.bookmark.create({
            data:{
                userId: bookmark.userId,
                landmarkId: bookmark.landmarkId,
                createdAt: bookmark.createdAt
            }
        });
        return plainToClass(BookmarkEntity, createdBookmark);
    }
    async getBookmarksByuserId(userId: string): Promise<BookmarkEntity[]> {
        const bookmarks = await this.prisma.bookmark.findMany({
                    where: {
                        userId: userId
                    }
                });
        return bookmarks.map((bookmark) => plainToClass(BookmarkEntity, bookmark));
    }
    
    async deleteBookmark(userId: string, landmarkId: number): Promise<void> {
        await this.prisma.bookmark.delete({
            where:{ userId, landmarkId }
        });
    }}