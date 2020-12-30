import { Router } from 'express';
const router: Router = Router();

import * as productController from '../controllers/products.controller';

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProductById);
router.delete('/:productId', productController.deleteProductById);

export default router;