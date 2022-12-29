import { IsNumber, IsString } from "class-validator";

export class CandidateVotes {
  @IsNumber()
  readonly totalVotes: number;

  @IsString()
  readonly totalPercent: string;
}
