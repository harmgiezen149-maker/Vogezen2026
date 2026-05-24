import { createClient } from 'redis';

let client;

const getRedisClient = async () => {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });
    client.on('error', (err) => console.error('Redis error:', err));
    await client.connect();
  }
  return client;
};

export default getRedisClient;
