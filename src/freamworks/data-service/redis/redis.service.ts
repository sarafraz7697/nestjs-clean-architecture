import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CacheManagerStore as Store } from 'cache-manager';
import { Inject, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import Redlock, { Lock } from 'redlock';
import { nanoid } from 'nanoid';
import { ICacheService } from '@core/interfaces';
import { EnvConfigService } from '@configs/env';

export interface RedisStore extends Store {
  name: 'redis';
  getClient: () => Redis;
  isCacheableValue: (value: any) => boolean;
}

export interface RedisCache extends Cache {
  store: RedisStore;
}

export class RedisCacheService
  implements ICacheService, OnModuleInit, OnModuleDestroy
{
  private readonly localKeyPerfix = 'lock:';
  private readonly redisClient: Redis;
  private readonly redlock: Redlock;
  private nodeId = nanoid();

  private readonly heartbeatKey = `heartbeat:${this.nodeId}`;
  private readonly heartbeatTTL = 5000; // e.g., 5 seconds
  private heartbeatInterval: NodeJS.Timeout;

  private logger = new Logger(RedisCacheService.name);

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    private config: EnvConfigService,
  ) {
    const regex =
      /redis:\/\/(?:(?<username>[^:]*):(?<password>[^@]*)@)?(?<host>[^:/]+)(?::(?<port>\d+))?/;
    const match = config.getRedisConnectionString().match(regex);

    if (!match || !match.groups) {
      throw new Error('Invalid Redis URI');
    }
    const { host, port, password } = match.groups;

    this.redisClient = new Redis(Number(port), host, {
      password: password,
      db: 0,
    });

    // @ts-ignore
    this.redlock = new Redlock([this.redisClient], {
      retryCount: 5,
      retryDelay: 200,
      retryJitter: 300,
    });
  }

  onModuleInit() {
    this.startHeartbeat();
  }

  async onModuleDestroy() {
    clearInterval(this.heartbeatInterval);
    await this.delete(this.heartbeatKey);
  }

  async keys(key: string): Promise<any> {
    try {
      return await this.redisClient.keys(key);
    } catch (err) {
      console.error(`Failed to get cache key: ${key}`, err);
      return null;
    }
  }

  // Generic cache retrieval
  async get<T>(key: string): Promise<T | null> {
    try {
      return await this.cacheManager.get(key);
    } catch (err) {
      console.error(`Failed to get cache key: ${key}`, err);
      return null;
    }
  }

  // Generic cache set with optional TTL
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      ttl = Number(ttl ?? 0);
      if (ttl > 0) {
        await this.cacheManager.set(key, value, ttl * 1000);
      } else {
        await this.cacheManager.set(key, value, 0); // TTL of 0 means no expiration
      }
    } catch (err) {
      console.error(`Failed to set cache key: ${key}`, err);
    }
  }

  // Generic cache deletion
  async delete(key: string): Promise<any> {
    try {
      const datas = await this.cacheManager.get(key);
      await this.cacheManager.del(key);
      return datas;
    } catch (err) {
      console.error(`Failed to delete cache key: ${key}`, err);
    }
  }

  // Acquire a lock with a TTL
  async aquireLock(lockName: string, ttl: number): Promise<Lock | null> {
    const lockKey = `${this.localKeyPerfix}${lockName}`;

    try {
      const result = await this.redlock.acquire([lockKey], ttl);
      return result;
    } catch (err) {
      this.logger.error({ err }, `Failed to acquire lock: ${lockName}`);
      return null;
    }
  }

  // Release a lock
  async releaseLock(lock: Lock): Promise<void> {
    try {
      await lock.release();
    } catch (err) {
      console.error(`Failed to release lock`, err);
    }
  }

  async rawGet(key: string): Promise<any> {
    return this.redisClient.get(key);
  }

  // Increment a cache value (useful for counters)
  async incrCache(key: string): Promise<number> {
    try {
      return await this.redisClient.incr(key);
    } catch (err) {
      console.error(`Failed to increment cache key: ${key}`, err);
      throw err;
    }
  }

  // Decrement a cache value
  async decrCache(key: string): Promise<number> {
    try {
      return await this.redisClient.decr(key);
    } catch (err) {
      console.error(`Failed to decrement cache key: ${key}`, err);
      throw err;
    }
  }

  // Redis Ping
  ping(): Promise<string> {
    return this.redisClient.ping();
  }

  async deleteByPattern(pattern: string): Promise<void> {
    let cursor = '0';
    do {
      try {
        // Scan for matching keys in batches (e.g., 100 at a time)
        const [nextCursor, keys] = await this.redisClient.scan(
          cursor,
          'MATCH',
          pattern,
          'COUNT',
          100,
        );

        cursor = nextCursor;

        if (keys.length > 0) {
          await this.redisClient.del(keys);
          console.log(`Deleted keys: ${keys}`);
        }
      } catch (err) {
        console.error(`Failed to delete keys by pattern: ${pattern}`, err);
      }
    } while (cursor !== '0'); // Continue until cursor returns to 0 (no more keys to scan)
  }

  async acquireLockIfSingleInstance(
    lockName: string,
    ttl: number,
  ): Promise<Lock | null> {
    const heartbeatKeys = await this.redisClient.keys('heartbeat:*');

    // Only attempt to acquire the lock if this instance is the only heartbeat
    if (heartbeatKeys.length <= 1) {
      return await this.aquireLock(lockName, ttl);
    }

    return null;
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(async () => {
      await this.set(this.heartbeatKey, 'alive', this.heartbeatTTL / 1000);
    }, this.heartbeatTTL / 2); // Renew every half-TTL
  }
}
