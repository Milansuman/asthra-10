import { env } from '@/env';
import { Redis } from '@upstash/redis';

export const RedisClient = new Redis({
  url: env.UPSTASH_REDIS_URL,
  token: env.UPSTASH_REDIS_TOKEN,
});
