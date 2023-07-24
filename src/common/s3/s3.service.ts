import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
      Key: `User/${fileName}`,
      Body: fileBuffer,
    });

    await this.s3.send(uploadCommand);

    const url = await getSignedUrl(this.s3, uploadCommand, { expiresIn: 3600 });

    return url;
  }

}
