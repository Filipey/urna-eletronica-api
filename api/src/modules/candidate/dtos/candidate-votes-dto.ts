import { IsNumber, IsString } from "class-validator";

export class CandidateVotes {
  @IsNumber()
  readonly recievedVotes: number;

  @IsString()
  readonly totalPercent: string;
}
