const Author = require("../models/author.js");

//Create a new author, Receive the data from the request body
exports.createAuthor = async (req, res) => {
    const author = new Author({
        name: req.body.name,
        biography: req.body.biography,
        nationality: req.body.nationality,
        email: req.body.email,
    });

    try {
        const newAuthor = await author.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Get all authors
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single author by ID
exports.getAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an author by ID
exports.updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                biography: req.body.biography,
                nationality: req.body.nationality,
                email: req.body.email,
            },
            { new: true } // To return the updated document
        );
        if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
        res.json(updatedAuthor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an author by ID
exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.json({ message: "Author deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
