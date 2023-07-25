import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { memoryStorage } from 'multer';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 5 }
  }))
  async uploadImage(@UploadedFile('file') file: Express.Multer.File) {
    const imageBuffer = file.buffer;
    const result = await this.imagesService.sendImageToAi(imageBuffer);
    return result;
  }

}
