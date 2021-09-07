import { Router } from "express";

import * as controller from "@/controllers/client/booking";

const router = Router();

router.post("/",  controller.createBooking);
router.get("/",  controller.getAllBookings);
router.get("/:enrollmentId/find",  controller.findBooking);
router.post("/:bookingId/payment",  controller.updatePaymentStatus);

export default router;
