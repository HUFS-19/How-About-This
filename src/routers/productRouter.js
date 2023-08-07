import express from 'express';

import { jwtAuth } from '../controllers/jwtAuth';

import {
  getProducts,
  getProduct,
  getProductInCategory,
  getTags,
  getImgs,
  getUserProducts,
  getLikeProduct,
  postUpload,
} from '../controllers/productControllers';

const productRouter = express.Router();

productRouter.get('/all', getProducts);
productRouter.get('/like', getLikeProduct);
productRouter.post('/upload', jwtAuth, postUpload);
productRouter.get('/:id', getProduct);
productRouter.get('/category/:cateId', getProductInCategory);
productRouter.get('/:id/tags', getTags);
productRouter.get('/:id/imgs', getImgs);
productRouter.get('/user/:userId', getUserProducts);

export default productRouter;
