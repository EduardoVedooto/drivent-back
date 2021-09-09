import { Router } from "express";

import * as controller from "@/controllers/client/room";

const router = Router();

router.get("/:hotelId", controller.getRoomsByHotelId);

export default router;
