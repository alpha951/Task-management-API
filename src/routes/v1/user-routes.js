const express = require("express");
const router = express.Router();

const { UserController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

// to create a new user
router.post(
  "/signup",
  AuthMiddleware.validateAuthRequest,
  UserController.signup
);

// to login a user
router.post(
  "/signin",
  AuthMiddleware.validateAuthRequest,
  UserController.signin
);

module.exports = router;
