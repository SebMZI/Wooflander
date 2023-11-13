const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("Authentication header", authHeader);

  if (!authHeader?.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token is missing or invalid." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken; // You can access the token data via req.user
    console.log(decodedToken);
    next(); // Proceed to the next step in the request
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res
      .status(403)
      .json({ message: "Forbidden. Token is invalid or expired." });
  }
};

module.exports = jwtVerify;
