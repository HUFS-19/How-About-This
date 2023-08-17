import express from 'express';

import {
  getProduct,
  postProduct,
  deleteProduct,
  putProduct,
  getTags,
  postTags,
  putTags,
  getImgs,
  postImgs,
  putImgs,
  getUserProducts,
  getLikeProduct,
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
productRouters
  .route('/:id')
  .get(jwtAuth, getProduct)
  .delete(jwtAuth, deleteProduct)
  .put(jwtAuth, putProduct);
productRouters
  .route('/:id/tags')
  .get(getTags)
  .post(jwtAuth, postTags)
  .put(jwtAuth, putTags);
productRouters
  .route('/:id/imgs')
  .get(getImgs)
  .post(uploadProductImage.array('image'), jwtAuth, postImgs)
  .put(uploadProductImage.array('image'), jwtAuth, putImgs);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
