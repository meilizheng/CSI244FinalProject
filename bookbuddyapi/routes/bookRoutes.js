//Imports the express.js framework
const express = require("express");

//Create an instance of Express Router
const router = express.Router();

//Imports the book controller module
const bookController = require("../controllers/bookController.js");

//Defines a POST route for creating a new book
//When a POST request is made to "/books", it will be handled by the createBook function from the bookController
router.post("/books", bookController.createBook);

//Defines a GET route for retrieving all books
//When a GET request is made to "/books", it will be handled by the getAllBooks function from the bookController
router.get("/books", bookController.getAllBooks);

//Defines a GET route for retrieving a book by its ID
//When a GET request with a specific ID parameter is made to "/books/", it will be handled by the getBook function from the bookController
router.get("/books/:id", bookController.getBook);

//Defines a PUT route for updating a book by its ID
//When a PUT request with a specific ID parameter is made to "/books/", it will be handled by the updateBook function from the bookController
router.put("/books/:id", bookController.updateBook);

//Defines a DELETE route for deleting a book by its ID
//When a DELETE request with a specific ID parameter is made to "/books/", it will be handled by the deleteBook function from the bookController
router.delete("/books/:id", bookController.deleteBook);


//Exports the router instance, making it available for use in other part of the application
module.exports = router;