import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service';
import { Bookmark, User } from '@prisma/client';
import { UsersRequestDto } from './dto/users.request.dto';
import { RegisterRequestDto } from "src/auth/dto/auth.request.dto";


@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  //아이디 조회
  getUserByUserName = async (userName: string): Promise<User | null> => {
    const result = await this.prisma.user.findUnique({ where: { userName } });

    return result;
  };

  //회원가입 - 새로운 유저 등록
  createUser = async (
    user: Pick<User, "email" | "userName" | "password">,
  ): Promise<User> => {
    return await this.prisma.user.create({
      data: user,
    });
  };


  // 프로필 정보
  async getUserById (id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
          where:  {
            id
          } 
        });
  }

 

async updateUserInfo(id: string, profilePath: string, userName: string, description: string): Promise<User> {
     return this.prisma.user.update({where: {id}, data: {profilePath, userName, description}});}

}
