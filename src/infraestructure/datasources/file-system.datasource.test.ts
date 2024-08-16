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

  });

  test('should save a log in logs-all.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'file-system.datasource.test.ts'
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    //console.log({allLogs})

    expect(allLogs).toContain(JSON.stringify(log));

  });

  test('should save a log in logs-all.log and logs-medium.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test message',
      origin: 'file-system.datasource.test.ts'
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    //console.log({allLogs, mediumLogs})

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });


  test('should save a log in logs-all.log and logs-high.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test message',
      origin: 'file-system.datasource.test.ts'
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    //console.log({allLogs, mediumLogs})

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });


  test('should return all logs', async () => {

    const logDatasource = new FileSystemDatasource();
    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'log-low',
      origin: 'low file-system.datasource.test.ts'
    });
    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'log-medium',
      origin: 'medium file-system.datasource.test.ts'
    });
    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'log-high',
      origin: 'high file-system.datasource.test.ts'
    });

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));

  });


  test('should not throw an error if path exists', () => {

    new FileSystemDatasource();
    new FileSystemDatasource();
    expect(true).toBeTruthy();

  });


  test('should throw an error if severity level is not defined', async() => {
    const logDatasource = new FileSystemDatasource();

    const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;


    try {
      await logDatasource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorString = `${error}`;
      expect(errorString).toBe(`Error: ${customSeverityLevel} not implemented`);
      expect(errorString).toContain(`${customSeverityLevel}`)
    }

  });

  test('should return empty array when file is empty', async () => {
    const logDatasource = new FileSystemDatasource();

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

    expect( logsLow.length ).toBe(0);
    expect( logsLow ).toBeInstanceOf(Object);
    expect( logsMedium.length ).toBe(0);
    expect( logsMedium ).toBeInstanceOf(Object);
    expect( logsHigh.length ).toBe(0);
    expect( logsHigh ).toBeInstanceOf(Object);
  });


})