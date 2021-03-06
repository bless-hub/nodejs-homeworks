const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
const UsersModel = require("../users/users.model");
const SECRET = process.env.JWT_SECRET_KEY;
const sendVerificationEmail = require("../helpers/send.mail");
const fs = require("fs");
const path = require("path");

IMG_DIR = "api/public/images";

class AuthController {
  getUserController = async (req, res, next) => {
    try {
      const { email, subscription } = req.user;
      console.log(req.user);
      return res.json({
        user: {
          email,
          subscription,
        },
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  };

  registrationController = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await UsersModel.findByEmail({ email });

      if (user) {
        res.status(409).json({ message: " email in use" });
        return;
      }
      const newUser = await UsersModel.createUser(req.body);
      console.log(newUser);

      await sendVerificationEmail(newUser);

      return res.status(201).json({
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  };

  verifyEmail = async (req, res, next) => {
    try {
      const { token } = req.params;
      const userVerify = await UsersModel.findByVerificationToken(token);

      if (!userVerify) {
        throw new NotFoundError("User not found");
      }

      await UsersModel.updateVerifyUser(userVerify._id);

      return res.status(200).send("You are successful verified");
    } catch (error) {
      next(error);
    }
  };

  loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await UsersModel.findByEmail({ email });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(user);
      console.log(isPasswordValid);

      if (!user || !isPasswordValid || user.status !== "Verified") {
        return res.status(401).send({ message: "Email or password is wrong" });
      }

      const token = await UsersModel.login(user);
      res.status(200).json({
        user: {
          token,
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  logoutController = async (req, res, next) => {
    try {
      const user = req.user;
      await UsersModel.findById(user._id);
      await UsersModel.logOut(user);

      res.status(204).send({ message: "you are need login" });
    } catch (e) {
      next(e);
    }
  };

  authorization = async (req, res, next) => {
    try {
      const authorizationHeader = req.get("Authorization") || "";
      const token = authorizationHeader.replace("Bearer ", "");
      let userId;

      try {
        userId = await jwt.verify(token, SECRET).id;
      } catch (e) {
        console.log("error", e);
        next(res.status(401).json({ message: "Not authorized" }));
      }

      const user = await UsersModel.findById(userId);
      if (!user || user.token !== token) {
        throw new UnauthorizedError("Not authorized");
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      next(err);
    }
  };

  updateAvatar = async (req, res, next) => {
    try {
      const user = req.user;
      const string = req.user.avatarURL;
      await UsersModel.updateUser(user._id, {
        avatarURL: `localhost:3000/images/${req.file.filename}`,
      });
      const fileName = string.slice(21);
      await fs.unlink(path.join(IMG_DIR, fileName), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      res
        .status(200)
        .json(`avatarURL: 'localhost:3000/images/${req.file.filename}'`);
      next();
    } catch (e) {
      next(e);
    }
  };

  validateAuth = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res
        .status(400)
        .send("missing required name field", validationRes.error);
    }
    next();
  };
}

module.exports = new AuthController();
