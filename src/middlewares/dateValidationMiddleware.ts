import { Request, Response, NextFunction } from "express";

import dateSchema from "@/schemas/date";
import InvalidDate from "@/errors/InvalidDate";

export default async function dateValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { dateText } = req.params;

  const { error } = dateSchema.validate(dateText);
  if (error) throw new InvalidDate(dateText);

  req.dateParam = { ISOFormat: dateText };

  next();
}
