const express = require("express");
const router = express.Router();

const { UserController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

router.post(
  "/signup",
  AuthMiddlewares.validateAuthRequest,
  UserControllers.signup
);

router.post(
  "/signin",
  AuthMiddlewares.validateAuthRequest,
  UserControllers.signin
);


module.exports = router;
