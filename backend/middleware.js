import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    // Extract the token from the cookies
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    console.log(JSON.stringify(decoded));
    req.userId = decoded.id;
    req.phoneNumber =  decoded.phoneNumber
    console.log("req.userId:----->", req.userId)
    console.log("req.phoneNumber:----->", req.phoneNumber)


    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};


