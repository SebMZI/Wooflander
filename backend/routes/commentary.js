const express = require("express");
const router = express.Router();
const commentaryController = require("../controllers/commentary");

router.post("/addComment", commentaryController.addCommentary);
router.get("/getComments/:userId", commentaryController.getAllComment);

module.exports = router;
