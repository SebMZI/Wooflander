require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3500;
const DbConnect = require("./config/dbConnect");
const path = require("path");
const bodyParser = require("body-parser");
const jwtVerify = require("./middlewares/jwtVerify");

// Function to connect to DB
DbConnect();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://wooflander.vercel.app",
      "https://wooflander.onrender.com",
    ],
    credentials: true,
  })
);
app.options(
  cors({
    origin: [
      "http://localhost:3000",
      "https://wooflander.vercel.app",
      "https://wooflander.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.raw({ type: "application/json" }));
app.use("/stripe", require("./routes/stripe"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/pdf", require("./routes/pdf"));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", require("./routes/auth"));
//app.use(jwtVerify);
app.use("/user", require("./routes/user"));
app.use("/commentary", require("./routes/commentary"));

// In case of an error
app.all("*", (req, res) => {
  return res.status(404).json({ error: "404 Not found!" });
});

// Server listening on PORT
app.listen(PORT, () => {
  console.log(`Server listenning on ${PORT}`);
});
