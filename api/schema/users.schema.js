const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: { type: String, required: true, default: "Noname" },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
    },
    avatarURL: String,
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    status: {
      type: String,
      required: true,
      enum: ["Verified", "Created"],
      default: "Created",
    },
    verificationToken: { type: String, required: false },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(7));
};

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
