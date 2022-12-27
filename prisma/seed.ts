import { PrismaClient } from "@prisma/client";
import { MockedCandidates } from "../src/mock/Candidates";
import { MockedParties } from "../src/mock/Parties";
import { MockedPersons } from "../src/mock/Persons";

const prisma = new PrismaClient();

async function main() {
  await prisma.person.createMany({ data: MockedPersons });
  await prisma.party.createMany({ data: MockedParties });
  await prisma.candidate.createMany({ data: MockedCandidates });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
