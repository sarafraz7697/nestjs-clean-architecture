import { EnvConfigService } from '@libs/config/env';
import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export const MONGOOSE_DB_CONNECTION_NAME = 'audit_db';
@Injectable()
export class MongooseDBConfig implements MongooseOptionsFactory {
  constructor(private envConfigService: EnvConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.envConfigService.getMongoDBConnectionString(),
      dbName: MONGOOSE_DB_CONNECTION_NAME,
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-lean-virtuals'));
        return connection;
      },
    };
  }
}
