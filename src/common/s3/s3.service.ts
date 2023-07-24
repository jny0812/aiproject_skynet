import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      }
    });
  }
  
  async uploadFile(fileName: string, fileBuffer: Buffer): Promise<string> {
    const uploadCommand = new PutObjectCommand({
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: fileName,
      Body: fileBuffer,
    });

    await this.s3.send(uploadCommand);

    const url = await getSignedUrl(this.s3, uploadCommand, { expiresIn: 3600 });

    return url;
  }

//   generateUniqueFileName(file: Express.Multer.File): string {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//     const extension = file.originalname.split('.').pop();
//     const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;
//     return fileName;
//   }
}
