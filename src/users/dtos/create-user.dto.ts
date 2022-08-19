import { IsString, IsEmail } from "class-validator";

// Using Data-Transfer Object (DTO) in user creating time
export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
