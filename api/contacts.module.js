const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true, default: "Noname" },
    password: { type: String, required: true, default: "password" },
    subscription: { type: String, required: true, default: "free" },
    token: { type: String, default: "" },
  },
  { versionKey: false }
);

class ContactModel {
  constructor() {
    this.db = mongoose.model("contacts", contactSchema);
  }
  getContacts = async () => {
    return await this.db.find();
  };
  getContactById = async (contactId) => {
    return await this.db.findById(contactId);
  };
  addContact = async (data) => {
    return await this.db.create(data);
  };
  updateContact = async (contactId, data) => {
    return await this.db.findByIdAndUpdate(contactId, data, {
      new: true,
    });
  };
  removeContact = async (contactId) => {
    return await this.db.findByIdAndRemove(contactId);
  };
}

module.exports = new ContactModel();
