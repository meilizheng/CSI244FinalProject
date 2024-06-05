const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    //title, description, isbn, genre, author, user id
    title: {
        type: String,
        required: true        
    },
    description: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;