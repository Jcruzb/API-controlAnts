const router = require('express').Router()
const programController = require('../controllers/program.controller')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/programs', authMiddleware.isAuthenticated, programController.createProgram)
router.get('/programs/:familyId', authMiddleware.isAuthenticated, programController.getPrograms)
router.get('/program/:id', authMiddleware.isAuthenticated, programController.getProgram)
router.patch('/program/:id', authMiddleware.isAuthenticated, programController.editProgram)
router.delete('/program/:id', authMiddleware.isAuthenticated, programController.deleteProgram)
router.post('/program/family/date', authMiddleware.isAuthenticated, programController.getProgramByDate);

module.exports = router