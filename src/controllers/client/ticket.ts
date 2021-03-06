import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/ticket";

export async function getTicketOptions(req: Request, res: Response) {
  const tiketOptions = await service.getTicketOptions();

  res.status(httpStatus.OK).send(tiketOptions);
}

