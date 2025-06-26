const express = require('express');
const router = express.Router();
const selectionController = require('../controllers/selectionController');

router.post('/', selectionController.createSelection);
router.get('/', selectionController.getAllSelections);
router.get('/selection/by-email', selectionController.getSelectionByEmail);
router.put('/selection/by-email', selectionController.updateSelectionByEmail);
router.delete('/:id', selectionController.deleteSelection);
// router.get('/user/:userId', selectionController.getUserSelectionStatus);

module.exports = router;