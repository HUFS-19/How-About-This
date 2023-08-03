import express from 'express';

import {
  getProducts,
  getProduct,
  getCategory,
  getTags,
<<<<<<< HEAD
  getImgs,
=======
  getUserProducts,
>>>>>>> f8b4d179037ca68e2b48bb38e5840e6c9a357a48
} from '../controllers/productControllers';

const productRouters = express.Router();

productRouters.get('/all', getProducts);
productRouters.get('/:id', getProduct);
productRouters.get('/:id/tags', getTags);
productRouters.get('/:id/imgs', getImgs);
productRouters.get('/category/:id', getCategory);
productRouters.get('/user/:userId', getUserProducts);

export default productRouters;
