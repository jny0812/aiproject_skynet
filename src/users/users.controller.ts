import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersRequestDto } from './dto/users.request.dto';
//import { AuthGuard } from '@nestjs/passport';


//@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    // 
    @Get(':id')
    async getUserById( 
        @Param() id: string ): Promise<UsersEntity|null>{
        return this.userService.getUserById(id);
    }

    @Get('bookmark/:id')
    async getUserByIdWithBookmarks(@Param('id') id: string): Promise<UsersEntity | null> {
        return this.userService.getUserByIdWithBookmarks(id);
    }


    @Patch(':id')
    async updateUserInfo(
        @Param('id') id: string,
        @Body('profilePath') profilePath: string,
        @Body('username') username: string,
        @Body('description') description: string,
    ): Promise<UsersEntity>{
        return this.userService.updateUserInfo(id, profilePath, username, description);
    }

}
