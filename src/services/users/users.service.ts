import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { UserInterface } from '../../database/interfaces/user.interface';
import { CreateUserDto } from '../../dtos/users/create-user.dto';
import { CreateUserProducerService } from '../../jobs/users/create.producer.service';
import { UpdateUserDto } from '../../dtos/users/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: CreateUserProducerService,
  ) {}

  async getAllUsers(): Promise<UserInterface[]> {
    const users = await this.userRepository.getAllUsers();

    if (!users.length) {
      throw new BadRequestException('There are no users registered yet');
    }

    return users;
  }

  async getUserById(userID: string): Promise<UserInterface> {
    try {
      const user = await this.userRepository.getUserById(userID);

      if (!user) {
        throw new BadRequestException('There are not results');
      }

      return user;
    } catch (err) {
      throw new BadRequestException('There are not results');
    }
  }

  async storeUser(newUser: CreateUserDto): Promise<UserInterface> {
    const user = await this.userRepository.storeUser(newUser);
    await this.mailService.sendMailToNewUser(user);
    return user;
  }

  async updateUserById(
    userID: string,
    newUser: UpdateUserDto,
  ): Promise<UserInterface> {
    await this.getUserById(userID);

    const user = await this.userRepository.updateUserById(userID, newUser);

    if (!user) {
      throw new BadRequestException('Error in update');
    }

    return user;
  }

  async deleteUserById(userID: string): Promise<UserInterface> {
    try {
      return await this.userRepository.deleteUserById(userID);
    } catch (err) {
      throw new BadRequestException('This user does not exists');
    }
  }
}
