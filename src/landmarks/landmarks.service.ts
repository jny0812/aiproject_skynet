import { PrismaService } from '../prisma.service';
import { Prisma, Landmark } from '@prisma/client';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class LandmarkService {
  private readonly DATA_DIR = join(__dirname, '..', 'data'); // 'data' 디렉토리 경로
  private readonly IMAGES_DIR = join(this.DATA_DIR, 'images'); // 'data/images' 디렉토리 경로

  constructor(private prisma: PrismaService) {}

  async createLandmark(name: string) {
    const landmarksData: Landmark[] = await this.loadCSVData(join(this.DATA_DIR, 'Landmark.csv'));
    const landmarkData = landmarksData.find(data => data.name === name);

    if (!landmarkData) {
      throw new Error('Landmark not found in CSV');
    }

    await this.prisma.landmark.create({
      data: {
        name: landmarkData.name,
        address: landmarkData.address,
        imagePath: join(this.IMAGES_DIR, landmarkData.imagePath),
        area: {
          connect: {
            id: landmarkData.areaId,
          },
        },
      },
    });
  }

  loadCSVData(filePath: string): Promise<Landmark[]> {
    return new Promise((resolve, reject) => {
      const results: Landmark[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: Landmark) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }
}


// import { PrismaService } from '../prisma.service';
// import * as csv from 'csv-parser';
// import * as fs from 'fs';
// import { Injectable } from '@nestjs/common';
// import { join } from 'path';

// @Injectable()
// export class LandmarkService {
//   private readonly DATA_DIR = join(__dirname, '..', 'data'); // 'data' 디렉토리 경로
//   private readonly IMAGES_DIR = join(this.DATA_DIR, 'images'); // 'data/images' 디렉토리 경로

//   constructor(private prisma: PrismaService) {}

//   async createLandmark(name: string) {
//     const landmarksData = await this.loadCSVData(join(this.DATA_DIR, 'Landmark.csv'));
//     const landmarkData = landmarksData.find(data => data.name_kr === name);

//     if (!landmarkData) {
//       throw new Error('Landmark not found in CSV');
//     }

//     await this.prisma.landmark.create({
//       data: {
//         name: landmarkData.name_kr,
//         address: landmarkData.add,
//         imagePath: join(this.IMAGES_DIR, landmarkData.file_name),
//         areaId: landmarkData.area_id,
//       },
//     });
//   }

//   loadCSVData(filePath: string): Promise<any[]> {
//     return new Promise((resolve, reject) => {
//       const results = [];
//       fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => resolve(results))
//         .on('error', reject);
//     });
//   }

// }

