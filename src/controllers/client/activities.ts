import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activities";
import InvalidDate from "@/errors/InvalidDate";
import dateSchema from "@/schemas/date";

export async function getAllDays(req: Request, res: Response) {
  const result = await service.getAllDays();
  res.status(httpStatus.OK).send(result);
}

export async function getWithDateTextByLocation(req: Request, res: Response) {
  const { dateText } = req.params;

  const { error } = dateSchema.validate(dateText);
  if (error) throw new InvalidDate(dateText);
  const result = await service.getWithDateTextByLocation(dateText);
  res.status(httpStatus.OK).send(result);
}
