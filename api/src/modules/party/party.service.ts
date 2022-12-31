import { Candidate, Party, PrismaClient } from "@prisma/client";

export class PartyService {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<Party[]> {
    return await this.db.party.findMany();
  }

  async findByNumber(partyNumber: string): Promise<Party> {
    return await this.db.party.findUniqueOrThrow({
      where: {
        number: parseInt(partyNumber),
      },
    });
  }

  async findPartyCandidates(partyNumber: string): Promise<Candidate[]> {
    return await this.db.candidate.findMany({
      where: {
        partyNumber: parseInt(partyNumber),
      },
    });
  }

  async save(party: Party): Promise<Party> {
    return await this.db.party.create({ data: party });
  }

  async update(party: Party, partyNumber: string): Promise<Party> {
    return await this.db.party.update({
      where: {
        number: parseInt(partyNumber),
      },
      data: party,
    });
  }

  async delete(partyNumber: string): Promise<Party> {
    return await this.db.party.delete({
      where: {
        number: parseInt(partyNumber),
      },
    });
  }
}
