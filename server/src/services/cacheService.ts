import { getCacheClient } from '../config/redis';

export interface CachedParticipant {
  socketId: string;
  userId: string;
  name: string;
  avatar: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  isScreenSharing: boolean;
  isHost: boolean;
}

export class CacheService {
  private client = getCacheClient();

  // Cache meeting room participant in Redis Hash
  async addRoomParticipant(roomId: string, socketId: string, user: CachedParticipant): Promise<void> {
    try {
      await this.client.hset(`meeting:room:${roomId}:participants`, socketId, JSON.stringify(user));
    } catch (err) {
      console.error('[CacheService] Error caching participant:', err);
    }
  }

  // Retrieve all active participants in a meeting room
  async getRoomParticipants(roomId: string): Promise<CachedParticipant[]> {
    try {
      const records = await this.client.hgetall(`meeting:room:${roomId}:participants`);
      return Object.values(records).map((raw) => JSON.parse(raw));
    } catch (err) {
      console.error('[CacheService] Error getting participants:', err);
      return [];
    }
  }

  // Remove participant upon disconnect or leaving
  async removeRoomParticipant(roomId: string, socketId: string): Promise<void> {
    try {
      await this.client.hdel(`meeting:room:${roomId}:participants`, socketId);
    } catch (err) {
      console.error('[CacheService] Error removing participant:', err);
    }
  }

  // Check if room has active participants
  async getRoomParticipantCount(roomId: string): Promise<number> {
    try {
      const participants = await this.getRoomParticipants(roomId);
      return participants.length;
    } catch (err) {
      return 0;
    }
  }

  // Cache generic session data with TTL
  async setSession(key: string, data: any, ttlSeconds: number = 3600): Promise<void> {
    try {
      await this.client.set(`session:${key}`, JSON.stringify(data), 'EX', ttlSeconds);
    } catch (err) {
      console.error('[CacheService] Error saving session:', err);
    }
  }

  // Retrieve cached session data
  async getSession<T>(key: string): Promise<T | null> {
    try {
      const raw = await this.client.get(`session:${key}`);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }
}

export const cacheService = new CacheService();
