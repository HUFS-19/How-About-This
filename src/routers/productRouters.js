import express from 'express';

import {
  getProducts,
  getProduct,
  getProductInCategory,
  getTags,
  getImgs,
  getUserProducts,
  getLikeProduct,
} from '../controllers/productControllers';
import { jwtAuth } from '../controllers/jwtAuth';
import { postSearch } from '../controllers/searchControllers';

const productRouters = express.Router();

productRouters.post('/search', postSearch);
productRouters.get('/all', getProducts);
productRouters.get('/like', jwtAuth, getLikeProduct);
productRouters.get('/:id', getProduct);
productRouters.get('/category/:cateId', getProductInCategory);
productRouters.get('/:id/tags', getTags);
productRouters.get('/:id/imgs', getImgs);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
