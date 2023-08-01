import express from 'express';

import { getProfileInfo } from '../controllers/profileController';

const profileRouter = express.Router();

profileRouter.get('/:id', getProfileInfo);

export default profileRouter;
