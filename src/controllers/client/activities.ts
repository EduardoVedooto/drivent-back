import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activities";
import ActivityEnrollment from "@/interfaces/ActivityEnrollment";

export async function getAllDays(_req: Request, res: Response) {
  const result = await service.getAllDays();
  res.status(httpStatus.OK).send(result);
}

export async function getByDateTextByLocation(req: Request, res: Response) {
  const dateText = req.dateParam.ISOFormat;
  const result = await service.getByDateTextByLocation(dateText);
  res.status(httpStatus.OK).send(result);
}

export async function postActivityEnrollment(req: Request, res: Response) {
  const { bookingId, activityId } = req.body as ActivityEnrollment;
  await service.postActivityEnrollment(activityId, bookingId);
  res.sendStatus(httpStatus.CREATED);
}

export async function getAllActivities(req: Request, res: Response) {
  const result = await service.getAllActivities();
  res.status(httpStatus.OK).send(result);
}
