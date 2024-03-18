import db from '../db';

export const getComments = (req, res) => {
  let user = false;
  if (req.user) {
    user = req.user;
  }

  db.query(
    `select commentID, userID, prodID, content, date_format(date, '%Y-%m-%d %h:%i:%s') as date, userIcon, nickname from commentList where prodID = ${req.params.id}`,
    (error, results) => {
      try {
        res.send({ comments: results, user: user });
      } catch {
        console.log('getComments ERROR');
      }
    },
  );
};

export const postComment = (req, res) => {
  const { userID, content } = req.body;
  const prodID = req.params.id;
  db.query(
    `insert into Comment(userID, prodID, content) values ('${userID}', ${prodID}, '${content}')`,
  );
  res.end();
};

export const deleteComment = (req, res) => {
  db.query(`delete from comment where commentID = ${req.params.id}`);
  res.end();
};
