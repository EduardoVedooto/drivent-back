import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/ticket";

export async function getTicketOptions(req: Request, res: Response) {
  const tiketOptions = await service.getTicketOptions();
  if(!tiketOptions) return res.sendStatus(httpStatus.NOT_FOUND);

  res.status(httpStatus.CREATED).send(tiketOptions);
}

