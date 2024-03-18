import express from 'express';
import {
  checkUser,
  changePassword,
} from '../controllers/changePasswordController';
import { jwtAuth } from '../controllers/jwtAuth';

const profileRouter = express.Router();

profileRouter.get('/checkUser/:userId', jwtAuth, checkUser);

profileRouter.put('/:userId', changePassword);

export default profileRouter;
