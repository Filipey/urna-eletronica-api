import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CreatePersonDTO } from "./create-person.dto";

export class UpdatePersonDTO implements Omit<CreatePersonDTO, "cpf"> {
  @IsString()
  readonly name: string;

  @IsOptional()
  readonly picture: string | undefined;

  @IsString()
  @Length(2)
  readonly uf: string;

  @IsBoolean()
  readonly hasVoted: boolean;
}
