const router = require('express').Router();
const incomeController = require('../controllers/income.controller')
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, incomeController.createIncome);
router.get('/', authMiddleware.isAuthenticated, incomeController.getIncomes);
router.get('/by-ids', authMiddleware.isAuthenticated, incomeController.getIncomesByIds);
router.get('/:id', authMiddleware.isAuthenticated, incomeController.getIncome);
router.put('/:id', authMiddleware.isAuthenticated, incomeController.editIncome);
router.delete('/:id', authMiddleware.isAuthenticated, incomeController.deleteIncome);

module.exports = router;