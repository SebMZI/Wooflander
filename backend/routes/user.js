const express = require('express')
const router = express.Router()
const userController = require("../controllers/user")
const multerConfig = require("../middlewares/multer-config")

router.post("/signup", userController.createUser)
router.post("/login", userController.login)
router.post("/:userId/uploadImage",multerConfig, userController.uploadImage)
router.get("/:userId/image", userController.getImage)

module.exports = router;