import { EmailService } from "../../../presentation/email/email.services";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";




interface SendLogemailUseCase {
  execute: ( to: string | string[] ) => Promise<boolean>
}

export class SendEmailLogs implements SendLogemailUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ){}

  async execute(to: string | string[]): Promise<boolean> {

    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if ( !sent ) {
        throw new Error('Email log nt sent');
      }

      const newLog = new LogEntity({
        message: `Log email sent`,
        level: LogSeverityLevel.low,
        origin: 'send-email-logs.ts'
      });

      this.logRepository.saveLog( newLog );

      return true;

    } catch ( error  ){

      const newLog = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'send-email-logs.ts'
      });

      this.logRepository.saveLog( newLog );

      return false;

    }

  }




}