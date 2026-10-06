import { Server, Socket } from 'socket.io';
import { Message } from '../models/Message';
import { cacheService, CachedParticipant } from '../services/cacheService';

export interface RoomUser {
  socketId: string;
  userId: string;
  name: string;
  avatar: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  isScreenSharing: boolean;
  isHost: boolean;
}

let ioInstance: Server | null = null;

// Helper to access io anywhere in the backend
export const getIO = (): Server | null => ioInstance;

// Helper to emit real-time push notification to a specific user
export const emitRealtimeNotification = (recipientId: string, notification: any) => {
  if (ioInstance) {
    ioInstance.to(`user:${recipientId}`).emit('notification:new', notification);
    console.log(`[Socket] Push notification emitted to user:${recipientId}`);
  }
};

export const setupSocketHandlers = (io: Server) => {
  ioInstance = io;
  // Local fallback map for instant synchronous access
  const roomParticipants = new Map<string, Map<string, RoomUser>>();

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`);

    // Join personal user room for direct real-time notifications
    socket.on('user:join', ({ userId }) => {
      if (userId) {
        socket.join(`user:${userId}`);
        console.log(`[Socket] User ${userId} subscribed to personal notification channel`);
      }
    });

    // Join meeting room
    socket.on('meeting:join', async ({ roomId, user, isHost = false }) => {
      socket.join(roomId);

      if (!roomParticipants.has(roomId)) {
        roomParticipants.set(roomId, new Map());
      }

      const participants = roomParticipants.get(roomId)!;
      const roomUser: RoomUser = {
        socketId: socket.id,
        userId: user?.id || socket.id,
        name: user?.name || 'Guest Participant',
        avatar: user?.avatar || '',
        audioEnabled: true,
        videoEnabled: true,
        isScreenSharing: false,
        isHost: isHost || false,
      };

      participants.set(socket.id, roomUser);

      // Cache participant in Redis / CacheService
      await cacheService.addRoomParticipant(roomId, socket.id, roomUser as CachedParticipant);

      // Notify caller of existing participants in room
      const existingUsers = Array.from(participants.values()).filter(
        (u) => u.socketId !== socket.id
      );
      socket.emit('meeting:all-participants', existingUsers);

      // Broadcast to others that a user joined
      socket.to(roomId).emit('meeting:user-joined', roomUser);

      // Post system message into chat
      try {
        const sysMsg = await Message.create({
          meetingId: roomId,
          senderName: 'System',
          senderAvatar: '',
          text: `${roomUser.name} joined the meeting`,
          isSystemMessage: true,
          timestamp: new Date(),
        });
        io.to(roomId).emit('chat:message', sysMsg);
      } catch (err) {
        console.error('[Socket] System message error:', err);
      }
    });

    // WebRTC Signaling: Offer
    socket.on('webrtc:offer', ({ to, offer }) => {
      io.to(to).emit('webrtc:offer', {
        from: socket.id,
        offer,
      });
    });

    // WebRTC Signaling: Answer
    socket.on('webrtc:answer', ({ to, answer }) => {
      io.to(to).emit('webrtc:answer', {
        from: socket.id,
        answer,
      });
    });

    // WebRTC Signaling: ICE Candidate
    socket.on('webrtc:ice-candidate', ({ to, candidate }) => {
      io.to(to).emit('webrtc:ice-candidate', {
        from: socket.id,
        candidate,
      });
    });

    // Toggle Microphone Status
    socket.on('participant:mute', async ({ roomId, audioEnabled }) => {
      const participants = roomParticipants.get(roomId);
      if (participants && participants.has(socket.id)) {
        const user = participants.get(socket.id)!;
        user.audioEnabled = audioEnabled;
        await cacheService.addRoomParticipant(roomId, socket.id, user as CachedParticipant);
        io.to(roomId).emit('participant:state-changed', {
          socketId: socket.id,
          audioEnabled,
          videoEnabled: user.videoEnabled,
        });
      }
    });

    // Toggle Camera Status
    socket.on('participant:camera', async ({ roomId, videoEnabled }) => {
      const participants = roomParticipants.get(roomId);
      if (participants && participants.has(socket.id)) {
        const user = participants.get(socket.id)!;
        user.videoEnabled = videoEnabled;
        await cacheService.addRoomParticipant(roomId, socket.id, user as CachedParticipant);
        io.to(roomId).emit('participant:state-changed', {
          socketId: socket.id,
          audioEnabled: user.audioEnabled,
          videoEnabled,
        });
      }
    });

    // Screen Share Started / Stopped
    socket.on('screen:start', async ({ roomId }) => {
      const participants = roomParticipants.get(roomId);
      if (participants && participants.has(socket.id)) {
        const user = participants.get(socket.id)!;
        user.isScreenSharing = true;
        await cacheService.addRoomParticipant(roomId, socket.id, user as CachedParticipant);
      }
      socket.to(roomId).emit('screen:started', { socketId: socket.id });
    });

    socket.on('screen:stop', async ({ roomId }) => {
      const participants = roomParticipants.get(roomId);
      if (participants && participants.has(socket.id)) {
        const user = participants.get(socket.id)!;
        user.isScreenSharing = false;
        await cacheService.addRoomParticipant(roomId, socket.id, user as CachedParticipant);
      }
      socket.to(roomId).emit('screen:stopped', { socketId: socket.id });
    });

    // Real-time Chat
    socket.on('chat:send', async ({ roomId, message }) => {
      try {
        const savedMessage = await Message.create({
          meetingId: roomId,
          sender: message.senderId,
          senderName: message.senderName,
          senderAvatar: message.senderAvatar,
          text: message.text,
          isSystemMessage: false,
          timestamp: new Date(),
        });

        io.to(roomId).emit('chat:message', savedMessage);
      } catch (err) {
        console.error('[Socket] Chat persist error:', err);
      }
    });

    // Chat Typing indicator
    socket.on('chat:typing', ({ roomId, userName }) => {
      socket.to(roomId).emit('chat:typing', { userName });
    });

    socket.on('chat:stop-typing', ({ roomId, userName }) => {
      socket.to(roomId).emit('chat:stop-typing', { userName });
    });

    // Leave meeting explicitly
    socket.on('meeting:leave', ({ roomId }) => {
      handleUserLeave(socket, roomId, io, roomParticipants);
    });

    // Disconnect event
    socket.on('disconnect', () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`);
      roomParticipants.forEach((participants, roomId) => {
        if (participants.has(socket.id)) {
          handleUserLeave(socket, roomId, io, roomParticipants);
        }
      });
    });
  });
};

const handleUserLeave = async (
  socket: Socket,
  roomId: string,
  io: Server,
  roomParticipants: Map<string, Map<string, RoomUser>>
) => {
  const participants = roomParticipants.get(roomId);
  if (!participants) return;

  const user = participants.get(socket.id);
  if (user) {
    participants.delete(socket.id);
    socket.leave(roomId);

    // Evict from Redis / CacheService
    await cacheService.removeRoomParticipant(roomId, socket.id);

    // Notify room of user departure
    io.to(roomId).emit('meeting:user-left', { socketId: socket.id, userId: user.userId });

    // System message
    try {
      const sysMsg = await Message.create({
        meetingId: roomId,
        senderName: 'System',
        senderAvatar: '',
        text: `${user.name} left the meeting`,
        isSystemMessage: true,
        timestamp: new Date(),
      });
      io.to(roomId).emit('chat:message', sysMsg);
    } catch (err) {
      console.error('[Socket] Leave system message error:', err);
    }
  }

  if (participants.size === 0) {
    roomParticipants.delete(roomId);
  }
};
