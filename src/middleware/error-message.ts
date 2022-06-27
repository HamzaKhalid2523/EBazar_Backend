module.exports = (error, req, res, next) => {
  console.log("Error", error);
  if (!error.status) {
    error.status = 500;
  }
  res.status(error.status).send(error);
  next();
};
