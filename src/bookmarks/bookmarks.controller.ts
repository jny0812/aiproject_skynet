// bookmarks.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Get,
  BadRequestException,
} from "@nestjs/common";
import { BookmarksService } from "./bookmarks.service";

import {
  CreateBookmarkDto,
  DeleteBookmarkDto,
} from "./dto/bookmark.request.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { Bookmark } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";
import {
  ResponseBookmarkDto,
  SiDoBookmarkListDto,
} from "./dto/bookmark.response.dto";

@ApiTags("bookmarks")
@UseGuards(JwtAuthGuard)
@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post("toggle")
  toggleBookmark(
    @Request() req: any,
    @Body("landmarkId") landmarkId: number,
  ): Promise<ResponseBookmarkDto | MessageResponseDto> {
    const userId = req.user.id;
    console.log("userId: ", userId);
    return this.bookmarksService.toggleBookmark(userId, landmarkId);
  }

  //지역구별 리스트
  @Get("user/:userId")
  async findBookmarksByUser(
    @Param("userId") userId: string,
  ): Promise<SiDoBookmarkListDto[]> {
    return this.bookmarksService.findBookmarksByUser(userId);
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    console.log("typeof id: ", typeof id);
    return this.bookmarksService.findOne(id);
  }
}
