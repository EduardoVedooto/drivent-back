import { Request, Response } from "express";

import * as service from "@/services/client/certificate";

export async function get(req: Request, res: Response) {
  const userId = req.user.id;
  const certifcate = await service.get(userId);
  res.send(certifcate);
}
