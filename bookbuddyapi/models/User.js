const mongoose = require("mongoose");
//define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  //name field is required
    },
    email: {
        type: String,
        required: true,
        unique: true,   //email field is required
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Password must contain at least one digit, one lowercase letter,
            // one uppercase letter, one special character, and be at least 6 characters long
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(v);
        },
        message: props => `${props.value} is not a valid password!` // Custom error message
    }
},
});

//create the model for userSchema
const User = mongoose.model("User", userSchema);
//export the user model so it can be used in other part of the application
module.exports = User;