import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseHealth } from './mongoose.health';
import * as schemas from '@freamworks/data-service/mongoose/schema';
import * as repositories from '@freamworks/data-service/mongoose/repositories';
import * as IRepositories from '@core/interfaces/repositories';
import {
  MONGOOSE_DB_CONNECTION_NAME,
  MongooseDBConfig,
} from '@configs/modules';
import { MongooseDataSerivce } from './mongoose.service';
import { DATA_SERVICE_TOKEN } from '@core/interfaces';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseDBConfig,
      connectionName: MONGOOSE_DB_CONNECTION_NAME,
    }),
    MongooseModule.forFeature(
      [{ name: schemas.User.name, schema: schemas.UserSchema }],
      MONGOOSE_DB_CONNECTION_NAME,
    ),
  ],
  providers: [
    ...Object.values(repositories),
    MongooseDataSerivce,
    {
      provide: DATA_SERVICE_TOKEN,
      useExisting: MongooseDataSerivce,
    },

    {
      provide: IRepositories.USER_REPOSITORY_TOKEN,
      useExisting: repositories.UserRepository,
    },

    MongooseHealth,
  ],
  exports: [DATA_SERVICE_TOKEN, MongooseHealth],
})
export class MongooseDataServiceModule {}
