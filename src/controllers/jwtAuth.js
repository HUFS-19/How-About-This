import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log('로그인 인증 경로:', req.originalUrl);

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    res.clearCookie('jwt');
    next();
  }
};
