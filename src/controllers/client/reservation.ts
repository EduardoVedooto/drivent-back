import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/reservation";
import BodyInfoForBooking from "@/interfaces/bodyInfoForBooking";

export async function createReservation(req: Request, res: Response) {
  const { type, hotel, enrollmentId } = req.body as BodyInfoForBooking;

  const reservation = await service.createReservation({ type, hotel, enrollmentId });
  if(!reservation) return res.sendStatus(httpStatus.NOT_FOUND);

  res.status(httpStatus.CREATED).send(reservation);
}

