import db from '../db';
import mysql from 'mysql';
import crypto from 'crypto';

export const checkUser = (req, res) => {
  const userId = req.params.userId;

  let loginState = { isLogin: false };
  if (req.user && req.user.id === userId) {
    loginState.isLogin = true;
  }

  res.send(loginState);
};

const verifyPassword = async (curPW, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(curPW, salt, 123, 64, 'sha512', (err, key) => {
      resolve(key.toString('base64'));
    });
  });
};

export const changePassword = (req, res) => {
  const userId = req.params.userId;
  const { curPW, newPW, newPWCheck } = req.body.inputs;

  let checkPwSql = `select password, salt from user where userID = ?`;
  checkPwSql = mysql.format(checkPwSql, userId);

  db.query(checkPwSql, (err, results) => {
    if (err) {
      console.log(err);
    }
    try {
      verifyPassword(curPW, results[0].salt).then((res2) => {
        if (res2 !== results[0].password) {
          return res.send({
            success: false,
            msg: '현재 비밀번호가 틀렸습니다.',
          });
        } else {
          //  비밀번호 변경
          if (newPW === newPWCheck) {
            const salt = crypto.randomBytes(64).toString('base64');

            crypto.pbkdf2(newPW, salt, 123, 64, 'sha512', async (err, key) => {
              if (err) console.log(err);
              const hashedPassword = key.toString('base64');

              let updatePwSql =
                'update user set password=?, salt=? where userID = ?;';
              updatePwSql = mysql.format(updatePwSql, [
                hashedPassword,
                salt,
                userId,
              ]);

              db.query(updatePwSql, (err, results) => {
                if (err) {
                  console.log(err);
                }
                return res.send({ success: true });
              });
            });
          } else res.send({ success: false, msg: '새 비밀번호가 다릅니다.' });
        }
      });
    } catch (err) {
      console.log(err);
      return res.send({ success: false, msg: err });
    }
  });
};
