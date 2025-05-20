import { MONGOOSE_DB_CONNECTION_NAME } from '@configs/modules';
import { InjectConnection } from '@nestjs/mongoose';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { Connection } from 'mongoose';

export class MongooseHealth {
  constructor(
    @InjectConnection(MONGOOSE_DB_CONNECTION_NAME)
    private mongooseDbConnection: Connection,
  ) {}

  async checkMongooseDb(): Promise<HealthIndicatorResult> {
    if (this.mongooseDbConnection.readyState === 1) {
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
