const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config()

const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection function
const connection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Error connecting to MongoDB", error)
  }
};


module.exports = connection