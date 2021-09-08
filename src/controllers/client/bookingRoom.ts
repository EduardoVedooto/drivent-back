import { Request, Response } from "express";
import httpStatus from "http-status";

import * as bookingRoomService from "@/services/client/bookingRoom";

export async function addGuest(req: Request, res: Response) {  
  const roomId: number = req.body.roomId;
  const userId = req.user.id;
  const roomForGuest = await bookingRoomService.bookRoom(roomId, userId);
  if(roomForGuest === false) return res.sendStatus(httpStatus.NOT_FOUND);
  else if(roomForGuest === null) return res.sendStatus(httpStatus.CONFLICT);
  else res.sendStatus(httpStatus.CREATED);
}

export async function findGuest(req: Request, res: Response) {
  const userId = req.user.id;
  const findRoomByUserId = await bookingRoomService.findRoom(userId);
  if(findRoomByUserId) return res.send(findRoomByUserId).status(httpStatus.OK);
  else return res.sendStatus(httpStatus.NOT_FOUND);
}
