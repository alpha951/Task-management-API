const express = require("express");
const router = express.Router();
const { TaskMiddleware } = require("../../middlewares");

const { TaskController } = require("../../controllers");

router.get("/", TaskController.getAllTasks);

router.get("/:id", TaskController.getTask);

router.post(
  "/",
  TaskMiddleware.validateCreateRequest, // adding middleware to authenticate request
  TaskController.createTask
);

router.delete("/:id", TaskController.destroyTask);

router.patch("/:id", TaskController.updateTask);

module.exports = router;
