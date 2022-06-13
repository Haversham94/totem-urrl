import { IUrl } from '../../interfaces';

export interface IUrlRepository {
  create(url: string): Promise<Partial<IUrl> | undefined>;
  findOne(urlId: string): Promise<Partial<IUrl> | undefined>;
  getAll(): Promise<Partial<IUrl>[]>;
}
