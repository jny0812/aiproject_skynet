import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class CreateBookmarkDto {
  @IsNumber()
  @ApiProperty({
    description: "랜드마크 아이디",
    example: 1,
  })
  landmarkId: number;
}

class DeleteBookmarkDto {
  @IsNumber()
  @ApiProperty({
    description: "랜드마크 아이디",
    example: 1,
  })
  landmarkId: number;

  constructor(landmarkId: number) {
    this.landmarkId = landmarkId;
  }
}

export { CreateBookmarkDto, DeleteBookmarkDto };
