const router = require('express').Router();
const debtController = require('../controllers/debtController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, debtController.createDebt);
router.get('/', authMiddleware.isAuthenticated, debtController.getDebts);
router.get('/:id', authMiddleware.isAuthenticated, debtController.getDebt);
router.put('/:id', authMiddleware.isAuthenticated, debtController.editDebt);
router.delete('/:id', authMiddleware.isAuthenticated, debtController.deleteDebt);

module.exports = router;