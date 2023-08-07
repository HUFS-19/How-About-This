import express from 'express';
import path from 'path';
import multer from 'multer';

import {
  getProfileInfo,
  updateProfileInfo,
  updateUserIcon,
} from '../controllers/profileController';

const profileRouter = express.Router();

//multer 사용
const upload = multer({
  //업로드 이미지 저장소 지정
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/userIcon/');
    },
    //파일명: 업로드 시간
    filename: function (req, file, cb) {
      cb(null, file.originalname);

      //   cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});
profileRouter.get('/:userId', getProfileInfo);

profileRouter.put('/update/:id', updateProfileInfo);

profileRouter.put(
  '/update/userIcon/:userId',
  upload.single('userIcon'),
  updateUserIcon,
);

export default profileRouter;
