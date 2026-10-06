# 📝 Zidio Project Submission Form

Use this document to quickly fill out the final submission fields required on the **Zidio Student Dashboard**. Simply copy and paste the values into the respective input fields.

---

## 📌 Master Submission Fields

| Item | Value / Description | Status / Action Needed |
|---|---|---|
| **Project Title** | `IntellMeet – AI-Powered Enterprise Meeting & Collaboration Platform` | ✅ Complete |
| **Track / Domain** | `MERN Full-Stack Development + AI Enterprise Track` | ✅ Complete |
| **GitHub Repository** | `https://github.com/shreyay1310-svg/intelliMeet` | ✅ Verified Repository |
| **Live Frontend URL** | `https://intellimeet-app.vercel.app` | ✅ Primary Live URL |
| **Backend / API URL** | `https://intellimeet-api.onrender.com` | ✅ API & Signaling Server |
| **Demo Video URL** | `[YOUR_DEMO_VIDEO_URL]` *(YouTube Unlisted / Google Drive / Loom)* | ✏️ Record video & paste link |
| **Feedback Video URL** | `[YOUR_FEEDBACK_VIDEO_URL]` *(YouTube Unlisted / Loom / Drive)* | ✏️ Record video & paste link |
| **Project Report File** | `IntellMeet_Project_Report_Zidio_2026.pdf` *(Located in 02_Project_Report/)* | ✅ PDF ready for upload |
| **Figma URL (Optional)** | `N/A (Full Production-Coded UI using Tailwind CSS & Lucide Icons)` | ✅ Complete |
| **Demo Credentials** | *See credentials table below* | ✅ Complete |

---

## 🔐 Demo Accounts & Access Credentials

To allow Zidio evaluators to immediately access and evaluate both user roles without registering new accounts, use the following pre-seeded credentials:

### 1. Employee Portal Access
- **URL**: `/login`
- **Email**: `employee@intellimeet.io`
- **Password**: `Password123!`
- **Role**: Standard Team Member / Meeting Host
- **Access Scope**: Dashboard, Video Meetings, Calendar, Kanban Board, Tasks, AI Meeting Assistant, Recordings Archive.

### 2. Administrator Portal Access
- **URL**: `/login`
- **Email**: `admin@intellimeet.io`
- **Password**: `AdminPass123!`
- **Role**: System Administrator
- **Access Scope**: Admin Dashboard, Executive KPI Cards, User Governance & Role Management, Telemetry Analytics Charts, System Settings.

### 3. Guest / Instant Join Access
- **URL**: `/meeting/:roomId`
- **Authentication**: Optional for direct room links. Guests can enter any display name and immediately join the active WebRTC video conference.

---

## 📄 Project Description (For Dashboard Submission Box)

> **Copy and paste the text below into the Project Summary / Description box on Zidio:**

```text
IntellMeet is an AI-powered enterprise meeting and collaboration platform built with the modern MERN stack, TypeScript, Socket.io, and WebRTC.

Unlike conventional video conferencing tools where discussions evaporate post-call, IntellMeet treats meetings as strategic, persistent knowledge assets. The platform combines ultra-low-latency peer-to-peer audio/video conferencing with real-time in-meeting chat, automated speech transcription, conversational AI meeting intelligence (powered by OpenAI GPT-4o-mini with intelligent offline fallback synthesis), and single-click task generation into an integrated Kanban workflow.

Key Engineering Highlights:
1. Real-Time WebRTC Conferencing: Dynamic video tile grid, screen sharing, meeting timer, and MediaRecorder browser recording with low-latency Socket.io signaling.
2. Dual-Provider AI Architecture: Speech transcription and automatic extraction of executive summaries, key decisions, and prioritized action items with assignees.
3. Complete Team Workspace: Calendar scheduling (.ics export), 4-column drag-and-drop Kanban board, and recordings archive.
4. Enterprise Administration Console: User management CRUD, role-based access control (RBAC), telemetry analytics with Recharts, and audit logging.
5. Production Architecture: JWT authentication with refresh token rotation, bcrypt password hashing, rate limiting, and CORS security.
```

---

## 📦 Submission Package Checklist

Before clicking **Submit Final Project** on the Zidio Portal:

- [ ] GitHub repository is public and contains no `.env` secret keys.
- [ ] Live demo frontend and backend links open over secure HTTPS.
- [ ] Both demo accounts (`employee@intellimeet.io` and `admin@intellimeet.io`) work.
- [ ] Demo video (3–7 mins) is uploaded and permissions set to **Unlisted** or **Public**.
- [ ] Feedback video (1–2 mins) is uploaded and accessible.
- [ ] Project documentation PDF (`IntellMeet_Project_Report_Zidio_2026.pdf`) is attached.
