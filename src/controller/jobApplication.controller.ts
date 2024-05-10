import { Request, Response } from "express";

export function postJobApplication(req: Request, res: Response) {
  const data = req.body;
  console.log(data);
  res.end("api call successful");
}
