const Joi = require("joi");
const contactModel = require("./contacts.module");

// TODO: задокументировать каждую функцию
class ContactController {
  getListContacts = async (req, res, next) => {
    try {
      const contacts = await contactModel.getContacts();
      res.status(200).json(contacts);
    } catch (e) {
      next(e);
    }
  };

  async getContactId(req, res, next) {
    try {
      const { contactId } = req.params;
      const getContactId = await contactModel.getContactById(contactId);
      res.status(200).send(getContactId);
    } catch (error) {
      res.status(404).send({ message: "not found" });
    }
  }

  validContact = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
      subscription: Joi.string(),
      token: Joi.string(),
    });
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res.status(400).send({ message: "missing required name field" });
    }
    next();
  };

  async createContact(req, res, next) {
    try {
      const { body } = req;
      const newContact = await contactModel.addContact(body);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }

  async removeContact(req, res, next) {
    try {
      const { contactId } = req.params;
      console.log(contactId);
      await contactModel.removeContact(contactId);
      res.status(200).json({ message: "contact removed" });
    } catch (e) {
      res.status(404).json({ message: "contact not found" });
    }
  }

  async updateContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const { ...data } = req.body;
      const result = await contactModel.updateContact(contactId, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).send({ message: "not found" });
    }
  }
}

module.exports = new ContactController();
