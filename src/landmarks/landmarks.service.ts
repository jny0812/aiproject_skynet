import { Landmark, Area } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LandmarkRepository } from './landmarks.repository';
import { GetLandmarkDto } from './dto/landmark.request.dto';
import { S3Service } from 'src/common/s3/s3.service';

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
      const imagePath = this.getImagePath(getLandmarkDto);
      landmark = await this.landmarkRepo.updateImagePath(getLandmarkDto, imagePath);
      console.log('landmark: ',landmark);
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
        const getLandmarkDto = { name: landmark.name };  // Assuming name is the key
        const imagePath = this.getImagePath(getLandmarkDto);
        const updateLandmark = await this.landmarkRepo.updateImagePath(getLandmarkDto, imagePath);
        console.log('updateLandmark: ',updateLandmark);
        updatedLandmarks.push(updateLandmark);
      }
    }
    if (updatedLandmarks.length != 0) landmarks = updatedLandmarks

    return landmarks
  }

  getImagePath(getLandmarkDto: GetLandmarkDto): string {
    const bucketName = 'aiproject-2023-07-v1';
    const fileName = encodeURIComponent(getLandmarkDto.name);
    const imagePath = `https://${bucketName}.s3.amazonaws.com/${fileName}.jpg`;
    console.log('imagePath: ',imagePath);
    return imagePath
  }

}