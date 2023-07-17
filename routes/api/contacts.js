import express from "express";

import controllersService from "../../controllers/contacts.js";

const contactsRouter = express.Router()

contactsRouter.get('/', controllersService.listContacts)

contactsRouter.get('/:id', controllersService.getContactById)

contactsRouter.post('/', controllersService.addContact)

contactsRouter.delete('/:id', controllersService.removeContact)

contactsRouter.put('/:contactId', controllersService.updateContact)

export default contactsRouter;
