import { Controller, Get, Param, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersRequestDto } from './dto/users.request.dto';
import { JwtAuthGuard } from 'src/auth/authentication/guards/jwt.guard';
import { myPageResponseDto } from './dto/users.response.dto';


@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    // 마이페이지 이동
    @Get(':id')
    async getUserById( 
        @Param() usersRequestDto: UsersRequestDto ): Promise<myPageResponseDto>{
        return this.usersService.getUserById(usersRequestDto.id);
    }


    // 마이 프로필 업데이트 (프로필 사진(profilePath) | 유저네임(userName) | 자기소개(description) )
    @Patch(':id')
    async updateUserInfo(
        
        @Req() req: any,
        @Param() usersRequestDto: UsersRequestDto,
        @Body('profilePath') profilePath: string | null,
        @Body('userName') username: string | null,
        @Body('description') description: string | null,
    ): Promise<myPageResponseDto>{
        if (usersRequestDto.id !== req.user.id){
            throw new Error('수정할 수 있는 권한 없음.')
        }

        return this.usersService.updateUserInfo(usersRequestDto.id, profilePath, username, description);
    }

}
