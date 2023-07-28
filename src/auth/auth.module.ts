import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/users/users.repository';
import { Security } from './auth.security';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
   UsersModule,
   JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<JwtModuleOptions> => ({
      secret: configService.get<string>('JWT_SECRETKEY'),
      signOptions: { expiresIn: '1h' },
    }),
  }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,  
    UsersRepository, 
    PrismaService,
    Security]
})
export class AuthModule {}
