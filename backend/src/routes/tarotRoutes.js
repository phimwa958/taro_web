
const express = require('express');
const router = express.Router();
const { getReadings, requestReading, getReadingHistory, deleteReadingRequest } = require('../controllers/tarotController');
const auth = require('../middleware/authMiddleware');

router.get('/', getReadings);
router.post('/request', auth, requestReading);
router.get('/history', auth, getReadingHistory);
router.delete('/history/:id', auth, deleteReadingRequest);

module.exports = router;
