const router = require('express').Router();
const purchaseController = require('../controllers/purchase.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, purchaseController.createPurchase);
router.get('/', authMiddleware.isAuthenticated, purchaseController.getPurchases);
router.get('/:id', authMiddleware.isAuthenticated, purchaseController.getPurchase);
router.put('/:id', authMiddleware.isAuthenticated, purchaseController.editPurchase);
router.delete('/:id', authMiddleware.isAuthenticated, purchaseController.deletePurchase);

module.exports = router;