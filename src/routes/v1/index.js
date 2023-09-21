const express = require("express");
const router = express.Router();

const { InfoController } = require("../../controllers");

const userRoutes = require("./user-routes");
const taskRoutes = require("./task-routes");
const { AuthMiddleware } = require("../../middlewares");

// checks api status
router.get("/info", InfoController.info);

// user routes : Public route
router.use("/user", userRoutes);

// task routes for CRUD : Protected route
router.use("/task", AuthMiddleware.checkAuth, taskRoutes);

module.exports = router;
