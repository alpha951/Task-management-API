const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

const { UserService } = require("../services");

function validateAuthRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Name data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Email data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Password not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (!response) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }
    req.body.user_id = response; // Add user_id to the request object
    next();
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
}

module.exports = { validateAuthRequest, checkAuth };
