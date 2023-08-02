import { ApiProperty } from "@nestjs/swagger";

export class ResponseBookmarkDto {
  @ApiProperty({ example: 1, description: "The id of the bookmark" })
  id: number;

  @ApiProperty({
    example: "6230c68b-3e08-484d-818b-5bfa966d5d77",
    description: "북마크의 유저ID",
  })
  userId: string;

  @ApiProperty({
    example: "강남",
    description: "자치구",
  })
  siGu: string;

  @ApiProperty({
    example: "150년 수령 느티나무_001_34844496.jpg",
    description: "이미지 URL",
  })
  imagePath: string;

  @ApiProperty({
    example: "150년수령느티나무",
    description: "장소명",
  })
  name: string;

  @ApiProperty({
    example: "서울특별시 양천구 목4동 760-28",
    description: "주소",
  })
  address: string;

  @ApiProperty({
    example: "2023-07-31T12:00:00Z",
    description: "북마크 생성시간",
  })
  createdAt: Date;
}