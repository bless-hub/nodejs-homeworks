const express = require("express");
const ContactController = require("./contacts.controller");

const contactRouter = express.Router();

contactRouter.get("/", ContactController.getListContacts);

contactRouter.get("/:contactId", ContactController.getContactId);

contactRouter.post(
  "/",
  ContactController.validContact,
  ContactController.createContact
);

contactRouter.delete("/:contactId", ContactController.removeContact);

contactRouter.patch(
  "/:contactId",
  ContactController.validContactUpdate,
  ContactController.updateContact
);

module.exports = contactRouter;
