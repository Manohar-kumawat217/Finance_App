//middleware to protect routes

import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  // get tokens from header

  const tokenHeader = req.header("Authorization");

  // check if token is present
  if (!tokenHeader) {
    return res.status(401).json({ message: "Unauthorized, Access deined" });
  }
  const token = tokenHeader.startsWith("Bearer")
    ? tokenHeader.split("")[1]
    : tokenHeader;

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = decoded;
    // proceed to next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default protectRoute;
