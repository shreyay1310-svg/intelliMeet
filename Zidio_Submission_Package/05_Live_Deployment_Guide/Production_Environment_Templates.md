# 🔑 Production Environment Variable Templates

Use these templates when configuring your cloud deployment dashboards on Render / Railway (Backend) and Vercel / Netlify (Frontend).

> **Important Security Rule:** NEVER commit filled `.env` files with real keys to Git. Only paste them into the secret settings of your hosting provider.

---

## 1. Backend Environment Template (`server/.env.production`)

```env
# ====================================================================
# BACKEND PRODUCTION ENVIRONMENT CONFIGURATION
# ====================================================================

# Port (Cloud providers like Render/Railway automatically inject PORT)
PORT=5000

# Environment Mode
NODE_ENV=production

# MongoDB Atlas Connection URI (Replace with your actual cluster credentials)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/intellimeet?retryWrites=true&w=majority

# JWT Authentication Secrets (Generate secure random 32+ char strings)
JWT_SECRET=intellimeet_production_super_jwt_secret_token_928374
JWT_REFRESH_SECRET=intellimeet_production_super_refresh_secret_102938
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Allowed Frontend Client Origin for CORS and Socket.io Handshake
CLIENT_URL=https://intellimeet-app.vercel.app

# AI Provider Configuration (Optional: fallback engine runs if omitted)
OPENAI_API_KEY=sk-proj-your_actual_key_here_if_using_openai
AI_MODEL=gpt-4o-mini

# Cloudinary Storage Configuration (Optional: for cloud avatar uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Redis Configuration (Optional: in-memory caching fallback is built in)
REDIS_URL=redis://default:password@redis-host:6379
```

---

## 2. Frontend Environment Template (`client/.env.production`)

```env
# ====================================================================
# FRONTEND PRODUCTION ENVIRONMENT CONFIGURATION (Vite)
# ====================================================================

# Backend REST API Base URL
VITE_API_URL=https://intellimeet-api.onrender.com

# Backend Socket.io Real-Time Signaling Server URL
VITE_SOCKET_URL=https://intellimeet-api.onrender.com

# Production App Mode
VITE_APP_ENV=production
```
