const mongoose = require("mongoose");
//define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(v);
        },
        message: props => `${props.value} is not a valid password!`
    }
},
});

//create the model
const User = mongoose.model("User", userSchema);
//export the model
module.exports = User;