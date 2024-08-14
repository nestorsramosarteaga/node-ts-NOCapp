import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";
import { SendEmailLogs } from "./send-email-logs";



describe('SendEmailLogs send-email-logs.ts', () => {

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
  }

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const testRecipientEmail = 'nestor.ramos.lxx@gmail.com';

  const dataExpect = {
    message: 'Log email sent',
    origin: 'send-email-logs.ts',
    level: LogSeverityLevel.low
  }

  const dataExpectError = {
    message: 'Error: Email log not sent',
    origin: 'send-email-logs.ts',
    level: LogSeverityLevel.high
  }

  

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should call sendEmail and saveLog', async() => {

    const result = await sendEmailLogs.execute(testRecipientEmail);

    expect(result).toBe(true);
    expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: dataExpect.level,
      message: dataExpect.message,
      origin: dataExpect.origin
    });

  })


  test('should log in case of error', async() => {

    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

    const result = await sendEmailLogs.execute(testRecipientEmail);

    expect(result).toBe(false);
    expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: dataExpectError.level,
      message: dataExpectError.message,
      origin: dataExpectError.origin
    });

  })

})
