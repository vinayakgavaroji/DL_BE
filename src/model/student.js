const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const studentSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  rollNo: { type: Number, required: true, unique: true },
  issuedBooks: [
    {
      bookId: { type: String, required: true },
      bookName: { type: String, required: true },
      author: { type: String, required: true },
      issuedOn: { type: Date, default: Date.now },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
