import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { RedisCacheService } from './redis.service';

import { RedisHealth } from './redis.health';
import { CACHE_SERVICE_TOKEN } from '@core/interfaces';
import { RedisCacheConfig } from '@configs/modules';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: RedisCacheConfig,
      isGlobal: true,
    }),
  ],
  providers: [
    RedisCacheService,
    RedisHealth,
    {
      provide: CACHE_SERVICE_TOKEN,
      useExisting: RedisCacheService,
    },
  ],
  exports: [CACHE_SERVICE_TOKEN, RedisHealth],
})
export class RedisCacheServiceModule {}
