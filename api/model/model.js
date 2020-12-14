const Contact = require("../schema/contacts.schema");
const User = require("../schema/users.schema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET_KEY;

class ContactModel {
  constructor() {}
  getContacts = async () => {
    return await Contact.find();
  };
  getContactById = async (contactId) => {
    return await Contact.findById(contactId);
  };
  addContact = async (data) => {
    return await Contact.create(data);
  };
  updateContact = async (contactId, data) => {
    return await Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });
  };
  removeContact = async (contactId) => {
    return await Contact.findByIdAndRemove(contactId);
  };

  //=================hw4===================//

  findByEmail = async (email) => {
    return User.findOne(email);
  };

  createUser = async (data) => {
    const { email, subscription, password } = data;
    const user = new User({ email, subscription });
    user.setPassword(password);
    return user.save();
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

  logOut = async (userId) => {
    return await this.updateToken(userId, null);
  };
}

module.exports = new ContactModel();
