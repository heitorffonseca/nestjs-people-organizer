import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import { CreateUserDto } from '../../dtos/users/create-user.dto';
import { UpdateUserDto } from '../../dtos/users/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserInterface>,
  ) {}

  async getAllUsers(): Promise<UserInterface[]> {
    return await this.userModel
      .find({}, { __v: false })
      .sort({ name: +1 })
      .exec();
  }

  async getUserById(userID: string): Promise<UserInterface> {
    return await this.userModel.findById(userID, { __v: false }).exec();
  }

  async storeUser(newUser: CreateUserDto): Promise<UserInterface> {
    const user = new this.userModel(newUser);
    return await user.save();
  }

  async updateUserById(
    userID: string,
    newUser: UpdateUserDto,
  ): Promise<UserInterface> {
    await this.userModel.replaceOne({ _id: userID }, newUser).exec();
    return await this.getUserById(userID);
  }

  async deleteUserById(userID: string): Promise<UserInterface> {
    return await this.userModel
      .findOneAndDelete({ _id: userID }, { __V: false })
      .exec();
  }
}
