import { Candidate } from "@prisma/client";
import { prismaMock } from "../../../test/singleton";
import { CandidateService } from "./candidate.service";
import { CandidateVotes } from "./dtos/candidate-votes";
import { CreateCandidateDTO } from "./dtos/create-candidate-dto";

describe("Candidate Service", () => {
  let service: CandidateService;
  let mockCandidate: Candidate;

  beforeEach(async () => {
    service = new CandidateService(prismaMock);
    mockCandidate = {
      name: "John Doe",
      picture: "john_doe.jpeg",
      number: 1235,
      partyNumber: 66,
      uf: "MG",
      role: "PRESIDENT",
    };
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Should create a candidate that was already a person", async () => {
    const expectedOutput = {
      ...mockCandidate,
    };
    const createCandidateDTO: Omit<CreateCandidateDTO, "cpf"> = {
      name: "John Doe",
      partyNumber: 66,
      picture: "john_doe.jpeg",
      role: "PRESIDENT",
      number: 1235,
      uf: "MG",
    };

    prismaMock.candidate.create.mockResolvedValue(createCandidateDTO);
    const candidateResponse = await service.save(createCandidateDTO);

    expect(prismaMock.candidate.create).toHaveBeenCalled();
    expect(prismaMock.person.create).not.toHaveBeenCalled();
    expect(expectedOutput).toStrictEqual(candidateResponse);
  });

  it("Should create a candidate from scratch", async () => {
    const expectedOutput = {
      ...mockCandidate,
      cpf: "1298237423",
    };

    const createCandidateDTO: CreateCandidateDTO = {
      name: "John Doe",
      partyNumber: 66,
      picture: "john_doe.jpeg",
      role: "PRESIDENT",
      number: 1235,
      uf: "MG",
      cpf: "1298237423",
    };

    prismaMock.person.create.mockResolvedValue({
      cpf: createCandidateDTO.cpf,
      name: createCandidateDTO.name,
      picture: createCandidateDTO.picture,
      uf: createCandidateDTO.uf,
      hasVoted: false,
    });

    prismaMock.candidate.create.mockResolvedValue(createCandidateDTO);

    const createdCandidate = await service.saveCandidateFromScratch(
      createCandidateDTO
    );
    expect(prismaMock.person.create).toHaveBeenCalled();
    expect(prismaMock.candidate.create).toHaveBeenCalled();
    expect(expectedOutput).toStrictEqual(createdCandidate);
  });

  it("Should update a candidate", async () => {
    const expectedOutput: Candidate = {
      ...mockCandidate,
      role: "SENATOR",
    };

    const updatedCandidate = {
      ...mockCandidate,
      role: "SENATOR",
    };

    prismaMock.candidate.findFirstOrThrow.mockResolvedValue(mockCandidate);
    prismaMock.candidate.update.mockResolvedValue(updatedCandidate);

    const updatedCandidateResponse = await service.update(
      updatedCandidate,
      mockCandidate.number
    );

    expect(prismaMock.candidate.findUniqueOrThrow).toHaveBeenCalled();
    expect(prismaMock.candidate.update).toHaveBeenCalled();
    expect(expectedOutput).toStrictEqual(updatedCandidateResponse);
  });

  it("Should delete a candidate", async () => {
    const searchNumber = String(mockCandidate.number);
    const expectedOutput = { ...mockCandidate };

    prismaMock.candidate.delete.mockResolvedValue(mockCandidate);

    const deletedCandidate = await service.delete(searchNumber);

    expect(prismaMock.candidate.delete).toHaveBeenCalled();
    expect(expectedOutput).toStrictEqual(deletedCandidate);
  });

  it("Should list all candidates", async () => {
    const expectedOutput: Candidate[] = [
      {
        ...mockCandidate,
      },
      {
        name: "Tester candidate",
        number: 333,
        partyNumber: 51,
        picture: "tester.jpeg",
        role: "SENATOR",
        uf: "MG",
      },
    ];

    prismaMock.candidate.findMany.mockResolvedValue(expectedOutput);

    const candidatesResponses = await service.findAll();

    expect(prismaMock.candidate.findMany).toHaveBeenCalled();
    expect(expectedOutput).toStrictEqual(candidatesResponses);
  });

  it("Should find a candidate by his number", async () => {
    const expectedOutput = { ...mockCandidate };
    const searchNumber = String(mockCandidate.number);

    prismaMock.candidate.findUniqueOrThrow.mockResolvedValue(expectedOutput);

    const candidateResponse = await service.findByNumber(searchNumber);

    expect(prismaMock.candidate.findUniqueOrThrow).toHaveBeenCalled();
    expect(expectedOutput).toStrictEqual(candidateResponse);
  });

  it("Should return the candidate accuracy", async () => {
    const expectedOutput: CandidateVotes = {
      totalVotes: 0,
      totalPercent: "0%",
    };
    const searchNumber = String(mockCandidate.number);

    const mockSearch = {
      ...mockCandidate,
      recievedVotes: [],
    };

    prismaMock.candidate.findUniqueOrThrow.mockResolvedValue(mockSearch);
    prismaMock.vote.count.mockResolvedValue(expectedOutput.totalVotes);

    const accuracyResponse = await service.findCandidateAccuracy(searchNumber);

    expect(prismaMock.candidate.findUniqueOrThrow).toHaveBeenCalled();
    expect(prismaMock.vote.count).toHaveBeenCalled();
    expect(expectedOutput).toStrictEqual(accuracyResponse);
  });
});
