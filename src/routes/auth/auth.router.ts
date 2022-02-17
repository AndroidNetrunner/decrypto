import express from 'express';
import { postLogin, postJoin } from '../../controllers/auth/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', postLogin);
authRouter.post('/join', postJoin);

export default authRouter;
