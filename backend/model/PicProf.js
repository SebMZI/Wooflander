const mongoose = require("mongoose");

const picProfSchema = new mongoose.Schema({
  pic: {
    name: String,
    path: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Profilepic", picProfSchema);
