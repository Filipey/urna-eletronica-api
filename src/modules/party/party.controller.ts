import { Party } from "@prisma/client";
import { Request, Router } from "express";
import { handle } from "../../middlewares/assert-error";
import { partyService } from "../../utils/services";

const partyRouter = Router();

partyRouter.get("/", async (_req, res) => {
  try {
    const parties = await partyService.findAll();
    return res.status(200).json(parties);
  } catch (error) {
    handle(error, res);
  }
});

partyRouter.get(
  "/number",
  async (
    req: Request<object, object, object, { partyNumber: string }>,
    res
  ) => {
    const { partyNumber } = req.query;

    try {
      const party = await partyService.findByNumber(partyNumber);
      return res.status(200).json(party);
    } catch (error) {
      handle(error, res);
    }
  }
);

partyRouter.get(
  "/candidates",
  async (
    req: Request<object, object, object, { partyNumber: string }>,
    res
  ) => {
    const { partyNumber } = req.query;

    try {
      const candidates = await partyService.findPartyCandidates(partyNumber);
      return res.status(200).json(candidates);
    } catch (error) {
      handle(error, res);
    }
  }
);

partyRouter.post(
  "/",
  async (req: Request<object, object, Party, object>, res) => {
    const party = req.body;

    try {
      await partyService.save(party);
      return res.status(201).json({ message: "OK" });
    } catch (error) {
      handle(error, res);
    }
  }
);

partyRouter.put(
  "/",
  async (req: Request<object, object, Party, { partyNumber: string }>, res) => {
    const partyDTO = req.body;
    const { partyNumber } = req.query;

    try {
      await partyService.update(partyDTO, partyNumber);
      return res.status(204).json({ message: "OK" });
    } catch (error) {
      handle(error, res);
    }
  }
);

partyRouter.delete(
  "/",
  async (
    req: Request<object, object, object, { partyNumber: string }>,
    res
  ) => {
    const { partyNumber } = req.query;

    try {
      await partyService.delete(partyNumber);
      return res.status(204).json({ message: "OK" });
    } catch (error) {
      handle(error, res);
    }
  }
);

export { partyRouter };
