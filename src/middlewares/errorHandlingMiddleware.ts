import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import InvalidEmailError from "@/errors/InvalidEmail";
import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import InvalidDataError from "@/errors/InvalidData";
import ConflictError from "@/errors/ConflictError";
import UnauthorizedError from "@/errors/Unauthorized";
import NotFoundError from "@/errors/NotFoundError";
import NotFoundBooking from "@/errors/NotFoundBooking";
import AlreadyPaidBooking from "@/errors/AlreadyPaidBooking";
import CannotPickHotelError from "@/errors/CannotPickHotelError";
import InvalidDate from "@/errors/InvalidDate";
import NotAllowedUpdateBooking from "@/errors/NotAllowedUpdateBooking";
import CannotGetCertificate from "@/errors/CertificateBeforeEventEnds";

/* eslint-disable-next-line */
export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line
) {
  if (err instanceof InvalidEmailError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof CannotEnrollBeforeStartDateError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof InvalidDataError) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof ConflictError) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err instanceof NotFoundBooking) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message
    });
  }

  if (err instanceof NotAllowedUpdateBooking) {
    return res.status(httpStatus.NOT_ACCEPTABLE).send({
      message: err.message
    });
  }

  if (err instanceof AlreadyPaidBooking) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    });
  }
  
  if (err instanceof CannotPickHotelError) {
    return res
      .status(httpStatus.FORBIDDEN)
      .send({ message: err.message, details: err.details, driventCode: err.driventCode });
  }

  if (err instanceof InvalidDate) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: err.message });
  }

  if(err instanceof CannotGetCertificate) {
    return res
      .status(httpStatus.NOT_ACCEPTABLE)
      .send({ message: err.message, details: err.details, driventCode: err.driventCode });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!",
  });
}
