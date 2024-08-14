import { LogEntity, LogSeverityLevel } from "./log.entity"


describe('log.entity.ts LogEntity', () => {

  const dataObj = {
    message: 'Message-LogEntity-Test',
    origin: 'log.entity.test.ts',
    level: LogSeverityLevel.high,
    // createdAt: new Date('2024-08-13T17:09:55.619Z')
  }

  test('should create a LogEntity instance', () => {

    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toEqual(dataObj.message);
    expect(log.origin).toEqual(dataObj.origin);
    expect(log.level).toEqual(dataObj.level);
    expect(log.createdAt).toBeInstanceOf(Date);

  });

  test('should create a LogEntity instance from json', () => {
    const json = `{"message":"Service http://google.com working","level":"low","origin":"check.services.ts","createdAt":"2024-08-13T17:09:55.619Z"}`;
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toEqual("Service http://google.com working");
    expect(log.origin).toEqual("check.services.ts");
    expect(log.level).toEqual("low");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should creta a LogEntity instance from object', () => {

    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toEqual(dataObj.message);
    expect(log.origin).toEqual(dataObj.origin);
    expect(log.level).toEqual(dataObj.level);
    expect(log.createdAt).toBeInstanceOf(Date);

  });

})
