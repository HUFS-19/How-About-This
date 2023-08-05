import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    res.clearCookie('jwt');
    next();
  }
};
