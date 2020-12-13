const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
const ContactModel = require("../model/model");

const User = require("../schema/users.schema");

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
      const { email, username, password } = req.body;
      const user = await ContactModel.findByEmail(email);
      if (user) {
        return res.status(409).send("'message': 'Email in use'");
      }
      const newUser = await Users.createUser(req.body);
      res.status(201).json("user:", newUser);
    } catch (e) {
      next(e);
    }
  };

  loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await ContactModel.findByEmail(email);
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!user || !isPasswordValid) {
        return res.status(401).send("Email or password is wrong");
      }

      const token = await ContactModel.login(user);
      res.status(200).json(`token: ${token}, user: ${user}`);
    } catch (e) {
      next(e);
    }
  };

  logoutController = async (req, res, next) => {
    try {
      const user = req.user;

      await UsersModel.logout(user._id);
      res.status(204).send("No Content");
    } catch (e) {
      next(e);
    }
  };

  authorize = async (req, res, next) => {
    try {
      const authorizationHeader = req.get("Authorization") || "";
      const token = authorizationHeader.replace("Bearer ", "");
      let userId;

      try {
        userId = await jwt.verify(token, process.env.JWT_SECRET_KEY).id;
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

  validateAuth = (req, res, next) => {
    const schema = Joi.object({
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
