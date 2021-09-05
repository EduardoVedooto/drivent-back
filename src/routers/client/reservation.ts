import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

const router = Router();

router.post("/",  controller.createReservation);
router.get("/",  controller.getAllReservations);
router.get("/:enrollmentId/find",  controller.findReservation);
router.post("/:bookingId/payment",  controller.updatePaymentStatus);

export default router;
