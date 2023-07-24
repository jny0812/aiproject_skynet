import { PrismaService } from 'src/prisma.service'; 
import { Landmark } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { GetLandmarkDto } from './dto/landmark.request.dto';

@Injectable()
export class LandmarkRepository {
  private readonly DATA_DIR = join(__dirname, '..', '..','data'); // 'data' 디렉토리 경로
  private readonly IMAGES_DIR = join(this.DATA_DIR, 'img'); // 'data/images' 디렉토리 경로

  constructor(private readonly prisma: PrismaService) {}

  async updateImagePathById(id: number, imagePath: string): Promise<Landmark> {
    return this.prisma.landmark.update({
      where: { id },
      data: {
        imagePath: imagePath,
      },
    });
  }

  async uploadImage(fileName: string): Promise<Landmark> {
    let landmarkData = await this.prisma.landmark.findFirst({where: {fileName : fileName}})

    if (!landmarkData) {
      throw new Error('Landmark not found in CSV');
    }
    
    // landmarkData = await this.prisma.landmark.update({
    //   where: { id: landmarkData.id },
    //   data: {
    //     imagePath: join(this.IMAGES_DIR, landmarkData.fileName),
    //   },
    // });

    return landmarkData;
  }

  async findByName(getLandmarkDto : GetLandmarkDto): Promise<Landmark> {
    return await this.prisma.landmark.findUnique({ where: getLandmarkDto });
  }


  async findLandmarkByName(getLandmarkDto: GetLandmarkDto) {
    return this.prisma.landmark.findUnique({ where: getLandmarkDto });
  }

  async findLandmarksByAreaId(areaId: number) {
    return this.prisma.landmark.findMany({ 
      where: { areaId },
      take: 5, 
    });
  }

  async updateImagePath(getLandmarkDto: GetLandmarkDto, imagePath: string): Promise<Landmark> {
    const landmark = await this.prisma.landmark.update({
      where: getLandmarkDto,
      data: { imagePath },
    });
    return landmark;
  }

}
