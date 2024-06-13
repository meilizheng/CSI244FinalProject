// Example of defining a TokenBlacklist model using Mongoose
const mongoose = require("mongoose");
// Define a schema for the TokenBlacklist model
const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,  // Token field is required
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "24h", // Optional: Automatically delete documents after 24 hours
    },
});

const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

module.exports = TokenBlacklist;
