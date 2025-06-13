const express = require('express');
const router = express.Router();
const selectionController = require('../controllers/selectionController');

router.post('/', selectionController.createSelection);
router.get('/', selectionController.getAllSelections);
router.get('/user/:userId', selectionController.getSelectionById);
router.put('/:id', selectionController.updateSelection);
router.delete('/:id', selectionController.deleteSelection);
// router.get('/user/:userId', selectionController.getUserSelectionStatus);

module.exports = router;