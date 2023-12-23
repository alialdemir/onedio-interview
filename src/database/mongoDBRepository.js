const mongoose = require('mongoose');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// MongoDB connection URI
const mongoDbURL = process.env.MONGODB_URL;

// Create Mongoose connection
mongoose.connect(mongoDbURL);

// Check the database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('\nConnected to MongoDB');
});

module.exports = {
    db
};
