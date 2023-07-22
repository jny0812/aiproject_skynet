import { Module } from '@nestjs/common';
import { LandmarkController } from './landmarks.controller';
import { LandmarkService } from './landmarks.service';
import { PrismaService } from 'src/prisma.service';
import { LandmarkRepository } from './landmarks.repository';
@Module({
  controllers: [LandmarkController],
  providers: [LandmarkService, PrismaService, LandmarkRepository]
})
export class LandmarksModule {}
