import { Landmark, Area } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LandmarkRepository } from './landmarks.repository';

@Injectable()
export class LandmarkService {
  constructor(private landmarkRepo: LandmarkRepository) {}

  async updateImagePath(name: string) {
    return this.landmarkRepo.updateImagePath(name);
  }

  async getLandmarkByName(name: string): Promise<Landmark> {
    const landmark = await this.landmarkRepo.findByName(name);
  
    if (!landmark) {
      throw new NotFoundException(`Landmark with name ${name} not found.`);
    }
  
    return landmark;
  }
}