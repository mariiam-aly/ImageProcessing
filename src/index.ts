import express from 'express';
import routes from './routes/imageRoute';

const app = express();
const port = 3000;

app.use('/api', routes);
app.get('/api', (req: express.Request, res: express.Response): void => {
  res.send(`server started at localhost:${port}`);
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
