import express from 'express';
import { getGameInfo } from '../../controllers/game/game.controller';

const gameRouter = express.Router();

gameRouter.get('/:roomId', getGameInfo);

export default gameRouter;
