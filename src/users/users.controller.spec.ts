import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'asdf@asdf.com', password: 'asdf'} as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf'} as User ]);
      },
      // remove: () => {},
      // update: () => {}
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users wit the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser returns an error if user with given id not found', async () => {
    fakeUserService.findOne = () => null
    await expect(controller.findUser('1')).rejects.toThrow('user not found');
  });

  it('signin update session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'asdsf' },
      session
      );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
