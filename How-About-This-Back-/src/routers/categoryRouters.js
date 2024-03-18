import express from 'express';

import { getCategory, getCategories } from '../controllers/categoryControllers';

const categoryRouters = express.Router();

categoryRouters.get('/all', getCategories);
categoryRouters.get('/:id', getCategory);

export default categoryRouters;
