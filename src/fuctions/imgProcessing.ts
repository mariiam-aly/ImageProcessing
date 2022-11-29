import sharp from 'sharp';
/*this function takes the path of the file required to be resized 
/and the path intended for the new resized image*/
export default async function reSize(
  fileName: string,
  newImage: string,
  width: number,
  height: number
): Promise<string> {
  await sharp(fileName).resize(width, height).toFile(newImage);

  return newImage;
}
