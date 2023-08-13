import express from 'express';

import {
  getProduct,
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
import { postProductList } from '../controllers/productListControllers';

const productRouters = express.Router();

productRouters.post('/list', postProductList);
productRouters.post('/search', postSearch);
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
productRouters.post('/:prodNAME/tags', jwtAuth, postTags);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
