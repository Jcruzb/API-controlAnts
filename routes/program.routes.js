const router = require('express').Router()
const programController = require('../controllers/program.controller')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware.isAuthenticated, programController.createProgram)
router.get('/', authMiddleware.isAuthenticated, programController.getPrograms)
router.get('/:id', authMiddleware.isAuthenticated, programController.getProgram)
router.put('/:id', authMiddleware.isAuthenticated, programController.editProgram)
router.delete('/:id', authMiddleware.isAuthenticated, programController.deleteProgram)
router.get('/month/:month/year/:year', authMiddleware.isAuthenticated, programController.getProgramByDate)

module.exports = router


