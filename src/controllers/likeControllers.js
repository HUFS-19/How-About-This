import db from '../db';

export const getLikeState = (req, res) => {
  if (!req.user) {
    return res.end();
  }
  db.query(
    `select l.likecount from userlike u, LikeList l where u.prodID = l.prodID and u.userID = '${req.user.id}' and l.prodID = '${req.params.id}'`,
    (error, results) => {
      try {
        if (results.length !== 0) {
          return res.send(results);
        }
        return res.send(false);
      } catch {
        console.log('likeState Error');
      }
    },
  );
};

export const addLike = (req, res) => {
  if (!req.user) {
    return res.end();
  }
  try {
    db.query(
      `select prodID, cateID from userlike where userID = '${req.user.id}' and prodID = '${req.params.id}'`,
      (error, result) => {
        if (result.length === 0) {
          db.query(`INSERT INTO UserLike (userID, prodID, cateID) 
					SELECT '${req.user.id}', ${req.params.id}, cateID 
					FROM product WHERE prodID = '${req.params.id}'`);
        }
      },
    );
    res.end();
  } catch {
    console.log('addLike ERROR');
  }
};

export const deleteLike = (req, res) => {
  if (!req.user) {
    return res.end();
  }
  try {
    db.query(
      `delete from UserLike where userID = '${req.user.id}' and prodID = '${req.params.id}'`,
    );
    res.end();
  } catch {
    console.log('deleteLike ERROR');
  }
};
