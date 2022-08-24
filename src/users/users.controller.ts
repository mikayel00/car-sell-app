import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException, Session
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";


@Controller("auth")
// Added interceptor to all methods
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService) {
  }

  // Get user info whose data is stored in cookies
  @Get("/whoami")
  whoAmI(@CurrentUser() user: string) {
    return user;
  }

  // Creating new User
  @Post("/signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // Login User
  @Post("/signin")
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // Sign out User
  @Post("/signout")
  signOut(@Session() session: any) {
    session.userId = null;
  }

  // Get user by ID
  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) throw new NotFoundException("user not found");

    return user;
  }

  // Get all users by Email
  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.userService.find(email);
  }

  // Delete user by ID
  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.userService.remove(parseInt(id));
  }

  // Update user data by ID
  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
