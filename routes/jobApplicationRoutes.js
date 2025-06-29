const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');

router.post('/', jobApplicationController.createJobApplication);
router.get('/', jobApplicationController.getAllJobApplications);
router.get('/by-email', jobApplicationController.getJobApplicationsByEmail);
router.put('/:id', jobApplicationController.updateJobApplication);
router.delete('/:id', jobApplicationController.deleteJobApplication);

module.exports = router;