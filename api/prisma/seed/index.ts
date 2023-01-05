import { PrismaClient } from "@prisma/client";
import { MockedCandidates } from "./Candidates";
import { MockedParties } from "./Parties";
import { MockedPersons } from "./Persons";
import { MockedVotes } from "./Votes";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  await prisma.person.createMany({ data: MockedPersons });
  await prisma.party.createMany({ data: MockedParties });
  await prisma.candidate.createMany({ data: MockedCandidates });
  await prisma.vote.createMany({ data: MockedVotes });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
