import { Landmark, Area } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LandmarkRepository } from './landmarks.repository';
import { CreateLandmarkDto, GetLandmarkDto } from './dto/landmark.request.dto';

@Injectable()
export class LandmarkService {
  constructor(private landmarkRepo: LandmarkRepository) {}

  async updateImagePath(getLandmarkDto: GetLandmarkDto): Promise<Landmark> {
    const landmark = await this.landmarkRepo.updateImagePath(getLandmarkDto);

    return landmark;

  }

  async getAllLandmarks(): Promise<Landmark[]> {
    const landmarks = await this.landmarkRepo.findMany();
    return landmarks;
  }
}