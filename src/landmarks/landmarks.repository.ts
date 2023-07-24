import { PrismaService } from 'src/prisma.service'; 
import { Landmark } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { GetLandmarkDto } from './dto/landmark.request.dto';
import { LandmarkResponseDto } from './dto/landmark.response.dto';

@Injectable()
export class LandmarkRepository {

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
    
    // 로컬 이미지 경로로 update
    // landmarkData = await this.prisma.landmark.update({
    //   where: { id: landmarkData.id },
    //   data: {
    //     imagePath: join(this.IMAGES_DIR, landmarkData.fileName),
    //   },
    // });

    return landmarkData;
  }

  async findLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<Landmark> {
    return await this.prisma.landmark.findUnique({ where: getLandmarkDto });
  }

  async getNearByLandmarksByAreaId(areaId: number): Promise<{name:string, address:string, imagePath:string}[]> {
    return await this.prisma.landmark.findMany({ 
      where: { areaId },
      take: 5, 
    });
  }

}
