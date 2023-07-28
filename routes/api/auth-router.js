import express from "express";

import authController from "../../controllers/auth-controller.js";

import { validateBody } from "../../decorators/index.js"

import usersSchema from "../../schemas/users-schemas.js"

import {authenticate} from "../../middlewares/index.js"

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchema.userValidationSchema), authController.singup);

authRouter.post("/login", validateBody(usersSchema.userValidationSchema), authController.singin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout)

export default authRouter;