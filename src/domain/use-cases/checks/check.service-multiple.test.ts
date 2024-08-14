import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check.service-multiple";




describe('check.service-multiple.ts CheckServiceMultiple', () => {

  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    [mockRepo1, mockRepo2, mockRepo3],
    mockSuccessCallback,
    mockErrorCallback
  );

  const urlTest = 'https://google.com';
  const badUrlTest = 'https://googletretretretre.com';

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should call successCallback when fetch returns true', async () => {

    const wasOk = await checkService.execute(urlTest);

    console.log(wasOk);

    expect(wasOk).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockRepo1.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toBeCalledWith(expect.any(LogEntity));

    expect(mockRepo1.saveLog).toHaveBeenCalledTimes(1);
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.objectContaining({
      level: 'low',
      message: expect.stringContaining(urlTest),
      origin: 'check.services-multiple.ts',
      createdAt: expect.any(Object)
    }));

    expect(mockRepo2.saveLog).toHaveBeenCalledTimes(1);
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.objectContaining({
      level: 'low',
      message: expect.stringContaining(urlTest),
      origin: 'check.services-multiple.ts',
      createdAt: expect.any(Object)
    }));

    expect(mockRepo3.saveLog).toHaveBeenCalledTimes(1);
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.objectContaining({
      level: 'low',
      message: expect.stringContaining(urlTest),
      origin: 'check.services-multiple.ts',
      createdAt: expect.any(Object)
    }));

  }, 6000);

  test('should call successCallback when fetch returns false', async () => {

    const wasOk = await checkService.execute(badUrlTest)

    expect(wasOk).toBe(false);
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockRepo1.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toBeCalledWith(expect.any(LogEntity));

  });


})
