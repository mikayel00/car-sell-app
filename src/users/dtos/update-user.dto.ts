import { IsString, IsEmail, IsOptional } from "class-validator";

// Using Data-Transfer Object (DTO) in user updating time
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
