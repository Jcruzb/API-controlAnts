const router = require('express').Router();
const categoryController = require('../controllers/category.cotroller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, categoryController.createCategory);
router.get('/', authMiddleware.isAuthenticated, categoryController.getCategories);
router.get('/name', authMiddleware.isAuthenticated, categoryController.getcategoriesName);
router.get('/:id', authMiddleware.isAuthenticated, categoryController.getCategoryById);
router.put('/:id', authMiddleware.isAuthenticated, categoryController.editCategory);
router.delete('/:id', authMiddleware.isAuthenticated, categoryController.deleteCategory);

module.exports = router;