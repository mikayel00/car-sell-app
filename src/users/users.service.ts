import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Creating new user with email and password
  create(email: string, password: string){
    const user = this.repo.create({email, password});

    return this.repo.save(user);
  };

  // Find one item by ID
  findOne(id: number) {
    if(!id) return null;
    return this.repo.findOne({ where: { id }});
  };

  // Find all items by email
  find(email: string) {
    return this.repo.find({ where: { email }});
  };

  // Update user by ID
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if(!user) throw new NotFoundException('User not found');

    Object.assign(user, attrs);
    return this.repo.save(user);
  };

  // Delete user by ID
  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user) throw new NotFoundException('User not found');

    return this.repo.remove(user);
  };
}
