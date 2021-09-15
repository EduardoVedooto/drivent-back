import { createNodeRedisClient, WrappedNodeRedisClient } from "handy-redis";

let client: WrappedNodeRedisClient;

export async function createCacheClient() {
  client = createNodeRedisClient({ url: process.env.REDIS_URL });
}

export function cacheClient() {
  return client;
}
