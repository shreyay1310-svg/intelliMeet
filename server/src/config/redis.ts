import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

export interface ICacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode?: string, duration?: number): Promise<'OK' | null>;
  del(key: string): Promise<number>;
  hset(key: string, field: string, value: string): Promise<number>;
  hget(key: string, field: string): Promise<string | null>;
  hgetall(key: string): Promise<Record<string, string>>;
  hdel(key: string, ...fields: string[]): Promise<number>;
  exists(key: string): Promise<number>;
}

// In-Memory Fallback Adapter for seamless dev environments without Redis installed
class MemoryCacheAdapter implements ICacheClient {
  private store = new Map<string, any>();
  private hashStore = new Map<string, Map<string, string>>();

  async get(key: string): Promise<string | null> {
    const val = this.store.get(key);
    return val !== undefined ? val : null;
  }

  async set(key: string, value: string, mode?: string, duration?: number): Promise<'OK'> {
    this.store.set(key, value);
    if (mode === 'EX' && duration) {
      setTimeout(() => this.store.delete(key), duration * 1000);
    }
    return 'OK';
  }

  async del(key: string): Promise<number> {
    const deleted = this.store.delete(key) || this.hashStore.delete(key);
    return deleted ? 1 : 0;
  }

  async hset(key: string, field: string, value: string): Promise<number> {
    if (!this.hashStore.has(key)) {
      this.hashStore.set(key, new Map());
    }
    this.hashStore.get(key)!.set(field, value);
    return 1;
  }

  async hget(key: string, field: string): Promise<string | null> {
    const hash = this.hashStore.get(key);
    if (!hash) return null;
    return hash.get(field) || null;
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    const hash = this.hashStore.get(key);
    if (!hash) return {};
    const obj: Record<string, string> = {};
    hash.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }

  async hdel(key: string, ...fields: string[]): Promise<number> {
    const hash = this.hashStore.get(key);
    if (!hash) return 0;
    let count = 0;
    for (const f of fields) {
      if (hash.delete(f)) count++;
    }
    if (hash.size === 0) {
      this.hashStore.delete(key);
    }
    return count;
  }

  async exists(key: string): Promise<number> {
    return this.store.has(key) || this.hashStore.has(key) ? 1 : 0;
  }
}

let redisClient: ICacheClient;
let isRedisConnected = false;

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

if (process.env.REDIS_URL || process.env.ENABLE_REDIS === 'true') {
  try {
    const client = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      retryStrategy: (times) => {
        if (times > 2) return null; // stop retrying and fallback
        return 500;
      },
      lazyConnect: true,
    });

    client.connect()
      .then(() => {
        console.log(`[Redis] Connected successfully to ${redisUrl}`);
        isRedisConnected = true;
      })
      .catch(() => {
        console.log('[Redis] Redis server connection skipped. Utilizing high-speed Memory Cache Adapter.');
      });

    redisClient = client as unknown as ICacheClient;
  } catch (err) {
    console.log('[Redis] Initializing in-memory fallback cache adapter.');
    redisClient = new MemoryCacheAdapter();
  }
} else {
  console.log('[Redis] Running in local/dev mode with high-speed Memory Cache Adapter.');
  redisClient = new MemoryCacheAdapter();
}

export const getCacheClient = (): ICacheClient => redisClient;
export default redisClient;
