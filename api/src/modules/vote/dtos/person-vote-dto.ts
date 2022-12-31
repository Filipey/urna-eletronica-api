import { IsNumber, IsString, Length } from "class-validator";

export class PersonVoteDTO {
  @IsString()
  @Length(11)
  readonly cpf: string;

  @IsNumber()
  readonly candidateNumber: number;
}
