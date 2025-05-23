const express = require('express');
const router = express.Router();
const selectionController = require('../controllers/selectionController');

router.post('/', selectionController.createSelection);
router.get('/', selectionController.getAllSelections);
router.get('/:id', selectionController.getSelectionById);
router.put('/:id', selectionController.updateSelection);
router.delete('/:id', selectionController.deleteSelection);

module.exports = router;