const router = require('express').Router();
const budgetController = require('../controllers/budget.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, budgetController.getBudgetForMonth);

module.exports = router;