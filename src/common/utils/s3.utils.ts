import { GetLandmarkDto } from "src/landmarks/dto/landmark.request.dto";

function getImagePath(getLandmarkDto: GetLandmarkDto): string {
    const bucketName = 'aiproject-2023-07-v1';
    const fileName = encodeURIComponent(getLandmarkDto.name);
    const imagePath = `https://${bucketName}.s3.amazonaws.com/${fileName}.jpg`;
    console.log('imagePath: ',imagePath);
    return imagePath;
}

function getUserImagePath(getLandmarkDto: GetLandmarkDto): string {
    const bucketName = 'aiproject-2023-07-v1';
    const fileName = encodeURIComponent(getLandmarkDto.name);
    const imagePath = `https://${bucketName}.s3.amazonaws.com/User/${fileName}.jpg`;
    console.log('imagePath: ',imagePath);
    return imagePath;
}

export { 
    getImagePath, 
    getUserImagePath 
};