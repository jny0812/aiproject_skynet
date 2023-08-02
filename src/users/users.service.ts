import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/common/s3/s3.service';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './users.entity';
import { UsersRequestDto } from './dto/users.request.dto';
import { myPageResponseDto,myPageBookmarkResponseDto } from './dto/users.response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService{
    constructor(
        private readonly userRepo: UsersRepository,
        private readonly s3Service: S3Service,
      ) {}

    // 프로필 정보 불러오기
    async getUserById(id: string): Promise<myPageResponseDto> {
        const user = await this.userRepo.getUserById(id);
        if(!user){
            throw new Error;
        }

        //북마크 리스트
        const bookmarkCounts = await this.userRepo.countBookmarksBySiDo(id);

        const myPageResponse = plainToClass(myPageResponseDto, {
          ...user,
          bookmarkCounts,
      });

        
        return myPageResponse
    }


  
    async updateUserInfo(
        id: string,
        profilePath: string,
        userName: string,
        description: string,
      ): Promise<UsersEntity> {
        const updatedUser = await this.userRepo.updateUserInfo(
          id,
          profilePath,
          userName,
          description,
        );
        return new UsersEntity(updatedUser);
      }
    }
