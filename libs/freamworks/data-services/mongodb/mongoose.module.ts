import { MONGOOSE_DB_CONNECTION_NAME, MongooseDBConfig } from '@libs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseDataSerivce } from './mongoose.service';
import { MongooseHealth } from './mongoose.health';
import * as schemas from './schema';
import * as repositories from '@mongodb/repositories/repositories';
import * as IRepositories from '@interfaces/repositories/mongodb';
import { MONGOOSE_DATA_SERVICE_TOKEN } from '@libs/interfaces/data-services/mongodb';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseDBConfig,
      connectionName: MONGOOSE_DB_CONNECTION_NAME,
    }),

    MongooseModule.forFeature(
      [{ name: schemas.AuditLogin.name, schema: schemas.AuditLoginSchema }],
      MONGOOSE_DB_CONNECTION_NAME,
    ),
  ],
  providers: [
    // ...Object.values(repositories),
    MongooseDataSerivce,
    {
      provide: MONGOOSE_DATA_SERVICE_TOKEN,
      useExisting: MongooseDataSerivce,
    },
    {
      provide: IRepositories.AUDIT_LOGIN_REPOSITORY_TOKEN,
      useExisting: repositories.AuditLoginRepository,
    },
    MongooseHealth,
  ],
  exports: [MONGOOSE_DATA_SERVICE_TOKEN, MongooseHealth],
})
export class MongooseDataServiceModule {}
