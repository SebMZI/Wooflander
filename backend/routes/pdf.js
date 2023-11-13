const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/:userId/pdf", userController.getPdf);

module.exports = router;
