// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token") || req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }
  const finalToken = token.split(" ");

  try {
    const decoded = jwt.verify(finalToken[1], process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
