import express, { Request, Response } from 'express';
import validator from 'validator';

import { urlService } from '../services/url-service';

const router = express.Router();

router.post('/api/shorturl', async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!validator.isURL(url)) {
    return res.status(400).json({ error: 'Invalid url' });
  }

  const generatedUrl = await urlService.create(url);
  res.status(201).json(generatedUrl);
});

router.get('/api/shorturl/analytics', async (req: Request, res: Response) => {
  const urls = await urlService.getAll();

  res.status(200).json(urls);
});

router.get('/api/shorturl/:urlId', async (req: Request, res: Response) => {
  const { urlId } = req.params;

  const url = await urlService.findOne(urlId);
  if (!url) {
    return res.status(404);
  }

  res.redirect(url.originalUrl);
});

export { router as urlRouter };
