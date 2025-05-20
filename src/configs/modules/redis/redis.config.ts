import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { EnvConfigService } from '@configs/env/env.service';

import KeyvRedis, { KeyvRedisOptions } from '@keyv/redis';

@Injectable()
export class RedisCacheConfig implements CacheOptionsFactory {
  constructor(private envConfigService: EnvConfigService) {}

  createCacheOptions(): CacheModuleOptions<KeyvRedisOptions> {
    const redisUri = this.envConfigService.getRedisConnectionString();
    const regex =
      /redis:\/\/(?:(?<username>[^:]*):(?<password>[^@]*)@)?(?<host>[^:/]+)(?::(?<port>\d+))?/;
    const match = redisUri.match(regex);

    if (!match || !match.groups) {
      throw new Error('Invalid Redis URI');
    }

    const { password, host, port } = match.groups;

    return {
      stores: [
        new KeyvRedis(
          {
            socket: {
              host,
              port: Number(port),
            },
            password,
            database: 0,
          },
          {},
        ),
      ],
      isGlobal: true,
    };
  }
}
