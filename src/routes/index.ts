import express from 'express';
import auth from './auth/auth.router';
import gameRouter from './game/game.router';

const router = express.Router();

// router.use('/auth', auth);

// TODO: url 접근시 socket room 안 정보 확인 후 보내주기
router.use('/game', gameRouter);

export default router;
