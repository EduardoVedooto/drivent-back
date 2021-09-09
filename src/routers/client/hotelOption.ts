import { Router } from "express";

import * as controller from "@/controllers/client/hotelOption";

const router = Router();

router.get("/",  controller.getHotelOptions);

export default router;
