import db from '../db';

export const getProducts = (req, res) => {
  db.query('select * from product', (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send(results);
  });
};

export const getProduct = (req, res) => {
  db.query(
    `select * from product where prodID=${req.params.id}`,
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send(results);
    }
  );
};
