const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
const ContactModel = require("../model/model");
const SECRET = process.env.JWT_SECRET_KEY;

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
      const user = await ContactModel.findByEmail({ email });
      console.log(user);
      if (user) {
        res.status(409).json({ message: " email in use" });
      }
      const newUser = await ContactModel.createUser(req.body);
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

  loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await ContactModel.findByEmail({ email });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(user);
      console.log(isPasswordValid);

      if (!user || !isPasswordValid) {
        return res.status(401).send({ message: "Email or password is wrong" });
      }

      const token = await ContactModel.login(user);
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
      const user = await ContactModel.findById(id);
      await ContactModel.logOut(user);
      console.log(user);

      res.status(204).send({ message: "you need login" });
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

      const user = await ContactModel.findById(userId);
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
