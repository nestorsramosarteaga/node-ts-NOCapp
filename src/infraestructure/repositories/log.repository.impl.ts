import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogDatasource } from '../../domain/datasources/log.datasource';




export class LogRepositoryImpl implements LogRepository {

  constructor(
    private readonly LogDatasource: LogDatasource, // <-- The DS can be changed
  ){}

  async saveLog(log: LogEntity): Promise<void> {
    return this.LogDatasource.saveLog( log );
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.LogDatasource.getLogs( severityLevel );
  }


}