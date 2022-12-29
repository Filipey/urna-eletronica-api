import { Candidate } from "@prisma/client";
import { prismaMock } from "../../../test/singleton";
import { CandidateService } from "./candidate.service";
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
});
