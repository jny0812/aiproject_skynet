import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LandmarkResponseDto {
  @ApiProperty({ description: 'The ID of the landmark', example: 21 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The name of the landmark', example: 'DMC래미안e편한세상3단지' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The address of the landmark', example: '서울특별시 서대문구 수색로 100' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'The image path of the landmark', example: 'D:\\7team_back\\data\\img\\DMC래미안e편한세상3단지_001_0.jpg' })
  @IsString()
  imagePath: string;

  @ApiProperty({ description: 'The file name of the image', example: 'DMC래미안e편한세상3단지_001_0.jpg' })
  @IsString()
  fileName: string;

  @ApiProperty({ description: 'The area ID of the landmark', example: 5 })
  @IsInt()
  areaId: number;
}

// export class AreaDto {
//   @ApiProperty({ description: 'The ID of the area', example: 1 })
//   @IsInt()
//   id: number;

//   @ApiProperty({ description: 'The SiDo of the area', example: 'Example SiDo' })
//   @IsString()
//   siDo: string;

//   @ApiProperty({ description: 'The SiGu of the area', example: 'Example SiGu' })
//   @IsString()
//   siGu: string;

//   @ApiProperty({ type: [LandmarkResponseDto], description: 'The landmarks in the area' })
//   landmarks: LandmarkResponseDto[];
// }

