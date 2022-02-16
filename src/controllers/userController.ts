import express from 'express';

export const login = (req: express.Request, res: express.Response) => {
  const { loginId, loginPassword } = req.body;
  console.log(loginId, loginPassword);
};
export const logout = () => {};
