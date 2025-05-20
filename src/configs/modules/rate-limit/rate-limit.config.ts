import { Injectable } from '@nestjs/common';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';
import { EnvConfigService } from '@configs/env/env.service';

@Injectable()
export class RateLimitConfig implements ThrottlerOptionsFactory {
  constructor(private envConfigService: EnvConfigService) {}

  createThrottlerOptions():
    | ThrottlerModuleOptions
    | Promise<ThrottlerModuleOptions> {
    const redisUri = this.envConfigService.getRedisConnectionString();

    return {
      storage: new ThrottlerStorageRedisService(redisUri),
      throttlers: [
        { name: 'short', ttl: 1000, limit: 100 },
        { name: 'long', ttl: 60_000, limit: 1000 },
      ],
    };
  }
}
