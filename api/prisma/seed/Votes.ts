import { Vote } from "@prisma/client";

export const MockedVotes: Vote[] = [
  {
    personCpf: "10101010101",
    candidateNumber: 10,
    timestamp: Date.now(),
  },
  {
    personCpf: "10101010101",
    candidateNumber: 58,
    timestamp: Date.now(),
  },
  {
    personCpf: "10101010101",
    candidateNumber: 4,
    timestamp: Date.now(),
  },
  {
    personCpf: "10101010101",
    candidateNumber: 881,
    timestamp: Date.now(),
  },
  {
    personCpf: "10101010101",
    candidateNumber: 337,
    timestamp: Date.now(),
  },
];
