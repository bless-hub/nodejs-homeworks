const express = require("express");
const ContactController = require("./contacts.controller");

const appRouter = express.Router();

appRouter.get("/", ContactController.getListContacts);

appRouter.get("/:contactId", ContactController.getContactId);

appRouter.post(
  "/",
  ContactController.validContact,
  ContactController.createContact
);

appRouter.delete("/:contactId", ContactController.removeContact);

appRouter.patch(
  "/:contactId",
  ContactController.validContactUpdate,
  ContactController.updateContact
);

module.exports = appRouter;
