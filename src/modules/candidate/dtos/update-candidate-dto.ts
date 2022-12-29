import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class UpdateCandidateDTO {
  @IsString()
  readonly name: string;

  @IsString()
  @Length(2)
  readonly uf: string;

  @IsString()
  readonly role: string;

  @IsOptional()
  readonly picture: string | null;

  @IsNumber()
  readonly partyNumber: number;
}
