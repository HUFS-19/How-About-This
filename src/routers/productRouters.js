import express from 'express';

import {
  getProducts,
  getProduct,
  getProductInCategory,
  getTags,
  postTags,
  getImgs,
  postImgs,
  getUserProducts,
  getLikeProduct,
  postProduct,
} from '../controllers/productControllers';
import { jwtAuth } from '../controllers/jwtAuth';
import { postSearch } from '../controllers/searchControllers';
import uploadProductImage from '../middlewares/uploadProductImage';

const productRouters = express.Router();

productRouters.post('/search', postSearch);
productRouters.get('/all', getProducts);
productRouters.get('/like', jwtAuth, getLikeProduct);
productRouters.post('/new', jwtAuth, postProduct);
productRouters.get('/:id', getProduct);
productRouters.get('/:id/tags', getTags);
productRouters.get('/:id/imgs', getImgs);
productRouters.post(
  '/:prodNAME/imgs',
  uploadProductImage.array('image'),
  jwtAuth,
  postImgs,
);
productRouters.post('/:prodNAME/tags', postTags);
productRouters.get('/category/:cateId', getProductInCategory);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
