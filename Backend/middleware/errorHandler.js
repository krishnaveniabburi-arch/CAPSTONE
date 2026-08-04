// middleware/errorHandler.js
// Centralized error handling middleware
// Handles API errors and returns consistent responses

const errorHandler = (err, req, res, next) => {

  console.error("Server Error:", err.message);


  // Default error status
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;


  let message = err.message || "Internal Server Error";


  /*
    MongoDB duplicate key error
    Example:
    duplicate email or phone number
  */
  if (err.code === 11000) {

    statusCode = 400;

    const field = Object.keys(
      err.keyValue
    )[0];

    message = `${field} already exists.`;

  }


  /*
    Mongoose validation error
    Example:
    Required fields missing
  */
  if (err.name === "ValidationError") {

    statusCode = 400;

    message = Object.values(
      err.errors
    )
      .map(error => error.message)
      .join(", ");

  }


  /*
    Invalid MongoDB ObjectId
    Example:
    /patients/abc123
  */
  if (err.name === "CastError") {

    statusCode = 404;

    message = "Resource not found.";

  }


  res.status(statusCode).json({

    success: false,

    message,

    // Show stack trace only during development
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack

  });

};


export default errorHandler;