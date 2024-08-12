import { envs } from "../config/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { EmailService } from "../email/email.services";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";



// Instacias de las implementaciones
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(), // The DS can be changed here
);



export class Server {

  public static start() {

    console.log('Server started...');

    // Send email

    // const emailService = new EmailService();

    // const emailOptions = {
    //   to: 'nestorsramosarteaga@gmail.com',
    //   subject: 'Logs de sistema',
    //   htmlBody: `<h3>Logs de sistema - NOC app</h3>
    //   <p>Esse ad non reprehenderit non aliquip.</p>
    //   <p>Ver logs adjuntos</p>
    //   `
    // };
    // emailService.sendEmail( emailOptions );

    // emailService.sendEmailWithFileSystemLogs(['nestor.ramos.lxxx@gmail.com', 'nestorsramosarteaga@gmail.com', 'nestorsramosarteaga@aol.com', 'nsramosarteaga@gmail.com'])

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'http://localhost:3000'
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log( `${url} is ok` ),
    //       ( error ) => console.error( error ),
    //     ).execute( url );
    //     // new CheckService().execute('http://localhost:3000');
    //   }
    // );

  }

}
