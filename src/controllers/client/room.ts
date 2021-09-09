import { Request, Response } from "express";
import httpStatus from "http-status";

import * as roomService from "@/services/client/room";

export async function getRoomsByHotelId(req: Request, res: Response) {  
  const hotelId = parseInt(req.params.hotelId);
  const roomsForHotel = await roomService.getRooms(hotelId);
  if(roomsForHotel.length < 1) return res.sendStatus(httpStatus.NO_CONTENT);
  res.status(httpStatus.OK).send(roomsForHotel);
}
