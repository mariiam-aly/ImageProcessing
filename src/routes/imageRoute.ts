import express from 'express';
import * as fs from 'fs';
import reSize from '../fuctions/imgProcessing';
const routes = express.Router();
/*this end-point acts depending on the validity of the parameters 
and the existence of the same required image of same  dimentions */
/*displayes either: error, new resized image, an already existing resized image */
async function newImg(
  req: express.Request,
  res: express.Response,
  newImageName: string,
  newImagePath: string
): Promise<void> {
  const width: number = parseInt(req.query.width as unknown as string);
  const height: number = parseInt(req.query.height as unknown as string);

  await reSize(
    `./assets/full/${req.query.fileName}.jpeg`,
    `./assets/thumb/${newImageName}.jpeg`,
    width,
    height
  ).then(() => {
    res.sendFile(newImagePath);
  });
}
routes.get('/images', (req: express.Request, res: express.Response): void => {
  const str: string = process.cwd();

  const imagePath = `${str}/assets/full/${req.query.fileName}.jpeg`;

  if (!fs.existsSync(imagePath)) {
    res.send('File name does not exist');
  } else if (
    !((req.query.width as unknown as number) >= 1) ||
    !((req.query.height as unknown as number) >=1)
  ) {
    res.send('please enter valid dimentions');
  } else {
    const newImageName = `${req.query.fileName}${req.query.width}x${req.query.height}`;
    const newImagePath = `${str}/assets/thumb/${newImageName}.jpeg`;

    if (fs.existsSync(newImagePath)) {
      res.sendFile(newImagePath);
    } else {
      newImg(req, res, newImageName, newImagePath);
    }
  }
});

export default routes;
