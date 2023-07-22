import { Controller, Post, Body } from '@nestjs/common';
import { LandmarkService } from './landmarks.service';

@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  @Post('create')
  createFromCSV(@Body('name') name: string) {
    this.landmarkService.createLandmark(name);
  }
}
