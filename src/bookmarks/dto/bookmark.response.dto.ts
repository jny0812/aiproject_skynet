import { ApiProperty } from "@nestjs/swagger";
import { Area, Bookmark, Landmark } from "@prisma/client";
import { LandmarkEntity } from "src/landmarks/landmark.entity";

export class ResponseBookmarkDto {
  @ApiProperty({ example: 1, description: 'The id of the bookmark' })
  id: number;

  @ApiProperty({ example: '2023-07-31T12:00:00Z', description: '북마크 생성시간' })
  createdAt: Date;

  @ApiProperty({ example: '6230c68b-3e08-484d-818b-5bfa966d5d77', description: '북마크의 유저ID' })
  userId: string;

  @ApiProperty({
    example: {
      address: '서울특별시 종로구 종로 1(종로1가)',
      name: '(주)교보문고',
      imagePath: '(주)교보문고_001_34728823.jpg',
      area: { areaId: 1 },
    },
    description: 'The landmark associated with the bookmark',
  })
  landmark: {
    address: string;
    name: string;
    imagePath: string;
    area: {
      areaId: number;
    };
  };

  constructor(bookmark: Bookmark & { landmark: Landmark & { area: Area } }) {
    this.id = bookmark.id;
    this.createdAt = bookmark.createdAt;
    this.userId = bookmark.userId;  // Add this line
    this.landmark = {
      address: bookmark.landmark.address,
      name: bookmark.landmark.name,
      imagePath: bookmark.landmark.imagePath,
      area: {
        areaId: bookmark.landmark.area.id,
      },
    };
  }
}

//import { Landmark } from "./src/landmark/landmark.entity";

// export class GetBookmarkResponseDto {
//   @ApiProperty({ example: 1, description: "The id of the bookmark" })
//   id: number;

//   @ApiProperty({
//     example: {
//       id: 1,
//       name: "Landmark name",
//       address: "Landmark address",
//       imagePath: "Landmark image path",
//       area: {
//         id: 1,
//         name: "Area name",
//       },
//     },
//     description: "The landmark associated with the bookmark",
//     type: LandmarkEntity,
//   })
//   landmark: Landmark;
// }

