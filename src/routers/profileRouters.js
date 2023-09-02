import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import path from 'path';

import { jwtAuth } from '../controllers/jwtAuth';
import {
  getProfileInfo,
  updateProfileInfo,
  updateUserIcon,
  deleteSns,
} from '../controllers/profileController';
import { uploadUserLocal } from '../middlewares/localUploadImg';
import { uploadUserIconS3 } from '../middlewares/s3';

const profileRouter = express.Router();

let uploadUserIcon = undefined;
if (process.env.NODE_ENV === 'prod') {
  uploadUserIcon = uploadUserIconS3;
} else {
  uploadUserIcon = uploadUserLocal;
}

profileRouter.get('/:userId', jwtAuth, getProfileInfo);
profileRouter.put('/update/:userId', updateProfileInfo);
profileRouter.put(
  '/update/userIcon/:userId',
  uploadUserIcon.single('userIcon'),
  updateUserIcon,
);
profileRouter.delete('/deleteSns/:userId', deleteSns);

export default profileRouter;
