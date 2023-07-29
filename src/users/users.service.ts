import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/common/s3/s3.service';
import { UserRepository } from './users.repository';
import { UsersEntity } from './users.entity';
import { UsersRequestDto } from './dto/users.request.dto';

@Injectable()
export class UserService{
    constructor(
        private readonly userRepo: UserRepository,
        private readonly s3Service: S3Service,
      ) {}

    async getUserById(id: string): Promise< UsersEntity | null> {
        const user = await this.userRepo.getUserById(id);
        if(!user){
            return null;
        }
        return new UsersEntity(user);
    }

    async getUserByIdWithBookmarks(id: string): Promise<UsersEntity | null> {
      const user = await this.userRepo.getUserByIdWithBookmarks(id);
      if (!user) {
          return null;
      }
      return new UsersEntity(user);
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
