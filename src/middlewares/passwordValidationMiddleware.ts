import InvalidPasswordError from "@/errors/InvalidPassword";
import { Request, Response, NextFunction } from "express";
import passwordSchema from "@/schemas/password";

export default function passwordValidationMiddleware(
  req: Request,
  _res: Response, //eslint-disable-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const validatePassword = { 
    password: req.body.password as string, 
    confirmPassword: req.body.confirmPassword as string
  };
  const { error } = passwordSchema.validate(validatePassword);

  if(error) throw new InvalidPasswordError(error.details[0].message);

  next();
}
