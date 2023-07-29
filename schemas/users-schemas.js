import Joi from "joi";

import { emailPegexp } from "../constants/user-constants.js"; 

const userValidationSchema = Joi.object({
  email: Joi.string().pattern(emailPegexp).required().messages({
    "any.required": `missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
  }),
})

export default {
  userValidationSchema,
}