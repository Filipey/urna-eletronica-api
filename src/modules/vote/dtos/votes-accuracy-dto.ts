import { IsNumber, IsString } from "class-validator";

export class VotesAccuracyDTO {
  @IsNumber()
  readonly totalVotes: number;

  @IsNumber()
  readonly remainingVotes: number;

  @IsString()
  readonly clearedVotes: string;
}
