import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check.service";



describe('check.service.ts CheckService', () => {
  
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
    mockSuccessCallback,
    mockErrorCallback
  );

  const urlTest = 'https://google.com';
  const badUrlTest = 'https://googletretretretre.com';

  beforeEach(() => {
    jest.clearAllMocks();
  })


  test('should call successCallback when fetch returns true', async () => {

    const wasOk = await checkService.execute(urlTest)

    expect(wasOk).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockRepository.saveLog).toBeCalledWith(
      expect.any(LogEntity)
    );

    expect(mockRepository.saveLog).toHaveBeenCalledTimes(1);

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.objectContaining({
      level: 'low',
      message: expect.stringContaining(urlTest),
      origin: expect.any(String),
      createdAt: expect.any(Object)
    }));

  });

  test('should call successCallback when fetch returns false', async () => {

    const wasOk = await checkService.execute(badUrlTest)

    expect(wasOk).toBe(false);
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockRepository.saveLog).toBeCalledWith(
      expect.any(LogEntity)
    );

  });

})
