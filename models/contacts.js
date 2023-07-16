import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const fileContacts = path.resolve("models", "contacts.json");

const updateContacts = contacts => fs.writeFile(fileContacts, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(fileContacts);
  return JSON.parse(data);
}

export const getContactById = async(id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  contacts.push(newContacts);
  await updateContacts(contacts);
  return newContacts;
}

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if(index === -1){
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId );
  if (result === -1) {
    return null;
  }
  contacts[result] = { id: contactId, ...body };
  await updateContacts(contacts);
  return contacts[result];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
