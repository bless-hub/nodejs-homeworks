const express = require("express");
const ContactController = require("./contacts.controller");

const appRouter = express.Router();

appRouter.get("/contacts", ContactController.getListContacts);

appRouter.get("/contacts/:contactId", ContactController.getContactId);

appRouter.post(
  "/contacts",
  ContactController.validContact,
  ContactController.createContact
);

appRouter.delete("/contacts/:contactId", ContactController.removeContact);

appRouter.patch(
  "/contacts/:contactId",
  ContactController.validContact,
  ContactController.updateContact
);

module.exports = appRouter;
