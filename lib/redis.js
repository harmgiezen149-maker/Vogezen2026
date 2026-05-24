import { Redis } from '@upstash/redis';

let redisClient = null;

export function getRedis() {
  if (redisClient) return redisClient;

  // Vercel Marketplace integratie zet UPSTASH_REDIS_REST_* env vars.
  // Voor oudere Vercel KV installaties bestaan KV_REST_API_* ook nog.
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error(
      'Redis-omgevingsvariabelen niet ingesteld. Installeer Upstash Redis via Vercel Marketplace, of zie README.md.'
    );
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

export const PLAN_KEY = 'vosges:family-plan';
