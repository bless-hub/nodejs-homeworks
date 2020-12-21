const { Router } = require("express");
const upload = require("../helpers/multer.js");
const moovedFile = require("../helpers/filemoove");
const AuthController = require("../auth/authController");
const minifyImg = require("../helpers/minifyimg");

const usersRouter = Router();

usersRouter.get(
  "/current",
  AuthController.authorization,
  AuthController.getUserController
);

usersRouter.patch(
  "/avatar",
  AuthController.authorization,
  upload.single("avatar"),
  moovedFile,
  AuthController.updateAvatar
);
usersRouter.get("/verify/:verifyToken", AuthController.verifyEmail);

module.exports = usersRouter;
