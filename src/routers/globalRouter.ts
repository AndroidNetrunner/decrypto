import express from 'express';

const globalRouter = express.Router();

globalRouter.get('/', (req: express.Request, res: express.Response) => {});

export default globalRouter;
