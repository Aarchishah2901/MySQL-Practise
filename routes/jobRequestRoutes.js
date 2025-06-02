const express = require('express');
const router = express.Router();
const jobRequestController = require('../controllers/jobRequestController');

router.post('/', jobRequestController.createJobRequest);
router.get('/', jobRequestController.getAllJobRequests);
router.get('/:id', jobRequestController.getJobRequestById);
router.put('/:id/status', jobRequestController.updateJobRequestStatus);
router.delete('/:id', jobRequestController.deleteJobRequest);

module.exports = router;