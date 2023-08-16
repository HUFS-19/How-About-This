import db from '../db';

export const getProduct = (req, res) => {
  db.query(
    `select * from product where prodID=${req.params.id}`,
    (error, results) => {
      if (error) {
        console.log(error);
      }

      results.push({ isUploader: req.user.id === results[0].userID });
      res.send(results);
    },
  );
};

export const deleteProduct = (req, res) => {
  if (!req.user) {
    return;
  }

  const prodId = req.params.id;

  db.query(`delete from product where prodID='${prodId}'`, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send(results);
  });
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

export const postProduct = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const { cateID, prodNAME, detail, link } = req.body;

  db.query(
    `insert into product (userID, cateID, prodNAME, detail, link, Mimg) values ('${req.user.id}', '${cateID}', '${prodNAME}', '${detail}', '${link}', 'src\mimg');`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
      }
      return res.send([results.insertId]);
    },
  );
};

export const postImgs = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const prodId = req.params.id;

  req.files.forEach((file) => {
    const imgID = file.filename.slice(0, 2);
    db.query(
      `insert into prodimg (imgID, prodID, img, imgOrder) values ('${imgID}', '${prodId}', 'src\img', '${parseInt(
        file.originalname,
      )}');`,
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Internal Server Error');
        }
      },
    );
  });

  return res.send('이미지 잘 전송!');
};

export const postTags = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const prodId = req.params.id;
  console.log(prodId);
  const tags = req.body.tags;

  tags.forEach((tag) => {
    db.query(
      `insert into tag (prodID, tagNAME) values ('${prodId}', '${tag}');`,
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Internal Server Error');
        }
      },
    );
  });

  return res.send('태그 잘 전송!');
};
