import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateBookmarkDto } from "./dto/bookmark.request.dto";

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

  async findManyByUserAndArea(userId: string, areaId: number): Promise<Bookmark[]>{
    console.log(`userId: ${userId}, areaId: ${areaId}`);
    console.log('typeof areaId: ',typeof areaId);
    return this.prisma.bookmark.findMany({
      where: {
        userId: userId,
        landmark: {
          area: {
            id: areaId,
          },
        },
      },
      include: {
        landmark: {
          select: {
            address: true,
            name: true,
            imagePath: true,
            area: {
              select: {
                id: true,  // Change 'areaId' to 'id'
              },
            },
          },
        },
      },
    });
  }
  
  
  async findOne(id: number){
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: +id },
      select: {
        id: true,
        createdAt: true,
        userId: true,  // Add this line
        landmark: {
          select: {
            address: true,
            name: true,
            imagePath: true,
            area: {
              select: {
                id: true,  // Change 'areaId' to 'id'
              },
            },
          },
        },
      },
    });
  
    return bookmark;
  }

  // async findOne(id: number): Promise<Bookmark> {
  //   const bookmark = await this.prisma.bookmark.findUnique({
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
  //   if (!bookmark) {
  //     throw new NotFoundException("Bookmark not found");
  //   }
  //   return bookmark;
  // }

  async remove(id: number): Promise<void> {
    await this.prisma.bookmark.delete({
      where: { id },
    });
  }
}
