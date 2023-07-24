import { Controller, Post, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LandmarkService } from './landmarks.service';
import { Landmark } from '@prisma/client';
import { GetLandmarkDto } from './dto/landmark.request.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import LandmarkResponse from 'src/docs/contents.swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiFile } from 'src/common/decorators/apiFile.decorator';

@ApiTags('landmark')
@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  // @Post('upload')
  // @ApiFile()
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new Error('File is not provided');
  //   }
  //   const fileNameKey = `${file.originalname}`;
  //   const fileName = file.originalname;
  //   const fileBuffer = file.buffer;
  //   console.log('fileName: ',fileName);

  //   const landmark = await this.landmarkService.uploadImage(fileNameKey, fileBuffer, fileName);
  //   const { name, address, imagePath } = landmark;

  //   return {
  //     name,
  //     address,
  //     imagePath
  //   };
  // }

  @Get(':name')
  @ApiParam({ name: 'name', required: true, description: 'The name of the landmark' })
  @ApiOperation({ summary: 'Get a landmark by name' })
  @ApiResponse(LandmarkResponse)
  async getLandmark(@Param() getLandmarkDto: GetLandmarkDto): 
    Promise<{ name:string, address:string, imagePath:string, nearByLandmarks: {name:string, address:string, imagePath:string}[] }> {

    //해당 랜드마크 정보 추출
    const landmark = await this.landmarkService.getLandmarkByName(getLandmarkDto)
    const { name, address, imagePath } = landmark;

    //근처 랜드마크 리스트 추출
    const nearByLandmarks =  await this.landmarkService.getNearByLandmarksByArea(landmark.areaId);
    

    return { name, address, imagePath, nearByLandmarks}
  }
}