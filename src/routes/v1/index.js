const express = require("express");
const router = express.Router();

const { InfoController } = require("../../controllers");

const userRoutes = require("./user-routes");

const taskRoutes = require("./task-routes");

router.get("/info", InfoController.info);

router.use("/user", userRoutes);

router.use("/task", taskRoutes);

module.exports = router;
