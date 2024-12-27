const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.authenticate = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers["authorization"]?.split(" ")[1]; // Expecting the format "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Attach user information to the request object for further use
    req.user = decoded; // Assuming the JWT payload contains user info
    next(); // Proceed to the next middleware or route handler
  });
};
