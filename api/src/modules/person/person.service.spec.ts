import { prismaMock } from "../../../test/singleton";
import { PersonService } from "./person.service";

describe("Person Service", () => {
  let service: PersonService;
  let cpf: string;
  let name: string;
  let picture: string;
  let uf: string;

  beforeEach(async () => {
    service = new PersonService(prismaMock);
    cpf = "45712312388";
    name = "John Doe";
    picture = "john_doe.jpeg";
    uf = "MG";
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Should create a Person", async () => {
    const expectedPersonOutput = {
      name,
      cpf,
      picture,
      uf,
      hasVoted: false,
    };

    const createPersonDTO = {
      name: "John Doe",
      cpf: "45712312388",
      picture: "john_doe.jpeg",
      uf: "MG",
      hasVoted: false,
    };

    prismaMock.person.create.mockResolvedValue(createPersonDTO);

    const newPerson = await service.save(createPersonDTO);

    expect(prismaMock.person.create).toHaveBeenCalled();
    expect(expectedPersonOutput).toStrictEqual(newPerson);
  });

  it("Should find a Person by CPF", async () => {
    const expectedPersonOutput = {
      name,
      cpf,
      picture,
      uf,
      hasVoted: false,
    };

    const searchCpf = "45712312388";

    prismaMock.person.findUniqueOrThrow.mockResolvedValue(expectedPersonOutput);
    const person = await service.findByCpf(searchCpf);

    expect(prismaMock.person.findUniqueOrThrow).toHaveBeenCalled();
    expect(expectedPersonOutput).toStrictEqual(person);
  });

  it("Should list all Persons", async () => {
    const expectedPersonsOutput = [
      {
        name: "John Doe",
        cpf: "45712312388",
        picture: "john_doe.jpeg",
        uf: "MG",
        hasVoted: false,
      },
      {
        name: "App Tester",
        cpf: "93274263823",
        picture: "app_tester.jpeg",
        uf: "MG",
        hasVoted: false,
      },
    ];

    prismaMock.person.findMany.mockResolvedValue(expectedPersonsOutput);

    const persons = await service.findAll();

    expect(prismaMock.person.findMany).toHaveBeenCalled();
    expect(expectedPersonsOutput).toStrictEqual(persons);
  });

  it("Should list all available Voters", async () => {
    const expectedAvailableVoters = [
      {
        name: "John Doe",
        cpf: "45712312388",
        picture: "john_doe.jpeg",
        uf: "MG",
        hasVoted: false,
      },
      {
        name: "App Tester",
        cpf: "93274263823",
        picture: "app_tester.jpeg",
        uf: "MG",
        hasVoted: false,
      },
    ];

    prismaMock.person.findMany.mockResolvedValue(expectedAvailableVoters);

    const voters = await service.findAvailableVoters();

    expect(prismaMock.person.findMany).toHaveBeenCalled();
    expect(expectedAvailableVoters).toStrictEqual(voters);
  });

  it("Should list candidates voted by Person", async () => {
    const expectedCandidates = [
      {
        candidate: {
          name: "John Doe",
          picture: "john_doe.jpeg",
          party: {
            name: "John Doe and friends",
            number: 44,
          },
          role: "PRESIDENT",
          uf: "MG",
        },
      },
      {
        candidate: {
          name: "App teste",
          picture: "app_tester.jpeg",
          party: {
            name: "John and friends",
            number: 44,
          },
          role: "GORVERNOR",
          uf: "MG",
        },
      },
    ];

    const searchCpf = "12312312312";

    prismaMock.vote.findMany.mockResolvedValue(expectedCandidates as never);

    const candidates = await service.findPersonVotesByCpf(searchCpf);
    expect(prismaMock.vote.findMany).toHaveBeenCalled();
    expect(expectedCandidates).toStrictEqual(candidates);
  });

  it("Should delete Person by CPF", async () => {
    const expectedPersonOutput = {
      name: "John Doe",
      cpf: "45712312388",
      picture: "john_doe.jpeg",
      uf: "MG",
      hasVoted: false,
    };

    const searchCpf = "45712312388";

    prismaMock.person.delete.mockResolvedValue(expectedPersonOutput);

    const deletedPerson = await service.deleteByCpf(searchCpf);
    expect(prismaMock.person.delete).toHaveBeenCalled();
    expect(expectedPersonOutput).toStrictEqual(deletedPerson);
  });
});
