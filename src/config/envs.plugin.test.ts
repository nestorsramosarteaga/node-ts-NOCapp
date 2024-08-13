import { envs } from "./envs.plugin"


describe('envs.plugins.ts', () => {

  test('should return env options', () => {

    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: 'lanki.developers@gmail.com',
      MAILER_SECRET_KEY: 'jmepovavdhxcbgjs',
      MAILER_SERVICE: 'gmail',
      PROD: false,
      MONGO_URL: 'mongodb://mongo-user:123456789@localhost:27020',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'mongo-user',
      MONGO_PASS: '123456789',
      POSTGRES_USER: 'postgres',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_PASSWORD: '123456789'
    });

  });


  test('should return error if not found env', async() => {

    jest.resetModules();
    process.env.PORT = 'ABCD';
    try {
      await import('./envs.plugin');
      expect(true).toBe(false);

    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }

  })

})
