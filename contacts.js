// contacts.js

const fs = require("fs").promises;
const { constants } = require("buffer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию

async function listContacts() {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  return data;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactWithId = await contacts.find(
    (contact) => contact.id === contactId
  );
  console.log(contactWithId);
  return contactWithId;
}

async function removeContact(contactId) {
  const array = await listContacts();
  const newContacts = array.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, ""));
  console.log("Contact id #", contactId, "deleted");
}

async function addContact({ name, email, phone }) {
  const contact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  const contacts = await listContacts();
  const newContacts = [...contacts, contact];
  const writeNewContact = await JSON.stringify(newContacts, null, 5);
  fs.writeFile(contactsPath, writeNewContact);
  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
