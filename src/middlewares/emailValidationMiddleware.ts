import InvalidEmailError from "@/errors/InvalidEmail";
import { Request, Response, NextFunction } from "express";
import emailSchema from "@/schemas/email";

export default function emailValidationMiddleware(
  req: Request,
  _res: Response, //eslint-disable-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const { email } = req.body;
  const { error } = emailSchema.validate(email);

  if(error) throw new InvalidEmailError(email);

  next();
}
