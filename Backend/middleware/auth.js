
const auth = (req, res, next) => {

  try {

    // Get authorization header
    const authHeader = req.headers.authorization;


    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }


    // Extract token
    const token = authHeader.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        message: "Access denied. Invalid token format."
      });
    }


    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Attach user information to request
    req.user = decoded;


    // Continue to protected route
    next();


  } catch (error) {

    console.error(
      "Authentication error:",
      error.message
    );


    return res.status(401).json({
      message: "Invalid or expired token."
    });

  }

};


export default auth;