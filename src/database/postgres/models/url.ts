import { DataTypes, Model } from 'sequelize';

import { IUrl } from '../../../interfaces';
import { sequelize } from '../sequelize';

const urlSchema = {
  originalUrl: { type: DataTypes.STRING, require: true },
  shortId: { type: DataTypes.STRING, require: true },
  shortUrl: { type: DataTypes.STRING, require: true },
  nbClicks: { type: DataTypes.NUMBER, default: 0 },
};

export class Url extends Model<IUrl> {
  public toJSON() {
    return {
      nbClicks: this.getDataValue('nbClicks'),
      originalUrl: this.getDataValue('originalUrl'),
      shortUrl: this.getDataValue('shortUrl'),
    };
  }
}

Url.init(urlSchema, { sequelize, tableName: 'url' });
