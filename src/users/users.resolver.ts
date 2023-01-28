import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  //transformar esto a async cuando implemente la database
  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  getUser(
    @CurrentUser() user: User,
    @Args() getUserArgs: GetUserArgs,
  ): Promise<User> {
    console.log(user);
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(
    @Args({ name: 'ids', type: () => [ID] }) userIds: GetUsersArgs,
  ): Promise<User[]> {
    return this.usersService.getUsers(userIds);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(
      { userId: updateUserData.userId },
      updateUserData,
    );
  }

  @Mutation(() => User)
  deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    return this.usersService.deleteUser(deleteUserData);
  }
}
