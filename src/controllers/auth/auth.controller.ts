import express from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/User';

export const postLogin = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ errors: { message: 'Can not find user' } });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ errors: { message: 'Login Failed check your password' } });
  }
  console.log(`💕 Log-In : ${user.email} 💕`);
  req.session.loggedIn = true;
  req.session.user = user;

  return res.status(200).json({ isLoggedIn: true });
};

export const postJoin = async (req: express.Request, res: express.Response) => {
  const { email, password, nickname } = req.body;

  const userEmailExist = await User.exists({ email });
  if (userEmailExist) {
    return res.status(400).json({ errors: { message: 'Email already in use' } });
  }
  try {
    await User.create({
      email,
      password,
      nickname: nickname ?? '감자',
    });
  } catch (error) {
    return res.status(400).send(error);
  }
  return res.status(201).send('잘 생성됐다!');
};
