const Book = require("../models/book.js");

//Create a new book, receive the data from the request body
//Send the new book to json file with status code 201 if succseful
exports.createBook = async (req, res) => {
    const book = new Book({
        title: req.body.title, 
        description: req.body.description, 
        isbn: req.body.isbn, 
        genre: req.body.genre, 
        author: req.body.author });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
};

//Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(201).json(books);
    } catch (error) {
        res.status(500).json({ error: "An error occurred"});
    }
};

//Get a single book by ID
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({message: "Book not found"});
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json ({message: err.message});
    }
};

//Update a book by ID
//Use Book.findByIdAndUpdate() to find the book by ID and update its informaiton
//If the book is updated successfully, it sends the update book as a JSON response
//If the book is not found, it send a JSON response with status code 404
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                isbn: req.body.isbn,
                genre: req.body.genre,
                author: req.body.author,
            },
            {new: true }
        );
        if (!updatedBook) return res.status(404).json({message: "Book not found"});
        res.status(201).json(updatedBook);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

//Delete a book by ID
//Using Book.findByIdAndDelete()
//If the book is found and successfully delete. it send a JSON response with a message indicating that the book was deleted
//If the book is not found, it send a JSON response with status code 404
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json ({message: "Book not found"});
        res.status(201).json({message: "Book deleted"});
    } catch (err) {
        res.status(500).json({message: err.message });
    }
};