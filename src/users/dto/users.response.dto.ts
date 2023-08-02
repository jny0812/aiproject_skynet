import { ApiProperty } from '@nestjs/swagger';
import { BookmarksEntity } from "src/bookmarks/bookmarks.entity";
import { Exclude } from 'class-transformer';
import { IsDate } from 'class-validator';


class myPageResponseDto {

  @ApiProperty()
  @Exclude()
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  @Exclude()
  email: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  profilePath: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  @Exclude()
  deletedAt: Date;

  @ApiProperty()
  bookmarks: myPageBookmarkResponseDto[]
}

class myPageBookmarkResponseDto{

  @ApiProperty()
  landmarkName: string;

  @ApiProperty()
  counts: number;

}

export  {myPageResponseDto, myPageBookmarkResponseDto};
