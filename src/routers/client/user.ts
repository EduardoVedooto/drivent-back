import { Router } from "express";

import * as controller from "@/controllers/client/user";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import createNewUserSchema from "@/schemas/createNewUser";
import emailValidationMiddleware from "@/middlewares/emailValidationMiddleware";

const router = Router();

router.post("/", schemaValidatingMiddleware(createNewUserSchema), controller.signUp);
router.post("/reset-password", emailValidationMiddleware, controller.resetPassword);

export default router;
