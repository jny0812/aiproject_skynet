import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LandmarkService } from './landmarks.service';

@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  @Post('create')
  async createFromCSV(@Body('name') name: string) {
    const result = await this.landmarkService.createLandmark(name);
    return result;
  }

  @Get(':name')
  async getLandmark(@Param('name') name: string) {
    return this.landmarkService.getLandmarkByName(name);
  }

  // @Get(':name')
  // async getLandmark(@Param('name') name: string) {
  //   return this.landmarkService.getLandmarkByName(name);
  // }
  
}
