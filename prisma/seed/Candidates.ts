import { Candidate } from "@prisma/client";

export const MockedCandidates: Candidate[] = [
  {
    name: "Neymar da Silva Santos Júnior",
    number: 10,
    partyNumber: 26,
    picture: "neymar.jpeg",
    uf: "SP",
    role: "PRESIDENT"    
  },
  {
    name: "Bruna Reis Maia",
    number: 6,
    partyNumber: 66,
    picture: "bruna_marquezine.jpeg",
    uf: "RJ",
    role: "PRESIDENT"
  },
  {
    name: "Arthur Lopes",
    number: 111,
    partyNumber: 4,
    picture: "arthur_lopes.jpeg",
    uf: "MG",
    role: "GORVENOR",
  },
  {
    name: "Ana Sophia Rocha",
    number: 90,
    partyNumber: 66,
    picture: "ana_sophia.jpeg",
    uf: "MG",
    role: "GORVENOR",
  },
  {
    name: "Rafael Costela",
    number: 44,
    partyNumber: 10,
    picture: "rafael_costela.jpeg",
    uf: "MG",
    role: "SENATOR",
  },
  {
    name: "Lívia Almeida",
    number: 76,
    partyNumber: 66,
    picture: "livia_almeida.jpeg",
    uf: "MG",
    role: "SENATOR"
  }
];
