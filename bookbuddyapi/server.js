//Imports the Express.js framework
const express = require("express");

//Create an Express application instance
const app = express();

//Set the port for the server to listen on 
const port = process.env.PORT || 3000;

//Import the mongooose library for interacting with MongoDB
const mongoose = require("mongoose");

//Loads enviroment variables from a .env file into process.env
const dotenv = require("dotenv");

//Import the CORS middleware for enabling Cross-Origin Resource sharing
const cors = require("cors");
// Import route modules
const bookRoutes = require("./routes/bookRoutes.js");

const authorRoutes = require("./routes/authorRoutes.js");

const userRoutes = require("./routes/UserRoutes");

const postRoutes = require("./routes/postsRoutes");

// Load environment variables from a .env file into process.env
dotenv.config();

//Connect to MongoDB database using the URI specified in the MONGO_URI environment variable
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(`Connected to MongoDB`);
    })
    .catch(err => {
        console.error(`Error connecting to MongoDB`, err);
    });

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})