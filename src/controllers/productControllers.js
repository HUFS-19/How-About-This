import db from '../db';

export const getProducts = (req, res) => {
  db.query('select * from product', function (error, results) {
    if (error) {
      console.log(error);
    }
    res.send(results);
  });
};

export const getProduct = (req, res) => {
  db.query(
    `select * from product where prodID=${req.params.id}`,
    function (error, results) {
      if (error) {
        console.log(error);
      }
      res.send(results);
    }
  );
};
