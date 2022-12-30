import { Vote } from "@prisma/client";
import { prismaMock } from "../../../test/singleton";
import { VotesAccuracyDTO } from "./dtos/votes-accuracy-dto";
import { VoteService } from "./vote.service";

describe("Vote Service", () => {
  let service: VoteService;
  let mockVote: Vote;

  beforeEach(async () => {
    service = new VoteService(prismaMock);
    mockVote = {
      candidateNumber: 10,
      personCpf: "45712312388",
      timestamp: 1672426671.954,
    };
  });

  it("Should list all votes", async () => {
    const expectedResponse: Vote[] = [
      {
        ...mockVote,
      },
      {
        candidateNumber: 11,
        personCpf: "1234567915",
        timestamp: 1672426673.954,
      },
    ];

    prismaMock.vote.findMany.mockResolvedValue(expectedResponse);

    const votes = await service.findAll();
    expect(prismaMock.vote.findMany).toHaveBeenCalled();
    expect(votes).toStrictEqual(expectedResponse);
  });

  it("Should list all votes for any role", async () => {
    const expectedResponse: Vote[] = [];

    prismaMock.vote.findMany.mockResolvedValue(expectedResponse);

    const votes = await service.findAllPresidentVotes();
    expect(prismaMock.vote.findMany).toHaveBeenCalled();
    expect(votes).toStrictEqual(expectedResponse);
  });

  it("Should get any votes accuracy", async () => {
    const expectedResponse: VotesAccuracyDTO = {
      clearedVotes: "0.00%",
      countedVotes: 0,
      totalVotes: 54,
      remainingVotes: 54,
    };

    prismaMock.person.count.mockResolvedValue(18);
    prismaMock.vote.count.mockResolvedValue(0);

    const globalAccuracy = await service.findTotalVotesAccuracy();
    expect(prismaMock.person.count).toHaveBeenCalled();
    expect(prismaMock.vote.count).toHaveBeenCalled();
    expect(globalAccuracy).toStrictEqual(expectedResponse);
  });

  it("Should can vote", async () => {
    const voteDTO = {
      candidateNumber: 10,
      personCpf: "45712312388",
      timestamp: 1672426677.954,
    };

    prismaMock.vote.create.mockResolvedValue(voteDTO);

    await service.vote("45712312388", 10);
    expect(prismaMock.vote.create).toHaveBeenCalled();
  });
});
