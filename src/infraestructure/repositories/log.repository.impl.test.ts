import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository.impl';


describe('Test log.repository.impl.test.ts', () => {

  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('savelog should call the datasource with arguments', async () => {
    const log = { level: LogSeverityLevel.high, message: 'test implements' } as LogEntity;

    await logRepository.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledTimes(1);

  });

  test('getlogs should call the datasource with arguments', async () => {
    const lowSeverity = LogSeverityLevel.low;

    await logRepository.getLogs(lowSeverity);

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledTimes(1);
  });



 })