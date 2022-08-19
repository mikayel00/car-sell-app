import { Expose } from "class-transformer";

// Using Data-Transfer Object (DTO) for including fields for output
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
