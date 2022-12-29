import { Candidate, PrismaClient } from "@prisma/client";
import { CandidateVotes } from "./dtos/candidate-votes";
import { CreateCandidateDTO } from "./dtos/create-candidate-dto";
import { UpdateCandidateDTO } from "./dtos/update-candidate-dto";

export class CandidateService {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<Candidate[]> {
    return await this.db.candidate.findMany();
  }

  async findByNumber(candidateNumber: string): Promise<Candidate> {
    return await this.db.candidate.findUniqueOrThrow({
      where: {
        number: parseInt(candidateNumber),
      },
    });
  }

  async findCandidateAccuracy(
    candidateNumber: string
  ): Promise<CandidateVotes> {
    const votes = await this.db.candidate.findUniqueOrThrow({
      where: { number: parseInt(candidateNumber) },
      select: { recievedVotes: true, number: true },
    });

    const totalVotes = await this.db.vote.count({
      where: {
        candidateNumber: votes.number,
      },
    });

    const candidateVotesCount = votes.recievedVotes.length;
    const percent = (100 * candidateVotesCount) / totalVotes;

    const totalPercent = isNaN(percent) ? "0%" : `${percent.toFixed(2)}%`;

    return { totalVotes, totalPercent };
  }

  async save(
    candidateDTO: CreateCandidateDTO,
    scratch: string
  ): Promise<Candidate> {
    if (scratch === "true") {
      await this.db.person.create({
        data: {
          name: candidateDTO.name,
          cpf: candidateDTO.cpf,
          uf: candidateDTO.uf,
          picture: candidateDTO.picture,
          hasVoted: false,
        },
      });
    }

    return await this.db.candidate.create({
      data: {
        name: candidateDTO.name,
        number: candidateDTO.number,
        partyNumber: candidateDTO.partyNumber,
        picture: candidateDTO.picture,
        uf: candidateDTO.uf,
        role: candidateDTO.role,
      },
    });
  }

  async update(
    candidateDTO: UpdateCandidateDTO,
    candidateNumber: number
  ): Promise<Candidate> {
    const candidate = await this.db.candidate.findUniqueOrThrow({
      where: { number: candidateNumber },
    });
    const updatedCandidate: Candidate = {
      ...candidate,
      name: candidateDTO.name,
      uf: candidateDTO.uf,
      role: candidateDTO.role,
      picture: candidateDTO.picture,
    };

    return await this.db.candidate.update({
      where: {
        number: candidateNumber,
      },
      data: updatedCandidate,
    });
  }

  async delete(candidateNumber: string): Promise<Candidate> {
    return await this.db.candidate.delete({
      where: { number: parseInt(candidateNumber) },
    });
  }
}
