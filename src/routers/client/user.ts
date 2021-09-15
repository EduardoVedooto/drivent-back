import { Router } from "express";

import * as controller from "@/controllers/client/user";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import createNewUserSchema from "@/schemas/createNewUser";
import emailValidationMiddleware from "@/middlewares/emailValidationMiddleware";
import passwordValidationMiddleware from "@/middlewares/passwordValidationMiddleware";

const router = Router();

router.post("/", schemaValidatingMiddleware(createNewUserSchema), controller.signUp);
router.post("/reset-password", emailValidationMiddleware, controller.resetPassword);
router.post("/new-password", passwordValidationMiddleware, controller.saveNewPassword);

export default router;
