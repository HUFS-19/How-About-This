import multer from 'multer';
import db from '../db';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/img/');
  },
  filename: (req, file, cb) => {
    db.query('select COUNT(*) from prodimg', (error, results) => {
      cb(null, decodeURIComponent(file.originalname));
    });
  },
});

const uploadProductImage = multer({ storage: storage });

export default uploadProductImage;
