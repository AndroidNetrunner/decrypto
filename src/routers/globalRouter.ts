import express from 'express';

const globalRouter = express.Router();

globalRouter('/', (req: express.Request, res: express.Response) => {
  res.json({});
});

export default globalRouter;
