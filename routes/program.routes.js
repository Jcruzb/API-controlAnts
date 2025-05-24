const router = require('express').Router()
const programController = require('../controllers/program.controller')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/family/:familyId/virtual', authMiddleware.isAuthenticated, programController.getVirtualProgramByDate);


module.exports = router