const mongoose = require("mongoose")

const imageSchema = mongoose.Schema({
    image: {
        name: String,
        path: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Image", imageSchema )