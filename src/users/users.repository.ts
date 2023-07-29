import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { UsersRequestDto } from './dto/users.request.dto';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService){}

    async getUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({where: { id }});
    }

    async getUserByIdWithBookmarks(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                bookmarks: true,
            },
        });
    }

    async updateUserInfo(id: string, profilePath: string, userName: string, description: string): Promise<User> {
        return this.prisma.user.update({where: {id}, data: {profilePath, userName, description}});}
}
