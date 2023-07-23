import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LandmarkResponseDto {

  @ApiProperty({ description: 'The name of the landmark', example: 'DMC래미안e편한세상3단지' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The address of the landmark', example: '서울특별시 서대문구 수색로 100' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'The image path of the landmark', example: 'D:\\7team_back\\data\\img\\DMC래미안e편한세상3단지_001_0.jpg' })
  @IsString()
  imagePath: string;
}
