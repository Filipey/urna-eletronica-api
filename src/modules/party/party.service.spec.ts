import { Party } from "@prisma/client";
import { prismaMock } from "../../../test/singleton";
import { PartyService } from "./party.service";

describe("Party Service", () => {
  let service: PartyService;
  let mockParty: Party;

  beforeEach(async () => {
    service = new PartyService(prismaMock);
    mockParty = {
      number: 77,
      name: "John Doe and Friends",
    };
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Should create a new Party", async () => {
    const expectedResponse = { ...mockParty };

    const createPartyDTO = {
      name: "John Doe and Friends",
      number: 77,
    };

    prismaMock.party.create.mockResolvedValue(createPartyDTO);

    const createdParty = await service.save(createPartyDTO);
    expect(prismaMock.party.create).toHaveBeenCalled();
    expect(expectedResponse).toStrictEqual(createdParty);
  });

  it("Should update a Party", async () => {
    const expectedResponse = {
      ...mockParty,
      number: 78,
    };

    const updatePartyDTO = {
      name: "John Doe and Friends",
      number: 78,
    };

    const searchNumber = "77";

    prismaMock.party.update.mockResolvedValue(updatePartyDTO);

    const updatedParty = await service.update(updatePartyDTO, searchNumber);
    expect(prismaMock.party.update).toHaveBeenCalled();
    expect(updatedParty).toStrictEqual(expectedResponse);
  });

  it("Should delete a Party", async () => {
    const expectedResponse = { ...mockParty };
    const searchNumber = "77";

    prismaMock.party.delete.mockResolvedValue(mockParty);

    const deletedParty = await service.delete(searchNumber);
    expect(prismaMock.party.delete).toHaveBeenCalled();
    expect(deletedParty).toStrictEqual(expectedResponse);
  });

  it("Should list all Parties", async () => {
    const expectedResponse = [
      {
        ...mockParty,
      },
      {
        name: "Test Pary",
        number: 171,
      },
    ];

    prismaMock.party.findMany.mockResolvedValue(expectedResponse);

    const parties = await service.findAll();
    expect(prismaMock.party.findMany).toHaveBeenCalled();
    expect(parties).toStrictEqual(expectedResponse);
  });

  it("Should find a Party by his number", async () => {
    const expectedResponse = { ...mockParty };
    const searchNumber = "77";

    prismaMock.party.findUniqueOrThrow.mockResolvedValue(mockParty);

    const party = await service.findByNumber(searchNumber);
    expect(prismaMock.party.findUniqueOrThrow).toHaveBeenCalled();
    expect(party).toStrictEqual(expectedResponse);
  });

  it("Should list all Party candidates", async () => {
    const expectedResponse = [
      {
        name: "John Doe Junior",
        picture: "john_doe_junior.jpeg",
        number: 1235,
        partyNumber: 77,
        uf: "MG",
        role: "PRESIDENT",
      },
      {
        name: "John Doe Uncle",
        picture: "john_doe_uncle.jpeg",
        number: 8812,
        partyNumber: 77,
        uf: "MG",
        role: "SENATOR",
      },
    ];

    const searchNumber = "77";

    prismaMock.candidate.findMany.mockResolvedValue(expectedResponse);

    const candidates = await service.findPartyCandidates(searchNumber);
    expect(prismaMock.candidate.findMany).toHaveBeenCalled();
    expect(candidates).toStrictEqual(expectedResponse);
  });
});
