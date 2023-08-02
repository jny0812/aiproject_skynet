import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
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

  async createBookmark(
    userId: string,
    landmarkId: number,
  ): Promise<ResponseBookmarkDto> {
    const createdBookmark = await this.prisma.bookmark.create({
      data: {
        user: {
          connect: { id: userId },
        },
        landmark: {
          connect: { id: landmarkId },
        },
      },
      include: {
        landmark: {
          include: {
            area: true,
          },
        },
      },
    });

    return {
      id: createdBookmark.id,
      userId: createdBookmark.userId,
      landmarkId: createdBookmark.landmark.id,
      siDo: createdBookmark.landmark.area.siGu, // 예: area에 siGu 필드가 있다고 가정
      imagePath: createdBookmark.landmark.imagePath,
      name: createdBookmark.landmark.name,
      address: createdBookmark.landmark.address,
      createdAt: createdBookmark.createdAt,
    };
  }

  async findManyByUser(
    userId: string,
  ): Promise<Record<string, ResponseBookmarkDto[]>> {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: userId },
      include: {
        landmark: {
          select: {
            id: true,
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

    // 시/도별로 그룹화
    const groupedBySiDo: Record<string, ResponseBookmarkDto[]> = {};
    for (const bookmark of bookmarks) {
      const siDo = bookmark.landmark.area.siDo;
      if (!groupedBySiDo[siDo]) {
        groupedBySiDo[siDo] = [];
      }
      groupedBySiDo[siDo].push({
        id: bookmark.id,
        userId: bookmark.userId,
        landmarkId: bookmark.landmark.id,
        siDo: bookmark.landmark.area.siDo,
        imagePath: bookmark.landmark.imagePath,
        name: bookmark.landmark.name,
        address: bookmark.landmark.address,
        createdAt: bookmark.createdAt,
      });
    }

    return groupedBySiDo;
  }

  async findOne(id: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: +id },
      select: {
        id: true,
        createdAt: true,
        userId: true,
        landmark: {
          select: {
            id: true,
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

  async deleteByLandmarkId(userId: string, landmarkId: number): Promise<void> {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        userId,
        landmarkId,
      },
    });

    if (bookmark) {
      await this.prisma.bookmark.delete({
        where: { id: bookmark.id },
      });
    }
  }

  async delete(id: number): Promise<void> {
    await this.prisma.bookmark.delete({
      where: { id },
    });
  }

  // const bookmark = await this.prisma.bookmark.findFirst({
  //   where: { id },
  // });

  //   if (bookmark) {
  //     await this.prisma.bookmark.delete({
  //       where: { id },
  //     });
  //   }
  // }

  // async findAll(): Promise<Bookmark[]> {
  //   return this.prisma.bookmark.findMany({
  //     where: { id },
  //     include: {
  //       landmark: {
  //         include: {
  //           area: true,
  //           id: true,
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
