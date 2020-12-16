const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config();
const fs = require("fs").promises;

const minifyImages = require("../helpers/minifyimg");

IMG_DIR = "tmp";
MIN_DIR = "api/public/images";

const storage = multer.diskStorage({
  destination: IMG_DIR,
  filename: (req, file, cb) => {
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  },
  limits: {
    fileSize: 1048576,
  },
});
const upload = multer({ storage });

const AuthController = require("./authController");

const authRouter = Router();

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
  AuthController.authorization,
  AuthController.logoutController
);

authRouter.post("/avatar", upload.single("avatar"), async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  console.log(req.file.path);
  if (req.file) {
    const { file } = req;
    await fs.rename(file.path, path.join(MIN_DIR, file.filename));
  }

  res.status(200).json(req.file);
});

module.exports = authRouter;
