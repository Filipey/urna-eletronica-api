import { PrismaClient, Vote } from "@prisma/client";
import { VotesAccuracyDTO } from "./dtos/votes-accuracy-dto";

export class VoteService {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<Vote[]> {
    return await this.db.vote.findMany();
  }

  async findAllPresidentVotes(): Promise<Vote[]> {
    return await this.db.vote.findMany({
      where: {
        candidate: {
          role: "PRESIDENT",
        },
      },
      orderBy: [
        {
          timestamp: "asc",
        },
      ],
    });
  }

  async findAllSenatorsVotes(): Promise<Vote[]> {
    return await this.db.vote.findMany({
      where: {
        candidate: {
          role: "SENATOR",
        },
      },
      orderBy: [
        {
          timestamp: "asc",
        },
      ],
    });
  }

  async findAllGovernorsVotes(): Promise<Vote[]> {
    return await this.db.vote.findMany({
      where: {
        candidate: {
          role: "GOVERNOR",
        },
      },
      orderBy: [
        {
          timestamp: "asc",
        },
      ],
    });
  }

  async findTotalVotesAccuracy(): Promise<VotesAccuracyDTO> {
    const totalVotes = (await this.db.person.count()) * 5;
    const countedVotes = await this.db.vote.count();
    const remainingVotes = totalVotes - countedVotes;
    const percent = (100 * countedVotes) / totalVotes;
    const clearedVotes = isNaN(percent) ? "0%" : percent.toFixed(2) + "%";

    return { totalVotes, countedVotes, remainingVotes, clearedVotes };
  }

  async findPresidentAccuracy(): Promise<VotesAccuracyDTO> {
    const totalVotes = await this.db.person.count();
    const countedVotes = await this.db.vote.count({
      where: {
        candidate: {
          role: "PRESIDENT",
        },
      },
    });
    const remainingVotes = totalVotes - countedVotes;
    const percent = (100 * countedVotes) / totalVotes;
    const clearedVotes = isNaN(percent) ? "0%" : percent.toFixed(2) + "%";

    return { totalVotes, countedVotes, remainingVotes, clearedVotes };
  }

  async findGovernorAccuracy(): Promise<VotesAccuracyDTO> {
    const totalVotes = await this.db.person.count();
    const countedVotes = await this.db.vote.count({
      where: {
        candidate: {
          role: "GOVERNOR",
        },
      },
    });
    const remainingVotes = totalVotes - countedVotes;
    const percent = (100 * countedVotes) / totalVotes;
    const clearedVotes = isNaN(percent) ? "0%" : percent.toFixed(2) + "%";

    return { totalVotes, countedVotes, remainingVotes, clearedVotes };
  }

  async findSenatorAccuracy(): Promise<VotesAccuracyDTO> {
    const totalVotes = await this.db.person.count();
    const countedVotes = await this.db.vote.count({
      where: {
        candidate: {
          role: "SENATOR",
        },
      },
    });
    const remainingVotes = totalVotes - countedVotes;
    const percent = (100 * countedVotes) / totalVotes;
    const clearedVotes = isNaN(percent) ? "0%" : percent.toFixed(2) + "%";

    return { totalVotes, countedVotes, remainingVotes, clearedVotes };
  }

  async findCongressmanAccuracy(): Promise<VotesAccuracyDTO> {
    const totalVotes = await this.db.person.count();
    const countedVotes = await this.db.vote.count({
      where: {
        candidate: {
          role: "CONGRESSMAN",
        },
      },
    });
    const remainingVotes = totalVotes - countedVotes;
    const percent = (100 * countedVotes) / totalVotes;
    const clearedVotes = isNaN(percent) ? "0%" : percent.toFixed(2) + "%";

    return { totalVotes, countedVotes, remainingVotes, clearedVotes };
  }

  async findRepresentativeAccuracy(): Promise<VotesAccuracyDTO> {
    const totalVotes = await this.db.person.count();
    const countedVotes = await this.db.vote.count({
      where: {
        candidate: {
          role: "REPRESENTATIVE",
        },
      },
    });
    const remainingVotes = totalVotes - countedVotes;
    const percent = (100 * countedVotes) / totalVotes;
    const clearedVotes = isNaN(percent) ? "0%" : percent.toFixed(2) + "%";

    return { totalVotes, countedVotes, remainingVotes, clearedVotes };
  }

  async vote(personCpf: string, candidateNumber: number): Promise<void> {
    const ephocDate = new Date().getTime() / 1000;

    await this.db.vote.create({
      data: {
        personCpf: personCpf,
        candidateNumber: candidateNumber,
        timestamp: ephocDate,
      },
    });
  }
}
