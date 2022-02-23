import express from 'express';
import { Store } from 'express-session';
import { postLogin, postJoin, oAuthGithub } from '../../controllers/auth/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', postLogin);
authRouter.post('/join', postJoin);
authRouter.get('/github', oAuthGithub);
authRouter.get('/signout', (req, res) => {
  req.session.destroy((error) => {
    if (error) res.status(400).json({ errors: '로그아웃에 실패했습니다.', info: error });
    return res.status(200).json({ message: 'successfully signed out' });
  });
});

export default authRouter;
