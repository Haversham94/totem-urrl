import { nanoid } from 'nanoid';

import { IUrlRepository } from '../../base';
import { Url } from '../models';
import { IUrl } from '../../../interfaces';
import { config } from '../../../config';

export class UrlRepository implements IUrlRepository {
  private async findOneByOriginalUrl(
    url: string,
  ): Promise<Partial<IUrl> | undefined> {
    return (await Url.findOne({ where: { originalUrl: url } }))?.toJSON();
  }

  async findOne(urlId: string): Promise<Partial<IUrl> | undefined> {
    const existingUrl = await Url.findOne({ where: { shortId: urlId } });

    if (existingUrl) {
      existingUrl.setDataValue(
        'nbClicks',
        existingUrl.getDataValue('nbClicks') + 1,
      );
      await existingUrl.save();
      return { originalUrl: existingUrl.getDataValue('originalUrl') };
    }
  }

  async create(urlPayload: string): Promise<Partial<IUrl> | undefined> {
    const existingUrl = await this.findOneByOriginalUrl(urlPayload);
    if (existingUrl) {
      return {
        originalUrl: existingUrl.originalUrl,
        shortUrl: existingUrl.shortUrl,
      };
    }

    const shortId = nanoid(6);
    const shortUrl = `${config.BASE}/${shortId}`;

    const newUrl = new Url({
      originalUrl: urlPayload,
      shortUrl: shortUrl,
      nbClicks: 0,
      shortId,
    });
    await newUrl.save();
    const formattedNewUrl = newUrl.toJSON();

    return { originalUrl: formattedNewUrl.originalUrl, shortUrl: shortUrl };
  }

  async getAll(): Promise<Partial<IUrl>[]> {
    const urls = await Url.findAll();
    return urls.map((url) => url.toJSON());
  }
}
