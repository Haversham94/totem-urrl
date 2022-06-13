import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { urlRouter } from './routes/url';
import { errorHandler } from './error-handler.middleware';

const app = express();

app.use(json());

app.use(urlRouter);

app.all('*', async (req: Request, res: Response) => {
  res.status(404).send('Sorry, there is no matching route');
});

app.use(errorHandler);

export { app };
