const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Controller function for user registration
exports.register = async (req, res) => {
    try {
        //Check if the email already exists in the database
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) return res.status(400).send("Email already exists");

        //Hash the user's password
        //generates a salt with a complexity of 10 rounds
        const salt = await bcrypt.genSalt(10);
        //hashes the user's password using the generated salt, ensuring the password is stored securely
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        //Save the user to the datebase
        const saveUser = await user.save();
        res.send({ user: user._id, name: user.name, email: user.email, password: user.password});
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.find({email: req.params.email});
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({message: "User not found"});
        res.json({ message: "User deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Controller function for user login
exports.login = async (req, res) => {
    try {
        //Check if the email exists in the database
        const user = await User.findOne({ email: req.body.email});
        if (!user) return res.status(400).send("Email not found");

        //Validate the user's password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid password");

        //Create and assign a JWT token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send(token);
    } catch (err) {
        res.status(400).send(err);
    }
};



