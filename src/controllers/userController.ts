import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const postLogin = async (req: express.Request, res: express.Response) => {
  const { email, password, nickname } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('유저가 없는데?,,');
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).send('비밀번호가 틀렸어!');
  }
  console.log(`💕 Log-In : ${user.email} 💕`);
  return res.json({ email, password });
};

export const postJoin = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  const userEmailExist = await User.exists({ email });
  if (userEmailExist) {
    // TODO 이메일 중복시 에러처리 필요
    console.log('이미 가입된 이메일이야!');
    return res.status(400).send('이미 있는 이메일이야!');
  }
  try {
    const createdUserData = await User.create({
      email,
      password,
      nickname: '감자',
    });
    console.log(createdUserData);
    return res.status(200).send('잘 생성됐다!');
  } catch (error) {
    res.status(400).send(error);
  }
};
