import db from '../db';
import mysql from 'mysql';

export const getProfileInfo = (req, res) => {
  const userId = req.params.userId;

  let login = { isLogin: false, id: '' };
  if (req.user) {
    login.isLogin = true;
    login.id = req.user.id;
  }

  let profileSql = 'select * from userinfo where userID = ? ; ';
  profileSql = mysql.format(profileSql, userId);

  let snsSql =
    'select snsTYPE, snsLINK from snsinfo where userID = ? order by snsTYPE;';
  snsSql = mysql.format(snsSql, userId);

  db.query(profileSql + snsSql, (err, results) => {
    if (err) {
      console.log(err);
    }
    try {
      let sns = results[1];
      let profile = results[0][0];
      //sns 객체 가공
      sns = sns.map((data) => {
        return Object.values(data);
      });
      sns = Object.fromEntries(sns);

      //userIcon url 가공
      let userIcon = '';
      if (profile.userIcon === 'src/profile/default.jpg') {
        userIcon = `http://localhost:5000/${profile.userIcon}`;
      } else {
        userIcon = `http://localhost:5000/${profile.userIcon}/${userId}.jpg`;
      }
      profile.userIcon = userIcon;

      res.send({ profileData: profile, snsList: sns, loginState: login });
    } catch (err) {
      console.log(err);
    }
  });
};

export const updateProfileInfo = (req, res) => {
  const userId = req.params.id;
  const profileData = req.body.inputs;
  const snsData = req.body.sns;

  let profileSql =
    'update userInfo set nickname=?, introduce=? where userID = ?;';
  profileSql = mysql.format(profileSql, [
    profileData.nickname,
    profileData.introduce,
    userId,
  ]);

  let snsSql = '';
  Object.keys(snsData).map((snsType) => {
    let updateSql = `insert into usersns(userID, snsID, snsLINK) select ?, snsID, ? from snstype where snstype=?
        on duplicate key update snsLINK = ?;`;
    updateSql = mysql.format(updateSql, [
      userId,
      snsData[snsType],
      snsType,
      snsData[snsType],
    ]);
    snsSql += updateSql;
  });

  db.query(profileSql + snsSql, (error, results) => {
    if (err) {
      console.log(err);
    }
    try {
      res.send({ success: true });
    } catch (err) {
      console.log(err);
    }
  });
};

export const updateUserIcon = (req, res) => {
  console.log(req.file);
  const userId = req.params.userId;

  let userIconSql = `update userInfo set userIcon = 'src/userIcon' where userID = ?;`;
  userIconSql = mysql.format(userIconSql, userId);
  console.log(userIconSql);

  db.query(userIconSql, (error, results) => {
    if (err) {
      console.log(err);
    }
    try {
      res.send({ success: true });
    } catch (err) {
      console.log(err);
    }
  });
};
