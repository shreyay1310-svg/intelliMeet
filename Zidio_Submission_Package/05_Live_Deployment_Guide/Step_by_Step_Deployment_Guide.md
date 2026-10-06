# 🚀 Step-by-Step Live Deployment Guide

This guide walks you through deploying **IntellMeet** live on the internet with a public **HTTPS URL**, satisfying Zidio's live deployment requirements using 100% free hosting tiers.

---

## 🏗️ Architecture Overview

```
Frontend (React + Vite)        Backend (Node + Express + Socket.io)        Database
   [ Vercel / Netlify ]  =======>  [ Render / Railway ]  ===============>  [ MongoDB Atlas ]
    (Public HTTPS URL)             (Public HTTPS API / WSS)                  (Managed DB)
```

---

## Part 1: Database Setup (MongoDB Atlas - Free Tier)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. Click **Create Deployment** -> Select **M0 Free Cluster**.
3. Choose a cloud provider and region closest to your users (e.g., AWS / Mumbai or Frankfurt).
4. Create a database user (e.g., `intellimeet_admin` and a secure password).
5. In **Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere) so cloud hosting platforms can connect.
6. Click **Database** -> **Connect** -> **Drivers** -> Copy your connection string:
   ```
   mongodb+srv://intellimeet_admin:<password>@cluster0.abcde.mongodb.net/intellimeet?retryWrites=true&w=majority
   ```

---

## Part 2: Backend Deployment (Render - Free Web Service)

1. Go to [render.com](https://render.com) and create an account.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository (`intelliMeet`).
4. Configure the Web Service:
   - **Name:** `intellimeet-api`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
5. Click **Environment Variables** and add the following keys:
   ```env
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://intellimeet_admin:<password>@cluster0.abcde.mongodb.net/intellimeet?retryWrites=true&w=majority
   JWT_SECRET=super_secret_enterprise_jwt_key_2026_zidio
   JWT_REFRESH_SECRET=super_refresh_jwt_key_2026_zidio
   CLIENT_URL=https://your-frontend-subdomain.vercel.app
   OPENAI_API_KEY=your_openai_api_key_here_or_leave_empty_for_fallback
   ```
6. Click **Create Web Service**. Render will build and deploy your backend.
7. Once deployed, copy your Live Backend URL:
   `https://intellimeet-api.onrender.com`

---

## Part 3: Frontend Deployment (Vercel - Free Tier)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your `intelliMeet` repository.
4. Configure Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click Edit -> Select `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Open **Environment Variables** and add:
   ```env
   VITE_API_URL=https://intellimeet-api.onrender.com
   VITE_SOCKET_URL=https://intellimeet-api.onrender.com
   ```
6. Click **Deploy**. Vercel will build and deploy the React frontend in ~45 seconds.
7. Once finished, copy your Live Frontend URL:
   `https://intellimeet-app.vercel.app`

---

## Part 4: Final Linkage & Verification

1. Go back to Render Dashboard -> Web Service -> Environment Variables.
2. Update `CLIENT_URL` to match your exact Vercel frontend URL:
   `CLIENT_URL=https://intellimeet-app.vercel.app`
3. Click **Save Changes** (Render will automatically redeploy with the updated CORS origin).
4. Open your live frontend URL in an incognito browser window.
5. Log in, create a meeting room, and verify Socket.io signaling connects successfully over `WSS`!
