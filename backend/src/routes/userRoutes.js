
const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);
router.delete('/', auth, deleteUser);

module.exports = router;
