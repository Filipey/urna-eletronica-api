import { Router } from "express";
import { candidateRouter } from "./modules/candidate/candidate.controller";
import { partyRouter } from "./modules/party/party.controller";
import { personRouter } from "./modules/person/person.controller";
import { voteRouter } from "./modules/vote/vote.controller";

const appRouter = Router();

appRouter.use("/person", personRouter);
appRouter.use("/candidate", candidateRouter);
appRouter.use("/party", partyRouter);
appRouter.use("/vote", voteRouter);

export { appRouter };
