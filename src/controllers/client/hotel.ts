import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";

export async function getHotels(req: Request, res: Response) {
  const { bypassParam } = req.params;
  const bypass = parseInt(bypassParam);
  const hotelsForUser = await hotelService.getHotels(req.user.id, bypass);
  if(hotelsForUser.length < 1) return res.sendStatus(httpStatus.NO_CONTENT);
  res.status(httpStatus.OK).send(hotelsForUser);
}
