import contactsService from "../models/contacts.js";

import {ctrlWrapper} from "../decorators/index.js";

import {HttpError} from "../helpers/index.js"

const listContacts = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result)
}

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);

  if (!result) {
    throw HttpError(404)
  }
  res.json(result);
}

const addContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result)
}

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);

  if (!result) {
    throw HttpError(404)
  }

  res.json({
    message: "contact deleted"
  })
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId , req.body);

  if (!result) {
    throw HttpError(404, "Not found")
  }

  res.json(result);
}

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
}