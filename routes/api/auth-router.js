import express from "express";

import authController from "../../controllers/auth-controller.js";

import { validateBody } from "../../decorators/index.js"

import usersSchema from "../../schemas/users-schemas.js"

import {authenticate, upload} from "../../middlewares/index.js"

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchema.userValidationSchema), authController.singup);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post("/verify", validateBody(usersSchema.emailSchema), authController.resendVerifyEmail)

authRouter.post("/login", validateBody(usersSchema.userValidationSchema), authController.singin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);

export default authRouter;