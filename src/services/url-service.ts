import { IUrlRepository } from './../database/base';

import { UrlRepository } from './../database/postgres/repositories/url-repository';

class UrlService {
  constructor(private urlRepository: IUrlRepository) {}

  async create(url: string) {
    return this.urlRepository.create(url);
  }

  async findOne(urlId: string) {
    return this.urlRepository.findOne(urlId);
  }

  async getAll() {
    return this.urlRepository.getAll();
  }
}

export const urlService = new UrlService(new UrlRepository());
