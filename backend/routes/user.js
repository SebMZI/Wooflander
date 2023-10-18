const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const multerConfig = require("../middlewares/multer-config");
const multer = require("multer");

router.post("/signup", userController.createUser);
router.post("/login", userController.login);
router.post("/:userId/uploadImage", multerConfig, userController.uploadImage);
router.post("/addAnimal", multerConfig, userController.addAnimal);
router.get("/:userId/profile", userController.getUserProfile);
router.get("/:userId/image", userController.getImage);
router.get("/sitters", userController.getAllSitters);
router.get("/:userId/animal", userController.getAllAnimal);
router.get("/:animalId/getAnimalImage", userController.getAnimalImage);
router.put("/:userId/updateProfile", userController.updateProfile);

module.exports = router;
