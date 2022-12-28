/* eslint-disable prefer-const */
/* eslint-disable no-var */
import { CandidateService } from "../modules/candidate/candidate.service";
import { PartyService } from "../modules/party/party.service";
import { PersonService } from "../modules/person/person.service";
import { VoteService } from "../modules/vote/vote.service";

import { db } from "../database/db.client";

let personService: PersonService;
let partyService: PartyService;
let candidateService: CandidateService;
let voteService: VoteService;

declare global {
  var __personService: PersonService | undefined;
  var __partyService: PartyService | undefined;
  var __candidateService: CandidateService | undefined;
  var __voteService: VoteService | undefined;
}

if (!global.__personService) {
  global.__personService = new PersonService(db);
}

if (!global.__partyService) {
  global.__partyService = new PartyService(db);
}

if (!global.__candidateService) {
  global.__candidateService = new CandidateService(db);
}

if (!global.__voteService) {
  global.__voteService = new VoteService(db);
}

personService = global.__personService;
partyService = global.__partyService;
candidateService = global.__candidateService;
voteService = global.__voteService;

export { personService, partyService, candidateService, voteService };
