import { Router } from "express";
import { candidateRouter } from "./modules/candidate/candidate.controller";
import { personRouter } from "./modules/person/person.controller";

const appRouter = Router();

appRouter.use("/person", personRouter);
appRouter.use("/candidate", candidateRouter);

export { appRouter };
