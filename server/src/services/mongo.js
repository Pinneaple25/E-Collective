require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => console.log('MongoDB connection is ready!'));

mongoose.connection.on('error', console.error);

const mongoConnect = async() => await mongoose.connect(MONGO_URL);

const mongoDisconnect = async() => await mongoose.disconnect();

module.exports = {
  mongoConnect,
  mongoDisconnect,
}