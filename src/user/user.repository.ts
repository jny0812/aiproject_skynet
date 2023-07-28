import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { UserRequestDto} from './dto/user.request.dto';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService){}

    async getUserById(id: UserRequestDto): Promise<User | null> {
        return this.prisma.user.findUnique({where: { userId: id}});
    }

    async updateUserInfo(id: string, profilePath: string, userName: string, description: string): Promise<User> {
        return this.prisma.user.update({where: {id}, data: {profilePath, userName, description}});}
}
