import express from 'express';

import {
  getProducts,
  getProduct,
  getCategory,
  getTags,
} from '../controllers/productControllers';

const productRouters = express.Router();

productRouters.get('/all', getProducts);
productRouters.get('/:id', getProduct);
productRouters.get('/:id/tags', getTags);
productRouters.get('/category/:id', getCategory);

export default productRouters;
