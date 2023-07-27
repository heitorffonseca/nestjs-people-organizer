import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Processor,
  Process,
} from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { CreateUserDto } from '../../dtos/users/create-user.dto';

@Processor('create-user-queue')
export class CreateUserConsumer {
  constructor(private mailService: MailerService) {}

  @Process('create-user-job')
  async sendMailJob(job: Job<CreateUserDto>) {
    const { data } = job;
    await this.mailService.sendMail({
      to: data.email,
      from: 'Teste de envio de e-mail',
      subject: 'Seja bem vindo(a)',
      text: `Olá ${data.name}, seu cadastro foi realizado com sucesso. Seja bem vindo(a)`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`On completed ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On progress ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On active ${job.name}`);
  }
}
