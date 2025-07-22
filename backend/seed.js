
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const TarotReading = require('./src/models/TarotReading');
require('dotenv').config();

const readings = [
  { name: 'Celtic Cross' },
  { name: 'Three Card Spread' },
  { name: 'Past-Present-Future' },
];

const seedDB = async () => {
  await connectDB();
  await TarotReading.deleteMany({});
  await TarotReading.insertMany(readings);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();
