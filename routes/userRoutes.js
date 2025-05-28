// const express = require('express');
// const passport = require('passport');
// const router = express.Router();
// const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
// const authMiddleware = require('../middleware/authMiddleware');

// router.get('/', authMiddleware, getAllUsers);
// router.get('/:id', authMiddleware, getUserById);
// router.put('/:id', authMiddleware, updateUser);
// router.delete('/:id', authMiddleware, deleteUser);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;