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
  getChatRoom,
  postChatRoom,
} from '../controllers/productControllers';
import { jwtAuth } from '../controllers/jwtAuth';
import { postSearch } from '../controllers/searchControllers';
import { postProductList } from '../controllers/productListControllers';
import {
  addLike,
  deleteLike,
  getLikeState,
} from '../controllers/likeControllers';
import { uploadProdImgLocal } from '../middlewares/localUploadImg';
import { uploadProdImgS3 } from '../middlewares/s3';
let uploadProductImage = undefined;
if (process.env.NODE_ENV === 'prod') {
  uploadProductImage = uploadProdImgS3;
} else {
  uploadProductImage = uploadProdImgLocal;
}

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
productRouters.get('/:id/likeCheck', jwtAuth, getLikeState);
productRouters
  .route('/:id/like')
  .get(jwtAuth, addLike)
  .delete(jwtAuth, deleteLike);
productRouters
  .route('/:prodId/chat/:inquirerId')
  .get(getChatRoom)
  .post(postChatRoom);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
