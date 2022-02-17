import express from 'express';
import { postLogin, postJoin } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/login', postLogin);
userRouter.post('/join', postJoin);

export default userRouter;
