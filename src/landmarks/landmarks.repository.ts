import { PrismaService } from 'src/prisma.service'; 
import { Landmark } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { GetLandmarkDto } from './dto/landmark.request.dto';
import { LandmarkResponseDto } from './dto/landmark.response.dto';

@Injectable()
export class LandmarkRepository {

  constructor(private readonly prisma: PrismaService) {}

  async findLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<Landmark> {
    return await this.prisma.landmark.findUnique({ where: getLandmarkDto });
  }

  async getNearByLandmarksByAreaId(areaId: number): Promise<Landmark[]> {
    return await this.prisma.landmark.findMany({ 
      where: { areaId },
      take: 5, 
    });
  }

}
