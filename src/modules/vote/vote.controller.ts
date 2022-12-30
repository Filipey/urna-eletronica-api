import { Request, Router } from "express";
import { handle } from "../../middlewares/assert-error";
import { voteService } from "../../utils/services";
import { PersonVoteDTO } from "./dtos/person-vote-dto";

const voteRouter = Router();

voteRouter.get("/", async (_req, res) => {
  try {
    const votes = await voteService.findAll();
    return res.status(200).json(votes);
  } catch (error) {
    handle(error, res);
  }
});

voteRouter.get("/president", async (_req, res) => {
  try {
    const votes = await voteService.findAllPresidentVotes();
    return res.status(200).json(votes);
  } catch (error) {
    handle(error, res);
  }
});

voteRouter.get("/senator", async (_req, res) => {
  try {
    const votes = await voteService.findAllSenatorsVotes();
    return res.status(200).json(votes);
  } catch (error) {
    handle(error, res);
  }
});

voteRouter.get("/governor", async (_req, res) => {
  try {
    const votes = await voteService.findAllGovernorsVotes();
    return res.status(200).json(votes);
  } catch (error) {
    handle(error, res);
  }
});

voteRouter.get("/accuracy", async (_req, res) => {
  try {
    const accuracy = await voteService.findTotalVotesAccuracy();
    return res.status(200).json(accuracy);
  } catch (error) {
    handle(error, res);
  }
});

voteRouter.post(
  "/",
  async (req: Request<object, object, PersonVoteDTO, object>, res) => {
    const vote = req.body;

    try {
      await voteService.vote(vote.cpf, vote.candidateNumber);
      return res.status(201).send({ message: "OK" });
    } catch (error) {
      handle(error, res);
    }
  }
);

export { voteRouter };
