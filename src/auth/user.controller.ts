import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserEntity|null>{
        return this.userService.getUserById(id);
    }
    @Patch(':id')
    async updateUserInfo(
        @Param('id') id: string,
        @Body('profilePath') profilePath: string,
        @Body('username') username: string,
        @Body('description') description: string,
    ): Promise<UserEntity>{
        return this.userService.updateUserInfo(id, profilePath, username, description);
    }

}
