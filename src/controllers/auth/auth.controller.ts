/*
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import axios from 'axios';
import User from '../../models/User';

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, socialOnly: false });
  if (!user) {
    return res.status(400).json({ errors: { message: 'Can not find user' } });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ errors: { message: 'Login Failed, Check your password' } });
  }
  console.log(`💕 Log-In : ${user.email} 💕`);
  req.session.loggedIn = true;
  req.session.user = user;

  // TODO: 유저에 관한 정보를 넘겨준다. (프론트엔드에서 state 로 관리할 예정, 비밀번호와 같은 민감한 정보 ❌)
  return res.status(200).json({ isLoggedIn: true });
};

export const postJoin = async (req: Request, res: Response) => {
  const { email, password, nickname }: { email: string; password: string; nickname: string } =
    req.body;

  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  if (email.match(regEmail) === null) {
    return res.status(400).json({
      errors: {
        message: '이메일의 형식이 올바르지 않습니다.',
      },
    });
  }
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
    return res.status(201).json({
      message: '회원가입을 성공했습니다!',
    });
  } catch (error) {
    return res.status(400).json({
      errors: {
        message: '생성에 실패하였습니다.',
      },
    });
  }
};

export const oAuthGithub = async (req: Request, res: Response) => {
  const {
    query: { code },
  } = req;
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://github.com/login/oauth/access_token',
      data: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: ' application/json',
      },
    });
    if ('access_token' in response.data) {
      const baseUrl = 'https://api.github.com';
      const {
        data: { access_token },
      } = response;
      const userData = await axios({
        method: 'GET',
        url: `${baseUrl}/user`,
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
      const emailData = await axios({
        method: 'GET',
        url: `${baseUrl}/user/emails`,
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
      const emailObj = emailData.data.find(
        (email: { primary: boolean; verified: boolean }) =>
          email.primary === true && email.verified === true
      );
      if (!emailObj) {
        return res.status(400).json({ statusCode: 400, message: '살려줘' });
      }
      let user = await User.findOne({ email: emailObj.email });
      if (!user) {
        user = await User.create({
          email: emailObj.email,
          socialOnly: true,
          password: '',
          nickname: userData.data.name,
          avatarUrl: userData.data.avatar_url,
        });
      }
      req.session.loggedIn = true;
      req.session.user = user;
      req.session.gitHubToken = access_token;

      // TODO: 유저에 관한 정보를 넘겨준다. (프론트엔드에서 state 로 관리할 예정, 비밀번호와 같은 민감한 정보 ❌)
      return res.status(200).json({ message: 'github oAuth 인증 성공!', data: { access_token } });
    }
    return res.status(400).json({ statusCode: 400, message: response.data.error });
  } catch (error) {
    return console.log(error);
  }
};
*/
