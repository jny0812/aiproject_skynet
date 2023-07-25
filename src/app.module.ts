import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LandmarksModule } from './landmarks/landmarks.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    LandmarksModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
