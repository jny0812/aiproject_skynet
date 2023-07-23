import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLandmarkDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the landmark',
    default: 'DMC래미안e편한세상3단지',
  })
  readonly name: string;
}

export class GetLandmarkDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the landmark',
    default: 'DMC래미안e편한세상3단지',
  })
  readonly name: string;
}