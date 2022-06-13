import { app } from './app';
import { sequelize } from './database/postgres/sequelize';

const start = async () => {
  console.log('Starting...');

  try {
    await sequelize.authenticate();
    console.log('Connected to posgres');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
