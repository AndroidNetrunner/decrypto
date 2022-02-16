import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import './env';

const app = express();
const logger = morgan('dev');

app.use(cors());
app.use(helmet());
app.use(logger);

export default app;
