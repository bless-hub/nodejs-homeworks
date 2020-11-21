const express = require("express");
const app = express.Router();
const contacts = require("../contacts.js");

app.get("/api/contacts", (res, req, next) => {
  res.json({
    status: "succes",
    code: 200,
    data: contacts.listContacts(),
  });
});

app.get("/api/contacts/:contactId", (res, req, next) => {
  res.json({
    status: "succes",
    code: 200,
    data: contacts.getContactById(),
  });
});
