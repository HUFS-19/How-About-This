import express from 'express';

import {
  getProducts,
  getProduct,
  getProductInCategory,
  getTags,
  getImgs,
  getUserProducts,
  getLikeProduct,
  postUploadProduct,
  postUploadProductImage,
} from '../controllers/productControllers';
import { jwtAuth } from '../controllers/jwtAuth';
import { postSearch } from '../controllers/searchControllers';
import uploadProductImage from '../middlewares/uploadProductImage';

const productRouters = express.Router();

productRouters.post('/search', postSearch);
productRouters.get('/all', getProducts);
productRouters.get('/like', jwtAuth, getLikeProduct);
productRouters.post('/upload', jwtAuth, postUploadProduct);
productRouters.get('/:id', getProduct);
productRouters.get('/:id/tags', getTags);
productRouters.get('/:id/imgs', getImgs);
productRouters.post(
  '/:id/upload/image',
  uploadProductImage.array('image'),
  jwtAuth,
  postUploadProductImage,
);
productRouters.get('/category/:cateId', getProductInCategory);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
