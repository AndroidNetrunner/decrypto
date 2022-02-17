import express from 'express';

export const login = (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  res.json({ email, password });
};
export const logout = () => {};
