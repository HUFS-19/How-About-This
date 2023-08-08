import express from 'express';
import multer from 'multer';

import { jwtAuth } from '../controllers/jwtAuth';
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
    //파일명: 유저명
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
// profileRouter.get('/:userId', getProfileInfo);

profileRouter.get('/:userId', jwtAuth, getProfileInfo);

profileRouter.put('/update/:userId', updateProfileInfo);

profileRouter.put(
  '/update/userIcon/:userId',
  upload.single('userIcon'),
  updateUserIcon,
);

export default profileRouter;
