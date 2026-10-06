# 🎙️ IntelliMeet — 20-Minute Complete Demo Video Script & Walkthrough Guide

**Presenter:** Shreya Yadav  
**Track:** MERN Full-Stack Development + AI Enterprise Track  
**Submission Requirement:** Step 3 — Demo Video (4 Marks)  
**Total Runtime:** Exactly 20:00 Minutes (1,200 Seconds)  
**Target Speaking Rate:** 130–140 words/minute  
**Recording Quality:** 1080p @ 60fps (OBS Studio / Chrome Fullscreen)  

---

## 🧭 20-Minute Master Timeline Overview

| Part | Timestamp | UI Screen & Focus | Key Highlight |
|---|---|---|---|
| **01** | `00:00 – 01:00` | Landing Page Hero Banner | Personal intro & Problem statement |
| **02** | `01:00 – 02:00` | Landing Page Tech Badges | Full-Stack MERN + WebRTC + AI Architecture |
| **03** | `02:00 – 03:00` | `/login` Portal | JWT Authentication & Employee Login |
| **04** | `03:00 – 04:00` | `/dashboard` Workspace | Personalized greeting & 4 KPI cards |
| **05** | `04:00 – 05:00` | Dashboard Analytics Section | Recharts Area & Bar Charts |
| **06** | `05:00 – 06:00` | `/meetings` Management | Upcoming, Past History, Personal Room |
| **07** | `06:00 – 07:00` | Schedule Meeting Modal | Meeting creation & `.ics` calendar download |
| **08** | `07:00 – 08:00` | `/meeting/:roomId` | Instant WebRTC launch & Camera/Mic permissions |
| **09** | `08:00 – 09:00` | Live Video Room Grid | Video tiles, Mute audio, Camera toggle, Timer |
| **10** | `09:00 – 10:00` | Screen Share & MediaRecorder | Low-latency screen share & Browser recording |
| **11** | `10:00 – 11:00` | Collaboration Drawer | In-meeting room chat & Live participant roster |
| **12** | `11:00 – 12:00` | Speech Transcription Overlay | Real-time speech-to-text & Closed captions |
| **13** | `12:00 – 13:00` | Meeting End & AI Synthesis | Dual AI Engine: GPT-4o-mini + Offline Fallback |
| **14** | `13:00 – 14:00` | Meeting Summary Details | Executive Summary, Key Decisions, Action Items |
| **15** | `14:00 – 15:00` | Action Items Task Conversion | One-click "Convert to Task" & MongoDB sync |
| **16** | `15:00 – 16:00` | `/tasks` Kanban Board | 4-column drag-and-drop & status update |
| **17** | `16:00 – 17:00` | `/calendar` & `/recordings` | Interactive calendar & In-browser video player |
| **18** | `17:00 – 18:00` | `/admin` Executive Console | Admin login, Platform telemetry, KPI cards |
| **19** | `18:00 – 19:00` | `/admin/users` & Settings | User governance CRUD, Role promotion (RBAC) |
| **20** | `19:00 – 20:00` | VS Code & Closing Wrap-Up | Codebase tour, 100% tests pass, Thank you Zidio |

---

## 📜 Complete Minute-by-Minute Spoken Script

### [00:00 – 01:00] Part 1: Welcome, Personal Introduction & Executive Mission Statement
- **🖥️ Screen:** Landing Page / Hero Banner (`http://localhost:5173/` or Live Vercel URL)
- **🎬 Mouse & UI Actions:**
  - Start recording with the Landing page open in full screen.
  - Smoothly hover over the hero title: *"IntellMeet — Turn your meetings into meaningful outcomes"*.
  - Scroll down gently past the feature grid, then back to the top.
- **🎙️ Exact Spoken Dialogue:**
  > *"Hello and a very warm welcome to the evaluators at Zidio Development! My name is Shreya Yadav, and today I am thrilled to present my final submission: IntellMeet, an AI-powered enterprise meeting and real-time collaboration platform.*  
  >  
  > *In modern organizations, remote and hybrid teams spend dozens of hours every week in virtual conferences. However, the fundamental problem with conventional meeting tools is that conversations evaporate the moment the call ends. Important decisions are forgotten, manual note-taking is slow and incomplete, and action items rarely make it onto project boards.*  
  >  
  > *IntellMeet was engineered to bridge this exact gap. By combining ultra-low-latency peer-to-peer WebRTC video conferencing with automated speech transcription, conversational AI meeting intelligence, and a single-click Kanban workflow, IntellMeet ensures that zero knowledge gets lost. Over the next 20 minutes, I will walk you through every single feature, architecture layer, and user flow of this enterprise system."*

---

### [01:00 – 02:00] Part 2: Full-Stack Technology Stack & High-Level Architecture
- **🖥️ Screen:** Landing Page Tech Stack Badges & Feature Cards
- **🎬 Mouse & UI Actions:**
  - Hover over the technology badges: React, TypeScript, Node.js, Express, Socket.io, MongoDB, WebRTC, OpenAI.
  - Point to the responsive navigation bar.
  - Hover over the "Sign In" button in the top right.
- **🎙️ Exact Spoken Dialogue:**
  > *"Before we dive into the live application flows, let me briefly highlight the production-grade technology stack powering IntellMeet.*  
  >  
  > *On the frontend, the client is built using React 18 with TypeScript and bundled via Vite for lightning-fast HMR and optimized production bundles. Styling is handled with Tailwind CSS, ensuring responsive, modern glassmorphic aesthetics with responsive navigation across desktops, tablets, and phones.*  
  >  
  > *On the backend, we have an asynchronous Node.js and Express server written in TypeScript. Real-time bidirectional communication is powered by Socket.io for WebSockets and low-latency WebRTC peer signaling. For the database, we use MongoDB and Mongoose with structured schemas. For intelligence, our backend features a dual-provider AI engine leveraging OpenAI's GPT-4o-mini alongside an intelligent offline fallback synthesizer. Now, let's head over to the authentication portal."*

---

### [02:00 – 03:00] Part 3: Enterprise Authentication Architecture & Employee Sign-In
- **🖥️ Screen:** Authentication Portal (`/login`)
- **🎬 Mouse & UI Actions:**
  - Show the clean Sign In card.
  - Enter email: `employee@intellimeet.io` and password: `Password123!`.
  - Click the "Sign In" button. Observe the smooth loading spinner and instant transition to `/dashboard`.
- **🎙️ Exact Spoken Dialogue:**
  > *"Here on the authentication screen, we have a hardened enterprise sign-in system. IntellMeet implements JSON Web Token authentication with industry-standard access tokens and refresh token rotation, alongside bcryptjs password hashing and express-rate-limit protection to block brute-force attempts.*  
  >  
  > *Notice that we have two pre-configured demo roles: a standard Employee account and a System Administrator account. To demonstrate the everyday workspace, I am entering the employee credentials: 'employee@intellimeet.io' with password 'Password123!'.*  
  >  
  > *When I click 'Sign In', the client submits a POST request to our `/api/auth/login` endpoint, validates the user credentials, receives the signed JWT payload, stores the token securely, and smoothly redirects us to the personalized Employee Dashboard."*

---

### [03:00 – 04:00] Part 4: Employee Workspace & Personalized Dashboard Tour
- **🖥️ Screen:** Employee Dashboard (`/dashboard`)
- **🎬 Mouse & UI Actions:**
  - Point to the greeting banner: *"Good morning, Shreya"*.
  - Hover across the 4 top KPI cards (Total Meetings, Upcoming Schedules, Active Tasks, Recordings).
  - Point to the quick-action buttons: "New Meeting", "Join Meeting", and "Schedule".
- **🎙️ Exact Spoken Dialogue:**
  > *"Welcome to the primary workspace dashboard. At the top, we are greeted with a personalized banner tailored to the authenticated employee.*  
  >  
  > *Directly underneath, we have real-time KPI counter badges that pull live metrics from MongoDB. We can immediately see our total meetings hosted, upcoming scheduled sessions for today, our pending tasks, and archived recordings.*  
  >  
  > *To the right, we have three high-frequency action buttons: 'New Meeting' to spin up an instant WebRTC room, 'Join Meeting' to enter a designated room ID, and 'Schedule' to plan a future calendar meeting. Notice how clean, uncluttered, and enterprise-ready the interface looks, giving employees instant situational awareness without cognitive overload."*

---

### [04:00 – 05:00] Part 5: Interactive Visual Analytics & Weekly Insights Charts
- **🖥️ Screen:** Dashboard Analytics Section (Recharts Charts & Activity Feed)
- **🎬 Mouse & UI Actions:**
  - Scroll down to the Weekly Insights section.
  - Hover over the Meeting Trends AreaChart showing day-by-day counts.
  - Hover over the Task Status BarChart showing To Do, In Progress, Review, Completed.
  - Point to the Recent Activities timeline stream.
- **🎙️ Exact Spoken Dialogue:**
  > *"Scrolling down the dashboard, we see interactive data visualizations powered by Recharts. This isn't just static dummy UI—it reflects dynamic workspace telemetry.*  
  >  
  > *On the left, our Meeting Trends chart renders an animated AreaChart displaying meeting frequency across the work week. As I hover over Wednesday and Thursday, the interactive tooltip displays exact call counts and participant totals.*  
  >  
  > *Beside it, our Task Distribution BarChart provides a snapshot of our Kanban workload, breaking down tasks across To Do, In Progress, Review, and Completed. And on the right, the Activity Feed chronologically streams recent events—such as meeting completions, newly assigned AI action items, and task status changes. Now, let's explore the dedicated Meetings management interface."*

---

### [05:00 – 06:00] Part 6: Meetings Management: Upcoming, Past History & Personal Room
- **🖥️ Screen:** Meetings Page (`/meetings`)
- **🎬 Mouse & UI Actions:**
  - Click "Meetings" in the sidebar.
  - Click through the 3 tabs: "Upcoming", "Past Meetings", and "Personal Room".
  - Hover over upcoming meeting cards showing title, duration, date, and participant avatars.
- **🎙️ Exact Spoken Dialogue:**
  > *"Let's navigate to the Meetings section from the sidebar. Here, team members have complete control over their conference lifecycle.*  
  >  
  > *We provide three organized tabs. The 'Upcoming' tab lists all planned sessions with scheduled start times, estimated duration, agenda descriptions, and confirmed participant avatars.*  
  >  
  > *The second tab, 'Past Meetings', stores our historical conference archive. Every past meeting card displays links to review the AI executive summary, read the full speech transcript, and replay video recordings.*  
  >  
  > *Finally, the 'Personal Room' tab provides each employee with a dedicated, permanent meeting URL—identical to Zoom's Personal Meeting ID. This URL never changes, making it perfect for quick ad-hoc syncs with colleagues or clients."*

---

### [06:00 – 07:00] Part 7: Scheduling a Meeting & Calendar .ICS Export Integration
- **🖥️ Screen:** Schedule Meeting Modal
- **🎬 Mouse & UI Actions:**
  - Click "+ Schedule Meeting".
  - Fill title: "Sprint Review & AI Roadmap 2026", date: Tomorrow, time: 10:00 AM, duration: 45 min.
  - Click "Create Meeting". The modal closes and new card appears.
  - Click "Download .ICS" button to download the calendar file.
- **🎙️ Exact Spoken Dialogue:**
  > *"Now let's schedule an enterprise meeting. When I click '+ Schedule Meeting', a streamlined modal opens.*  
  >  
  > *I'll enter our title: 'Sprint Review & AI Roadmap 2026'. I'll set the date for tomorrow at 10:00 AM with a 45-minute duration, and add our agenda notes. When I click 'Create Meeting', our Express API validates the request, generates a unique meeting entity, and persists it to MongoDB.*  
  >  
  > *Now observe this great feature: right on the meeting card, we have a 'Download .ICS' button. When clicked, IntellMeet dynamically generates an iCalendar standard `.ics` file. Employees can import this directly into Google Calendar, Microsoft Outlook, or Apple Calendar with all meeting details and join links pre-populated! Now let's jump right into a live call."*

---

### [07:00 – 08:00] Part 8: Instant Meeting Launch & WebRTC Room Initialization
- **🖥️ Screen:** Room Launch & Video Call View (`/meeting/:roomId`)
- **🎬 Mouse & UI Actions:**
  - Click "Start Instant Meeting" or "Join" on a scheduled meeting.
  - Grant browser permissions for camera and microphone.
  - Show full-screen video interface loading and webcam feed turning on.
- **🎙️ Exact Spoken Dialogue:**
  > *"Now comes one of the centerpiece engineering highlights of IntellMeet: our real-time video conferencing engine.*  
  >  
  > *When I click 'Start Instant Meeting', the application creates a collision-resistant room ID and transitions us into the full-screen conference view. Behind the scenes, the browser invokes the WebRTC `navigator.mediaDevices.getUserMedia` API, requesting access to the user's camera and microphone.*  
  >  
  > *Simultaneously, the client establishes an encrypted WebSocket connection with our Node.js Socket.io server. The client emits a `join-room` event, registering its socket ID and participant identity into the room's signaling channel. Notice how fast and seamless this transition is—zero software installations, zero external plugins required, running 100% natively in the browser."*

---

### [08:00 – 09:00] Part 9: Video Tile Grid, Media Controls & Call Controls
- **🖥️ Screen:** Live Video Conference Grid & Floating Toolbar
- **🎬 Mouse & UI Actions:**
  - Point to your live video feed.
  - Click the Mute Microphone icon (turns red with slash). Click again to unmute.
  - Click Toggle Camera (turns off video, showing user avatar tile). Click again to turn on.
  - Point to the active Meeting Timer in the top corner (e.g., 03:15).
- **🎙️ Exact Spoken Dialogue:**
  > *"Inside the conference room, we are presented with an intuitive, Google Meet-inspired interface. The video grid is dynamic: as more participants join, the CSS grid automatically reorganizes tiles for optimal aspect ratio and visual balance.*  
  >  
  > *At the bottom, we have our floating action bar. Let's test the media controls: clicking the microphone icon mutes my audio stream. Notice the instant visual feedback: the icon turns red and signals my muted status across the room. Clicking again restores audio.*  
  >  
  > *Similarly, toggling the camera instantly disables the video track of my local `MediaStream`, displaying my employee avatar tile instead, and seamlessly re-enables video when toggled back. In the upper corner, an active meeting timer tracks elapsed call duration. Now let's test screen sharing."*

---

### [09:00 – 10:00] Part 10: Low-Latency Screen Sharing & Native MediaRecorder
- **🖥️ Screen:** Active Screen Share & In-Browser Recording
- **🎬 Mouse & UI Actions:**
  - Click "Share Screen" in toolbar. Select browser tab or window and click Share.
  - Show screen share replacing webcam as main tile.
  - Click "Start Recording". Red recording badge pulses.
  - Stop screen sharing and return to webcam view.
- **🎙️ Exact Spoken Dialogue:**
  > *"In an enterprise collaboration platform, screen sharing is essential. When I click 'Share Screen', IntellMeet invokes the browser's `navigator.mediaDevices.getDisplayMedia` API.*  
  >  
  > *I can share my entire monitor, an application window, or a specific browser tab. Once selected, our WebRTC peer connection replaces the video track on the fly, streaming ultra-low-latency 1080p presentation video to all peers in the room.*  
  >  
  > *Furthermore, IntellMeet features built-in in-browser recording! When I click 'Start Recording', the frontend hooks into the HTML5 `MediaRecorder` API, recording combined audio and video streams into efficient WebM chunks. When the meeting ends, this recording is packaged, stored, and made available for instant playback. Now let's explore the collaboration drawer."*

---

### [10:00 – 11:00] Part 11: Real-Time Collaboration Drawer & In-Meeting Chat
- **🖥️ Screen:** Right Collaboration Drawer (Chat & Participants)
- **🎬 Mouse & UI Actions:**
  - Click "Chat" icon. Drawer slides open smoothly.
  - Type: "Welcome to the Sprint Review everyone! Reviewing AI deliverables now." Press Enter.
  - Switch to "Participants" tab showing active user list and host badge.
- **🎙️ Exact Spoken Dialogue:**
  > *"On the right side of our conference room, we have our integrated collaboration drawer. It slides out with smooth Tailwind CSS transitions and contains two key tabs: Chat and Participants.*  
  >  
  > *In the Chat tab, team members can hold silent side-channel discussions without interrupting the speaker. Let me type a message: 'Welcome to the Sprint Review everyone! Reviewing AI deliverables now.' When I press Enter, the message is emitted over our Socket.io channel via the `send-message` event and instantly broadcast to all participants in milliseconds with sender badges and timestamps.*  
  >  
  > *Switching to the 'Participants' tab, we see the real-time roster of everyone currently in the room, complete with Host indicators and live audio/video status badges. Now let's examine the AI transcription engine."*

---

### [11:00 – 12:00] Part 12: Live Speech Transcription & Real-Time Utterance Capture
- **🖥️ Screen:** Speech Captions Overlay
- **🎬 Mouse & UI Actions:**
  - Toggle on the "Captions / Transcribe" button.
  - Speak into mic: *"We have successfully completed Phase 1 deliverables and will deploy the backend to Render this afternoon."*
  - Show words streaming live across the screen captions banner.
- **🎙️ Exact Spoken Dialogue:**
  > *"Now let's examine our AI speech transcription engine. When I toggle on the 'Captions' button, IntellMeet activates speech recognition.*  
  >  
  > *Listen as I speak: 'We have successfully completed Phase 1 deliverables and will deploy the backend to Render this afternoon.' Notice how the words are recognized and rendered live as closed captions directly on screen!*  
  >  
  > *Under the hood, speech utterances are captured via the Web Speech Recognition API or uploaded as audio buffers. Each recognized segment is timestamped, tagged with the active speaker's ID, and stored in our meeting's transcript record in MongoDB. This real-time transcript provides the raw data foundation for our AI Meeting Intelligence engine. Now let's end this meeting and witness the AI summary in action!"*

---

### [12:00 – 13:00] Part 13: Dual-Provider AI Architecture (GPT-4o-mini & Offline Fallback)
- **🖥️ Screen:** End Meeting Confirmation & Summary Redirect (`/meetings/summary/:id`)
- **🎬 Mouse & UI Actions:**
  - Click red "Leave / End Meeting" button.
  - Confirm ending meeting for all participants.
  - Transition to Meeting Summary page. Highlight the "AI Analysis Ready" indicator.
- **🎙️ Exact Spoken Dialogue:**
  > *"Now, I will click 'End Meeting'. When the host ends the conference, IntellMeet immediately triggers our automated AI Meeting Intelligence Pipeline.*  
  >  
  > *Let me explain the architectural resilience of this system: we implemented a Dual-Provider AI Architecture. In production environments where an `OPENAI_API_KEY` is present, the server sends the full meeting transcript to OpenAI's GPT-4o-mini model with structured JSON prompting.*  
  >  
  > *However, in development environments, air-gapped deployments, or when third-party APIs experience rate limits, our built-in Offline Intelligent Fallback Synthesizer automatically takes over! It performs deterministic natural language processing, extractive summarization, decision pattern matching, and action item parsing. This guarantees that IntellMeet never fails or displays broken states, even without an active internet connection!"*

---

### [13:00 – 14:00] Part 14: AI Executive Summary, Key Decisions & Prioritized Action Items
- **🖥️ Screen:** AI Summary Details View
- **🎬 Mouse & UI Actions:**
  - Scroll through the Executive Summary section.
  - Point to the "Key Decisions Made" card.
  - Point to the "Action Items" list showing Priority tags (High, Medium), Assignees, and Deadlines.
- **🎙️ Exact Spoken Dialogue:**
  > *"Look at the structured output generated by our AI engine! Within seconds of call completion, IntellMeet produces a comprehensive meeting brief.*  
  >  
  > *First, we have the 'Executive Summary': a concise, high-level paragraph capturing the core objective and outcomes of the discussion.*  
  >  
  > *Second, we have 'Key Decisions Made': bulleted items recording every architectural or business choice finalized during the call. No more debating what was agreed upon three weeks ago—it's permanently recorded!*  
  >  
  > *Third, and most importantly, look at the 'Action Items' section. The AI didn't just extract vague sentences—it identified specific tasks, assigned them to named team members, attached priority levels like 'High' or 'Medium', and assigned target due dates! And here is where IntellMeet's killer feature comes in: turning these items directly into project tasks."*

---

### [14:00 – 15:00] Part 15: Single-Click Task Conversion & Enterprise Database Persistence
- **🖥️ Screen:** Action Items Card with "Convert to Task" Buttons
- **🎬 Mouse & UI Actions:**
  - Hover over Action Item 1: *"Deploy backend API to Render and configure MongoDB Atlas"*.
  - Click the blue "Convert to Task" button.
  - Show the button transitioning to a green "Converted ✓" badge.
  - Point to the toast notification: *"Task created and synced to Kanban board!"*.
- **🎙️ Exact Spoken Dialogue:**
  > *"In standard video tools, team members must manually copy action items into Jira or Trello. In IntellMeet, we eliminated that friction completely.*  
  >  
  > *Beside every AI-extracted action item, there is a dedicated 'Convert to Task' button. Watch what happens when I click 'Convert to Task' on this item: 'Deploy backend API to Render and configure MongoDB Atlas'.*  
  >  
  > *Instantly, the frontend sends a POST request to `/api/tasks`, creating a formal task entity in MongoDB pre-populated with the title, description, assignee ID, meeting provenance link, and initial status of 'To Do'. The button transitions to a green 'Converted' badge, and a confirmation toast appears. Now, let's head over to the Kanban Board to see our new task in action!"*

---

### [15:00 – 16:00] Part 16: Interactive 4-Column Kanban Board & Workflow Management
- **🖥️ Screen:** Tasks & Kanban Board Page (`/tasks`)
- **🎬 Mouse & UI Actions:**
  - Click "Tasks" in the sidebar navigation.
  - Show the 4 columns: To Do, In Progress, Review, Completed.
  - Locate the converted task card in "To Do".
  - Move/drag it from "To Do" to "In Progress".
  - Move another completed card to "Completed".
- **🎙️ Exact Spoken Dialogue:**
  > *"Here is our integrated Tasks and Kanban workspace. Team members can organize their work across four standard workflow columns: To Do, In Progress, Review, and Completed.*  
  >  
  > *Look at the 'To Do' column: here is the exact task we just converted from our meeting summary! Every card displays its title, assigned member avatar, high-priority badge, and due date.*  
  >  
  > *Now, let's update progress: I can move this card from 'To Do' into 'In Progress'. Notice how smoothly the state transitions. The client immediately dispatches a PATCH request to our backend API, updating the status field in MongoDB. We also have priority filters at the top, allowing team members to filter by High, Medium, or Low priority, or switch between Kanban and List views. Now let's explore the Calendar and Recordings archive."*

---

### [16:00 – 17:00] Part 17: Interactive Team Calendar & Meeting Recordings Archive
- **🖥️ Screen:** Calendar View (`/calendar`) and Recordings Archive (`/recordings`)
- **🎬 Mouse & UI Actions:**
  - Click "Calendar" in sidebar. Show month grid with colored meeting pills. Click tomorrow's date for details popover.
  - Click "Recordings" in sidebar. Show recording cards with thumbnails and duration badges.
  - Click "Play Recording" to launch the HTML5 video player modal.
- **🎙️ Exact Spoken Dialogue:**
  > *"Next in our workspace tour is the interactive Team Calendar. In this month view, all upcoming meetings are displayed as color-coded event pills. Clicking on tomorrow's date opens a detailed popover displaying the scheduled time, agenda, and quick-join links, giving teams full calendar visibility.*  
  >  
  > *Moving to the 'Recordings' archive in the sidebar: this is where all captured conference recordings reside. Each card displays the meeting title, date, duration, and file size.*  
  >  
  > *When I click 'Play Recording', an in-browser HTML5 video player modal opens, allowing team members who missed the live call to watch the complete recorded session at 1x, 1.25x, or 1.5x speed, or download the WebM video directly for offline viewing! Now, let's log out and explore the enterprise Admin Console."*

---

### [17:00 – 18:00] Part 18: Enterprise Administrator Console: Telemetry, KPIs & Analytics
- **🖥️ Screen:** Admin Sign-In & Dashboard (`/admin`)
- **🎬 Mouse & UI Actions:**
  - Log out of Employee account.
  - Log in with `admin@intellimeet.io` and `AdminPass123!`.
  - Redirects to Admin Dashboard.
  - Point to the 4 Executive KPI cards (Total Users, Active Rooms, Total Hours, Storage).
  - Hover over the Telemetry Analytics charts (Peak Meeting Hours bar chart, Monthly Trends).
- **🎙️ Exact Spoken Dialogue:**
  > *"To demonstrate our role-based enterprise governance, I am logging out of the employee account and signing in as the System Administrator: 'admin@intellimeet.io' with password 'AdminPass123!'.*  
  >  
  > *Notice that the navigation dynamically adapts based on the user's JWT role claims, unlocking the Admin Console.*  
  >  
  > *Here on the Admin Dashboard, leadership and IT administrators have complete visibility over the entire platform. The top KPI cards report total registered users, active concurrent video rooms, total hours of recorded meetings, and storage utilization.*  
  >  
  > *Below, advanced analytics charts track platform telemetry: peak meeting hours across the day to aid infrastructure scaling, monthly meeting volume trends, and active user retention. Admins also have a one-click 'Export Telemetry CSV' button to download system logs for enterprise auditing!\"*

---

### [18:00 – 19:00] Part 19: User Governance, Role Promotion (RBAC) & Enterprise Settings
- **🖥️ Screen:** Admin Users Table (`/admin/users`) & System Settings (`/admin/settings`)
- **🎬 Mouse & UI Actions:**
  - Click "User Management" in admin sidebar.
  - Point to the users table. Click "Toggle Active" on a test user.
  - Show role promotion badge toggling from "Member" to "Admin".
  - Click "System Settings" tab showing organization branding, session timeout limits, and recording retention policies.
- **🎙️ Exact Spoken Dialogue:**
  > *"Under 'User Management', administrators have full CRUD governance over company accounts. The table lists all registered employees with email addresses, assigned departments, roles, and status indicators.*  
  >  
  > *Administrators can toggle any account between 'Active' and 'Inactive' to instantly revoke or grant platform access. Furthermore, with a single click, an admin can promote a standard team member to an Administrator role or demote them back to Member, with changes persisted immediately to MongoDB.*  
  >  
  > *In the 'System Settings' tab, administrators can customize organization branding, set global JWT session timeout intervals, enforce recording retention limits, and manage API keys. This proves that IntellMeet is built as an enterprise-grade SaaS product, not just a simple toy project!\"*

---

### [19:00 – 20:00] Part 20: Clean Codebase Tour, Testing Verification & Final Sign-Off
- **🖥️ Screen:** VS Code Editor & Terminal Test Output
- **🎬 Mouse & UI Actions:**
  - Switch to VS Code window showing clean `/client` and `/server` folder tree.
  - Show terminal displaying `Tests: 100% Passed, 0 Errors`.
  - Switch back to browser window on the Dashboard.
  - Deliver warm, confident closing thank-you statement.
- **🎙️ Exact Spoken Dialogue:**
  > *"In our final minute, let me briefly show the engineering foundation behind IntellMeet in VS Code.*  
  >  
  > *As you can see, the repository is strictly structured into modular `/client` and `/server` packages. The backend features clean separation of concerns: controllers, middleware, models, routes, and services. The frontend uses reusable React components, custom hooks for WebRTC and Socket.io, and strong TypeScript interfaces throughout.*  
  >  
  > *Our automated test suites pass with 100% success across unit, integration, and security checks. The application is production-ready, fully responsive, and deployed live.*  
  >  
  > *To conclude, IntellMeet demonstrates the complete lifecycle of a modern enterprise platform: real-time WebRTC media, intelligent AI summarization, Kanban task workflows, and enterprise governance.*  
  >  
  > *Thank you so much to the evaluators at Zidio Development for your time, guidance, and for reviewing my final project submission!\"*

---

## 🎬 Tips for Recording Day:
1. **Resolution:** Set screen display to 1920x1080 (100% scaling).
2. **Audio:** Use a headset or dedicated mic for crisp, clear voice capture.
3. **Pacing:** Keep an eye on the minute counter. Each part is designed to take exactly 60 seconds at a natural, steady pace.
4. **YouTube Upload:** Upload video to YouTube as **Unlisted** so anyone with the link can view it without needing login.
5. **Paste Link:** Paste your video link into `Final_Submission_Form.md` under **Step 3: Demo Video URL**.
