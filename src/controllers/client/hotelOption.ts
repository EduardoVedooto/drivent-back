import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/hotelOption";

export async function getHotelOptions(req: Request, res: Response) {
  const hotelOptions = await service.getHotelOptions();

  res.status(httpStatus.OK).send(hotelOptions);
}

