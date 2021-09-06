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

export async function updatePaymentStatus(req: Request, res: Response) {
  const bookingId = Number(req.params.bookingId);
  //if (isNaN(bookingId) || !bookingId) return res.status(httpStatus.BAD_REQUEST); //verificar depois

  const reservations = await service.updatePaymentStatus(bookingId);

  res.status(httpStatus.OK).send(reservations);
}

export async function findReservation(req: Request, res: Response) {
  const enrollmentId = Number(req.params.enrollmentId);
  // if (isNaN(enrollmentId) || !enrollmentId) return res.status(httpStatus.BAD_REQUEST); verificar depois

  const reservation = await service.findByEnrollmentId(enrollmentId);
  if(!reservation) return res.sendStatus(httpStatus.NOT_FOUND);

  res.status(httpStatus.OK).send(reservation);
}

export async function getAllReservations(req: Request, res: Response) {
  const reservations = await service.getAllReservations();

  res.status(httpStatus.OK).send(reservations);
}
