import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UsersRepository } from './users.repository';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // private users: User[] = [
  //   // creo un usuario inicial para testing:
  //   {
  //     email: 'testdummy@mail.com',
  //     password: '123',
  //     age: 50,
  //     userId: '001',
  //   },
  // ];

  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };
    const newUser = await this.usersRepository.create(user);
    return newUser;
  }

  public async updateUser(
    filterQuery: FilterQuery<User>,
    updateUserData: UpdateUserInput,
  ): Promise<User> {
    const user = await this.usersRepository.findOneAndUpdate(
      filterQuery,
      updateUserData,
    );
    return user;
  }

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return this.usersRepository.findOne({ ...getUserArgs });
  }

  public async getUserByEmail(email: string): Promise<User> | undefined {
    return this.usersRepository.findOne({ email });
  }

  public async getUsers(userIds: GetUsersArgs): Promise<User[]> {
    return this.usersRepository.findUsers(userIds);
  }

  public async deleteUser(deleteUserData: DeleteUserInput): Promise<User> {
    const userToDelete = await this.usersRepository.findOneAndDelete(
      deleteUserData,
    );
    return userToDelete;
  }
}
