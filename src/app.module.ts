import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LandmarksModule } from './landmarks/landmarks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LandmarksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
