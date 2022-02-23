import { Request, Response } from 'express';
import Game from '../../models/Game';
import User from '../../models/User';

export const getGameInfo = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { uid } = req.query;
  try {
    const userInfo = await User.findOne({ uid });
    const gameInfo = await Game.findOne({ roomId })
      .populate({ path: 'team.redTeam.users' })
      .populate({ path: 'team.blueTeam.users' });
    return res.status(200).json({ gameInfo, userInfo });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '뭔가 문제 있음' });
  }
};

export const getGame = (req: Request, res: Response) => {};
