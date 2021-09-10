import { Router } from "express";

import * as controller from "@/controllers/client/activities";

const router = Router();

router.get("/dates", controller.getAllDays);
router.get("/date/:dateText", controller.getByDateTextByLocation);

export default router;
