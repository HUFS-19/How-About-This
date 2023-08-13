import db from '../db';

export const postProductList = (req, res) => {
  const { category, sort } = req.body;
  let cateSql = '';
  let sortSql = '';

  if (category === 0) {
    cateSql = `select p.prodID, p.prodNAME, l.likecount from product p left outer join likelist l on p.prodID = l.prodID`;
  } else {
    cateSql = `select p.prodID, p.prodNAME, l.likecount from product p left outer join likelist l on p.prodID = l.prodID where cateID=${category}`;
  }

  if (sort === 'like') {
    sortSql = ` order by likeCount desc`;
  } else if (sort === 'new') {
    sortSql = ` order by date`;
  } else {
    sortSql = ` order by date asc`;
  }

  console.log(cateSql + sortSql);
  db.query(cateSql + sortSql, (err, results) => {
    try {
      res.send(results);
    } catch (err) {
      console.log('postProductList ERROR');
      return res.send();
    }
  });
};
