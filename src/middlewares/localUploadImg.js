import multer from 'multer';
import db from '../db';

const prodImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/img/');
  },
  filename: (req, file, cb) => {
    db.query('select COUNT(*) from prodimg', (error, results) => {
      cb(null, decodeURIComponent(file.originalname));
    });
  },
});

const userIconStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/userIcon/');
  },
  //파일명: 유저명
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploadProdImgLocal = multer({ storage: prodImgStorage });
export const uploadUserLocal = multer({ storage: userIconStorage });
