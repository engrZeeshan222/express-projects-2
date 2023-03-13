const { StatusCodes } = require("http-status-codes");

class CustomHttpError extends Error {
  constructor(message, statusCode, errorMessage) {
    super(message);
  
    this.statusCode = statusCode;
    this.errorMessage=errorMessage;
  }
}

class BadRequest extends CustomHttpError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class NotFound extends CustomHttpError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

class Unauthenticated extends CustomHttpError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

class Forbidden extends CustomHttpError {
  constructor(message) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

exports.errorHandler = (message, statusCode, description) => {
  const error = new Error();
  error.message = "Unauthenticated Error";
  error.description = "email is wrong";
  error.status = 419;
  throw error;
};


module.exports = {
  CustomHttpError,
  BadRequest,
  NotFound,
  Unauthenticated,
  Forbidden,
};
