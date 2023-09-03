import db from '../db';

const setImgUrl = (file) => {
  if (process.env.NODE_ENV === 'prod') {
    console.log('s3업로드-', file.location);
    return file.location;
  } else {
    return 'http://localhost:5000/' + file.destination + file.filename;
  }
};

export const getProduct = (req, res) => {
  db.query(
    `select * from product where prodID=${req.params.id}`,
    (error, results) => {
      if (error) {
        console.log(error);
      }

      if (req.user && req.user.id === results[0].userID) {
        results.push({ isUploader: true });
        return res.send(results);
      }

      results.push({ isUploader: false });
      return res.send(results);
    },
  );
};

export const postProduct = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const { cateID, prodNAME, detail, link } = req.body;

  db.query(
    `insert into product (userID, cateID, prodNAME, detail, link, Mimg) values ('${
      req.user.id
    }', '${cateID}', '${prodNAME}', '${detail}', '${decodeURIComponent(
      link,
    )}', 'src\mimg');`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
      }
      return res.send([results.insertId]);
    },
  );
};

export const putProduct = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const prodId = req.params.id;

  const { cateID, prodNAME, detail, link } = req.body;

  db.query(
    `update product set cateID=?, prodNAME=?, detail=?, link=? where prodID=${prodId}`,
    [cateID, prodNAME, detail, decodeURIComponent(link)],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
      }
    },
  );

  return res.send('제품 수정 성공');
};

export const deleteProduct = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const prodId = req.params.id;

  db.query(`delete from product where prodID='${prodId}'`, (error, results) => {
    if (error) {
      console.log(error);
    }
  });

  return res.send(`${prodId}번 제품 삭제`);
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

export const postImgs = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }
  const prodId = req.params.id;
  req.files.forEach((file, i) => {
    let imgPath = setImgUrl(file);

    db.query(
      `insert into prodimg (prodID, img, imgOrder) values ('${prodId}', '${imgPath}', '${
        i + 1
      }');`,
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

export const putImgs = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const prodId = req.params.id;

  // 기존 이미지 삭제
  db.query(`delete from prodImg where prodID='${prodId}'`, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  });

  // 새로운 이미지 추가
  req.files.forEach((file, i) => {
    let imgPath = setImgUrl(file);
    db.query(
      `insert into prodimg (prodID, img, imgOrder) values ('${prodId}', '${imgPath}', '${
        i + 1
      }');`,
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Internal Server Error');
        }
      },
    );
  });

  return res.send('이미지 수정 완료');
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

export const postTags = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const prodId = req.params.id;
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

export const putTags = (req, res) => {
  if (!req.user) {
    return res.status(500).send('No User');
  }

  const prodId = req.params.id;
  const tags = req.body.tags;

  // 기존 태그 삭제
  db.query(`delete from tag where prodID='${prodId}'`, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  });

  // 새로운 태그 추가
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

export const getChatRoom = (req, res) => {
  const { prodId, inquirerId } = req.params;

  db.query(
    `select * from chatroom where prodID='${prodId}' and inquirerID='${inquirerId}'`,
    (error, results) => {
      return res.send(results);
    },
  );
};

export const postChatRoom = (req, res) => {
  const { prodId, inquirerId } = req.params;

  db.query(
    `select userID, cateID from product where prodID = ${prodId}`,
    (error, results) => {
      const { userID, cateID } = results[0];
      db.query(
        `insert into chatroom (prodID, userID, cateID, inquirerID) values ('${prodId}', '${userID}', '${cateID}', '${inquirerId}');`,
        (error, results) => {
          return res.send([results.insertId]);
        },
      );
    },
  );
};
