import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponse } from 'src/docs/auth/auth.swagger';
import { RegisterRequestDto } from './dto/auth.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { AuthRegisterResponseDto } from './dto/auth.RegisterResponse.dto';

@ApiTags('Auth - Register')
@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {}

    //회원가입
    @Post('/new')
    @ApiResponse(AuthResponse)
    @HttpCode(201) //successfully created : 201
    @ApiOperation({ summary: 'Register a new user' })
    async register(@Body(ValidationPipe) user: RegisterRequestDto): Promise<AuthRegisterResponseDto> {
        return this.authService.register(user);
    }



}
