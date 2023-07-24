import { Landmark, Area } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LandmarkRepository } from './landmarks.repository';
import { CreateLandmarkDto, GetLandmarkDto } from './dto/landmark.request.dto';
import { S3Service } from 'src/common/s3/s3.service';

@Injectable()
export class LandmarkService {
  //constructor(private landmarkRepo: LandmarkRepository) {}

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
    return await this.landmarkRepo.findByName(getLandmarkDto);
  }

  async getLandmarksByArea(getLandmarkDto: GetLandmarkDto): Promise<Landmark[]> {
    const landmarks = await this.landmarkRepo.findLandmarkByName(getLandmarkDto);
    if (!landmarks) {
      throw new Error('Landmark not found');
    }
    
    return this.landmarkRepo.findLandmarksByAreaId(landmarks.areaId);
  }

  getImagePath(getLandmarkDto: GetLandmarkDto): string {
    const bucketName = 'aiproject-2023-07-v1';
    const fileName = encodeURIComponent(getLandmarkDto.name);
    const imagePath = `https://${bucketName}.s3.amazonaws.com/${fileName}.jpg`;
    console.log('imagePath: ',imagePath);
    return imagePath
  }

  async updateImagePath(getLandmarkDto: GetLandmarkDto, imagePath: string): Promise<Landmark> {
    return await this.landmarkRepo.updateImagePath(getLandmarkDto, imagePath);
  }
}