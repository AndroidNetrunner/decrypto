import express from 'express';
import { login } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/login', login);

export default userRouter;
