const express = require("express");
const router = express.Router();
const verify = require("../verifyToken");

//Protected route to get user information
router.get("/", verify, (req, res) => {
    res.send(req.user);
});

module.exports = router;