const router = require('express').Router();
const storeModelController = require('../controllers/store.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, storeModelController.createStore);
router.get('/', authMiddleware.isAuthenticated, storeModelController.getStores);
router.put('/:id', authMiddleware.isAuthenticated, storeModelController.editStore);
router.delete('/:id', authMiddleware.isAuthenticated, storeModelController.deleteStore);

module.exports = router;