import express from 'express';
import db from '../db';
import jwt from 'jsonwebtoken';

import { cookieJwtAuth } from '../controllers/jwtAuth';

const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
  const { id, password } = req.body;
  db.query(
    `select * from user where userID='${id}' and password='${password}'`,
    (err, results) => {
      try {
        if (results.length === 1) {
          const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m',
          });
          res.cookie('jwt', token);
          return res.send({ login: true });
        } else {
          return res.send({ login: false });
        }
      } catch (err) {
        return res.send({ login: false });
      }
    },
  );
});

userRouter.post('/logout', cookieJwtAuth, (req, res) => {
  if (!req.user) {
    console.log('로그인 상태가 아닙니다.');
  } else {
    res.clearCookie('jwt');
    console.log('로그아웃.');
  }
  res.end();
});

export default userRouter;
