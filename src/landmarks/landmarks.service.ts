import { Landmark } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { LandmarkRepository } from './landmarks.repository';
import { GetLandmarkDto } from './dto/landmark.request.dto';
import { S3Service } from 'src/common/s3/s3.service';
import { LandmarkResponseDto } from './dto/landmark.response.dto';
import { getImagePath } from 'src/common/utils/s3.utils';

@Injectable()
export class LandmarkService {
  constructor(
    private readonly landmarkRepo: LandmarkRepository,
    private readonly s3Service: S3Service,
  ) {}
 
  // async uploadImage(fileNameKey: string, fileBuffer: Buffer, fileName: string ): Promise<Landmark> {
  //   const filePath = await this.s3Service.uploadFile(fileNameKey, fileBuffer);

  //   const landmark = await this.landmarkRepo.uploadImage(fileName);
  //   if (!landmark) {
  //     throw new Error('Landmark not found');
  //   }
  //   return this.landmarkRepo.updateImagePathById(landmark.id, filePath);
  // }


  //해당 랜드마크 정보 추출 (이름으로 검색)
  async getLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<Landmark> {
    let landmark = await this.landmarkRepo.findLandmarkByName(getLandmarkDto);
    if (!landmark) {
      throw new Error('Landmark not found');
    }

    const imagePath = getImagePath(landmark.imagePath);
    landmark.imagePath = imagePath;

    return landmark
  }

  //주변 랜드마크 정보 추출 (지역ID로 검색 - 상위 5개)
  async getNearByLandmarksByArea(areaId: number): Promise<{name:string, address:string, imagePath:string}[]> {
    
    const landmarks = await this.landmarkRepo.getNearByLandmarksByAreaId(areaId);
    if (!landmarks) {
      throw new Error('Landmark not found');
    }

    //파일명 이름으로 이미지 경로 업데이트
    const updatedLandmarks = landmarks.map((landmark) => ({
      ...landmark,
      imagePath: getImagePath(landmark.imagePath),
    }));

    //할당
    const nearByLandmarks = updatedLandmarks.map(({ name, address, imagePath }) => ({
      name,
      address,
      imagePath,
    }));
  
    return nearByLandmarks;
  }


}