import express from "express";

import controllersService from "../../controllers/contacts.js";

import { isEmptyBody } from "../../middlewares/index.js"

import { validateBody } from "../../decorators/index.js"

import contactsAddSchema from "../../schemas/contacts-schemas.js"

const contactsRouter = express.Router()

contactsRouter.get('/', controllersService.listContacts)

contactsRouter.get('/:id', controllersService.getContactById)

contactsRouter.post('/', validateBody(contactsAddSchema.contactsAddSchema), controllersService.addContact)

contactsRouter.delete('/:id', controllersService.removeContact)

contactsRouter.put('/:contactId', isEmptyBody, validateBody(contactsAddSchema.contactsAddSchema), controllersService.updateContact)

export default contactsRouter;
