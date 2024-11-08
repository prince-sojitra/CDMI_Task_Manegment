const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();
const auth = require('../Middlewares/auth');

router.post("/register", auth.verifyAdminToken, userController.register);
router.post("/login", userController.login);
router.get("/get-user", auth.verifyToken, userController.getUser);
router.post("/get-user-with-email", auth.verifyToken, userController.getUserWithMail);

module.exports = router;
