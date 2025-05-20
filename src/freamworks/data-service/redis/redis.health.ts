import { HealthIndicatorResult } from '@nestjs/terminus';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

import Redis from 'ioredis';

export class RedisHealth {
  private readonly redisClient: Redis;

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {
    this.redisClient = //@ts-ignore
      //@ts-ignore
      (this.cacheManager.stores?.[0] as KeyvRedis<unknown>).store.client;
  }

  async check(): Promise<HealthIndicatorResult> {
    try {
      const pong = await this.redisClient.ping();

      if (pong) {
        return {
          redis: {
            status: 'up',
          },
        };
      } else {
        return {
          redis: {
            status: 'down',
          },
        };
      }
    } catch (error) {
      return {
        redis: {
          status: 'down',
        },
      };
    }
  }
}
