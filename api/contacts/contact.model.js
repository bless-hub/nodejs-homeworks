const Contact = require("../schema/contacts.schema");

class ContactModel {
  constructor() {}
  getContacts = async () => {
    return await Contact.find();
  };
  getContactById = async (contactId) => {
    return await Contact.findById(contactId);
  };
  addContact = async (data) => {
    return await Contact.create(data);
  };
  updateContact = async (contactId, data) => {
    return await Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });
  };
  removeContact = async (contactId) => {
    return await Contact.findByIdAndRemove(contactId);
  };
}

module.exports = new ContactModel();
