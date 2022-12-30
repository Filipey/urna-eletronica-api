import { Candidate } from "@prisma/client";

export const MockedCandidates: Candidate[] = [
  {
    name: "Neymar da Silva Santos Júnior",
    number: 10,
    partyNumber: 26,
    picture: "neymar.jpeg",
    uf: "SP",
    role: "PRESIDENT",
    substituteName: "Vinícius José Paixão de Oliveira Júnior",
    substitutePicture: "vinicius_junior.jpeg",
  },
  {
    name: "Bruna Reis Maia",
    number: 6,
    partyNumber: 66,
    picture: "bruna_marquezine.jpeg",
    uf: "RJ",
    role: "PRESIDENT",
    substituteName: "Rafaella Freitas Ferreira de Castro Matthaus",
    substitutePicture: "rafa_kalliman.jpeg",
  },
  {
    name: "Arthur Lopes",
    number: 111,
    partyNumber: 4,
    picture: "arthur_lopes.jpeg",
    uf: "MG",
    role: "GORVENOR",
    substituteName: "João do Arroz",
    substitutePicture: "joao_arroz.jpeg",
  },
  {
    name: "Ana Sophia Rocha",
    number: 90,
    partyNumber: 66,
    picture: "ana_sophia.jpeg",
    uf: "MG",
    role: "GORVENOR",
    substituteName: "Carla do Tomate",
    substitutePicture: "carla_tomate.jpeg",
  },
  {
    name: "Rafael Costela",
    number: 44,
    partyNumber: 10,
    picture: "rafael_costela.jpeg",
    uf: "MG",
    role: "SENATOR",
    substituteName: "Gabriel Japones",
    substitutePicture: "gabriel_japones.jpeg",
  },
  {
    name: "Lívia Almeida",
    number: 76,
    partyNumber: 66,
    picture: "livia_almeida.jpeg",
    uf: "MG",
    role: "SENATOR",
    substituteName: "Letícia Fazendeira",
    substitutePicture: "leticia_fazenda.jpeg",
  },
];
