import db from '../db';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const postLogin = (req, res) => {
  const { id, password } = req.body;
  db.query(
    `select password, salt from user where userID='${id}'`,
    (err, results) => {
      try {
        crypto.pbkdf2(
          password,
          results[0].salt,
          123,
          64,
          'sha512',

          async (err, key) => {
            if (err) throw err;
            const hashedPassword = key.toString('base64');
            if (hashedPassword === results[0].password) {
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
          },
        );
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

export const postJoin = async (req, res) => {
  const { id, password } = req.body;

  const salt = crypto.randomBytes(64).toString('base64');

  crypto.pbkdf2(password, salt, 123, 64, 'sha512', async (err, key) => {
    if (err) throw err;
    const hashedPassword = key.toString('base64');
    const sql = 'INSERT INTO user (userID, password, salt) VALUES (?,?,?)';
    const params = [id, hashedPassword, salt];
    await db.query(sql, params);
    return res.send({ success: true });
  });
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
      `select userIcon, nickname from UserInfo where userID='${req.user.id}'`,
      (err, results) => {
        let userIcon = '';
        if (results[0].userIcon === 'src/profile/default.jpg') {
          userIcon = `http://localhost:5000/${results[0].userIcon}`;
        } else {
          userIcon = `http://localhost:5000/${results[0].userIcon}/${req.user.id}.jpg`;
        }
        try {
          return res.send({
            login: true,
            id: req.user.id,
            icon: userIcon,
            nickname: results[0].nickname,
          });
        } catch (err) {
          return res.send({ login: false, msg: err });
        }
      },
    );
  }
};

export const checkLoginState = (req, res) => {
  if (req.user) {
    res.send({ login: true, userId: req.user.id });
  } else res.send({ login: false });
};

export const getChatRoomList = (req, res) => {
  const { userId } = req.params;

  db.query(
    `select * from chatroom where userID = '${userId}'`,
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
      }
      return res.send(results);
    },
  );
};
