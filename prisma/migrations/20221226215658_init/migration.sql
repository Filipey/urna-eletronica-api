-- CreateTable
CREATE TABLE "person" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "uf" TEXT NOT NULL,
    "has_voted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "party" (
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "candidate" (
    "number" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "picture" TEXT,
    "name" TEXT NOT NULL,
    "party_number" INTEGER NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "vote" (
    "timestamp" INTEGER NOT NULL,
    "person_cpf" TEXT NOT NULL,
    "candidate_number" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("personCpf","candidateNumber")
);

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_partyNumber_fkey" FOREIGN KEY ("party_number") REFERENCES "party"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_personCpf_fkey" FOREIGN KEY ("person_cpf") REFERENCES "person"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candidateNumber_fkey" FOREIGN KEY ("candidate_number") REFERENCES "candidate"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
