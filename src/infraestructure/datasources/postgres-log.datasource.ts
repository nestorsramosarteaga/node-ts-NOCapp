import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prismaClient = new PrismaClient();

const severityLevelEnum  = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}


export class PostgresLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {

    const level = severityLevelEnum[log.level];

    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level: level,
      }
    });

    console.log('Postgres log created.', newLog.id);
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const level = severityLevelEnum[severityLevel];

    const logs = await prismaClient.logModel.findMany({
      where: { level }
    });

    return logs.map( LogEntity.fromObject );

  }


}