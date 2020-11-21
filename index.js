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
const bodyParser = require("body-parser");

app.use(express.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/contacts", async (req, res, next) => {
  const getListContacts = await contacts.listContacts();
  return res.send(getListContacts);
});

app.get("/contacts/:contactId", async (req, res, next) => {
  const id = parseInt(req.params.contactId);
  const getContactId = await contacts.getContactById(id);
  if (getContactId) {
    return res.send(getContactId);
  } else {
    res.status(400).send({ message: "not found" });
  }
});
app.post("/contacts", async (req, res, next) => {
  console.log(res.body);
  const addContact = await contacts.addContact(req.body);
  res.send(addContact);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
