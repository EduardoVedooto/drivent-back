import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/:bypassParam?", controller.getHotels);

export default router;
