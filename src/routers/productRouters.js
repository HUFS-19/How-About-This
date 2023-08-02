import express from 'express';

import {
  getProducts,
  getProduct,
  getCategory,
  getTags,
  getUserProducts,
} from '../controllers/productControllers';

const productRouters = express.Router();

productRouters.get('/all', getProducts);
productRouters.get('/:id', getProduct);
productRouters.get('/:id/tags', getTags);
productRouters.get('/category/:id', getCategory);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
