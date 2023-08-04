import express from 'express';

import {
  getProducts,
  getProduct,
  getCategory,
  getTags,
  getImgs,
  getUserProducts,
} from '../controllers/productControllers';

const productRouters = express.Router();

productRouters.get('/all', getProducts);
productRouters.get('/:id', getProduct);
productRouters.get('/:id/tags', getTags);
productRouters.get('/:id/imgs', getImgs);
productRouters.get('/category/:id', getCategory);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
