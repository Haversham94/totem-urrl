import { str, num, testOnly, cleanEnv } from 'envalid';

export interface IConfig {
  BASE: string;
  NODE_ENV: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
}

export const config = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly('test'),
  }),
  BASE: str({
    devDefault: testOnly('localhost:3000'),
  }),
  DB_HOST: str({
    devDefault: testOnly('localhost'),
  }),
  DB_PORT: num({
    devDefault: testOnly(5432),
  }),
  DB_NAME: str({
    devDefault: testOnly('bookmark'),
  }),
  DB_USERNAME: str({
    devDefault: testOnly('username'),
  }),
  DB_PASSWORD: str({
    devDefault: testOnly('password'),
  }),
}) as IConfig;
