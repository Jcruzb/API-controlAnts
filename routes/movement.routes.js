const router = require('express').Router();
const movementController = require('../controllers/movement.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.isAuthenticated, movementController.createMovement);
router.get('/', authMiddleware.isAuthenticated, movementController.getMovements);
router.get('/:id', authMiddleware.isAuthenticated, movementController.getMovement);
router.put('/:id', authMiddleware.isAuthenticated, movementController.editMovement);
router.delete('/:id', authMiddleware.isAuthenticated, movementController.deleteMovement);

module.exports = router;