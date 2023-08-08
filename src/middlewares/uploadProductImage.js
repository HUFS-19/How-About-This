import multer from 'multer';
import db from '../db';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/img/');
  },
  filename: (req, file, cb) => {
    db.query('select COUNT(*) from prodimg', (error, results) => {
      cb(
        null,
        `${String(
          parseInt(results[0]['COUNT(*)']) + parseInt(file.originalname),
        )}.jpg`,
      );
    });
  },
});

const uploadProductImage = multer({ storage: storage });

export default uploadProductImage;
