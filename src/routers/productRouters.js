import express from 'express';

import { getProducts, getProduct } from '../controllers/productControllers';

const productRouters = express.Router();

productRouters.get('/all', getProducts);
productRouters.get('/:id', getProduct);

export default productRouters;
