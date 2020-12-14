const { Router } = require("express");

const AuthController = require("./authController");

const usersRouter = Router();

usersRouter.get(
  "/current",
  AuthController.authorization,
  AuthController.getUserController
);

module.exports = usersRouter;
