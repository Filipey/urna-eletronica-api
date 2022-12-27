import { Person, PrismaClient } from "@prisma/client";
import { VotedCandidateDTO } from "../Candidate/dtos/VotedCandidate.dto";

export class PersonService {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<Person[]> {
    return await this.db.person.findMany();
  }

  async findByCpf(cpf: string): Promise<Person> {
    return await this.db.person.findUniqueOrThrow({ where: {
      cpf: cpf
    }});
  }

  async findAvailableVoters(): Promise<Person[]> {
    return await this.db.person.findMany({ where: {
      hasVoted: false
    }});
  }

  async findPersonVotesByCpf(cpf: string): Promise<VotedCandidateDTO[]> {
    const candidates: VotedCandidateDTO[] =  await this.db.vote.findMany({ where: {
      personCpf: cpf
    }, select: {
      candidate: {
        select: {
          name: true,
          picture: true,
          party: {
            select: {
              name: true
            }
          },
          partyNumber: true,
          role: true,
          uf: true,          
        }
      }
    }});

    return candidates;

  }

  async save(person: Person): Promise<void> {
    await this.db.person.create({ data: person });
  }

  async deleteByCpf(cpf: string): Promise<void> {
    await this.db.person.delete({ where: {
      cpf: cpf
    }});
  }

  async update(person: Person, cpf: string): Promise<Person> {
    return await this.db.person.update({ where: {
      cpf: cpf
    }, data: person});
  }
}
