require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3500
const DbConnect = require("./config/dbConnect")

// Function to connect to DB
DbConnect()


// Server listening on PORT
app.listen(PORT, () => {
    console.log(`Server listenning on ${PORT}`);
}) 