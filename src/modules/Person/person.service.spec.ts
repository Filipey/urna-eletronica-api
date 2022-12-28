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
});
