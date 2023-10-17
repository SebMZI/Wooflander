require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3500;
const DbConnect = require("./config/dbConnect");
const bodyParser = require("body-parser");

// Function to connect to DB
DbConnect();
app.use(cors());

app.use(express.raw({ type: "application/json" }));
app.use("/stripe", require("./routes/stripe"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/user"));

// In case of an error
app.all("*", (req, res) => {
  return res.status(404).json({ error: "404 Not found!" });
});

// Server listening on PORT
app.listen(PORT, () => {
  console.log(`Server listenning on ${PORT}`);
});
