import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLandmarkDto {
    
  @IsString()
  @ApiProperty({
    description: 'The name of the landmark',
    default: '63시티',
    example: '63시티'
  })
  readonly name: string;
}

export class GetLandmarkDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the landmark',
    example: '63시티'
  })
  readonly name: string;
}