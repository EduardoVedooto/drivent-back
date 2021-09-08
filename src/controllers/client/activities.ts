import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activities";

export async function getAllDays(req: Request, res: Response) {
  service.getAllDays();
  res.status(httpStatus.NOT_IMPLEMENTED);
}
