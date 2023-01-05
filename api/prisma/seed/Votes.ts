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
  {
    personCpf: "89234174211",
    candidateNumber: 6,
    timestamp: Date.now(),
  },
  {
    personCpf: "89234174211",
    candidateNumber: 90,
    timestamp: Date.now(),
  },
  {
    personCpf: "89234174211",
    candidateNumber: 76,
    timestamp: Date.now(),
  },
  {
    personCpf: "89234174211",
    candidateNumber: 441,
    timestamp: Date.now(),
  },
  {
    personCpf: "89234174211",
    candidateNumber: 336,
    timestamp: Date.now(),
  },
];
