const AppErrorHandler = require("./appError");

module.exports = (err: any, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;
  error.name = err.name;

  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  sendError(error, req, res);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppErrorHandler(message, 400);
};

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppErrorHandler(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el['message']);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppErrorHandler(message, 400);
};

const handleJWTError = () => {
  new AppErrorHandler("Invalid token. Please log in again!", 401);
};

const handleJWTExpiredError = () => {
  new AppErrorHandler("Your token has expired! Please log in again.", 401);
};

const sendError = (err: any, req: any, res: any) => {
  // A) Log error
  console.error("ERROR 💥", err);

  // B) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  // C) Programming or other unknown error: don't leak error details
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};
