import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LandmarkService } from './landmarks.service';
import { Landmark } from '@prisma/client';
import { CreateLandmarkDto, GetLandmarkDto } from './dto/landmark.request.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarkResponseDto } from './dto/landmark.response.dto';

@ApiTags('landmark')
@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  @Get(':name')
  @ApiParam({ name: 'name', required: true, description: 'The name of the landmark' })
  @ApiOperation({ summary: 'Get a landmark by name' })
  @ApiResponse({ status: 200, description: 'The landmark details', type: LandmarkResponseDto })
  async getLandmark(@Param() getLandmarkDto: GetLandmarkDto) {

    const landmark = await this.landmarkService.updateImagePath(getLandmarkDto);

    const { name, address, imagePath } = landmark;

    return {
      name,
      address,
      imagePath
    };

    
  }

  @Get()
  @ApiOperation({ summary: 'Get all landmarks' })
  async getAllLandmarks(): Promise<Landmark[]> {
    return this.landmarkService.getAllLandmarks();
  }

}
