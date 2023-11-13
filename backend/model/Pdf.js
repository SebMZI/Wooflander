const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  pdf: {
    name: String,
    path: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("pdf", pdfSchema);
