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
    console.log(results);

    res.send(results);
  });
};
