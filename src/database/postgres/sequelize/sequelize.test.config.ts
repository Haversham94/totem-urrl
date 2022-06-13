// Test specific sequelize config
import path from 'path';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../../../../test/resources/test-db.sqlite'),
});
