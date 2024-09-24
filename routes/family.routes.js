const router = require('express').Router();
const familyController = require('../controllers/family.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:id/add/:familyMemberId', authMiddleware.isAuthenticated, familyController.addFamilyMember);
router.put('/:id/accept/:familyMemberId', authMiddleware.isAuthenticated, familyController.acceptFamilyInvitation);
router.put('/:id/reject/:familyMemberId', authMiddleware.isAuthenticated, familyController.rejectFamilyInvitation);
router.put('/id/block/:familyMemberId', authMiddleware.isAuthenticated, familyController.blockFamilyMember);
router.delete('/:id', authMiddleware.isAuthenticated, familyController.deleteFamilyMember);
router.get('/:id', authMiddleware.isAuthenticated, familyController.getFamilyMembers);

module.exports = router;