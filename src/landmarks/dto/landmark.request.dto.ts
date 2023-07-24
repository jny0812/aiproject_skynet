import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLandmarkDto {
  //@IsNumber()
  //id: number;

  @IsString()
  name: string;
}
// export class CreateLandmarkDto {
    
//   @IsString()
//   @ApiProperty({
//     description: 'The name of the landmark',
//     example: '63시티'
//   })
//   readonly name: string;
// }

export class GetLandmarkDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the landmark',
    example: '63시티'
  })
  readonly name: string;
}