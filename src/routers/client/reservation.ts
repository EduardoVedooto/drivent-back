import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

const router = Router();

router.post("/",  controller.createReservation);
router.get("/:enrollmentId/find",  controller.findReservation);

export default router;
