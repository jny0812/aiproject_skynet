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

  @Post('create')
  @ApiBody({ type: CreateLandmarkDto })
  @ApiOperation({ summary: 'Create a new landmark' })
  @ApiResponse({ status: 201, description: 'The landmark has been successfully created.', type: LandmarkResponseDto })
  async createFromCSV(@Body() createLandmarkDto: CreateLandmarkDto ) : Promise<Landmark> {
    const {name} = createLandmarkDto;
    return await this.landmarkService.updateImagePath(name);
  }

  @Get(':name')
  @ApiParam({ name: 'name', required: true, description: 'The name of the landmark' })
  @ApiOperation({ summary: 'Get a landmark by name' })
  @ApiResponse({ status: 200, description: 'The landmark details', type: LandmarkResponseDto })
  async getLandmark(@Param() getLandmarkDto: GetLandmarkDto) : Promise<Landmark> {
    const { name } = getLandmarkDto;
    return this.landmarkService.getLandmarkByName(name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all landmarks' })
  async getAllLandmarks(): Promise<Landmark[]> {
    return this.landmarkService.getAllLandmarks();
  }

}
