# ✅ Zidio Pre-Submission Quality Assurance (QA) Checklist

Perform this pre-flight verification before submitting your project on the Zidio portal. This checklist directly enforces the guidelines specified in the **Zidio Project Submission Master Guide**.

---

## 📋 Comprehensive Pre-Flight QA Matrix

| # | Inspection Category | Verification Item | Target Standard | Verified? |
|---|---|---|---|:---:|
| **1** | **Repository Security** | Secrets & Credentials | `.env` is listed in `.gitignore`. No private keys, OpenAI tokens, or DB passwords in commits. | [x] |
| **2** | **Repository Files** | Required Root Files | `README.md`, `.gitignore`, `.env.example`, `package.json` present. | [x] |
| **3** | **Live Deployment** | HTTPS Security | Both Frontend and Backend open over valid HTTPS certificates (no SSL warnings). | [x] |
| **4** | **Routing & Navigation**| No Broken Routes | Direct URLs to `/login`, `/dashboard`, `/meetings`, `/tasks`, `/admin` resolve cleanly. | [x] |
| **5** | **Database Connectivity**| MongoDB Mutations | User signup, meeting creation, task status updates persist without timeouts. | [x] |
| **6** | **Authentication** | Demo Accounts | Both `employee@intellimeet.io` and `admin@intellimeet.io` log in seamlessly. | [x] |
| **7** | **WebRTC & Audio/Video**| Media Capture & Stream | Microphone mute, camera toggle, screen sharing request stream and update UI state. | [x] |
| **8** | **Real-Time Signaling** | Socket.io Rooms | Join room events trigger correctly; in-meeting chat delivers instant messages. | [x] |
| **9** | **AI Pipeline** | Summary & Action Items | Live speech transcription or offline fallback produces structured summary and tasks. | [x] |
| **10**| **Tasks & Kanban** | Task State Transitions| Tasks can be created, edited, filtered, and moved across Kanban columns. | [x] |
| **11**| **Admin Console** | Role-Based Access | Admin portal is protected; only accessible by `role: 'admin'`; charts render metrics. | [x] |
| **12**| **Mobile Responsiveness**| Responsive Layout | Navbar collapse, sidebar drawer, and card grids render cleanly on mobile viewport. | [x] |
| **13**| **Demo Video** | Duration & Audio | Video is between 3 to 7 minutes; audio is clear; unlisted link opens without login. | [ ] |
| **14**| **Feedback Video** | Duration & Content | Video is 1 to 2 minutes; personal reflection on challenges and learnings; accessible. | [ ] |
| **15**| **Project Report** | PDF Completeness | PDF is formatted professionally, contains 5–10 real screenshots, and all required sections. | [x] |

---

## 🔍 Step-by-Step Verification Instructions

### 1. Incognito / Private Browser Test
- Open an Incognito window in Chrome or Edge.
- Paste your Live Frontend URL.
- Ensure the page loads in under 2 seconds with zero console errors.
- Test logging in with `employee@intellimeet.io` / `Password123!`.
- Verify you are redirected to `/dashboard`.

### 2. Live WebRTC Video & Chat Test
- From the Dashboard, click **New Meeting** or navigate to `/meeting/demo-room-101`.
- Allow camera and microphone permissions when prompted by the browser.
- Open a second private window or tab with a different name (e.g., "Guest Evaluator").
- Join `/meeting/demo-room-101`.
- Verify:
  - Both video streams appear in the grid.
  - Chat messages sent from one tab appear instantly in the other tab.
  - Click **Screen Share** and verify screen preview is active.

### 3. AI Summary & Action Items Test
- Inside or after the meeting, trigger **Generate AI Summary**.
- Verify:
  - Executive summary text appears.
  - Action items with assignees and due dates are generated.
  - Click **Convert to Task** and confirm it appears on the `/tasks` Kanban board.

### 4. Admin Portal Test
- Log out from the employee account.
- Log in with `admin@intellimeet.io` / `AdminPass123!`.
- Navigate to `/admin`.
- Verify:
  - KPI statistics cards render with active counts.
  - Recharts diagrams (Meetings Trend, User Activity, Peak Hours) render smoothly.
  - User table lists registered members with active status badges.

### 5. Video Links Accessibility Test
- Open the YouTube Unlisted or Google Drive link for both the **Demo Video** and **Feedback Video** in an incognito window without being logged into Google.
- Confirm that the video plays immediately without prompting "Request access".
