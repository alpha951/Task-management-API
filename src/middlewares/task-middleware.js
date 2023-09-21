const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body.user_id) {
    ErrorResponse.message = "Something went wrong while creating task";
    ErrorResponse.explanation = "User id not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.desc) {
    ErrorResponse.message = "Something went wrong while creating task";
    ErrorResponse.explanation =
      "Task description not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateCreateRequest };
