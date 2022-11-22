import sharp from 'sharp';
/*this function takes the path of the file required to be resized 
/and the path intended for the new resized image*/
export default function reSize(fileName: string, newImage: string): string {
  sharp(fileName)
    .resize(300, 200)
    .toFile(newImage);

    return newImage
}
