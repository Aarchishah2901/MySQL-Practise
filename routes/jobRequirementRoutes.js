const express = require('express');
const router = express.Router();
const controller = require('../controllers/jobRequirementController');
const { authenticate, isHR } = require('../middleware/authMiddleware');

router.get('/', controller.getAllJobRequirements);
router.get('/:id', controller.getJobRequirementById);

router.post('/', authenticate, isHR, controller.createJobRequirement);
router.put('/:id', authenticate, isHR, controller.updateJobRequirement);
router.delete('/:id', authenticate, isHR, controller.deleteJobRequirement);

module.exports = router;