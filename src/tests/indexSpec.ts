import reSize from"../fuctions/imgProcessing"
import routes from "../routes/imageRoute"
import supertest from 'supertest';
import app from '../index';
import { request } from "express";

const main = supertest(app);
const route = supertest(routes);

describe("resize image", () => {
  it("takes image path and returns resized image path", () => {
    
      expect(reSize('/Users/mariamaly/projects/ImageProcessing/assets/full/fjord.jpeg','/Users/mariamaly/projects/ImageProcessing/assets/thumb/fjord.jpeg')).toBe('/Users/mariamaly/projects/ImageProcessing/assets/thumb/fjord.jpeg');
  });

}); 

describe("end points", () => {

  
  it('server is running', async()  => {
    const response = await main.get('/api');
    expect(response.status).toBe(200);

})
it('create new image', async() => {
  const response = await route.get('/api/images?fileName=fjord&width=200&height=200');
  expect(response.status).toBe(200);

})


it('return error for user to enter correct image name', async() => {
  const response = await route.get('/api/images?/fileName=fjordd');
  expect(response.status).toBe(200);

})

}); 