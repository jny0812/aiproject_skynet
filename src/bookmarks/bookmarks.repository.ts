import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service';
import { BookmarksEntity } from "./bookmarks.entity";
import { plainToClass } from "class-transformer";

@Injectable()
export class BookmarkRepository{
    constructor(private readonly prisma: PrismaService){}

    async createBookmark(bookmark: BookmarksEntity): Promise<BookmarksEntity> {
        const createdBookmark = await this.prisma.bookmark.create({
            data:{
                userId: bookmark.userId,
                landmarkId: bookmark.landmarkId,
                createdAt: bookmark.createdAt
            }
        });
        return plainToClass(BookmarksEntity, createdBookmark);
    }
    async getBookmarksByuserId(userId: string): Promise<BookmarksEntity[]> {
        const bookmarks = await this.prisma.bookmark.findMany({
                    where: {
                        userId: userId
                    }
                });
        return bookmarks.map((bookmark) => plainToClass(BookmarksEntity, bookmark));
    }
    
    async deleteBookmark(userId: string, landmarkId: number): Promise<void> {
        await this.prisma.bookmark.delete({
            where:{ userId, landmarkId }
        });
    }}