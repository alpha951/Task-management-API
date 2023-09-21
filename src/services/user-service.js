const { StatusCodes } = require("http-status-codes");

const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const {
  checkPassword,
  createToken,
  verifyToken,
} = require("../utils/common/auth");

const userRepo = new UserRepository();

async function create(data) {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    throw new AppError(
      "Cannot create a new User Object!",
      StatusCodes.INTERNAL_SERVER_ERROR
    ); // Or else send server-related status code
  }
}

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("User not found!", StatusCodes.NOT_FOUND);
    }
    const isPasswordValid = checkPassword(data.password, user.passwordHash);


    if (isPasswordValid == false) {
      throw new AppError("Invalid password!", StatusCodes.BAD_REQUEST);
    }

    // Generate JWT token

    const token = createToken({ id: user.id, email: user.email });
    return token;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("JWT Token is required!", StatusCodes.BAD_REQUEST);
    }

    const response = verifyToken(token);
    console.log(
      "verify token function response.id inside isAuthenticated function userservice: --",
      response.id
    );
    const user = await userRepo.get(response.id);
    if (!user) {
      throw new AppError("User not found!", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid token!", StatusCodes.BAD_REQUEST);
    }
    if (error.name == "TokenExpiredError") {
      throw new AppError("Token expired!", StatusCodes.BAD_REQUEST);
    }
  }
}

module.exports = { create, signin, isAuthenticated };
