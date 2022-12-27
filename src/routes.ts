import { Router } from "express";
import { personRouter } from "./modules/Person/person.controller";

const appRouter = Router();

appRouter.use("/person", personRouter);

export { appRouter };
