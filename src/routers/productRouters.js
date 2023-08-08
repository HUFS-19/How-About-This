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
} from '../controllers/productControllers';
import { jwtAuth } from '../controllers/jwtAuth';
import { postSearch } from '../controllers/searchControllers';
import { upload } from '../middlewares/upload';

const productRouters = express.Router();

productRouters.post('/search', postSearch);
productRouters.get('/all', getProducts);
productRouters.get('/like', jwtAuth, getLikeProduct);
productRouters.get('/:id', getProduct);
productRouters.get('/category/:cateId', getProductInCategory);
productRouters.get('/:id/tags', getTags);
productRouters.get('/:id/imgs', getImgs);
productRouters.get('/user/:userId', getUserProducts);
productRouters.post('/upload', upload.single('image'), postUploadProduct);

export default productRouters;
