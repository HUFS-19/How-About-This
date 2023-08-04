import express from 'express';
import db from '../db';
import jwt from 'jsonwebtoken';

import { jwtAuth } from '../controllers/jwtAuth';
import {
  postLogin,
  getLogout,
  postJoin,
  postIdCheck,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/login', postLogin);
userRouter.get('/logout', jwtAuth, getLogout);
userRouter.post('/join', postJoin);
userRouter.post('/join/idCheck', postIdCheck);

export default userRouter;
