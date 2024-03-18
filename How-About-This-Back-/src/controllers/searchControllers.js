import db from '../db';

export const postSearch = (req, res) => {
  const { category, type, search } = req.body;
  let query = '';

  if (type === 'product') {
    if (category === 'all') {
      query = `select * from product where prodNAME like '%${search}%'`;
    } else {
      query = `select * from product where prodNAME like '%${search}%' and cateID = '${category}'`;
    }
  } else if (type === 'uploader') {
    if (category === 'all') {
      query = `select p.* from Product p, UserInfo u where u.nickname like '%${search}%' and p.userID = u.userID`;
    } else {
      query = `select p.* from Product p, UserInfo u where u.nickname like '%${search}%' and p.cateID = '${category}' and p.userID = u.userID`;
    }
  } else {
    if (category === 'all') {
      query = `select distinct p.* from Product p, Tag t where t.tagNAME like '%${search}%' and p.prodID = t.prodID`;
    } else {
      query = `select distinct p.* from Product p, Tag t where t.tagNAME like '%${search}%' and cateID = '${category}' and p.prodID = t.prodID`;
    }
  }

  db.query(query, (error, results) => {
    if (error) {
      console.log('search error');
    }
    res.send(results);
  });
};
