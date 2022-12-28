import { Request, Router } from "express";
import { handle } from "../../middlewares/assert-error";

import { personService } from "../../utils/services";
import { CreatePersonDTO } from "./dtos/create-person.dto";
import { UpdatePersonDTO } from "./dtos/update-person.dto";

const personRouter = Router();

personRouter.get("/", async (_req, res) => {
  const persons = await personService.findAll();

  return res.status(200).json(persons);
});

personRouter.get(
  "/cpf",
  async (req: Request<object, object, object, { cpf: string }>, res) => {
    const { cpf } = req.query;
    try {
      const person = await personService.findByCpf(cpf);
      return res.status(200).json(person);
    } catch (error) {
      handle(error, res);
    }
  }
);

personRouter.get("/voters", async (req, res) => {
  try {
    const voters = await personService.findAvailableVoters();
    return res.status(200).json(voters);
  } catch (error) {
    handle(error, res);
  }
});

personRouter.get(
  "/cpf/votes",
  async (req: Request<object, object, object, { cpf: string }>, res) => {
    const { cpf } = req.query;

    try {
      const votes = await personService.findPersonVotesByCpf(cpf);
      return res.status(200).json(votes);
    } catch (error) {
      handle(error, res);
    }
  }
);

personRouter.post(
  "/",
  async (req: Request<object, object, CreatePersonDTO, object>, res) => {
    const person = req.body;
    try {
      await personService.save(person);
      return res.status(201).send({
        message: "OK",
      });
    } catch (error) {
      handle(error, res);
    }
  }
);

personRouter.delete(
  "/cpf",
  async (req: Request<object, object, object, { cpf: string }>, res) => {
    const { cpf } = req.query;

    try {
      const deletedPerson = await personService.deleteByCpf(cpf);
      return res.status(200).json(deletedPerson);
    } catch (error) {
      handle(error, res);
    }
  }
);

personRouter.put(
  "/cpf",
  async (
    req: Request<object, object, UpdatePersonDTO, { cpf: string }>,
    res
  ) => {
    const { cpf } = req.query;
    const updatedPerson = req.body;

    try {
      await personService.update(updatedPerson, cpf);
      return res.status(204).json(updatedPerson);
    } catch (error) {
      handle(error, res);
    }
  }
);

export { personRouter };
