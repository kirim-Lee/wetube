import express from 'express';

export const userRouter = express.Router();

userRouter.get('/', (_req, res) => res.send('user Index'));
userRouter.get('/edit', (_req, res) => res.send('user edit'));
userRouter.get('/password', (_req, res) => res.send('user password'));