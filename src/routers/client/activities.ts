import { Router } from "express";

import * as controller from "@/controllers/client/activities";
import dateValidationMiddleware from "@/middlewares/dateValidationMiddleware";

const router = Router();

router.get("/dates", controller.getAllDays);
router.get("/date/:dateText", dateValidationMiddleware, controller.getByDateTextByLocation);
router.post("/enroll", controller.postActivityEnrollment);
router.get("/", controller.getAllActivities);

export default router;
