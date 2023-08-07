import express from 'express';

import { getCategory, getCategories } from '../controllers/categoryControllers';

const categoryRouter = express.Router();

categoryRouter.get('/all', getCategories);
categoryRouter.get('/:id', getCategory);

export default categoryRouter;
