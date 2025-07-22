const TarotReading = require('../models/TarotReading');
const ReadingRequest = require('../models/ReadingRequest');
const tarotDeck = require('../data/tarotDeck');

// Helper function to draw a random card
const drawCard = () => {
  const randomIndex = Math.floor(Math.random() * tarotDeck.length);
  const card = tarotDeck[randomIndex];
  const isReversed = Math.random() < 0.5; // 50% chance of being reversed
  return { ...card, orientation: isReversed ? 'reversed' : 'upright' };
};

// Helper function to generate a reading based on spread type
const generateReading = (spreadType) => {
  let cards = [];
  let numCards = 0;

  switch (spreadType) {
    case 'Three Card Spread':
      numCards = 3;
      break;
    case 'Celtic Cross':
      numCards = 10;
      break;
    case 'Past-Present-Future':
      numCards = 3;
      break;
    default:
      numCards = 1; // Default to a single card if spread type is unknown
  }

  for (let i = 0; i < numCards; i++) {
    cards.push(drawCard());
  }
  return cards;
};

exports.getReadings = async (req, res) => {
  try {
    const readings = await TarotReading.find();
    res.json(readings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.requestReading = async (req, res) => {
  const { readingId } = req.body;

  try {
    const selectedReadingType = await TarotReading.findById(readingId);
    if (!selectedReadingType) {
      return res.status(404).json({ msg: 'Tarot reading type not found' });
    }

    const readingDetails = generateReading(selectedReadingType.name);

    const newRequest = new ReadingRequest({
      user: req.user.id,
      tarotReading: readingId,
      readingDetails: readingDetails,
    });

    const request = await newRequest.save();
    res.json({ msg: 'Reading requested successfully!', reading: readingDetails });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getReadingHistory = async (req, res) => {
  try {
    const history = await ReadingRequest.find({ user: req.user.id }).populate('tarotReading');
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteReadingRequest = async (req, res) => {
  try {
    const request = await ReadingRequest.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!request) {
      return res.status(404).json({ msg: 'Reading request not found or user not authorized' });
    }

    res.json({ msg: 'Reading request removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
