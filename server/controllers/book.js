const Book = require("../models/book");

exports.getBooks = (req, res) => {
  Book.find({})
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};

exports.saveBook = (req, res) => {
  const bookData = req.body;

  const book = new Book(bookData);

  book
    .save()
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};

exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const bookData = req.body;

  Book.findById(bookId)
    .then(foundBook => {
      foundBook.set(bookData);

      foundBook
        .save()
        .then(savedBook => res.json(savedBook))
        .catch(err => res.status(422).send(err));
    })
    .catch(err => res.status(422).send(err));
};

exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  Book.findByIdAndDelete(bookId)
    .then(deletedBook => res.json({ status: "DELETED" }))
    .catch(err => res.status(422).send(err));
};
