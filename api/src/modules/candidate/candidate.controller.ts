import { Request, Router } from "express";
import { handle } from "../../middlewares/assert-error";
import { candidateService } from "../../utils/services";
import { CreateCandidateDTO } from "./dtos/create-candidate-dto";
import { UpdateCandidateDTO } from "./dtos/update-candidate-dto";

const candidateRouter = Router();

candidateRouter.get("/", async (_req, res) => {
  try {
    const candidates = await candidateService.findAll();
    return res.status(200).json(candidates);
  } catch (error) {
    handle(error, res);
  }
});

candidateRouter.get("/president", async (_req, res) => {
  try {
    const candidates = await candidateService.findAllPresidents();
    return res.status(200).json(candidates);
  } catch (error) {
    handle(error, res);
  }
});

candidateRouter.get("/governor", async (_req, res) => {
  try {
    const candidates = await candidateService.findAllGovernors();
    return res.status(200).json(candidates);
  } catch (error) {
    handle(error, res);
  }
});

candidateRouter.get("/senator", async (_req, res) => {
  try {
    const candidates = await candidateService.findAllSenators();
    return res.status(200).json(candidates);
  } catch (error) {
    handle(error, res);
  }
});

candidateRouter.get("/representative", async (_req, res) => {
  try {
    const candidates = await candidateService.findAllRepresentatives();
    return res.status(200).json(candidates);
  } catch (error) {
    handle(error, res);
  }
});

candidateRouter.get("/congressman", async (_req, res) => {
  try {
    const candidates = await candidateService.findAllCongressman();
    return res.status(200).json(candidates);
  } catch (error) {
    handle(error, res);
  }
});

candidateRouter.get(
  "/number",
  async (
    req: Request<object, object, object, { candidateNumber: string }>,
    res
  ) => {
    const { candidateNumber } = req.query;
    try {
      const candidate = await candidateService.findByNumber(candidateNumber);
      return res.status(200).json(candidate);
    } catch (error) {
      handle(error, res);
    }
  }
);

candidateRouter.get(
  "/accuracy",
  async (
    req: Request<object, object, object, { candidateNumber: string }>,
    res
  ) => {
    const { candidateNumber } = req.query;

    try {
      const accuracy = await candidateService.findCandidateAccuracy(
        candidateNumber
      );
      return res.status(200).json(accuracy);
    } catch (error) {
      handle(error, res);
    }
  }
);

candidateRouter.post(
  "/",
  async (
    req: Request<object, object, Omit<CreateCandidateDTO, "cpf">, object>,
    res
  ) => {
    const candidate = req.body;

    try {
      await candidateService.save(candidate);
      return res.status(201).json({ message: "OK" });
    } catch (error) {
      handle(error, res);
    }
  }
);

candidateRouter.post(
  "/scratch",
  async (req: Request<object, object, CreateCandidateDTO, object>, res) => {
    const candidate = req.body;

    try {
      await candidateService.saveCandidateFromScratch(candidate);
      return res.status(201).json({ message: "OK" });
    } catch (error) {
      handle(error, res);
    }
  }
);

candidateRouter.delete(
  "/",
  async (
    req: Request<object, object, object, { candidateNumber: string }>,
    res
  ) => {
    const { candidateNumber } = req.query;

    try {
      await candidateService.delete(candidateNumber);
      return res.status(204).json({ message: "OK" });
    } catch (error) {
      handle(error, res);
    }
  }
);

candidateRouter.put(
  "/",
  async (
    req: Request<
      object,
      object,
      UpdateCandidateDTO,
      { candidateNumber: number }
    >,
    res
  ) => {
    const { candidateNumber } = req.query;
    const candidateDto = req.body;

    try {
      await candidateService.update(candidateDto, candidateNumber);
      return res.status(204).json({ message: "OK" });
    } catch (error) {
      handle(error, res);
    }
  }
);

export { candidateRouter };
