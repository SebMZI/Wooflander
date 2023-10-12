require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3500
const DbConnect = require("./config/dbConnect")
const bodyParser = require("body-parser")

// Function to connect to DB
DbConnect()

app.use(express.json())
app.use(bodyParser.json())
app.use("/user", require("./routes/user"));

// Server listening on PORT
app.listen(PORT, () => {
    console.log(`Server listenning on ${PORT}`);
}) 