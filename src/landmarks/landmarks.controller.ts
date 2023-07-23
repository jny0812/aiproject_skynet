import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LandmarkService } from './landmarks.service';
import { Landmark } from '@prisma/client';
import { CreateLandmarkDto, GetLandmarkDto } from './dto/create-landmark.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('landmark')
@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  @Post('create')
  @ApiBody({ type: CreateLandmarkDto })
  @ApiOperation({ summary: 'Create a new landmark' })
  async createFromCSV(@Body() createLandmarkDto: CreateLandmarkDto ) : Promise<Landmark | null> {
    const {name} = createLandmarkDto;
    return await this.landmarkService.updateImagePath(name);
  }

  @Get(':name')
  @ApiParam({ name: 'name', required: true, description: 'The name of the landmark' })
  @ApiOperation({ summary: 'Get a landmark by name' })
  async getLandmark(@Param() getLandmarkDto: GetLandmarkDto) : Promise<Landmark | null> {
    const { name } = getLandmarkDto;
    return this.landmarkService.getLandmarkByName(name);
  }

}
