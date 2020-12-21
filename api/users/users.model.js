const User = require("../schema/users.schema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET_KEY;

const randomAvatar = require("../helpers/avatar-builder");

class UsersModel {
  constructor() {}

  //=================hw4===================//

  findByEmail = async (email) => {
    return User.findOne(email);
  };

  createUser = async (data) => {
    const { email, subscription, password } = data;
    const user = new User({ email, subscription });
    randomAvatar(user);
    user.avatarURL = `localhost:3000/images/${user._id}.png`;
    user.setPassword(password);
    return user.save();
  };

  updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
    });
  };

  findById = async (id) => {
    return await User.findOne({ _id: id });
  };

  updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });
  };

  login = async (user) => {
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    await this.updateToken(id, token);
    return token;
  };

  logOut = async (id) => {
    return await this.updateToken(id, null);
  };

  //===========6HW=========================

  createVerificationToken = async (id, verificationToken) => {
    return User.findByIdAndUpdate(
      id,
      {
        status: "Created",
        verificationToken,
      },
      { new: true }
    );
  };

  findByVerificationToken = async (verificationToken) => {
    return User.findOne({
      verificationToken,
    });
  };

  updateVerifyUser = async (id) => {
    return User.findByIdAndUpdate(
      id,
      {
        status: "Verified",
        verificationToken: null,
      },
      {
        new: true,
      }
    );
  };
}

module.exports = new UsersModel();
