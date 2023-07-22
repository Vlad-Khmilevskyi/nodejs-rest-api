import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const fileContacts = path.resolve("models", "contacts.json");

const updateContacts = contacts => fs.writeFile(fileContacts, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(fileContacts);
  return JSON.parse(data);
}

const getContactById = async(id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

const addContact = async ({ name, email, phone }) => {
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

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if(index === -1){
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const result = contacts.findIndex((item) => item.id === id );
  if (result === -1) {
    return null;
  }
  contacts[result] = { id, ...body };
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
