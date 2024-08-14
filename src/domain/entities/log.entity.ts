
export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions{
  message:string,
  level:LogSeverityLevel,
  origin:string,
  createdAt?: Date;
}
export class LogEntity{

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;


  constructor( options: LogEntityOptions ){
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromJson = (json: string): LogEntity => {
    json = ( json === '' ) ? '{}' : json;

    const {message, level, origin, createdAt} = JSON.parse(json);

    if( !message ) throw new Error('Message is required');

    if (!(level in LogSeverityLevel)) {
      throw new Error(`Invalid Log Severity Level: ${level}. Allowed values are: ${Object.values(LogSeverityLevel).join(', ')}`);
    }

    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin
    });

    return log;

  }

  static fromObject = ( object: { [key:string]:any } ): LogEntity => {

    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({ message, level, createdAt, origin });
    return log;

  }

}