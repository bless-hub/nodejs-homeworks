const { Router } = require("express");

const AuthController = require("./authController");

const authRouter = Router();

authRouter.get(
  "/current",
  //   AuthController.authorize,
  AuthController.getUserController
);

authRouter.post(
  "/register",
  AuthController.validateAuth,
  AuthController.registrationController
);

authRouter.post(
  "/login",
  AuthController.validateAuth,
  AuthController.loginController
);

authRouter.post(
  "/logout",
  AuthController.authorize,
  AuthController.logoutController
);

module.exports = authRouter;
