const mongoose = require("mongoose");
//Create a schema for review called reviewSchema
//The reviewSchema is embedded within the bookSchema as an array of reviews. 
//Each book document can contain multiple review documents directly within it.
const reviewSchema = new mongoose.Schema({    
    text: {
        type: String,
        required: true, //text is required
    },
    datePosted: {
        type: Date,
        default: Date.now, //Default value is the current data and time
    },
    likes: {
        type: Number,
        default: 0, //Default value is 0
    },
});
//Create a schema for book called bookSchema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true      //title field is required  
    },
    description: {
        type: String,
        required: true      //description field is required
    },
    isbn: {
        type: String,   
        sparse: true       //ISBN field is optional and sparse (allows for unique but nullable values)
    },
    genre: {
        type: String,
        required: true     //genre field is required
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",     // References the Author model
        required: true,    //author filed is required
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",                  //References the User model 
        required: true,               // user field is required
    },
    datePosted: { type: Date, default: Date.now},
    likes: {type: Number, default: 0},
    //This is the review of the book, it is embedded within the book
    reviews: [reviewSchema],
});

//Create a model for bookSchema 
const Book = mongoose.model("Book", bookSchema);
//Exprots the book model so it can be used in other part of the application
module.exports = Book;