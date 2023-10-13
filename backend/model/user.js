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
        type: String,
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
            ref: "Animal"
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
            ref: "Image",
        }
    ]
        
})

module.exports = mongoose.model("User", userModel)