import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateUserDto } from '../../dtos/users/create-user.dto';

@Injectable()
export class CreateUserProducerService {
  constructor(@InjectQueue('create-user-queue') private queue: Queue) {}

  async sendMailToNewUser(newUser: CreateUserDto): Promise<void> {
    await this.queue.add('create-user-job', newUser);
  }
}
