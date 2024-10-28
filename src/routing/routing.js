const express = require("express");
const routing = express.Router();
const service = require("../service/user");
const authService = require("../service/auth.service");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authMiddleware = require("../middleware/auth.middleware")
dotenv.config();

routing.post('/signup', async (req, res, next) => {
  try {
    const token = await authService.signup(req.body);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error)
  }
});

routing.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error)
  }
});

routing.post("/addBook", async (req, res, next) => {
  const bookData = req.body;

  try {
    const addedBook = await service.addBook(bookData);
    res.status(201).json({ message: "Book added successfully", book: addedBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error)
  }
});

routing.get("/getBooks" ,async (req, res, next) => {
  try {
    const getAllBooks = await service.getBooks();
    res.status(201).json(getAllBooks);
  }catch (error){
    res.status(400).json({ message: error.message });
    next(error)
  }
})

routing.post("/addStudent", async (req, res, next) => {
  try {
    const studentData = req.body;
    const newStudent = await service.addStudent(studentData);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error)
  }
});

routing.get("/getStudents" ,async (req, res, next) => {
  try {
    const getAllStudents = await service.getStudents();
    res.status(201).json(getAllStudents);
  }catch (error){
    res.status(400).json({ message: error.message });
    next(error)
  }
})

routing.post("/issue-book", async (req, res, next) => {
  const { rollNo, bookId } = req.body;

  try {
    const updatedStudent = await service.issueBooks(rollNo, { bookId });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error)
  }
});

routing.get('/students/holding-book/:bookId', async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const students = await findStudentsByBookId(bookId);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
});

routing.use(authMiddleware.auth);

routing.get('/protected', (req, res) => {
  console.log(res)
  res.status(200).json({ message: 'You have accessed a protected route!', user: req.user });
});

module.exports = routing;
