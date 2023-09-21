const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

// new instance of the userRepository class
const userRepository = new UserRepository();

async function createuser(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      // If u get a SequelizeValidationError, it is something that is not coming correctly from the client side.  We have to send a meaningful full response to the user/client that this validation is not going correctly, so please correct this field. So status code will also be some client related status code.
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    throw new AppError(
      "Cannot create a new user Object!",
      StatusCodes.INTERNAL_SERVER_ERROR
    ); // Or else send server-related status code
  }
}

async function getAllusers() {
  try {
    const users = await userRepository.getAll();
    return users;
  } catch (error) {
    throw new AppError(
      "Something went wrong while getting all users",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getuser(data) {
  try {
    const user = await userRepository.get(data);
    return user;
  } catch (error) {
    console.log("error in service is", error);
    Logger.error(error);

    if (error.statusCode == StatusCodes.NOT_FOUND) {
      console.log("Failing in service layer due to status code not found");
      throw new AppError(
        "The user you requested is not present in the database",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while getting user by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyuser(id) {
  try {
    const response = await userRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The user you requested to delete is not present in the database",
        error.statusCode
      );
    }

    throw new AppError(
      "Something went wrong while getting all users",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateuser(id, data) {
  try {
    const response = await userRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
        "For the request you made, there is no user / column available to update!",
        error.statusCode
      );
    } else if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    throw new AppError(
      `The user's data cannot be updated!`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createuser,
  getAllusers,
  getuser,
  destroyuser,
  updateuser,
};
