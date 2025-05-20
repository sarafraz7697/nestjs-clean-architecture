import { Lock } from 'redlock';

export const CACHE_SERVICE_TOKEN = Symbol('CACHE_SERVICE_TOKEN');

export interface ICacheService {
  keys(key: string): Promise<any>;

  get<T>(key: string): Promise<T | null>;

  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  delete(key: string): Promise<any>;

  aquireLock(lockName: string, ttl: number): Promise<Lock | null>;

  acquireLockIfSingleInstance(
    lockName: string,
    ttl: number,
  ): Promise<Lock | null>;

  releaseLock(Lock: Lock): Promise<void>;

  incrCache(key: string): Promise<number>;

  decrCache(key: string): Promise<number>;

  deleteByPattern(key: string): Promise<void>;

  rawGet(key: string): Promise<any>;
}
