// bookmarks.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateBookmarkDto,
  DeleteBookmarkDto,
} from "./dto/bookmark.request.dto";
import { Bookmark, User } from "@prisma/client";
import { BookmarksRepository } from "./bookmarks.repository";
//import { ResponseBookmarkDto } from "./dto/bookmark.response.dto";
import { plainToClass } from "class-transformer";
import { ResponseBookmarkDto } from "./dto/bookmark.response.dto";

@Injectable()
export class BookmarksService {
  constructor(private bookmarksRepository: BookmarksRepository) {}

  async create(userId: string, landmarkId: number): Promise<ResponseBookmarkDto> {
    //const userId = user.id;
    //createBookmarkDto.landmarkId = createBookmarkDto.landmarkId;
    //const landmarkId = createBookmarkDto.landmarkId;
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

  // async findAll(): Promise<Bookmark[]> {
  //   return this.bookmarksRepository.findAll();
  // }

  async findBookmarksByUserAndArea(userId: string, areaId: number): Promise<Bookmark[]>{
    const bookmark = this.bookmarksRepository.findManyByUserAndArea(userId, areaId);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with id ${areaId} not found`);
    }
    return bookmark;
  }

  async findOne(id: number) {
    const bookmark = await this.bookmarksRepository.findOne(id);
    console.log('bookmark: ',bookmark);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with id ${id} not found`);
    }
    return bookmark;
  }

  async remove(userId: string, id: number): Promise<void> {
    console.log("id: ", id);
    const bookmark = await this.bookmarksRepository.findOne(id);
    
    if (!bookmark || bookmark.userId !== userId) {
      throw new NotFoundException(
        `Bookmark with id ${id} not found or not owned by the current user`,
      );
    }
    await this.bookmarksRepository.remove(id);
  }
}
