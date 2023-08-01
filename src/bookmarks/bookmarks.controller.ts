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
import { ResponseBookmarkDto } from "./dto/bookmark.response.dto";

@ApiTags("bookmarks")
@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(JwtAuthGuard)
  //북마크 등록
  @Post()
  create(
    @Request() req: any,
    @Body(ValidationPipe)
    createBookmarkDto: CreateBookmarkDto,
  ) : Promise<ResponseBookmarkDto>{
    const userId = req.user.id;
    const landmarkId = createBookmarkDto.landmarkId;
    console.log("userId: ", userId);
    return this.bookmarksService.create(userId, landmarkId);
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    console.log("typeof id: ",typeof id);
    return this.bookmarksService.findOne(id);
  }

  //지역구별 리스트
  @Get('user/:userId/area/:areaId')
  async findBookmarksByArea(
    @Param('userId') userId: string,
    @Param('areaId', ParseIntPipe) areaId: number
  ) {
    return this.bookmarksService.findBookmarksByUserAndArea(userId, areaId);
  }

  //북마크 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(":landmarkId")
  async remove(
    @Request() req: any,
    @Param("landmarkId", ParseIntPipe) id: number,
  ): Promise<MessageResponseDto> {
    const userId = req.user.id;
    console.log("landmarkId: ", id);
    await this.bookmarksService.remove(userId, id);

    return { message: "Bookmark deleted successfully" };
  }
}
