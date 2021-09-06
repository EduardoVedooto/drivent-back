import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/booking";
import BodyInfoForBooking from "@/interfaces/bodyInfoForBooking";

export async function createBooking(req: Request, res: Response) {
  const { type, hotel, enrollmentId } = req.body as BodyInfoForBooking;

  const booking = await service.createBooking({ type, hotel, enrollmentId });
  if(!booking) return res.sendStatus(httpStatus.NOT_FOUND);

  res.status(httpStatus.CREATED).send(booking);
}

export async function updatePaymentStatus(req: Request, res: Response) {
  const bookingId = Number(req.params.bookingId);
  
  const bookings = await service.updatePaymentStatus(bookingId);

  res.status(httpStatus.OK).send(bookings);
}

export async function findBooking(req: Request, res: Response) {
  const enrollmentId = Number(req.params.enrollmentId);
  
  const booking = await service.findByEnrollmentId(enrollmentId);
  if(!booking) return res.sendStatus(httpStatus.NOT_FOUND);

  res.status(httpStatus.OK).send(booking);
}

export async function getAllBookings(req: Request, res: Response) {
  const bookings = await service.getAllBookings();

  res.status(httpStatus.OK).send(bookings);
}
