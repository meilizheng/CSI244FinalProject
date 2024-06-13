const mongoose = require("mongoose");
//Create schema for author called authorSchema
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true      //name of author is require  
    },
    biography: {
        type: String,
        required: true     //biography of author is require
    },
    nationality: {
        type: String,
        required: true     //nationality of author is require
    },
    email: {
        type: String,
        required: true,
        unique: true //ensure the email is unique across author
    },
});

//Create a model named Author based on authorSchema
const Author = mongoose.model("Author", authorSchema);
//Export the Author model so it can be used in other part of the application
module.exports = Author;