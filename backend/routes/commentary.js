const express = require("express");
const router = express.Router();

const commentaryController = require("../controllers/commentary");
const tokenValidation = require("../middlewares/jwtVerify");

router.post("/addComment", commentaryController.addCommentary);
router.get("/getComments/:userId", commentaryController.getAllComment);
router.post("/addRating", commentaryController.addRating);
//router.get("/:userId/getRatings", commentaryController.getAllRating);

module.exports = router;
