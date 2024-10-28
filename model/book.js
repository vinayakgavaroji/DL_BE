const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  isbn: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  publication: { type: String, required: true },
  details: { type: String },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  branch: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;