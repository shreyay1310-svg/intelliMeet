# IntellMeet - AI-Powered Enterprise Meeting & Collaboration Platform

> **Turn your meetings into meaningful outcomes.**  
> Complete full-stack MERN enterprise platform featuring real-time WebRTC conferencing, Socket.io signaling, AI meeting intelligence, live transcription, task management, calendar scheduling, and dedicated role-based portals (Employee & Admin).

---

## 🚀 Key Features

### 1. Real-Time Video Conferencing (WebRTC + Socket.io)
- **Google Meet / Zoom-Style Layout**: Dynamic video tile grid with audio, video, and screen sharing (`navigator.mediaDevices.getDisplayMedia`).
- **Low-Latency Signaling**: Full peer-to-peer WebRTC connection negotiation using Socket.io (`webrtc:offer`, `webrtc:answer`, `webrtc:ice-candidate`).
- **Live Meeting Controls**: Mute/unmute microphone, camera toggle, screen share, meeting timer, and meeting recording via `MediaRecorder`.
- **In-Meeting Collaboration Drawer**: Real-time room chat with typing indicator, participant roster, active speaker status, and live AI notes.

### 2. AI Meeting Intelligence & Summaries
- **Executive Summaries**: AI-synthesized meeting overviews from live speech transcripts.
- **Key Takeaways & Action Items**: Structured bullet points with assignees, due dates, and single-click task conversion.
- **Dual AI Provider Architecture**: Native integration with OpenAI API (`OPENAI_API_KEY`) plus an intelligent offline fallback synthesizer so development and demos always work.
- **Conversational AI Assistant**: Chat with your workspace to ask *"What meetings do I have today?"*, *"Summarize my last meeting"*, or *"What action items are pending?"*.

### 3. Employee & Team Workspace
- **Dashboard**: Greeting banner ("Good morning, Shreya 👋"), quick stats badges, upcoming meetings cards with Join and `.ics` Calendar download, and weekly insights charts using Recharts.
- **Meetings Management**: Upcoming, Past Meetings, and Personal Room tabs with date-grouped schedules and "+ New Meeting" modal.
- **Calendar**: Week and month views with color-coded interactive meeting events.
- **Task & Kanban Board**: Manage tasks with priority levels, due date tracking, and 4-column Kanban workflow (*To Do*, *In Progress*, *Review*, *Completed*).
- **Recordings Archive**: Play recorded sessions in-browser and download files.
- **Team Directory**: Department rosters and member profiles.
- **Global Search**: Search across meetings, people, tasks, and recordings with `Ctrl+K`.

### 4. Admin Management Console
- **Platform Analytics**: Executive KPI cards, Meetings Trend (AreaChart), User Activity (BarChart), Peak Meeting Hours, and Meeting Type distribution (Donut chart).
- **User Governance**: Full CRUD, active/inactive toggles, role promotion (Member ⇄ Administrator), and audit logging.
- **Reports Export**: One-click telemetry CSV export.
- **System Settings**: Enterprise branding, support email, timezones, and session timeout policies.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, React Router v6 |
| **Backend** | Node.js, Express.js, TypeScript, Socket.io, Helmet, CORS, express-rate-limit |
| **Database** | MongoDB & Mongoose (with automated embedded MongoDB fallback) |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs password hashing, RBAC middleware |
| **Realtime / Media** | Socket.io signaling, WebRTC PeerConnection, MediaRecorder API |
| **AI Intelligence** | OpenAI API (GPT-4o-mini) + built-in fallback synthesizer |

---

## 📂 Project Structure

```
intelliMeet/
├── package.json              # Orchestrates client and server dev/build scripts
├── .env.example              # Environment template
├── README.md                 # Project documentation
├── server/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                  # Backend environment configuration
│   └── src/
│       ├── config/           # Database connection with MongoMemoryServer fallback
│       ├── controllers/      # Auth, Meeting, Task, Summary, AI, Admin, Analytics
│       ├── middleware/       # JWT verification & role authorization (protect, authorize)
│       ├── models/           # Mongoose models (User, Meeting, Task, Transcript, Summary, etc.)
│       ├── routes/           # Express API routers
│       ├── services/         # AI Service (OpenAI + intelligent synthesizer)
│       ├── sockets/          # Socket.io WebRTC signaling & real-time chat
│       ├── utils/            # Database seed script, JWT token helper
│       └── server.ts         # Main HTTP, Express, and Socket.io server
└── client/
    ├── package.json
    ├── vite.config.ts        # Vite dev server with proxy to backend
    ├── tailwind.config.js    # Modern SaaS theme tokens
    └── src/
        ├── components/       # Sidebar, Navbar, Meeting Cards, Modals, Empty States
        ├── context/          # AuthContext with token persistence
        ├── layouts/          # DashboardLayout, AdminLayout
        ├── pages/
        │   ├── auth/         # Login, Register, Forgot Password
        │   ├── employee/     # Dashboard, Meetings, Calendar, Tasks, Kanban, Recordings, AI Assistant, Team, Analytics, Settings
        │   ├── meeting/      # WebRTC Meeting Room, AI Meeting Summary
        │   └── admin/        # Admin Dashboard, Users Management, Admin Analytics, Settings
        ├── services/         # Centralized API fetch client
        └── types/            # Comprehensive TypeScript definitions
```

---

## ⚡ Quick Start & Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (Node v26.x supported)
- **npm**: v9.0.0 or later

### 2. Installation
Clone the repository and install dependencies in the server and client:

```bash
# In server directory
cd server
npm install

# In client directory
cd ../client
npm install
```

### 3. Environment Variables
Copy `.env.example` to `server/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/intellimeet
JWT_SECRET=super_secret_intellimeet_jwt_key_2026_dev
JWT_EXPIRES_IN=7d
OPENAI_MODEL=gpt-4o-mini
# Optional: Set your OpenAI key for live OpenAI API analysis
OPENAI_API_KEY=
```

> **Note on Database**: If you do not have MongoDB running locally, the backend automatically boots an **embedded in-memory MongoDB instance** on startup. No extra database setup is required to run the project locally!

### 4. Running the Application
From the root or in separate terminals:

```bash
# Terminal 1: Backend Server (Port 5000)
cd server
npm run dev

# Terminal 2: Frontend Client (Port 5173)
cd client
npm run dev
```

Open your browser to: **http://localhost:5173**

---

## 🔑 Pre-Configured Demo Credentials

The platform automatically seeds realistic accounts and workspace data on first run:

| Role | Email | Password | Details |
|---|---|---|---|
| **Employee** | `shreya@zidio.in` | `Password123!` | Shreya Yadav, Product Designer (Product Team) |
| **Admin** | `admin@zidio.in` | `Password123!` | Enterprise Administrator, Executive Team |
| **Team Member** | `rohit@zidio.in` | `Password123!` | Rohit Sharma, Senior Software Engineer |
| **Team Member** | `ananya@zidio.in` | `Password123!` | Ananya Singh, Lead UI/UX Designer |

*(Quick 1-click login buttons for Shreya and Admin are available on the Login screen).*

---

## 📡 REST API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate and receive JWT token
- `GET /api/auth/me` - Get current session profile (Protected)
- `PUT /api/auth/profile` - Update user profile and meeting hardware defaults
- `PUT /api/auth/change-password` - Update password

### Meetings (`/api/meetings`)
- `GET /api/meetings` - List meetings for current user
- `POST /api/meetings` - Create/schedule new meeting
- `GET /api/meetings/:id` - Get meeting details
- `GET /api/meetings/room/:roomId` - Get or create ad-hoc meeting room

### Tasks & Kanban (`/api/tasks`)
- `GET /api/tasks` - List tasks with status/kanban/assignment filters
- `POST /api/tasks` - Create a new task or action item
- `PUT /api/tasks/:id` - Update status or move across Kanban columns
- `DELETE /api/tasks/:id` - Delete task

### AI Intelligence & Summaries (`/api/summaries` & `/api/ai`)
- `GET /api/summaries/:meetingId` - Get meeting summary, takeaways, and transcript
- `POST /api/summaries/:meetingId/generate` - Generate AI summary and takeaways
- `POST /api/ai/chat` - Query AI Assistant with user context

### Administration (`/api/admin`) *(Admin Role Required)*
- `GET /api/admin/stats` - Admin overview statistics and activity logs
- `GET /api/admin/reports` - Distribution breakdown and feature adoption
- `POST /api/admin/users` - Add new employee or admin user
- `PUT /api/admin/users/:id` - Update user role, team, or status
- `DELETE /api/admin/users/:id` - Permanently remove user

---

## 🌐 Deployment Instructions

### Frontend (Vercel)
1. Push code to GitHub repository.
2. Link the repository to Vercel.
3. Configure the Root Directory as `client`.
4. Build command: `npm run build`, Output directory: `dist`.
5. Set environment variable `VITE_API_BASE_URL` pointing to your deployed backend.

### Backend (Render / Railway)
1. Configure Root Directory as `server`.
2. Build command: `npm run build`, Start command: `npm start`.
3. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection URI
   - `JWT_SECRET`: Secure random string
   - `CLIENT_URL`: URL of your deployed frontend (e.g. `https://intellimeet.vercel.app`)
   - `OPENAI_API_KEY`: Your production OpenAI API key
