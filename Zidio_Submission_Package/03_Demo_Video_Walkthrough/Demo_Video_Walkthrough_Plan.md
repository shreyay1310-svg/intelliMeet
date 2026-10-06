# ⏱️ IntellMeet Demo Video — 3 to 7 Minute Walkthrough Plan

This document details the exact sequence, screen interactions, and timing for recording your **Demo Video** to satisfy the Zidio submission requirements.

**Target Total Duration:** 5:30 – 6:30 Minutes  
**Format:** Screen Recording with Voiceover (No slides only; record the actual working web application)  
**Submission Link Type:** YouTube Unlisted / Google Drive (Public Link) / Loom  

---

## 🎬 Timestamped Scene-by-Scene Plan

| Timestamp | Segment Title | On-Screen Visual Action | Spoken Focus / Key Points |
|---|---|---|---|
| **0:00 – 0:20** | **Introduction** | Browser showing the IntellMeet landing/login page at `localhost:5173` or Live URL. | Introduce yourself by name, project name (*IntellMeet*), and the core mission: turning meetings into measurable enterprise outcomes. |
| **0:20 – 0:50** | **Problem & Solution** | Hover over key badges, showing modern UI styling. | Explain the problem: meeting discussions are forgotten, notes are manual, and action items get lost. Explain IntellMeet's solution: real-time WebRTC conferencing combined with automated AI summaries and Kanban task tracking. |
| **0:50 – 1:30** | **Login & Dashboard** | Log in with `employee@intellimeet.io`. View the Dashboard banner, KPI cards, and upcoming meetings list. | Highlight role-based authentication, personalized dashboard, quick stats (Total Meetings, Upcoming, Tasks), and quick actions. |
| **1:30 – 2:30** | **Create / Join Meeting** | Click **New Meeting** or navigate to an active meeting room (`/meeting/demo-room-101`). | Showcase the pre-join room check, camera and microphone authorization, room code generation, and entry into the WebRTC conference room. |
| **2:30 – 3:15** | **Video, Audio, Screen Share & Chat** | Show video feed, toggle mute/unmute, click camera toggle, click **Screen Share**, and open the right-side chat drawer to send a live message. | Demonstrate WebRTC peer-to-peer streaming, low-latency signaling over Socket.io, dynamic tile grid, screen sharing, and real-time chat with presence. |
| **3:15 – 4:15** | **AI Transcription & Summary** | Click **End Meeting** or navigate to the AI Summary tab. View the executive summary, key takeaways, and AI action items with assignees. Click **Convert to Task**. | Highlight the dual-provider AI pipeline (OpenAI + intelligent offline fallback), automatic speaker transcription, extraction of action items with deadlines, and one-click task sync. |
| **4:15 – 5:00** | **Team Workspace, Tasks & Kanban** | Navigate to `/tasks` and the Kanban board (`/kanban`). Show tasks categorized into *To Do*, *In Progress*, *Review*, and *Completed*. Move a card between columns. | Demonstrate the productivity workflow: how meeting discussions directly become tracked tasks, assignees, priority badges, and visual drag-and-drop Kanban state management. |
| **5:00 – 5:30** | **Admin Dashboard & Analytics** | Log out, log in with `admin@intellimeet.io`, and go to `/admin`. View KPI cards and Recharts analytics (Meeting trends, User activity, Peak hours). | Showcase the enterprise governance tier: system administrator overview, real-time telemetry charts, user management CRUD, and role toggling. |
| **5:30 – 6:00** | **Security & Responsive UI** | Open DevTools to toggle mobile view (iPhone/Pixel). Show responsive drawer and clean layout. Briefly mention JWT token rotation and rate limiting. | Demonstrate mobile responsiveness, security architecture (JWT refresh token rotation, bcrypt, helmet, rate limiting), and clean REST design. |
| **6:00 – 6:30** | **Conclusion & Wrap-Up** | Return to the dashboard or repository. Show live URL in browser address bar. | Summarize the tech stack (React, TypeScript, Vite, Node.js, Express, MongoDB, Socket.io, WebRTC), thank the evaluators at Zidio, and conclude. |

---

## 🎯 Pro Tips for a High-Scoring Demo Video

1. **Keep Browser Clean:** Close extra tabs, bookmarks bar, and system notifications before starting.
2. **Audio Clarity:** Use a headset or dedicated mic. Speak at a steady, confident pace.
3. **Cursor Pacing:** Move the mouse smoothly to guide the evaluator's eyes to the button or section you are discussing.
4. **No Fluff:** Stick to the working features. Zidio evaluators reward crisp, structured walkthroughs that demonstrate technical execution.
