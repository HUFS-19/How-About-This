import db from '../db';
import mysql from 'mysql';

export const getProfileInfo = (req, res) => {
  const userId = req.params.id;

  let profileSql = 'select * from userInfo where userID = ? ; ';
  profileSql = mysql.format(profileSql, userId);

  let snsSql =
    'select snsLINK, snsTYPE from snsInfo where userID = ? order by snsTYPE;';
  snsSql = mysql.format(snsSql, userId);

  db.query(profileSql + snsSql, (error, results) => {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.send(results);
  });
};
