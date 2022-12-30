import { IsNumber, IsString } from "class-validator";

export class VotesAccuracyDTO {
  @IsNumber()
  readonly totalVotes: number;

  @IsNumber()
  readonly remainingVotes: number;

  @IsNumber()
  readonly countedVotes: number;

  @IsString()
  readonly clearedVotes: string;
}
