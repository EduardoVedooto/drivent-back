import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/user";

export async function signUp(req: Request, res: Response) {
  const user = await service.createNewUser(req.body.email, req.body.password);
  res.status(httpStatus.CREATED).send(user);
}

export async function resetPassword(req: Request, res: Response) {
  const email: string = req.body.email;
  service.resetPassword(email);
  res.sendStatus(httpStatus.OK);
}

export async function saveNewPassword(req: Request, res: Response) {
  const { password, token }: {password: string, token: string} = req.body;
  const user = await service.saveNewPassword(password, token);
  res.status(httpStatus.CREATED).send(user);
}
