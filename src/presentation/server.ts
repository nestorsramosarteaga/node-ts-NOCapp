import { CheckService } from "../domain/use-cases/checks/check.service";
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

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://localhost:3000'
        new CheckService(
          fileSystemLogRepository,
          () => console.log( `${url} is ok` ),
          ( error ) => console.error( error ),
        ).execute( url );
        // new CheckService().execute('http://localhost:3000');
      }
    );

  }

}
