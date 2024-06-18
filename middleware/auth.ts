import "dotenv/config";
import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
  
    // validate the token
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

    // move to the next middleware
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}

export const adminAuth = (req, res, next) => {
  try {
    // check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    // move to the next middleware
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}