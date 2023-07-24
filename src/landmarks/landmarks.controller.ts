import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile, Patch, Put } from '@nestjs/common';
import { LandmarkService } from './landmarks.service';
import { Landmark } from '@prisma/client';
import { CreateLandmarkDto, GetLandmarkDto } from './dto/landmark.request.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import LandmarkResponse from 'src/docs/contents.swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiFile } from 'src/common/decorators/apiFile.decorator';
@ApiTags('landmark')
@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  @Post('upload/:name')
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param() getLandmarkDto: GetLandmarkDto) {
    if (!file) {
      throw new Error('File is not provided');
    }
    const fileNameKey = `${file.originalname}`;
    const fileName = file.originalname;
    console.log('fileName: ',fileName);
    const fileBuffer = file.buffer;
    
    const landmark = await this.landmarkService.uploadImage(fileNameKey, fileBuffer, fileName);

    const { name, address, imagePath } = landmark;

    return {
      name,
      address,
      imagePath
    };
  }

  @Get(':name')
  @ApiParam({ name: 'name', required: true, description: 'The name of the landmark' })
  @ApiOperation({ summary: 'Get a landmark by name' })
  @ApiResponse(LandmarkResponse)
  async getLandmark(@Param() getLandmarkDto: GetLandmarkDto): Promise<{ name: string, address: string, imagePath: string }> {

    const landmark = await this.landmarkService.getLandmarkByName(getLandmarkDto);
    const { name, address, imagePath } = landmark;

    return {
      name,
      address,
      imagePath
    };
  }

  @Get('area/:name')
  @ApiParam({ name: 'name', required: true, description: 'The name of the landmark' })
  @ApiOperation({ summary: 'Get a landmark by name' })
  @ApiResponse(LandmarkResponse)
  async getLandmarksByArea(@Param() getLandmarkDto: GetLandmarkDto): Promise<Landmark[]> {
    return this.landmarkService.getLandmarksByArea(getLandmarkDto);
  }

  @Put('update-image-path/:name')
  @ApiParam({ name: 'name', required: true, description: 'The name of the landmark' })
  @ApiOperation({ summary: 'Get a landmark by name' })
  @ApiResponse(LandmarkResponse)
  async updateImagePath(@Param() getLandmarkDto: GetLandmarkDto) {
    const imagePath = this.landmarkService.getImagePath(getLandmarkDto);
    return await this.landmarkService.updateImagePath(getLandmarkDto, imagePath);
     
  }

}
