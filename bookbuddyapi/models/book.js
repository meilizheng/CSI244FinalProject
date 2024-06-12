const mongoose = require("mongoose");
//Creating a reviewSchema
const reviewSchema = new mongoose.Schema({    
    text: {
        type: String,
        required: true,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
});

const bookSchema = new mongoose.Schema({
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
        sparse: true
    },
    genre: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    datePosted: { type: Date, default: Date.now},
    likes: {type: Number, default: 0},
    //This is the review of the book, it is embedded within the book
    reviews: [reviewSchema],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;