import { Injectable } from '@nestjs/common';
import { LandmarkRepository } from './landmarks.repository';
import { GetLandmarkDto } from './dto/landmark.request.dto';
import { S3Service } from 'src/common/s3/s3.service';
import { LandmarkResponseDto } from './dto/landmark.response.dto';
import { getImagePath } from 'src/common/utils/s3.utils';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LandmarkService {
  constructor(
    private readonly landmarkRepo: LandmarkRepository,
    private readonly s3Service: S3Service,
  ) {}
 
  //해당 랜드마크 정보 추출 (이름으로 검색)
  async getLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<LandmarkResponseDto> {
    let landmark = await this.landmarkRepo.findLandmarkByName(getLandmarkDto);
    if (!landmark) {
      throw new Error('Landmark not found');
    }

    const imagePath = getImagePath(landmark.imagePath);
    landmark.imagePath = imagePath;

    return plainToClass(LandmarkResponseDto, landmark);
  }

  //주변 랜드마크 정보 추출 (지역ID로 검색 - 상위 5개)
  async getNearByLandmarksByArea(areaId: number): Promise<LandmarkResponseDto[]> {
    
    const landmarks = await this.landmarkRepo.getNearByLandmarksByAreaId(areaId);
    if (!landmarks) {
      throw new Error('Landmark not found');
    }

    //파일명 이름으로이미지 경로 업데이트
    const updatedLandmarks = landmarks.map((landmark) => ({
      ...landmark,
      imagePath: getImagePath(landmark.imagePath),
    }));
  
    return updatedLandmarks.map(landmark => plainToClass(LandmarkResponseDto, landmark));
  }

  // async uploadImage(fileNameKey: string, fileBuffer: Buffer, fileName: string ): Promise<Landmark> {
  //   const filePath = await this.s3Service.uploadFile(fileNameKey, fileBuffer);

  //   const landmark = await this.landmarkRepo.uploadImage(fileName);
  //   if (!landmark) {
  //     throw new Error('Landmark not found');
  //   }
  //   return this.landmarkRepo.updateImagePathById(landmark.id, filePath);
  // }
}