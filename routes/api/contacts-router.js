import express from "express";

import controllersService from "../../controllers/controllers.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js"

import { validateBody } from "../../decorators/index.js"

import contactsAddSchema from "../../schemas/contacts-schemas.js"

const contactsRouter = express.Router()

contactsRouter.get('/', controllersService.listContacts)

contactsRouter.get('/:id', isValidId, controllersService.getContactById)

contactsRouter.post('/', isEmptyBody, validateBody(contactsAddSchema.contactsAddSchema), controllersService.addContact)

contactsRouter.put('/:id', isValidId, isEmptyBody, validateBody(contactsAddSchema.contactsAddSchema), controllersService.updateContact)

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody, validateBody(contactsAddSchema.contactUpdateFavoriteSchema), controllersService.updateFavorite)

contactsRouter.delete('/:id', isValidId, controllersService.removeContact)

export default contactsRouter;
