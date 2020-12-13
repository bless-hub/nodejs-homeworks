const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Noname" },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: "password" },
    subscription: { type: String, default: "free" },
    token: { type: String, default: "" },
  },
  { versionKey: false }
);

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
