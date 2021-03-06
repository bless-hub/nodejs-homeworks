const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const dotenv = require("dotenv");
require("dotenv").config();
const contactRouter = require("../contacts/contact.router");
const usersRouter = require("../users/usersRouters");
const authRouter = require("../auth/authRouters");

module.exports = class UsersContactsServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlwares();
    this.initRoutes();
    await this.initDataBase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlwares() {
    this.server.use(express.static("tmp"));
    this.server.use(express.static(path.join("api/public")));
    this.server.use(express.json());
    this.server.use(cors({ origin: "http://localhost:3000" }));
  }

  initRoutes() {
    this.server.use("/contacts", contactRouter);
    this.server.use("/auth", authRouter);
    this.server.use("/users", usersRouter);
  }

  async initDataBase() {
    const urlDb = process.env.DB_HOST;
    try {
      await mongoose.connect(urlDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("Database connection successful");
    } catch (e) {
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(3000, () => {
      console.log("Server is running", process.env.PORT);
    });
  }
};
