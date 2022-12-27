export interface VotedCandidateDTO {
  candidate: {
    name: string,
    picture: string | null,
    party: {
      name: string
    }
    partyNumber: number
    role: string,
    uf: string
  }
}
