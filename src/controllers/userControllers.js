import express from 'express';
import db from '../db';
import jwt from 'jsonwebtoken';

import { cookieJwtAuth } from './jwtAuth';

export const postLogin = (req, res) => {
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
          return res.send({ success: true });
        } else {
          return res.send({
            success: false,
            msg: '아이디 또는 패스워드가 일치하지 않습니다.',
          });
        }
      } catch (err) {
        return res.send({ success: false, msg: err });
      }
    },
  );
};

export const getLogout = (req, res) => {
  if (!req.user) {
    console.log('로그인 상태가 아닙니다.');
  } else {
    res.clearCookie('jwt');
    console.log('로그아웃.');
  }
  res.end();
};

export const postJoin = (req, res) => {
  const { id, password } = req.body;
  db.query(
    `insert into User values ('${id}','${password}')`,
    (err, results) => {
      try {
        return res.send({ success: true });
      } catch (err) {
        return res.send({ success: false, msg: err });
      }
    },
  );
};

export const postIdCheck = (req, res) => {
  const { id } = req.body;
  db.query(`select * from user where userID='${id}'`, (err, results) => {
    try {
      if (results.length > 0) {
        return res.send({ success: false, msg: '이미 존재하는 아이디입니다.' });
      } else {
        return res.send({ success: true, msg: '사용가능한 아이디입니다.' });
      }
    } catch (err) {
      return res.send({ success: false, msg: error });
    }
  });
};

export const getNav = (req, res) => {
  if (!req.user) {
    return res.send({ login: false, msg: '로그인 상태 아님' });
  } else {
    db.query(
      `select userIcon from UserInfo where userID='${req.user.id}'`,
      (err, results) => {
        try {
          return res.send({
            login: true,
            id: req.user.id,
            icon: results[0].userIcon,
          });
        } catch (err) {
          return res.send({ login: false, msg: err });
        }
      },
    );
  }
};