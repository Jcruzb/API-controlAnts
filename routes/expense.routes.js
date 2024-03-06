const router = require('express').Router();
const expenseController = require('../controllers/expense.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, expenseController.createExpense);
router.get('/', authMiddleware.isAuthenticated, expenseController.getExpenses);
router.get('/:id', authMiddleware.isAuthenticated, expenseController.getExpense);
router.put('/:id', authMiddleware.isAuthenticated, expenseController.editExpense);
router.delete('/:id', authMiddleware.isAuthenticated, expenseController.deleteExpense);

module.exports = router;