const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
// router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:email", userController.getUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;