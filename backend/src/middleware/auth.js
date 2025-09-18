import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    console.log("=== AUTH USER MIDDEWARE ===");
  
  // Check for token in Authorization header (Bearer format) or token header
  console.log("req.headers",req.headers);
  let token;
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }
  console.log("token",token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
