const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { TaskRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

// new instance of the TaskRepository class
const taskRepository = new TaskRepository();

async function createTask(data) {
  try {
    const Task = await taskRepository.create(data);
    return Task;
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
      "Cannot create a new Task Object!",
      StatusCodes.INTERNAL_SERVER_ERROR
    ); // Or else send server-related status code
  }
}

async function getAllTasks() {
  try {
    const Tasks = await taskRepository.getAll();
    return Tasks;
  } catch (error) {
    throw new AppError(
      "Something went wrong while getting all Tasks",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getTask(data) {
  try {
    const Task = await taskRepository.get(data);
    return Task;
  } catch (error) {
    console.log("error in service is", error);
    Logger.error(error);

    if (error.statusCode == StatusCodes.NOT_FOUND) {
      console.log("Failing in service layer due to status code not found");
      throw new AppError(
        "The Task you requested is not present in the database",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while getting Task by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyTask(id) {
  try {
    const response = await taskRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Task you requested to delete is not present in the database",
        error.statusCode
      );
    }

    throw new AppError(
      "Something went wrong while getting all Tasks",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateTask(id, data) {
  try {
    const response = await taskRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
        "For the request you made, there is no Task / column available to update!",
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
      `The Task's data cannot be updated!`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  destroyTask,
  updateTask,
};
