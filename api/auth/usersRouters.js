const { Router } = require("express");
const upload = require("../helpers/multer.js");
const moovedFile = require("../helpers/filemoove");
const AuthController = require("./authController");
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

module.exports = usersRouter;
