import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth.response.dto';
import { RegisterRequestDto } from './dto/auth.request.dto';
import { UsersRepository } from '../users/users.repository';
import { Security } from './auth.security';

@Injectable()
export class AuthService {

    constructor(
        private userRepository: UsersRepository,
        private jwtService: JwtService,
        private readonly security: Security
    ) {}

    //회원가입
    register = async (user: RegisterRequestDto) : Promise<AuthResponseDto> => {
        
        //이미 존재하는 유저인지 확인 [userRepo]
        const existingUser = await this.userRepository.getUserByUserName(user.userName);
        if (existingUser) {
            throw new UnauthorizedException('이미 존재하는 아이디 입니다.');
        
        }

        try{

            //비밀번호 해시화
            const hashedPassword = await this.security.hashPassword(
                user.password
            );

            //user.password = hashedPassword;
            //user.createdAt = Date.now();

            //유저 등록
            const newUser = await this.userRepository.createUser({
                email: user.email,
                password: hashedPassword,
                userName: user.userName,
            });

            //payload 지정
            const payload = {
                email : newUser.email,
                id: newUser.id,
            };

            //옵션 설정
            const options = {
                //expireIn: '1h',
                issuer: 'skynet',
                //secretkey: process.env.JWT_SECRET_KEY,
            }

            //토큰 생성
            const token = this.jwtService.sign(payload,options);
            console.log('token',token);

            return {token};
        } catch (error) {
            throw new Error(error);
        }

    };
    

        
    
}
