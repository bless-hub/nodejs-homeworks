// contacts.js

const fs = require("fs").promises;
const { constants } = require("buffer");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию

function listContacts() {
  return fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data);
  });
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  console.table(contacts.find((contact) => contact.id === contactId));
}

async function removeContact(contactId) {
  const array = await listContacts();
  const newContacts = array.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, ""));
  console.log("Contact id #", contactId, "deleted");
}

async function addContact(name, email, phone) {
  const contact = {
    name: name,
    email: email,
    phone: phone,
  };

  const contacts = await listContacts();
  const newContacts = [...contacts, contact];
  const writeNewContact = JSON.stringify(newContacts, null, 5);
  fs.writeFile(contactsPath, writeNewContact)
    .then(console.log(`contact name ${name} mail ${email} added`))
    .catch((error) => console.log(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
