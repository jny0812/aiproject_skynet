// bookmarks.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Bookmark, User } from "@prisma/client";
import { BookmarksRepository } from "./bookmarks.repository";
//import { ResponseBookmarkDto } from "./dto/bookmark.response.dto";
import { plainToClass } from "class-transformer";
import {
  ResponseBookmarkDto,
  SiDoBookmarkListDto,
} from "./dto/bookmark.response.dto";
import { MessageResponseDto } from "src/common/dto/message.dto";

@Injectable()
export class BookmarksService {
  constructor(private bookmarksRepository: BookmarksRepository) {}

  async toggleBookmark(
    userId: string,
    landmarkId: number,
  ): Promise<ResponseBookmarkDto | MessageResponseDto> {
    try {
      // 기존 북마크 찾기
      const existingBookmark = await this.bookmarksRepository.findBookmarkById(
        userId,
        landmarkId,
      );

      if (existingBookmark) {
        // 북마크가 이미 존재하면 삭제
        await this.bookmarksRepository.delete(existingBookmark.id);

        return {
          message: `BookmarkId: ${existingBookmark.id} & landmarkId: ${landmarkId} deleted successfully`,
        };
      } else {
        // 북마크가 없으면 생성
        const landmark =
          await this.bookmarksRepository.findBookmarkByLandmarkId(landmarkId);

        const bookmark = await this.bookmarksRepository.createBookmark(
          userId,
          landmarkId,
        );
        return plainToClass(ResponseBookmarkDto, bookmark);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findBookmarksByUser(userId: string): Promise<SiDoBookmarkListDto[]> {
    const bookmarks = await this.bookmarksRepository.findManyByUser(userId);
    if (!bookmarks) {
      throw new NotFoundException(`Bookmarks with user id ${userId} not found`);
    }
    return Object.entries(bookmarks).map(([siDo, bookmarksList]) => ({
      siDo,
      bookmarks: bookmarksList.map((bookmark) =>
        plainToClass(ResponseBookmarkDto, bookmark),
      ),
    }));
  }

  async findOne(id: number) {
    const bookmark = await this.bookmarksRepository.findOne(id);
    console.log("bookmark: ", bookmark);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with id ${id} not found`);
    }
    return bookmark;
  }

  async create(
    userId: string,
    landmarkId: number,
  ): Promise<ResponseBookmarkDto> {
    try {
      await this.bookmarksRepository.findBookmarkByUserId(userId);
      await this.bookmarksRepository.findBookmarkByLandmarkId(landmarkId);
      const findBookmark = await this.bookmarksRepository.findBookmarkById(
        userId,
        landmarkId,
      );

      if (findBookmark) {
        throw new ConflictException(
          `Bookmark for user ${userId} and landmark ${landmarkId} already exists`,
        );
      }

      const createBookmark = await this.bookmarksRepository.createBookmark(
        userId,
        landmarkId,
      );

      return plainToClass(ResponseBookmarkDto, createBookmark);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // async delete(userId: string, landmarkId: number): Promise<void> {
  //   console.log("id: ", landmarkId);
  //   const bookmark = await this.bookmarksRepository.findOne(landmarkId);

  //   if (!bookmark || bookmark.userId !== userId) {
  //     throw new NotFoundException(
  //       `Bookmark with id ${landmarkId} not found or not owned by the current user`,
  //     );
  //   }
  //   await this.bookmarksRepository.deleteByLandmarkId(userId, landmarkId);
  // }
}
