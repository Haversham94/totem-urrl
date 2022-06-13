import { Sequelize } from 'sequelize/types';
import { config } from '../../../config';

export const {
  sequelize,
}: {
  sequelize: Sequelize;
} = require(`./sequelize.${config.NODE_ENV}.config.ts`);

if (!sequelize) {
  throw new Error('Could not load sequelize configurations');
}
