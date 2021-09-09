import { Router } from "express";

import * as controller from "@/controllers/client/bookingRoom";

const router = Router();

router.post("/", controller.addGuest);

export default router;
