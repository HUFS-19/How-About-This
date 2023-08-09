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
    },
  );
};

export const getProductInCategory = (req, res) => {
  db.query(
    `select * from product where cateID=${req.params.cateId}`,
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send(results);
    },
  );
};

export const getUserProducts = (req, res) => {
  db.query(
    `select * from product where userID='${req.params.userId}'`,
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send(results);
    },
  );
};

export const getTags = (req, res) => {
  db.query(
    `select * from tag where prodID=${req.params.id}`,
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send(results);
    },
  );
};

export const getImgs = (req, res) => {
  db.query(
    `select * from prodimg where prodID=${req.params.id}`,
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send(results);
    },
  );
};

export const getLikeProduct = (req, res) => {
  if (!req.user) {
    res.send({ alert: true });
  } else {
    db.query(
      `select p.* from Product p, UserLike u where u.userID = '${req.user.id}' and p.prodID = u.prodID`,
      (err, results) => {
        try {
          res.send(results);
        } catch (err) {
          console.log('LikeProduct error');
          res.send([]);
        }
      },
    );
  }
};

export const postUploadProduct = (req, res) => {
  if (!req.user) {
    res.status(500).send('No User');
    return;
  }

  const { cateID, prodNAME, detail, link } = req.body;

  db.query(
    `insert into product (userID, cateID, prodNAME, detail, link, Mimg) values ('${req.user.id}', '${cateID}', '${prodNAME}', '${detail}', '${link}', 'src\mimg');`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('굿!');
      }
    },
  );
};

export const postUploadProductImage = (req, res) => {
  // console.log('req.files:', req.files);
  // console.log('req.user: ', req.user);
  // console.log(typeof req.params.id);
  let prodNAME = decodeURIComponent(req.params.prodNAME);

  if (!req.user) {
    return res.status(500).send('No User');
  }

  db.query(
    `select * from product where prodNAME='${prodNAME}'`,
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        // 같은 이름의 제품인 경우는...?
        const prodID = results[0]['prodID'];

        req.files.forEach((file) => {
          let imgID = file.filename.slice(0, 2);
          db.query(
            `insert into prodimg (imgID, prodID, img, imgOrder) values ('${imgID}', '${prodID}', 'src\img', '${parseInt(
              file.originalname,
            )}');`,
            (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
              } else {
                res.send('goood!');
              }
            },
          );
        });
      }
    },
  );
};
