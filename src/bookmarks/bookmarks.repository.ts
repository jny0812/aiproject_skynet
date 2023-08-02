import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateBookmarkDto } from "./dto/bookmark.request.dto";
import {
  ResponseBookmarkDto,
  SiDoBookmarkListDto,
} from "./dto/bookmark.response.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class BookmarksRepository {
  constructor(private prisma: PrismaService) {}

  async findBookmarkByUserId(userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return userExists;
  }

  async findBookmarkByLandmarkId(landmarkId: number) {
    const landmarkExists = await this.prisma.landmark.findUnique({
      where: { id: landmarkId },
    });

    if (!landmarkExists) {
      throw new NotFoundException(`Landmark with id ${landmarkId} not found`);
    }
    return landmarkExists;
  }

  async findBookmarkById(userId: string, landmarkId: number) {
    console.log(`userId: ${userId}, landmarkId: ${landmarkId}`);
    const bookmarkExists = await this.prisma.bookmark.findFirst({
      where: {
        userId: userId,
        landmarkId: landmarkId,
      },
    });

    return bookmarkExists;
  }

  async createBookmark(userId: string, landmarkId: number) {
    return await this.prisma.bookmark.create({
      data: {
        user: {
          connect: { id: userId },
        },
        landmark: {
          connect: { id: landmarkId },
        },
      },
    });
  }

  async findManyByUser(userId: string): Promise<Record<string, Bookmark[]>> {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: userId },
      include: {
        landmark: {
          select: {
            address: true,
            name: true,
            imagePath: true,
            area: {
              select: {
                siDo: true,
              },
            },
          },
        },
      },
    });

    // 시/구별로 그룹화
    const groupedBySiDo: Record<string, Bookmark[]> = {};
    for (const bookmark of bookmarks) {
      const siDo = bookmark.landmark.area.siDo; // 가정: area에 siDo 필드가 있다.
      if (!groupedBySiDo[siDo]) {
        groupedBySiDo[siDo] = [];
      }
      groupedBySiDo[siDo].push(bookmark);
    }

    return groupedBySiDo;
  }

  async findOne(id: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: id },
      select: {
        id: true,
        createdAt: true,
        userId: true,
        landmark: {
          select: {
            address: true,
            name: true,
            imagePath: true,
            area: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    return bookmark;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.bookmark.delete({
      where: { id },
    });
  }

  // async findAll(): Promise<Bookmark[]> {
  //   return this.prisma.bookmark.findMany({
  //     where: { id },
  //     include: {
  //       landmark: {
  //         include: {
  //           area: true,
  //         },
  //         select: {
  //           address: true,
  //           name: true,
  //           imagePath: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
