import { Module } from '@nestjs/common';
import { LandmarkController } from './landmarks.controller';
import { LandmarkService } from './landmarks.service';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [LandmarkController],
  providers: [LandmarkService, PrismaService]
})
export class LandmarksModule {}
