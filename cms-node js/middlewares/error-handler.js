const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  let body = { status: false, message: err.message };
  let statusCode;

  if (err instanceof CustomHttpError) {
    statusCode = err.statusCode;
    console.log(body);
  } else {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    body.message = "Something went Wrong!";
  }

  res.status(statusCode).json(body);
};

module.exports = errorHandlerMiddleware;
