import express from 'express';
import auth from './auth/auth.router';

const router = express.Router();

router.use('/auth', auth);

export default router;
