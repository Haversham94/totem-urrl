import { sequelize } from '../../src/database/postgres/sequelize';

jest.mock('nanoid', () => {
  return { nanoid: () => 'l2345I' };
});

beforeAll(async () => {
  await sequelize.authenticate();
  console.log('Successfully connected to test database');
  await sequelize.sync();
});

beforeEach(async () => {
  jest.clearAllMocks();

  console.log('Emptying tables');
  await sequelize.truncate();
});

afterAll(async () => {
  await sequelize.close();
});
