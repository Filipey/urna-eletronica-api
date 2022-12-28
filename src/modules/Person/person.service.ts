import { Person, PrismaClient } from "@prisma/client";
import { VotedCandidateDTO } from "../Candidate/dtos/voted-candidate-dto";
import { CreatePersonDTO } from "./dtos/create-person.dto";
import { UpdatePersonDTO } from "./dtos/update-person.dto";

export class PersonService {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<Person[]> {
    return await this.db.person.findMany();
  }

  async findByCpf(cpf: string): Promise<Person> {
    return await this.db.person.findUniqueOrThrow({
      where: {
        cpf: cpf,
      },
    });
  }

  async findAvailableVoters(): Promise<Person[]> {
    return await this.db.person.findMany({
      where: {
        hasVoted: false,
      },
    });
  }

  async findPersonVotesByCpf(cpf: string): Promise<VotedCandidateDTO[]> {
    const candidates = await this.db.vote.findMany({
      where: {
        personCpf: cpf,
      },
      select: {
        candidate: {
          select: {
            name: true,
            picture: true,
            party: {
              select: {
                name: true,
                number: true,
              },
            },
            role: true,
            uf: true,
          },
        },
      },
    });

    return candidates;
  }

  async save(personDTO: CreatePersonDTO): Promise<Person> {
    return await this.db.person.create({ data: personDTO });
  }

  async deleteByCpf(cpf: string): Promise<Person> {
    return await this.db.person.delete({
      where: {
        cpf: cpf,
      },
    });
  }

  async update(personDTO: UpdatePersonDTO, cpf: string): Promise<Person> {
    const person = await this.findByCpf(cpf);
    const updatedPerson = {
      ...person,
      name: personDTO.name,
      picture: personDTO.picture,
      uf: personDTO.uf,
    };

    return await this.db.person.update({
      where: {
        cpf: cpf,
      },
      data: updatedPerson,
    });
  }
}
