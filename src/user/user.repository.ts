import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService){}
    async getUserById(id: string): Promise<User| null> {
        return this.prisma.user.findUnique({where: {id}});}

    async updateUserInfo(id: string, profilePath: string, username: string, description: string): Promise<User> {
        return this.prisma.user.update({where: {id}, data: {profilePath, username, description}});}
}
