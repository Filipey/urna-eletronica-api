import { PrismaClient } from "@prisma/client";
import { MockedCandidates } from "./Candidates";
import { MockedParties } from "./Parties";
import { MockedPersons } from "./Persons";

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
