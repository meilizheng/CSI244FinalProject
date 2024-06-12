const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    //Get the token from the request header and verifies it using the secret key.
    const token = req.header("auth-token");
    //If the token is valid, the user information is added to the request object, and the nex middleware is called
    //If the token is invalid or missing, an error message is sent
    if (!token) return res.status(401).send("Access denied");

    try {
        //Verify the token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
};