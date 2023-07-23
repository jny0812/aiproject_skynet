import { PrismaService } from 'src/prisma.service'; 
import { Landmark } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class LandmarkRepository {
  private readonly DATA_DIR = join(__dirname, '..', '..','data'); // 'data' 디렉토리 경로
  private readonly IMAGES_DIR = join(this.DATA_DIR, 'img'); // 'data/images' 디렉토리 경로

  constructor(private readonly prisma: PrismaService) {}

  async updateImagePath(name: string): Promise<Landmark> {
    let landmarkData = await this.prisma.landmark.findFirst({where: {name: name}})

    if (!landmarkData) {
      throw new Error('Landmark not found in CSV');
    }
    
    landmarkData = await this.prisma.landmark.update({
      where: { id: landmarkData.id },
      data: {
        imagePath: join(this.IMAGES_DIR, landmarkData.fileName),
      },
    });

    return landmarkData;
  }

  async findByName(name: string): Promise<Landmark> {
    return this.prisma.landmark.findUnique({
      where: {
        name: name,
      },
    });
  }

  async findMany(): Promise<Landmark[]> {
    return this.prisma.landmark.findMany();
  }
}
