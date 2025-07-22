
const mongoose = require('mongoose');

const TarotReadingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('TarotReading', TarotReadingSchema);
