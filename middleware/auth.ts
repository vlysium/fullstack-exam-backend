import "dotenv/config";
import jwt from "jsonwebtoken";

const jwtAuth = (req: any, res: any, next: any) => {
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
    res.status(400).json({ message: "Invalid token" });
  }
}

export default jwtAuth;