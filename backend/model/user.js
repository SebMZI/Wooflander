const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String, 
        required: true
    }, 
    adress: {
        type: String,
        required: true
    },
    roles: {
        Client: Number,
        Sitter: Number, 
        Admin: Number
    },
    animals:[ 
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Animals"
        }
    ],
    note: {
        type: Number
    },
    commentary: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Commentary"
        }
    ], 
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Images"
        }
    ]

})

module.exports = mongoose.model("User", userModel)