import db from '../db';

export const getCategory = (req, res) => {
  db.query(
    `select * from category where cateID=${req.params.id}`,
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send(results);
    },
  );
};

export const getCategories = (req, res) => {
  db.query('select * from category', (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send(results);
  });
};
