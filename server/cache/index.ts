import { triedAsync } from '@/lib/utils';
import { asthraNotStarted } from '@/logic/moods';
import { RedisClient } from './redis';

const defauldExpire = 1 * 3600;
const isCaching = !asthraNotStarted(); // cache only if asthra has started

const cacheUtils = {
  async get<T>(key: string) {
    return await triedAsync(RedisClient.get<T>(key));
  },
  async set(key: string, value: string, expires = defauldExpire) {
    return await triedAsync(RedisClient.set(key, value, { ex: expires }));
  },
  async del(key: string) {
    return await triedAsync(RedisClient.del(key));
  },
};

const cacheFunc = async <T>(
  key: string,
  func: () => Promise<T>,
  expires?: number
) => {
  if (!isCaching) {
    return await triedAsync(func());
  }

  const cached = await cacheUtils.get<T>(key);
  if (cached.isSuccess && cached.data) {
    return cached;
  }

  const called = await triedAsync(func());

  if (called.isSuccess) {
    cacheUtils.set(key, JSON.stringify(called.data), expires);
  }

  return called;
};

export const cache = {
  ...cacheUtils,
  run: cacheFunc,
};
