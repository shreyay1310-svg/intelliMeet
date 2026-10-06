# 🎙️ Demo Video — Complete Word-for-Word Spoken Script (English)

> **Instructions:** Read this script out loud during your screen recording. The bracketed cues like `[ACTION: Click ...]` tell you exactly what to click or show on screen while speaking each sentence.

---

### [0:00 – 0:20] 1. Introduction
**[ACTION: Show the IntellMeet browser window at the Login page. Move cursor over the title.]**

> *"Hello everyone! My name is Shreya Yadav, and today I am excited to present **IntellMeet**, an AI-powered enterprise meeting and real-time collaboration platform built for the Zidio development submission.*  
> *IntellMeet is engineered to solve a fundamental problem in modern work: turning ephemeral video calls into measurable, tracked enterprise outcomes."*

---

### [0:20 – 0:50] 2. Problem & Solution
**[ACTION: Highlight the feature highlights and clean UI on the landing/login page.]**

> *"In most companies today, teams spend dozens of hours every week in virtual meetings. But once the call ends, discussions are forgotten, manual note-taking is slow and incomplete, and agreed action items often fail to reach project boards.*  
> *IntellMeet bridges this critical gap. By combining high-definition, low-latency WebRTC video conferencing with automated AI speech transcription, executive summarization, and an integrated Kanban task workflow, IntellMeet ensures that zero decisions get lost."*

---

### [0:50 – 1:30] 3. Authentication & Employee Dashboard
**[ACTION: Enter `employee@intellimeet.io` and `Password123!`. Click "Sign In". Page transitions to `/dashboard`.]**

> *"Let's begin by logging in as an employee. The platform supports secure JWT authentication with refresh token rotation and role-based access control.*  
> *Upon signing in, we are welcomed to the Employee Dashboard. At the top, we have a personalized greeting banner with quick navigation to start or join a meeting.*  
> *Right below, we see real-time KPI counter badges showing total meetings, upcoming schedules, and active tasks.*  
> *On the main panel, we have our upcoming meetings list, where users can join with a single click, view meeting details, or download a calendar `.ics` invite."*

---

### [1:30 – 2:30] 4. Creating & Joining a WebRTC Meeting
**[ACTION: Click the "+ New Meeting" button or click "Join" on a scheduled meeting. Browser prompts for camera/mic permissions, grant them. Video stream initializes.]**

> *"Now, let's start a real-time conference. When I click 'New Meeting', the system generates a secure room identifier and initializes the media hardware.*  
> *Notice how fast the connection establishes. Our frontend uses WebRTC PeerConnection APIs paired with a Node.js Socket.io signaling server for low-latency peer discovery.*  
> *The meeting interface offers a clean, Google Meet-style dynamic grid that automatically adapts to the number of active participants."*

---

### [2:30 – 3:15] 5. In-Meeting Video, Audio, Screen Sharing & Live Chat
**[ACTION: Click the Mute microphone button (show icon changing to muted red), click Camera toggle, click "Share Screen", and open the Chat drawer on the right side. Type: "Welcome everyone to our sprint review!" and press Enter.]**

> *"Inside the room, we have full in-meeting media controls. I can mute and unmute my microphone, toggle my video camera feed, and initiate low-latency screen sharing to present documents or code.*  
> *We also have built-in meeting recording using the browser's native `MediaRecorder` API.*  
> *On the right, we can slide open the collaboration drawer. This features an active participant roster and a real-time room chat powered by Socket.io, allowing team members to communicate without interrupting the speaker."*

---

### [3:15 – 4:15] 6. AI Speech Transcription & Meeting Summary
**[ACTION: Click "End Meeting" or navigate to the AI Meeting Summary view. Scroll through the Executive Summary, Key Decisions, and Action Items list. Click "Convert to Task" on one of the action items.]**

> *"Now comes the standout feature of IntellMeet: our AI Meeting Intelligence Engine.*  
> *During the session, speech utterances are captured and transcribed. When the meeting concludes, our dual-tier AI synthesizer processes the transcript.*  
> *If an OpenAI API key is configured, it uses GPT-4o-mini to generate structured executive summaries. If offline or without an API key, our built-in intelligent fallback synthesizer takes over, ensuring zero downtime.*  
> *Notice how it extracts clear key takeaways and prioritized action items with assignees and due dates.*  
> *With just one click on 'Convert to Task', this action item is immediately saved into our database as an active team task."*

---

### [4:15 – 5:00] 7. Team Workspace, Tasks & Kanban Board
**[ACTION: Click on "Tasks" in the sidebar, then toggle to the "Kanban Board" view. Drag a task card from "To Do" to "In Progress", then to "Completed".]**

> *"Let's move over to the Tasks and Kanban section in the left sidebar.*  
> *Here, team members can view all tasks across the workspace. We support both a structured list view and an interactive 4-column Kanban board covering: To Do, In Progress, Review, and Completed.*  
> *Each card highlights priority tags, due dates, and assignee avatars.*  
> *I can easily update task progress by dragging cards between columns or using quick status buttons, instantly persisting state changes back to our MongoDB database."*

---

### [5:00 – 5:30] 8. Admin Management Console & Analytics
**[ACTION: Log out from the user profile menu. Log in using `admin@intellimeet.io` and `AdminPass123!`. Click on "Admin Dashboard" and scroll through the Recharts analytics.]**

> *"Next, let's explore the enterprise governance layer by logging in with our Administrator account.*  
> *The Admin Console provides system administrators with real-time visibility across the entire organization.*  
> *We have executive KPI metric cards for total users, active meetings, and storage usage.*  
> *Below, interactive Recharts visualizations display meeting trends over time, user activity distributions, and peak meeting hours.*  
> *Admins also have full user management controls: creating users, toggling active states, and promoting team members to administrative roles."*

---

### [5:30 – 6:00] 9. Security, Architecture & Responsive Design
**[ACTION: Press `F12` to open DevTools, toggle device mode (e.g., iPhone 14 / Pixel 7), show how the navigation collapses into a mobile slide-out drawer, then close DevTools.]**

> *"Under the hood, IntellMeet is engineered with robust security best practices. Authentication relies on encrypted JWT tokens with refresh rotation, bcrypt password hashing, and strict rate limiting on sensitive routes.*  
> *The entire user interface is built with Tailwind CSS and is fully responsive across desktop, tablet, and mobile devices, with seamless touch interactions."*

---

### [6:00 – 6:30] 10. Conclusion & Final Wrap-Up
**[ACTION: Return to the main dashboard or show the browser address bar displaying the application URL.]**

> *"To summarize, IntellMeet demonstrates a complete, production-grade MERN architecture: React 18, TypeScript, and Vite on the frontend, Node.js, Express, Socket.io, and MongoDB on the backend, with WebRTC and AI integration.*  
> *All core features have been implemented, thoroughly tested, and verified.*  
> *Thank you very much for watching this walkthrough, and thank you to the Zidio team for this incredible project opportunity!"*

---
*End of Demo Recording Script.*
