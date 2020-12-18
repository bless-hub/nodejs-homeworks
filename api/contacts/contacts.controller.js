const Joi = require("joi");
const ContactModel = require("./contact.model");

class ContactController {
  getListContacts = async (req, res, next) => {
    try {
      const contacts = await ContactModel.getContacts();

      res.status(200).json(contacts);
    } catch (e) {
      next(e);
    }
  };

  async getContactId(req, res, next) {
    try {
      const { contactId } = req.params;
      const getContactId = await ContactModel.getContactById(contactId);
      console.log(getContactId);
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
      password: Joi.string(),
      subscription: Joi.string(),
    });
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res.status(400).send({ message: "missing required name field" });
    }
    next();
  };

  validContactUpdate = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      password: Joi.string(),
      subscription: Joi.string(),
    }).min(1);
    const validationUpRes = schema.validate(req.body);
    if (validationUpRes.error) {
      return res.status(400).send({ message: "missing required name field" });
    }
    next();
  };

  async createContact(req, res, next) {
    try {
      const { body } = req;
      const newContact = await ContactModel.addContact(body);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }

  async removeContact(req, res, next) {
    try {
      const { contactId } = req.params;
      console.log(contactId);
      await ContactModel.removeContact(contactId);
      res.status(200).json({ message: "contact removed" });
    } catch (e) {
      res.status(404).json({ message: "contact not found" });
    }
  }

  async updateContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const { ...data } = req.body;
      const result = await ContactModel.updateContact(contactId, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).send({ message: "not found" });
    }
  }
}

module.exports = new ContactController();
