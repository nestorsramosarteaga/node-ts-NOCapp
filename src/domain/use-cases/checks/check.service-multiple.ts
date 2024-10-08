import { LogEntity, LogSeverityLevel, LogEntityOptions } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface CheckServiceMultipleUseCase {
  execute( url: string ):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

type NonEmptyArray<T> = [T, ...T[]];

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepositories: NonEmptyArray<LogRepository>,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  )
  {}


  private saveLogsToMultipleOrigins( log: LogEntity){
    this.logRepositories.forEach( logRepository => {
      logRepository.saveLog(log);
    });
  }

  async execute( url: string ):Promise<boolean> {

    try {
      const req = await fetch(url);
      if (!req.ok ) {
        throw new Error( `Error on check service ${url}` );
      }

      const log = new LogEntity({
        message: `Service ${ url } working`,
        level: LogSeverityLevel.low,
        origin: 'check.services-multiple.ts'
      });
      this.saveLogsToMultipleOrigins( log );

      this.successCallback && this.successCallback();
      return true;

    } catch (error) {

      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check.services.ts'
      });
      this.saveLogsToMultipleOrigins( log );

      this.errorCallback && this.errorCallback( errorMessage );
      return false;
    }
  }

}