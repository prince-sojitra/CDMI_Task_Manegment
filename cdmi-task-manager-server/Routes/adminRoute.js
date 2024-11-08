const express = require("express");
const adminController = require("../Controllers/adminController");
const router = express.Router();

router.post("/cdmi/register", adminController.register);

module.exports = router;
