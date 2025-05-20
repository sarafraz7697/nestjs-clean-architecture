import { Module } from '@nestjs/common';

import { MongooseDataServiceModule } from './mongoose';
import { RedisCacheServiceModule } from './redis';

@Module({
  imports: [MongooseDataServiceModule, RedisCacheServiceModule],
  exports: [MongooseDataServiceModule, RedisCacheServiceModule],
})
export class DataServiceModule {}
