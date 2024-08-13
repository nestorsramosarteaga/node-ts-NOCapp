import { envs } from "../config/envs.plugin";
import { LogRepository } from "../domain/repositories/log.repository";
import { CheckService, CheckServiceMultiple, SendEmailLogs } from "../domain/use-cases";
import { EmailService } from "./email/email.services";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource, MongoLogDatasource, FileSystemDatasource } from "../infraestructure/datasources";




// Instacias de las implementaciones
// const logRepository = new LogRepositoryImpl( // The DS can be changed here
//   new FileSystemDatasource(),
//   new MongoLogDatasource(),
//   new PostgresLogDatasource()
// );

const fsLogRepository = new LogRepositoryImpl(  new FileSystemDatasource() );
const mongoLogRepository = new LogRepositoryImpl(  new MongoLogDatasource() );
const postgresLogRepository = new LogRepositoryImpl(  new PostgresLogDatasource() );

// const emailService = new EmailService();


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

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

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


    // multiple repositories
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'http://google.com'
    //     new CheckServiceMultiple(
    //       [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //       () => console.log( `${url} is ok` ),
    //       ( error ) => console.error( error ),
    //     ).execute( url );
    //   }
    // );

  }

}
