import { Response } from "express";
import { assertIsError } from "../errors/interceptors/is-generic-error";

export function handle(error: unknown, res: Response) {
  assertIsError(error);
  return res.status(400).send({ error: error.message });
}
