import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponse } from 'src/docs/auth/auth.swagger';
import { RegisterRequestDto } from './dto/auth.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';

@ApiTags('Auth - Register')
@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {}

    //회원가입
    @Post('/new')
    @ApiResponse(AuthResponse)
    @HttpCode(201) //successfully created : 201
    @ApiOperation({ summary: 'Register a new user' })
    async register(@Body() user: RegisterRequestDto): Promise<AuthResponseDto> {
        return this.authService.register(user);
    }



}
