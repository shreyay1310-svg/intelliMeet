import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { apiLimiter } from './middleware/rateLimiter';

dotenv.config();

import { connectDB } from './config/db';
import { seedDatabase } from './utils/seedData';
import { User } from './models/User';
import { setupSocketHandlers } from './sockets/socketHandler';

// Route imports
import authRoutes from './routes/authRoutes';
import meetingRoutes from './routes/meetingRoutes';
import taskRoutes from './routes/taskRoutes';
import summaryRoutes from './routes/summaryRoutes';
import aiRoutes from './routes/aiRoutes';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import notificationRoutes from './routes/notificationRoutes';
import recordingRoutes from './routes/recordingRoutes';
import searchRoutes from './routes/searchRoutes';

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

setupSocketHandlers(io);

// Security & Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local client, same origin or no origin (e.g. mobile apps/curl)
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// General API Rate Limiter
app.use('/api', apiLimiter);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'IntellMeet Backend API',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/summaries', summaryRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/recordings', recordingRoutes);
app.use('/api/search', searchRoutes);

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error Middleware]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// 404 Route
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Bootstrap Database and Start Server
const startServer = async () => {
  try {
    await connectDB();

    // Check if initial users exist, if not, auto-seed
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Bootstrap] No users found. Auto-seeding initial IntellMeet dataset...');
      await seedDatabase();
    } else {
      console.log(`[Bootstrap] Found ${userCount} existing users in database.`);
    }

    server.listen(PORT, () => {
      console.log(`=================================================`);
      console.log(`🚀 IntellMeet Server running on http://localhost:${PORT}`);
      console.log(`📡 WebSocket & WebRTC signaling ready`);
      console.log(`🌐 Client URL: ${CLIENT_URL}`);
      console.log(`=================================================`);
    });
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
};

startServer();

export { app, server, io };
