import { Request, Router } from "express";
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
    const person = await personService.findByCpf(cpf);

    return res.status(200).json(person);
  }
);

personRouter.get("/voters", async (req, res) => {
  const voters = await personService.findAvailableVoters();

  return res.status(200).json(voters);
});

personRouter.get(
  "/cpf/votes",
  async (req: Request<object, object, object, { cpf: string }>, res) => {
    const { cpf } = req.query;
    const votes = await personService.findPersonVotesByCpf(cpf);

    return res.status(200).json(votes);
  }
);

personRouter.post(
  "/",
  async (req: Request<object, object, CreatePersonDTO, object>, res) => {
    const person = req.body;
    await personService.save(person);

    return res.status(201).send({
      message: "OK",
    });
  }
);

personRouter.delete(
  "/cpf",
  async (req: Request<object, object, object, { cpf: string }>, res) => {
    const { cpf } = req.query;

    await personService.deleteByCpf(cpf);

    return res.status(204);
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

    await personService.update(updatedPerson, cpf);

    return res.status(204).json(updatedPerson);
  }
);

export { personRouter };
