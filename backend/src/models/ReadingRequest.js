
const mongoose = require('mongoose');

const ReadingRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tarotReading: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TarotReading',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  readingDetails: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('ReadingRequest', ReadingRequestSchema);
