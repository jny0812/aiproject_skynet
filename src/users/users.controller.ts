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

    // @Get('bookmark/:id')
    // async getUserByIdWithBookmarks(@Param('id') id: string): Promise<UsersEntity | null> {
    //     return this.usersService.getUserByIdWithBookmarks(id);
    // }


    @Patch(':id')
    async updateUserInfo(
        
        @Req() req: any,
        @Param('id') id: string,
        @Body('profilePath') profilePath: string | null,
        @Body('username') username: string | null,
        @Body('description') description: string | null,
    ): Promise<UsersEntity>{

        return this.usersService.updateUserInfo(id, profilePath, username, description);
    }

}
