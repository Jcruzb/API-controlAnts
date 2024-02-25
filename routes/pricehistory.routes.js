const router = require('express').Router();
const pricehistoryController = require('../controllers/pricehistrory.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, pricehistoryController.createPriceHistory);
router.get('/', authMiddleware.isAuthenticated, pricehistoryController.getPriceHistories);
router.put('/:id', authMiddleware.isAuthenticated, pricehistoryController.editPriceHistory);
router.delete('/:id', authMiddleware.isAuthenticated, pricehistoryController.deletePriceHistory);

module.exports = router;