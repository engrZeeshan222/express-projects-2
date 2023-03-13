exports.response = (res, statusCode, status, message, data) => {
    res.status(statusCode).send({
      status,
      message,
      data,
    });
  };
  
  