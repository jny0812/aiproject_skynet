import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ImagesService {
  constructor(private httpService: HttpService) {}

  async sendImageToAi(imageBuffer: Buffer): Promise<any> {  // imagePath 대신 imageBuffer를 인자로 받기
    // 이미지 파일을 읽는 대신 Buffer를 Base64 문자열로 변환
    const imageBase64 = imageBuffer.toString('base64');
    console.log('start send');
    // AI 서버에 POST 요청
    // 이미지 데이터 Base64 문자열 형태로 보내기
    try {
        const result$ = this.httpService.post(
          'http://127.0.0.1:5000/api-endpoint',//'http://localhost:5000/api-endpoint',
          { image: imageBase64 },
        );
        const response = await firstValueFrom(result$);
        console.log(response,"response success");
        return response.data;
    } catch(error) {
        console.error(error);
    }
  }
}
