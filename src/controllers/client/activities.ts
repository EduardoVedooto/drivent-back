import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activities";

export async function getAllDays(req: Request, res: Response) {
  const result = await service.getAllDays();
  res.status(httpStatus.OK).send(result);
}
