-- CreateTable
CREATE TABLE "Person" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "uf" TEXT NOT NULL,
    "hasVoted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Party" (
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "number" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "picture" TEXT,
    "name" TEXT NOT NULL,
    "partyNumber" INTEGER NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "Vote" (
    "timestamp" INTEGER NOT NULL,
    "personCpf" TEXT NOT NULL,
    "candidateNumber" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("personCpf","candidateNumber")
);

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_partyNumber_fkey" FOREIGN KEY ("partyNumber") REFERENCES "Party"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_personCpf_fkey" FOREIGN KEY ("personCpf") REFERENCES "Person"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candidateNumber_fkey" FOREIGN KEY ("candidateNumber") REFERENCES "Candidate"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
