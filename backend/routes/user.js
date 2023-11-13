const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");
const multerConfig = require("../middlewares/multer-config");

router.post("/signup", multerConfig, userController.createUser);
router.post("/login", userController.login);
router.post("/:userId/uploadImage", multerConfig, userController.uploadImage);
router.post(
  "/profile/picture/:userId",
  multerConfig,
  userController.addProfilePic
);
router.post("/addAnimal", multerConfig, userController.addAnimal);
router.get("/:userId/profile", userController.getUserProfile);
router.get("/:userId/image", userController.getImage);
router.get("/sitters", userController.getAllSitters);
router.get("/owners", userController.getAllOwners);
router.get("/:userId/animal", userController.getAllAnimal);
router.get("/:animalId/getAnimalImage", userController.getAnimalImage);
router.put("/:userId/updateProfile", userController.updateProfile);
router.get("/:userId/getProfilePic", userController.getProfilePic);

module.exports = router;
