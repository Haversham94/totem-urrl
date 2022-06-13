import { Sequelize } from 'sequelize';

import { config } from '../../../config';

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_USERNAME,
  {
    port: config.DB_PORT,
    host: config.DB_HOST,
    dialect: 'postgres',
  },
);
