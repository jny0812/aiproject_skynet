import { ApiProperty } from '@nestjs/swagger';
import { BookmarksEntity } from "src/bookmarks/bookmarks.entity";
import { Exclude } from 'class-transformer';


export class mainPageResponseDto {
  @ApiProperty()
  @Exclude()
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  @Exclude()
  email: string;

  @ApiProperty()
  profilePath: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [BookmarksEntity] })
  bookmarks: BookmarksEntity[];
}
