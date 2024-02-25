const router = require('express').Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, productController.createProduct);
router.get('/', authMiddleware.isAuthenticated, productController.getProducts);
router.put('/:id', authMiddleware.isAuthenticated, productController.editProduct);
router.delete('/:id', authMiddleware.isAuthenticated, productController.deleteProduct);

module.exports = router;