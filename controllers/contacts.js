import Joi from "joi";

import contactsService from "../models/contacts.js";

import {HttpError} from "../helpers/index.js"

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
})

export const listContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result)
  }
  catch(error) {
    next(error)
  }
}

export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404)
    }
    res.json(result);    
  }
  catch (error) {
    next(error)
  }
}

export const addContact = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result)
  }
  catch (error) {
    next(error);
  }
}

export const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404)
    }

    res.json({
      message: "contact deleted"
    })
  }
  catch (error) {
    next(error)
  }
}

export const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId , req.body);

    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.json(result);
  }
  catch(error) {
    next(error);
  }
}

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}