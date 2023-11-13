const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");
const multerConfig = require("../middlewares/multer-config");

router.post("/signup", multerConfig, userController.createUser);
router.post("/login", userController.login);

module.exports = router;
