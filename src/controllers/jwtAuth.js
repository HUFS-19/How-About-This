import jwt from 'jsonwebtoken';

export const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    res.clearCookie('jwt');
    console.log('jwt error');
    next();
  }
};
