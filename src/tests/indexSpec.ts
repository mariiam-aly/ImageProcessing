import reSize from '../fuctions/imgProcessing';
import supertest from 'supertest';
import app from '../index';

const main = supertest(app);

const str: string = process.cwd();

describe('resize image', (): void => {
  it('takes image path and returns resized image path', (): void => {
    async (): Promise<void> => {
      const imagePath: string = await reSize(
        `${str}/assets/full/fjord.jpeg`,
        `${str}/assets/thumb/fjord.jpeg`,
        100,
        100
      );
      expect(imagePath).toBe(`${str}/assets/thumb/fjord.jpeg`);
    };
  });
});

describe('end points', (): void => {
  it('server is running', async (): Promise<void> => {
    const response = await main.get('/api');
    expect(response.status).toBe(200);
  });
  it('create new image', async (): Promise<void> => {
    const response = await main.get(
      '/api/images?fileName=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });

  it('return error for user to enter correct image name', async (): Promise<void> => {
    const response = await main.get('/api/images?/fileName=fjordd');
    expect(response.status).toBe(200);
  });
});
