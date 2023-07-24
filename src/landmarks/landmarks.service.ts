import { Landmark } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LandmarkRepository } from './landmarks.repository';
import { GetLandmarkDto } from './dto/landmark.request.dto';
import { S3Service } from 'src/common/s3/s3.service';
import { getImagePath } from 'src/common/utils/s3.utils';
@Injectable()
export class LandmarkService {
  constructor(
    private readonly landmarkRepo: LandmarkRepository,
    private readonly s3Service: S3Service,
  ) {}
 
  async uploadImage(fileNameKey: string, fileBuffer: Buffer, fileName: string ): Promise<Landmark> {
    const filePath = await this.s3Service.uploadFile(fileNameKey, fileBuffer);

    const landmark = await this.landmarkRepo.uploadImage(fileName);
    if (!landmark) {
      throw new Error('Landmark not found');
    }
    return this.landmarkRepo.updateImagePathById(landmark.id, filePath);
  }

  async getLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<Landmark> {
    let landmark = await this.landmarkRepo.findLandmarkByName(getLandmarkDto);
    if (!landmark) {
      throw new Error('Landmark not found');
    }
    if (landmark.imagePath == landmark.fileName) {
      const imagePath = getImagePath(getLandmarkDto);
      landmark = await this.landmarkRepo.updateImagePath(getLandmarkDto, imagePath);
    }
    return landmark
  }

  async getLandmarksByArea(getLandmarkDto: GetLandmarkDto): Promise<Landmark[]> {
    const findLandmark = await this.landmarkRepo.findLandmarkByName(getLandmarkDto);
    if (!findLandmark) {
      throw new Error('Landmark not found');
    }

    let landmarks = await this.landmarkRepo.findLandmarksByAreaId(findLandmark.areaId)
    let landmark: Landmark;
    let updatedLandmarks: Landmark[] = [];
    for (landmark of landmarks) {
      if (landmark.imagePath == landmark.fileName) {
        const getLandmarkDto = { name: landmark.name };
        const imagePath = getImagePath(getLandmarkDto);
        const updateLandmark = await this.landmarkRepo.updateImagePath(getLandmarkDto, imagePath);
        updatedLandmarks.push(updateLandmark);
      }
    }
    if (updatedLandmarks.length != 0) landmarks = updatedLandmarks

    return landmarks
  }


}