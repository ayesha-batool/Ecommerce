import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        console.log("=== ADMIN AUTH MIDDLEWARE ===");
      console.log(req)
        // Check if authorization header exists
        if (!req.headers.authorization) {
            console.log("No authorization header provided");
            return res.status(401).json({ success: false, message: "No authorization header provided" });
        }

        // Extract token from "Bearer <token>"
        const authHeader = req.headers.authorization;
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Invalid authorization format. Use 'Bearer <token>'" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Verify token
        console.log("Verifying token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        // Check if the decoded token contains admin credentials
        const expectedPayload = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
        if (decoded.email + decoded.password !== expectedPayload) {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }

        // Token is valid, proceed
        next();

    } catch (error) {
        console.error('Auth error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default adminAuth;
