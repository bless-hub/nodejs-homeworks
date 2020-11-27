const Joi = require("joi");
const functionContacts = require("../contacts");

// TODO: задокументировать каждую функцию
class ContactController {
  async getListContacts(req, res, next) {
    const list = await functionContacts.listContacts();
    return res.send(list);
  }

  async getContactId(req, res, next) {
    const id = parseInt(req.params.contactId);
    const getContactId = await functionContacts.getContactById(id);
    if (getContactId) {
      return res.status(200).send(getContactId);
    } else {
      res.status(404).send({ message: "not found" });
    }
  }

  async validContact(req, res, next) {
    // validation
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send({ message: "missing required name field" });
    }
    next();
  }
  async createContact(req, res, next) {
    const { name, email, phone } = req.body;
    const addContact = await functionContacts.addContact(req.body);
    console.log(addContact);
    return res.status(201).send(addContact);
  }

  async removeContact(req, res, next) {
    const id = parseInt(req.params.contactId);
    const getContactId = await functionContacts.getContactById(id);
    const remove = await functionContacts.removeContact(id);
    if (!getContactId) {
      res.send({ message: "contact not found" });
    } else {
      res.send({ message: `contact id # ${id}  deleted` });
    }
  }

  async updateContact(req, res, next) {
    const id = parseInt(req.params.contactId);
    const { name, email, phone } = req.body;
    const getContactId = await functionContacts.getContactById(id);
    const result = await functionContacts.updateContact(id, req.body);
    if (!getContactId) {
      return res.status(404).send({ message: "Not found" });
    } else {
      return res.send(result);
    }
  }
}

module.exports = new ContactController();
