const Student = require("../model/student");
const Book = require("../model/book");

let user = {};

user.addBook = async (bookData) => {
  const newBook = new Book(bookData);
  await newBook.save();
  return newBook;
};

user.getBooks = async () => {
  const allBooks = await Book.find()
  return allBooks
}

user.getStudents = async () => {
  const allStudent = await Student.find()
  return allStudent
}

user.addStudent = async (studentData) => {
  const student = new Student(studentData);
  return await student.save();
};

user.issueBooks = async (rollNo, bookData) => {
  const student = await Student.findOne({ rollNo });
  if (!student) {
    throw new Error("Student not found");
  }

  if(student.issuedBooks.length > 0){
    throw new Error("Please return the previous book")
  }

  const book = await Book.findOne({ id: bookData.bookId });
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.qty <= 0) {
    throw new Error("Book is not available");
  }

  student.issuedBooks.push({
    bookId: book.id,
    bookName: book.name,
    author: book.author,
    issuedOn: new Date(),
  });

  book.qty -= 1;

  await student.save();
  await book.save();

  return student;
};

user.findStudentByBookId = async (bookId) => {
  try {
    const studentsWithBook = await Student.find({
      'issuedBooks.bookId': bookId
    });
    return studentsWithBook;
  } catch (error) {
    throw new Error(`Failed to find students with bookId ${bookId}: ${error.message}`);
  }
}

module.exports = user;
