import fs from "fs/promises";
import path from "path";

import Contact from "../models/contact.js";

import {ctrlWrapper} from "../decorators/index.js";

import {HttpError} from "../helpers/index.js"

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({owner});
  res.json(result)
}

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404)
  }
  res.json(result);
}

const avatarPath = path.resolve("public", "avatars");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  
  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars",  filename)
  const result = await Contact.create({...req.body, avatar, owner});
  res.status(201).json(result)
}

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

  if (!result) {
    throw HttpError(404, "Not found")
  }

  res.json(result);
}

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

  if (!result) {
    throw HttpError(404, "Not found")
  }

  res.json(result);
}

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404)
  }

  res.json({
    message: "contact deleted"
  })
}

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),  
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
}