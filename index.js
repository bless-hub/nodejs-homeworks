// const argv = require("yargs").argv;
// const contacts = require("./contacts.js");

// // TODO: рефакторить
// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       contacts.listContacts();
//       break;

//     case "get":
//       contacts.getContactById(id);
//       break;

//     case "add":
//       contacts.addContact(name, email, phone);
//       break;

//     case "remove":
//       contacts.removeContact(id);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);

const express = require("express");
const app = express();
const cors = require("cors");
const contacts = require("./contacts.js");

app.use(express.json());

app.get("/contacts", async (req, res, next) => {
  const getListContacts = await contacts.listContacts();
  return res.send(getListContacts);
});

app.get("/contacts/:contactId", async (req, res, next) => {
  const id = parseInt(req.params.contactId);
  const getContactId = await contacts.getContactById(id);
  return res.send(getContactId);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
