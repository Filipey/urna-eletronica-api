import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateCandidateDTO {
  @IsString()
  readonly name: string;

  @IsString()
  @Length(11)
  readonly cpf: string;

  @IsOptional()
  readonly picture: string | null;

  @IsString()
  readonly uf: string;

  @IsNumber()
  readonly number: number;

  @IsNumber()
  readonly partyNumber: number;

  @IsString()
  readonly role: string;
}
