import { IsOptional, IsString, Length } from "class-validator";

export class CreatePersonDTO {
  @IsString()
  @Length(11)
  readonly cpf: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  readonly picture: string | undefined;

  @IsString()
  @Length(2)
  readonly uf: string;
}
