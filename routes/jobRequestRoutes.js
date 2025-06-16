// const express = require('express');
// const router = express.Router();
// const jobRequestController = require('../controllers/jobRequestController');

// router.post('/', jobRequestController.createJobRequest);
// router.get('/', jobRequestController.getAllJobRequests);
// router.get('/:id', jobRequestController.getJobRequestById);
// router.post('/:id/status', jobRequestController.updateJobRequestStatus);
// router.delete('/:id', jobRequestController.deleteJobRequest);

// module.exports = router;

const express = require('express');
const router = express.Router();
const jobRequestController = require('../controllers/jobRequestController');

//HR gets all job applications
router.get('/', jobRequestController.getAllJobRequests);

//HR gets a single application by ID
router.get('/:id', jobRequestController.getJobRequestById);

//HR posts selection or rejection with message
router.post('/:id/status', jobRequestController.postJobRequestStatus);

module.exports = router;