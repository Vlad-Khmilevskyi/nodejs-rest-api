import express from "express";

import controllersService from "../../controllers/controllers.js";

import { upload, authenticate, isEmptyBody, isPatchBody, isValidId } from "../../middlewares/index.js"

import { validateBody } from "../../decorators/index.js"

import contactsAddSchema from "../../schemas/contacts-schemas.js"

const contactsRouter = express.Router()

contactsRouter.use(authenticate);

contactsRouter.get('/', controllersService.listContacts)

contactsRouter.get('/:id', isValidId, controllersService.getContactById)

contactsRouter.post('/', upload.single("avatars"), isEmptyBody, validateBody(contactsAddSchema.contactsAddSchema), controllersService.addContact)

contactsRouter.put('/:id', isValidId, isEmptyBody, validateBody(contactsAddSchema.contactsAddSchema), controllersService.updateContact)

contactsRouter.patch('/:id/favorite', isValidId, isPatchBody, validateBody(contactsAddSchema.contactUpdateFavoriteSchema), controllersService.updateFavorite)

contactsRouter.delete('/:id', isValidId, controllersService.removeContact)

export default contactsRouter;
