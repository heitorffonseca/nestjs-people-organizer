import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { UserInterface } from '../../database/interfaces/user.interface';
import { CreateUserDto } from '../../dtos/users/create-user.dto';
import { UpdateUserDto } from '../../dtos/users/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async getAllUsers(): Promise<UserInterface[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':userID')
  async getUserById(@Param('userID') userID: string): Promise<UserInterface> {
    return await this.userService.getUserById(userID);
  }

  @Post('/')
  async storeUser(@Body() newUser: CreateUserDto): Promise<UserInterface> {
    return await this.userService.storeUser(newUser);
  }

  @Patch(':userID')
  async updateUserById(
    @Param('userID') userID: string,
    @Body() newUser: UpdateUserDto,
  ): Promise<UserInterface> {
    return await this.userService.updateUserById(userID, newUser);
  }

  @Delete(':userID')
  async deleteUserById(
    @Param('userID') userID: string,
  ): Promise<UserInterface> {
    return await this.userService.deleteUserById(userID);
  }
}
