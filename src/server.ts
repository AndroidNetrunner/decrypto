import express, { urlencoded } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routers/apiRouter';
import './env';

const app = express();
const logger = morgan('dev');

app.use(logger);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);

export default app;
