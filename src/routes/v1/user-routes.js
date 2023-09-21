const express = require("express");
const router = express.Router();

const { UserController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

router.post(
  "/signup",
  AuthMiddleware.validateAuthRequest,
  UserController.signup
);

router.post(
  "/signin",
  AuthMiddleware.validateAuthRequest,
  UserController.signin
);

module.exports = router;
