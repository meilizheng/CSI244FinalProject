const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController.js");

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

//get all books by a specific author
router.get("/author/:authorId", bookController.getBooksByAuthor);

router.get("/user/:userId", bookController.getBooksByUser);

router.get("/review/:id", bookController.getReviews);
router.post("/review/:id", bookController.addReview);

module.exports = router;
