import { GetLandmarkDto } from "src/landmarks/dto/landmark.request.dto";

//대표사진 경로
function getImagePath(imageName: string): string {
    const bucketName = 'aiproject-2023-07-v1';
    const imagePath = `https://${bucketName}.s3.amazonaws.com/${imageName}`;
    return imagePath;
}

//검색용 폴더
function getUserImagePath(getLandmarkDto: GetLandmarkDto): string {
    const bucketName = 'aiproject-2023-07-v1';
    const fileName = encodeURIComponent(getLandmarkDto.name);
    const imagePath = `https://${bucketName}.s3.amazonaws.com/User/${fileName}`;
    console.log('imagePath: ',imagePath);
    return imagePath;
}

export { 
    getImagePath, 
    getUserImagePath 
};