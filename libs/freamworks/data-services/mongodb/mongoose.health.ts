import { MONGOOSE_DB_CONNECTION_NAME } from '@libs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { Connection } from 'mongoose';

export class MongooseHealth {
  constructor(
    @InjectConnection(MONGOOSE_DB_CONNECTION_NAME)
    private dbConnection: Connection,
  ) {}

  async checkDb(): Promise<HealthIndicatorResult> {
    if (this.dbConnection.readyState === 1) {
      return {
        db: {
          status: 'up',
        },
      };
    } else {
      return {
        db: {
          status: 'down',
        },
      };
    }
  }
}
