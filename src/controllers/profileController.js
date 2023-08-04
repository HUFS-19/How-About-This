import db from '../db';
import mysql from 'mysql';

export const getProfileInfo = (req, res) => {
  const userId = req.params.id;

  let profileSql = 'select * from userinfo where userID = ? ; ';
  profileSql = mysql.format(profileSql, userId);

  let snsSql =
    'select snsTYPE, snsLINK from snsinfo where userID = ? order by snsTYPE;';
  snsSql = mysql.format(snsSql, userId);

  db.query(profileSql + snsSql, (error, results) => {
    if (error) {
      console.log(error);
    }
    const snsObj = results[1].map((data) => {
      return Object.values(data);
    });
    results[1] = Object.fromEntries(snsObj);
    console.log('getProfileInfo');
    res.send(results);
  });
};

export const updateProfileInfo = (req, res) => {
  const userId = req.params.id;
  const profileData = req.body.inputs;
  const snsData = req.body.snsList;

  console.log(profileData);
  console.log(snsData);

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
    if (error) {
      console.log(error);
      res.send({ success: false });
    }
    res.send({ success: true });
  });
};

export const updateUserIcon = (req, res) => {
  console.log(req.file);
  const userId = req.params.userId;

  let userIconSql = `update userInfo set userIcon = 'src/userIcon' where userID = ?;`;
  userIconSql = mysql.format(userIconSql, userId);
  console.log(userIconSql);

  db.query(userIconSql, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send({ success: true });
  });
};
