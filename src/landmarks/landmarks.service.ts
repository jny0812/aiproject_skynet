import { PrismaService } from 'src/prisma.service';
import { Landmark, Area } from '@prisma/client';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class LandmarkService {
  private readonly DATA_DIR = join(__dirname, '..', '..','data'); // 'data' 디렉토리 경로
  private readonly IMAGES_DIR = join(this.DATA_DIR, 'img'); // 'data/images' 디렉토리 경로

  constructor(private prisma: PrismaService) {}

  async createLandmark(name: string) {
    let landmarkData: Landmark = await this.prisma.landmark.findFirst({where: {name: name}})

    if (!landmarkData) {
      throw new Error('Landmark not found in CSV');
    }
    console.log("landmarkData: ",landmarkData)
    
    landmarkData = await this.prisma.landmark.update({
      where: { id: landmarkData.id },
      data: {
        imagePath: join(this.IMAGES_DIR, landmarkData.fileName),
      },
    });

    return landmarkData;
  }

  async getLandmarkByName(name: string): Promise<Landmark> {
    const landmark = await this.prisma.landmark.findUnique({
      where: {
        name: name,
      },
    });
  
    if (!landmark) {
      throw new NotFoundException(`Landmark with name ${name} not found.`);
    }
  
    return landmark;
  }
  


}

// @Injectable()
// export class LandmarkService {
//   private readonly DATA_DIR = join(__dirname, '..', '..','data'); // 'data' 디렉토리 경로
//   private readonly IMAGES_DIR = join(this.DATA_DIR, 'img'); // 'data/images' 디렉토리 경로

//   constructor(private prisma: PrismaService) {}

//   async createLandmarkFromCSV() {

//     fs.createReadStream(join(this.DATA_DIR, 'Area.csv'))
//       .pipe(csv())
//       .on('data', async (row) => {
//         const area = {
//           siDo: row.siDo,
//           siGu: row.siGu
//         };
        
//         await this.prisma.area.create({ data: area });
//       })
//       .on('end', () => {
//         console.log('CSV file successfully processed');
//       });


//     fs.createReadStream(join(this.DATA_DIR, 'Landmark.csv'))
//       .pipe(csv())
//       .on('data', async (row) => {
//         const landmark = {
//           name: row.name,   // CSV 파일의 필드 이름에 맞게 변경해야 합니다.
//           address: row.address, // CSV 파일의 필드 이름에 맞게 변경해야 합니다.
//           imagePath: join(this.IMAGES_DIR, row.imagePath), // CSV 파일의 필드 이름에 맞게 변경해야 합니다.
//           Area: {
//             connect: {
//               id: Number(row.areaId), // CSV 파일의 필드 이름에 맞게 변경해야 합니다.
//             },
//           },
//         };

//         await this.prisma.landmark.create({ data: landmark });
//       })
//       .on('end', () => {
//         console.log('CSV file successfully processed');
//       });
//   }
// }


// @Injectable()
// export class LandmarkService {
//   private readonly DATA_DIR = join(__dirname, '..', '..','data'); // 'data' 디렉토리 경로
//   private readonly IMAGES_DIR = join(this.DATA_DIR, 'img'); // 'data/images' 디렉토리 경로

//   constructor(private prisma: PrismaService) {}

//   async createLandmark(name: string) {
//     const landmarkData: Landmark = await this.prisma.landmark.findFirst({where: {name: name}})
//     //const landmarkData = landmarksData.find(data => data.name === name);
//     //console.log("IMAGES_DIR", join(this.IMAGES_DIR, landmarkData[0].imagePath))
//     if (!landmarkData) {
//       throw new Error('Landmark not found in CSV');
//     }
//     console.log("landmarkData: ",landmarkData)

//     // const areasData: Area[] = await this.loadCSVData(join(this.DATA_DIR, 'Area.csv'));
//     // const areaData = areasData.find(data => data.name === name);
//     // if (!areaData) {
//     //   throw new Error(`Area with id ${landmarkData.areaId} not found`);
//     // }

//     const existingLandmark = await this.prisma.landmark.findUnique({
//       where: { name: landmarkData.name },
//     });

//     if (existingLandmark) {
//       throw new Error('Landmark already exists');
//     }
    
//     await this.prisma.landmark.create({
//       data: {
//         name: landmarkData.name,
//         address: landmarkData.address,
//         imagePath: join(this.IMAGES_DIR, landmarkData.imagePath),
//         areaId: Number(landmarkData.areaId),
//         area: {
//           connect: {
//             id: Number(landmarkData.areaId),
//           },
//         },
//       },
//     });
//   }

//   loadCSVData(filePath: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const results: Landmark[] = [];
//       fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (data: Landmark) => results.push(data))
//         .on('end', () => resolve(results))
//         .on('error', reject);
//     });
//   }
// }

