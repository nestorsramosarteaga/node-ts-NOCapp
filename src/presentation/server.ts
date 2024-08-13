import { envs } from "../config/envs.plugin";
import { LogRepository } from "../domain/repositories/log.repository";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { SendEmailLogs } from "../domain/use-cases/emails/send-email-logs";
import { EmailService } from "./email/email.services";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";



// Instacias de las implementaciones
const logRepository = new LogRepositoryImpl( // The DS can be changed here
  new FileSystemDatasource(),
  // new MongoLogDatasource(),
);

const emailService = new EmailService();


export class Server {

  public static async start() {

    console.log('Server started...');

    // Send email
    // new SendEmailLogs(
    //   emailService,
    //   logRepository
    // ).execute(
    //   ['nestor.ramos.lxxx@gmail.com', 'nestorsramosarteaga@gmail.com', 'nestorsramosarteaga@maol.com', 'nsramosarteaga@gmail.com']
    // );

    // emailService.sendEmailWithFileSystemLogs(
    //   ['nestor.ramos.lxxx@gmail.com', 'nestorsramosarteaga@gmail.com', 'nestorsramosarteaga@maol.com', 'nsramosarteaga@gmail.com']
    // );

    const logs = await logRepository.getLogs(LogSeverityLevel.low);
    console.log(logs);

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'http://google.com'
    //     new CheckService(
    //       logRepository,
    //       () => console.log( `${url} is ok` ),
    //       ( error ) => console.error( error ),
    //     ).execute( url );
    //   }
    // );

  }

}
