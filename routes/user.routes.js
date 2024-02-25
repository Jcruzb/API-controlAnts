const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.register);
router.post('/login', authController.login);
router.get('/', authMiddleware.isAuthenticated, userController.getUsers);
router.get('/me', authMiddleware.isAuthenticated, userController.me);
router.get('/:id/activate', userController.activate);
router.put('/:id', authMiddleware.isAuthenticated, userController.editUser);
router.delete('/:id', authMiddleware.isAuthenticated, userController.deleteUser);


module.exports = router;

