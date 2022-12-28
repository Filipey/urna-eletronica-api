import { Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class VotedCandidateParty {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly number: number;
}

class Candidate {
  @IsString()
  readonly name: string;
  
  @IsOptional()
  readonly picture: string | null;

  @IsObject()
  @ValidateNested()
  @Type(() => VotedCandidateParty)
  readonly party: VotedCandidateParty;

  @IsString()
  readonly role: string;
  
  @IsString()
  readonly uf: string;
}

export class VotedCandidateDTO {
  @IsObject({ each: true })
  readonly candidate: Candidate;
}
