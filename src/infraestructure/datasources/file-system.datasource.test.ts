import path from "path";
import fs from 'fs';
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




describe('FileSystemDatasource', () => {

  const logPath =  path.join(__dirname,'../../../logs')

  // console.log({__dirname, logPath})

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });


  test('should create log files if they do not exists', () => {
    
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);
    
    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);

  })

  test('should save a log in logs-all.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'file-system.datasource.test.ts'
    });
    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    console.log({allLogs})
  })
  
  

})