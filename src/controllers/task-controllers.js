const { Logger } = require("../config");
const { TaskService } = require("../services/");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createTask(req, res) {
  try {
    console.log(req.body);
    const { desc, status, user_id } = req.body;
    const Task = await TaskService.createTask({
      description: desc,
      status: status,
      createdby: user_id,
    });

    SuccessResponse.data = Task;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("error inside the controller", error);
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllTasks(req, res) {
  try {
    const Tasks = await TaskService.getAllTasks();
    SuccessResponse.data = Tasks;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getTask(req, res) {
  try {
    const Tasks = await TaskService.getTask(req.params.id);
    SuccessResponse.data = Tasks;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyTask(req, res) {
  try {
    const response = await TaskService.destroyTask(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateTask(req, res) {
  try {
    const response = await TaskService.updateTask(req.params.id, req.body);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("error in controller", error);
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  destroyTask,
  updateTask,
};
