const express = require("express");
const cors = require("cors");
require("dotenv").config();
const appRouter = require("./appRouter");

module.exports = class UsersContactsServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlwares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlwares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "http://localhost:3000" }));
  }

  initRoutes() {
    this.server.use("/api", appRouter);
  }

  startListening() {
    this.server.listen(3000, () => {
      console.log("Server running", process.env.PORT);
    });
  }
};
