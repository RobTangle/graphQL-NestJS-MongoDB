import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    const userFound = await this.userModel
      .findOne(userFilterQuery, {}, { sanitizeFilter: true })
      .exec();
    return userFound;
  }

  async findUsers(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel
      .find(
        { $or: [{ userId: usersFilterQuery }] },
        {},
        { sanitizeFilter: true },
      )
      .exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate(userFilterQuery, user, {
        runValidators: true,
        sanitizeFilter: true,
        new: true,
      })
      .exec();
  }

  async findOneAndDelete(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel
      .findOneAndRemove(userFilterQuery, {
        sanitizeFilter: true,
      })
      .exec();
  }
}
