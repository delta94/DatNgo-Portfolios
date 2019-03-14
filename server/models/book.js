const moongose = require("mongoose");

const Schema = moongose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  pages: { type: Number },
  price: { type: Number }
});

module.exports = moongose.model("Book", bookSchema);
