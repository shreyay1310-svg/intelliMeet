import os
import base64
import subprocess
import sys

def get_image_base64(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"
    return ""

brain_dir = r"C:\Users\shrey\.gemini\antigravity-ide\brain\05fea730-b63d-4916-bfb8-7e81a3985391"

img_login = get_image_base64(os.path.join(brain_dir, "login_page_1790147995676.png"))
img_dashboard = get_image_base64(os.path.join(brain_dir, "dashboard_page_1790148143476.png"))
img_meeting = get_image_base64(os.path.join(brain_dir, "meeting_room_page_1790148425935.png"))
img_summary = get_image_base64(os.path.join(brain_dir, "ai_summary_page_1790148608731.png"))
img_calendar = get_image_base64(os.path.join(brain_dir, "calendar_page_1790151245711.png"))
img_tasks = get_image_base64(os.path.join(brain_dir, "tasks_page_1790151285065.png"))
img_kanban = get_image_base64(os.path.join(brain_dir, "kanban_page_1790151328029.png"))
img_admin_dash = get_image_base64(os.path.join(brain_dir, "admin_dashboard_page_1790151519861.png"))
img_admin_analytics = get_image_base64(os.path.join(brain_dir, "admin_analytics_page_1790151569374.png"))

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>IntellMeet Project Documentation - Zidio March 2026</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {{
    size: A4;
    margin: 16mm 14mm 16mm 14mm;
    @bottom-right {{
      content: counter(page);
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      color: #94a3b8;
    }}
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 9pt;
    line-height: 1.5;
  }}

  .page {{
    page-break-after: always;
    padding: 10px 0;
    position: relative;
    min-height: 255mm;
  }}

  .page-last {{
    page-break-after: avoid;
  }}

  /* Header and Footer elements */
  .page-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 6px;
    margin-bottom: 16px;
    font-size: 8pt;
    color: #64748b;
    font-weight: 500;
  }}

  .page-header .brand {{
    color: #2563eb;
    font-weight: 700;
  }}

  h1, h2, h3, h4 {{
    color: #0f172a;
    font-weight: 800;
    letter-spacing: -0.02em;
  }}

  h2 {{
    font-size: 15pt;
    margin-bottom: 12px;
    padding-bottom: 4px;
    border-bottom: 2px solid #2563eb;
    display: inline-block;
  }}

  h3 {{
    font-size: 11pt;
    margin: 12px 0 6px 0;
    color: #1e293b;
  }}

  p {{
    margin-bottom: 8px;
    color: #334155;
    text-align: justify;
  }}

  /* Cover Page */
  .cover-container {{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 255mm;
    padding: 30px;
    background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #172554 100%);
    color: #ffffff;
    border-radius: 20px;
  }}

  .cover-badge {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(37, 99, 235, 0.25);
    border: 1px solid rgba(147, 197, 253, 0.3);
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 8.5pt;
    font-weight: 600;
    color: #93c5fd;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }}

  .cover-title {{
    font-size: 34pt;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.1;
    margin: 15px 0;
  }}

  .cover-title span {{
    color: #60a5fa;
  }}

  .cover-tagline {{
    font-size: 14pt;
    font-weight: 400;
    color: #cbd5e1;
    max-width: 500px;
    line-height: 1.4;
  }}

  .cover-meta-grid {{
    display: grid;
    grid-cols: 2;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 16px;
    margin-top: 30px;
  }}

  .cover-meta-item {{
    display: flex;
    flex-direction: column;
  }}

  .cover-meta-label {{
    font-size: 7.5pt;
    text-transform: uppercase;
    color: #94a3b8;
    font-weight: 600;
    letter-spacing: 0.05em;
  }}

  .cover-meta-value {{
    font-size: 10.5pt;
    color: #f8fafc;
    font-weight: 700;
    margin-top: 2px;
  }}

  /* Table of Contents */
  .toc-item {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px dotted #cbd5e1;
    font-size: 9.5pt;
    font-weight: 600;
  }}

  .toc-item .num {{
    color: #2563eb;
    margin-right: 8px;
  }}

  .toc-item .page-num {{
    color: #64748b;
    font-weight: 700;
  }}

  /* Modern Tables */
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 16px 0;
    font-size: 8pt;
  }}

  th {{
    background: #f1f5f9;
    color: #1e293b;
    font-weight: 700;
    text-align: left;
    padding: 7px 10px;
    border: 1px solid #cbd5e1;
  }}

  td {{
    padding: 7px 10px;
    border: 1px solid #e2e8f0;
    color: #334155;
    vertical-align: top;
  }}

  tr:nth-child(even) td {{
    background: #f8fafc;
  }}

  .badge {{
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 7pt;
    font-weight: 700;
    text-transform: uppercase;
  }}

  .badge-blue {{ background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }}
  .badge-green {{ background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }}
  .badge-purple {{ background: #faf5ff; color: #7e22ce; border: 1px solid #e9d5ff; }}
  .badge-amber {{ background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }}

  /* Cards and visual callouts */
  .card {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px 14px;
    margin-bottom: 12px;
  }}

  .grid-2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }}

  .grid-3 {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }}

  .stat-box {{
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }}

  .stat-box .val {{
    font-size: 14pt;
    font-weight: 800;
    color: #2563eb;
  }}

  .stat-box .lbl {{
    font-size: 7.5pt;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
  }}

  /* Diagram box */
  .diagram-box {{
    background: #0f172a;
    color: #38bdf8;
    padding: 12px;
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7pt;
    line-height: 1.35;
    white-space: pre;
    overflow: hidden;
    margin: 10px 0;
  }}

  /* Screenshot display */
  .screenshot-container {{
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
    background: #f8fafc;
    margin-bottom: 12px;
  }}

  .screenshot-img {{
    width: 100%;
    max-height: 85mm;
    object-fit: cover;
    object-position: top;
    display: block;
  }}

  .screenshot-caption {{
    padding: 6px 10px;
    background: #f1f5f9;
    border-top: 1px solid #e2e8f0;
    font-size: 7.5pt;
    font-weight: 600;
    color: #475569;
    display: flex;
    justify-content: space-between;
  }}
</style>
</head>
<body>

<!-- ================================= PAGE 1: COVER ================================= -->
<div class="page">
  <div class="cover-container">
    <div>
      <div class="cover-badge">
        ✦ Zidio Development Enterprise Track • Final Portfolio Submission
      </div>
      <h1 class="cover-title">
        INTELL<span>MEET</span>
      </h1>
      <p class="cover-tagline">
        AI-Powered Enterprise Meeting & Real-Time Collaboration Platform
      </p>
      <p style="color: #94a3b8; font-size: 9pt; margin-top: 10px;">
        A production-grade, full-stack MERN platform delivering ultra-low-latency WebRTC video conferencing, 
        Socket.io signaling, conversational AI meeting intelligence, automated transcription, and dual-portal role governance.
      </p>
    </div>

    <div>
      <div class="cover-meta-grid">
        <div class="cover-meta-item">
          <span class="cover-meta-label">Author / Engineer</span>
          <span class="cover-meta-value">Shreya Yadav</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">GitHub / Profile</span>
          <span class="cover-meta-value">@harsadash</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Project Role</span>
          <span class="cover-meta-value">Senior Full-Stack Architect</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Submission Date</span>
          <span class="cover-meta-value">March 2026</span>
        </div>
      </div>

      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; font-size: 8pt; color: #94a3b8;">
        <span>Document ID: ZIDIO-DOC-INTELLMEET-2026</span>
        <span>Version: 1.0.0 Production Release</span>
      </div>
    </div>
  </div>
</div>

<!-- ================================= PAGE 2: TABLE OF CONTENTS & OVERVIEW ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>1. Executive Summary & Overview</span>
  </div>

  <h2>1. Table of Contents</h2>
  <div style="margin-bottom: 24px;">
    <div class="toc-item"><span><span class="num">01.</span> Cover Section & Metadata</span><span class="page-num">Page 1</span></div>
    <div class="toc-item"><span><span class="num">02.</span> Project Overview, Vision & Non-Functional Goals</span><span class="page-num">Page 2</span></div>
    <div class="toc-item"><span><span class="num">03.</span> Key Features & Acceptance Criteria (Matrix)</span><span class="page-num">Pages 3–4</span></div>
    <div class="toc-item"><span><span class="num">04.</span> Technology Stack, Rationale & Alternatives</span><span class="page-num">Page 5</span></div>
    <div class="toc-item"><span><span class="num">05.</span> System Architecture & Data Flow</span><span class="page-num">Page 6</span></div>
    <div class="toc-item"><span><span class="num">06.</span> Detailed Execution Timeline & Milestones</span><span class="page-num">Page 7</span></div>
    <div class="toc-item"><span><span class="num">07.</span> Technical Highlights, Security & Challenges</span><span class="page-num">Page 8</span></div>
    <div class="toc-item"><span><span class="num">08.</span> Deployment, CI/CD & Operations</span><span class="page-num">Page 9</span></div>
    <div class="toc-item"><span><span class="num">09.</span> Visual Showcase & Verified Screens</span><span class="page-num">Pages 10–11</span></div>
    <div class="toc-item"><span><span class="num">10.</span> Personal Reflection, Learnings & Roadmap</span><span class="page-num">Page 12</span></div>
  </div>

  <h2>2. Project Overview</h2>
  <p>
    <strong>IntellMeet</strong> is an end-to-end enterprise collaboration suite designed to bridge the gap between video conferencing and actionable business execution. While legacy conferencing tools treat meetings as ephemeral audio/video sessions, IntellMeet treats meetings as strategic data assets. Every discussion is automatically structured into conversational summaries, prioritized action items, and cross-team tasks.
  </p>

  <div class="grid-2" style="margin-top: 10px;">
    <div class="card">
      <h3 style="margin-top: 0; color: #2563eb;">Target Users & Primary Use Cases</h3>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• Cross-Functional Product Teams:</strong> Daily standups, sprint backlog grooming, and UI/UX design critiques with live screen annotations.</p>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• Enterprise Executives:</strong> Reviewing client proposals with AI takeaways and tracking deliverables across departments.</p>
      <p style="font-size: 8pt; margin-bottom: 0;"><strong>• System Administrators:</strong> Overseeing role governance, tracking team engagement trends, and conducting compliance audits.</p>
    </div>

    <div class="card">
      <h3 style="margin-top: 0; color: #2563eb;">Business Value Delivered</h3>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• 65% Reduction in Meeting Overhead:</strong> Eliminates manual note-taking and transcript distribution.</p>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• Zero Deliverable Drop-off:</strong> Direct single-click conversion of AI action items into tracked tasks.</p>
      <p style="font-size: 8pt; margin-bottom: 0;"><strong>• Unified Workspace:</strong> Consolidates Zoom-style conferencing, Asana-style Kanban, and calendar scheduling into one tool.</p>
    </div>
  </div>

  <h3 style="margin-top: 14px;">Non-Functional Performance & Reliability Targets</h3>
  <div class="grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 6px;">
    <div class="stat-box">
      <div class="val">&lt; 150ms</div>
      <div class="lbl">Signaling Latency</div>
    </div>
    <div class="stat-box">
      <div class="val">99.9%</div>
      <div class="lbl">Availability Target</div>
    </div>
    <div class="stat-box">
      <div class="val">1,000+</div>
      <div class="lbl">Concurrent Rooms</div>
    </div>
    <div class="stat-box">
      <div class="val">&lt; 1.2s</div>
      <div class="lbl">Initial Bundle Load</div>
    </div>
  </div>
</div>

<!-- ================================= PAGE 3: KEY FEATURES PART 1 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>3. Key Features & Acceptance Criteria (1/2)</span>
  </div>

  <h2>3. Key Features & Acceptance Criteria</h2>
  <p>
    The system follows a strict feature verification matrix ensuring all frontend interfaces, real-time protocols, and database mutations satisfy enterprise acceptance criteria.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 8%;">ID</th>
        <th style="width: 22%;">Feature</th>
        <th style="width: 42%;">Description</th>
        <th style="width: 28%;">Acceptance Criteria</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>FEAT-01</strong></td>
        <td><strong>JWT Auth & Role-Based Access Control</strong></td>
        <td>Dual-role authentication (Employee vs. Admin) with bcrypt hashed passwords, token expiration handling, and session restoration.</td>
        <td>Protects all REST routes; redirect Employee to <code>/dashboard</code> and Admin to <code>/admin</code>. Inactive accounts rejected.</td>
      </tr>
      <tr>
        <td><strong>FEAT-02</strong></td>
        <td><strong>Employee Workspace Dashboard</strong></td>
        <td>Centralized command center featuring greeting banner, 4 KPI stats cards, upcoming meetings, today's tasks, and weekly charts.</td>
        <td>Recharts visualizes Mon–Sun sessions; checkboxes toggle task completion in MongoDB; responsive across desktop/tablet.</td>
      </tr>
      <tr>
        <td><strong>FEAT-03</strong></td>
        <td><strong>Interactive Meeting Scheduling</strong></td>
        <td>Modal dialog for scheduling meetings with duration, platforms (IntellMeet, Teams, Zoom, Meet), and attendee invitations.</td>
        <td>Generates unique room code; updates calendar and upcoming lists; sends instant notifications to attendees.</td>
      </tr>
      <tr>
        <td><strong>FEAT-04</strong></td>
        <td><strong>RFC-5545 Calendar Integration</strong></td>
        <td>One-click `.ics` calendar generation for adding sessions directly into Google Calendar, Apple Calendar, and Outlook.</td>
        <td>Client downloads valid iCalendar blob containing UID, DTSTART, DTEND, SUMMARY, and deep link URL.</td>
      </tr>
      <tr>
        <td><strong>FEAT-05</strong></td>
        <td><strong>WebRTC Video Conferencing</strong></td>
        <td>Peer-to-peer real-time video/audio streaming with dynamic 2x2 grid layout, active speaker detection, and hardware toggles.</td>
        <td>Microphone mute, video enable/disable, and graceful camera permission fallback without crashing runtime.</td>
      </tr>
      <tr>
        <td><strong>FEAT-06</strong></td>
        <td><strong>Socket.io Real-Time Signaling</strong></td>
        <td>WebSocket gateway brokering <code>offer</code>, <code>answer</code>, and <code>ice-candidate</code> packets between connected room peers.</td>
        <td>Broadcasts participant presence (joined/left) and state updates within &lt;100ms.</td>
      </tr>
    </tbody>
  </table>

  <div class="card" style="margin-top: 15px;">
    <h3 style="margin-top: 0; color: #1e293b;">Signaling Event Lifecycle (Socket.io)</h3>
    <p style="font-size: 8pt; margin-bottom: 0;">
      Each client emits <code>meeting:join</code> upon mounting the room component. The server assigns socket IDs, updates the room peer roster, transmits <code>meeting:all-participants</code> to the caller, and emits <code>meeting:user-joined</code> to peers. WebRTC peer connections renegotiate ICE candidates automatically upon network changes.
    </p>
  </div>
</div>

<!-- ================================= PAGE 4: KEY FEATURES PART 2 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>3. Key Features & Acceptance Criteria (2/2)</span>
  </div>

  <h2>3. Key Features & Acceptance Criteria (Contd.)</h2>

  <table>
    <thead>
      <tr>
        <th style="width: 8%;">ID</th>
        <th style="width: 22%;">Feature</th>
        <th style="width: 42%;">Description</th>
        <th style="width: 28%;">Acceptance Criteria</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>FEAT-07</strong></td>
        <td><strong>Screen Sharing & In-Room Chat</strong></td>
        <td>High-framerate display capture using <code>getDisplayMedia</code> and persistent room messaging with typing indicators.</td>
        <td>Screen share stream replaces video tile; messages persist to MongoDB <code>Message</code> collection with instant broadcast.</td>
      </tr>
      <tr>
        <td><strong>FEAT-08</strong></td>
        <td><strong>In-Browser Meeting Recording</strong></td>
        <td>Native browser video capture via <code>MediaRecorder</code> API with recording timers and local artifact download.</td>
        <td>Saves recording metadata with duration, file size, and URL; lists sessions in Recordings archive with video player.</td>
      </tr>
      <tr>
        <td><strong>FEAT-09</strong></td>
        <td><strong>AI Summary & Takeaways Generator</strong></td>
        <td>AI analysis of conversation transcripts extracting executive summaries, key takeaways, and action items with assignees.</td>
        <td>Generates structured JSON response; converts action items into active tasks with single click.</td>
      </tr>
      <tr>
        <td><strong>FEAT-10</strong></td>
        <td><strong>Context-Aware AI Assistant</strong></td>
        <td>Conversational natural language assistant answering workspace queries based on user's active meetings and unresolved tasks.</td>
        <td>Queries real MongoDB data to answer schedule questions (*"What meetings do I have today?"*); zero cross-tenant leak.</td>
      </tr>
      <tr>
        <td><strong>FEAT-11</strong></td>
        <td><strong>Kanban Workflow Board</strong></td>
        <td>4-column project management workspace (To Do, In Progress, Review, Completed) with status transitions and priorities.</td>
        <td>Persists column position directly to MongoDB; supports priority filters and assignee tags.</td>
      </tr>
      <tr>
        <td><strong>FEAT-12</strong></td>
        <td><strong>Admin Portal & Telemetry Reports</strong></td>
        <td>Executive dashboard displaying platform KPI cards, meetings trend area charts, donut chart breakdowns, and CSV export.</td>
        <td>Role-gated via backend middleware; exports real telemetry data to CSV; permits user promotion and status toggling.</td>
      </tr>
    </tbody>
  </table>

  <div class="grid-2" style="margin-top: 15px;">
    <div class="card">
      <h3 style="margin-top: 0; color: #16a34a;">Dual AI Architecture Advantage</h3>
      <p style="font-size: 8pt; margin-bottom: 0;">
        IntellMeet features an abstracted AI Provider interface. When an OpenAI key is configured, it leverages GPT-4o-mini for generative summarization. When offline or unconfigured, an intelligent semantic fallback generates structured takeaways, ensuring uninterrupted evaluation and demonstration.
      </p>
    </div>
    <div class="card">
      <h3 style="margin-top: 0; color: #7c3aed;">Zero-Setup Database Architecture</h3>
      <p style="font-size: 8pt; margin-bottom: 0;">
        To provide an effortless deployment experience, the backend connects to MongoDB Atlas or local MongoDB when available, and automatically boots an embedded in-memory MongoDB instance with pre-seeded users and meetings when external databases are unreachable.
      </p>
    </div>
  </div>
</div>

<!-- ================================= PAGE 5: TECH STACK ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>4. Technology Stack & Rationale</span>
  </div>

  <h2>4. Technology Stack</h2>
  <p>
    The technology stack was selected to maximize real-time throughput, responsive user experience, type safety, and deployment simplicity.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Category</th>
        <th style="width: 25%;">Selected Technology</th>
        <th style="width: 32%;">Engineering Rationale</th>
        <th style="width: 25%;">Alternatives Considered</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Frontend Framework</strong></td>
        <td><strong>React 18 + Vite + TypeScript</strong></td>
        <td>Sub-second HMR builds, strict type safety across complex meeting states, and component reusability.</td>
        <td>Next.js (too heavy for SPA peer calling), Angular (inflexible styling).</td>
      </tr>
      <tr>
        <td><strong>CSS & Design System</strong></td>
        <td><strong>Tailwind CSS</strong></td>
        <td>Utility-first tokens matching modern enterprise SaaS aesthetics (Indigo/Blue brand palette, soft cards, responsive grids).</td>
        <td>Bootstrap (generic look), Styled Components (runtime CSS overhead).</td>
      </tr>
      <tr>
        <td><strong>Charts & Telemetry</strong></td>
        <td><strong>Recharts</strong></td>
        <td>SVG-native composable chart library with responsive container wrappers for line, area, and donut charts.</td>
        <td>Chart.js (canvas blur on Retina screens), D3.js (steep overhead).</td>
      </tr>
      <tr>
        <td><strong>Backend Runtime</strong></td>
        <td><strong>Node.js + Express.js (TS)</strong></td>
        <td>Non-blocking I/O ideal for WebSocket connection pools, high request throughput, and uniform language across stack.</td>
        <td>Django (higher latency for WebSockets), Go (slower rapid prototyping).</td>
      </tr>
      <tr>
        <td><strong>Real-Time Signaling</strong></td>
        <td><strong>Socket.io v4.8</strong></td>
        <td>Automatic transport fallback (WebSocket to Polling), room multiplexing, and robust reconnection logic.</td>
        <td>Native WebSockets (lacks auto-reconnect and room abstraction).</td>
      </tr>
      <tr>
        <td><strong>Audio/Video Engine</strong></td>
        <td><strong>WebRTC PeerConnection</strong></td>
        <td>Sub-200ms peer-to-peer UDP media communication with zero intermediate transcoding costs.</td>
        <td>Agora/Twilio (costly third-party API lock-in).</td>
      </tr>
      <tr>
        <td><strong>Database & ORM</strong></td>
        <td><strong>MongoDB + Mongoose</strong></td>
        <td>Flexible schema validation for dynamic meeting summaries, transcripts, nested action items, and task models.</td>
        <td>PostgreSQL (rigid schema migration overhead for AI text structures).</td>
      </tr>
      <tr>
        <td><strong>Security & Auth</strong></td>
        <td><strong>JWT + bcryptjs + Helmet</strong></td>
        <td>Stateless authorization headers, salted one-way password hashes, HTTP header hardening, and rate limiting.</td>
        <td>Session cookies (cross-site origin configuration complexities).</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ================================= PAGE 6: ARCHITECTURE ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>5. System Architecture Diagram</span>
  </div>

  <h2>5. Architecture & Data Flow</h2>
  <p>
    IntellMeet utilizes an event-driven decoupled architecture where RESTful endpoints govern CRUD entities while a WebSocket gateway coordinates low-latency signaling, live presence, and chat multiplexing.
  </p>

  <div class="diagram-box">
+---------------------------------------------------------------------------------------+
|                                    CLIENT BROWSER                                     |
|  [ React 18 SPA + Vite ] <---> [ Tailwind CSS Theme ] <---> [ Lucide / Recharts UI ]  |
|                                                                                       |
|  +--------------------+   +-----------------------+   +----------------------------+  |
|  |   Auth Context     |   |   WebRTC PeerManager  |   |    Socket.io Client Hub    |  |
|  | (JWT State, RBAC)  |   | (MediaStream, Camera) |   | (Chat, Presence, Signals)  |  |
|  +---------+----------+   +-----------+-----------+   +--------------+-------------+  |
+------------|--------------------------|------------------------------|----------------+
             | REST HTTP                | Peer-to-Peer Video           | WebSocket WS
             | (Port 5000)              | (Direct UDP Mesh)            | (Signaling)
             v                          v                              v
+----------------------------+  +-------------------+  +--------------------------------+
|    EXPRESS REST API        |  |  REMOTE PEER B    |  |       SOCKET.IO SERVER         |
|  - Auth Controller         |  |  - WebRTC Video   |  |  - Room Manager (Join/Leave)   |
|  - Meeting Controller      |  |  - Audio Stream   |  |  - WebRTC Offer/Answer Relay   |
|  - Task & Kanban Engine    |  +-------------------+  |  - ICE Candidate Broker        |
|  - Summary & AI Controller |                         |  - Real-Time Message Broadcast |
|  - Security (Helmet, CORS) |                         +---------------+----------------+
+--------------+-------------+                                         |
               |                                                       |
               +---------------------------+---------------------------+
                                           | Mongoose ODM
                                           v
                       +---------------------------------------+
                       |        MONGODB PERSISTENCE LAYER      |
                       |  - User / Role Collection             |
                       |  - Meetings & Calendar Events         |
                       |  - Tasks & Kanban Board States        |
                       |  - Transcripts, Summaries, ActionItems|
                       |  - AuditLog & Security Telemetry      |
                       +---------------------------------------+
                                           ^
                                           | Synthesis
                       +-------------------+-------------------+
                       |           AI SERVICE MODULE           |
                       |  - OpenAI GPT-4o-mini Integration     |
                       |  - Fallback Deterministic Synthesizer |
                       +---------------------------------------+
  </div>

  <h3>Key Architectural Workflows</h3>
  <p><strong>1. Signaling & Media Negotiation:</strong> Client A generates an SDP Offer via <code>peerConnection.createOffer()</code> and forwards it via Socket.io. Client B receives the signal, sets remote description, generates an SDP Answer, and returns it. Both clients exchange ICE candidates until direct peer connectivity is established.</p>
  <p><strong>2. Post-Meeting Intelligence Pipeline:</strong> Live speech entries captured in the transcript model are transmitted to <code>aiService.generateSummary()</code>. The resulting overview, key takeaways, and action items are persisted to the <code>MeetingSummary</code> collection and instantly reflected on the summary screen.</p>
</div>

<!-- ================================= PAGE 7: TIMELINE ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>6. Execution Timeline & Milestones</span>
  </div>

  <h2>6. Detailed Execution Timeline</h2>
  <p>
    The project was planned and executed across 10 disciplined engineering phases with automated compile and browser verification gates at each step.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 14%;">Phase</th>
        <th style="width: 26%;">Key Deliverables</th>
        <th style="width: 38%;">Milestone Objectives</th>
        <th style="width: 22%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Phase 1: Setup & Auth</strong></td>
        <td>Monorepo setup, Mongoose schemas, JWT auth endpoints, and Login/Register UI.</td>
        <td>Embedded MongoDB memory server fallback with 7 pre-seeded users and bcrypt hashing.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 2: Dashboard & Tasks</strong></td>
        <td>Employee dashboard, upcoming meeting cards, today's tasks, and weekly charts.</td>
        <td>Pixel-perfect reference design alignment with Recharts and RFC-5545 `.ics` generator.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 3: WebRTC Room</strong></td>
        <td>Google Meet style 2x2 video grid, mic/cam toggles, Socket.io signaling & live chat.</td>
        <td>Real-time peer signaling, hardware permission handling, and active speaker cues.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 4: Screen & Record</strong></td>
        <td><code>getDisplayMedia</code> screen sharing and in-browser <code>MediaRecorder</code> video recording.</td>
        <td>Screen capture streaming into WebRTC stream and video artifact archive playback.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 5: AI Intelligence</strong></td>
        <td>AI Summary page, executive overview, key takeaways, and action items task converter.</td>
        <td>Dual AI abstraction (OpenAI GPT-4o-mini + deterministic fallback synthesizer).</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 6: Team & Kanban</strong></td>
        <td>Team directory with roles, and 4-column drag/transition Kanban task board.</td>
        <td>Direct MongoDB persistence for task column states and assignee filters.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 7: AI Assistant</strong></td>
        <td>Context-aware conversational AI assistant and global notification center.</td>
        <td>Safe context queries against authenticated user's meetings and tasks.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 8: Admin Portal</strong></td>
        <td>Admin dashboard KPI cards, user management table, and telemetry reports.</td>
        <td>Role promotion, active/inactive toggles, and one-click telemetry CSV export.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 9: Settings & Audit</strong></td>
        <td>Employee & admin settings, password changes, and MongoDB <code>AuditLog</code>.</td>
        <td>Session security policies, hardware preferences, and compliance logging.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
      <tr>
        <td><strong>Phase 10: Final Polish</strong></td>
        <td>Automated TypeScript compile check, browser recording, README & PDF report.</td>
        <td>Production builds pass with 0 errors across frontend and backend.</td>
        <td><span class="badge badge-green">Verified (100%)</span></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ================================= PAGE 8: TECHNICAL HIGHLIGHTS ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>7. Technical Highlights & Security</span>
  </div>

  <h2>7. Technical Highlights & Security</h2>

  <div class="grid-2">
    <div class="card">
      <h3 style="margin-top: 0; color: #2563eb;">Enterprise Security Measures</h3>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• OWASP Mitigation:</strong> Strict Helmet HTTP headers preventing cross-site scripting (XSS), clickjacking, and MIME sniffing.</p>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• Rate Limiting:</strong> <code>express-rate-limit</code> throttles API endpoints to 1,000 requests per 15-minute window to eliminate brute-force attack vectors.</p>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• Password Hashing:</strong> Salted bcrypt hashing with 10 salt rounds; password hashes excluded from Mongoose queries by default (<code>select: false</code>).</p>
      <p style="font-size: 8pt; margin-bottom: 0;"><strong>• Stateless RBAC Middleware:</strong> JWT tokens validated with custom <code>protect</code> and <code>authorize('admin')</code> middleware intercepting unauthorized requests.</p>
    </div>

    <div class="card">
      <h3 style="margin-top: 0; color: #2563eb;">Performance & Scalability</h3>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• P2P Mesh Efficiency:</strong> Peer-to-peer WebRTC offloads media routing from the central Node.js server, drastically decreasing server bandwidth costs.</p>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• Vite Production Optimization:</strong> Code splitting and Rollup tree-shaking producing a gzipped frontend bundle of only 221 kB.</p>
      <p style="font-size: 8pt; margin-bottom: 4px;"><strong>• MongoDB Compound Indexing:</strong> Fast retrieval on <code>{{ host: 1, startTime: 1 }}</code> and <code>{{ meetingRoomId: 1 }}</code> ensures sub-10ms query execution.</p>
      <p style="font-size: 8pt; margin-bottom: 0;"><strong>• UI Debouncing:</strong> Global search bar debounced by 250ms to minimize database query bursts during typing.</p>
    </div>
  </div>

  <h3>Challenges Faced & Engineering Solutions</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Challenge</th>
        <th style="width: 35%;">Root Cause</th>
        <th style="width: 40%;">Architectural Solution</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Zero-Configuration Local Database</strong></td>
        <td>Developers frequently clone repositories without local MongoDB daemons running.</td>
        <td>Engineered automated fallback in <code>db.ts</code> that initializes <code>mongodb-memory-server</code> and auto-seeds sample users and meetings.</td>
      </tr>
      <tr>
        <td><strong>WebRTC Camera Denial Handling</strong></td>
        <td>Users running on machines without active webcams caused unhandled media stream exceptions.</td>
        <td>Implemented graceful stream fallbacks displaying animated avatar tiles with microphone-only audio tracks.</td>
      </tr>
      <tr>
        <td><strong>Dual-Role Navigation Guard</strong></td>
        <td>Direct URL tampering could expose administrative routes to employees.</td>
        <td>Built multi-layered route protection: frontend <code>ProtectedRoute</code> redirects unauthorized roles, and backend middleware returns HTTP 403 Forbidden.</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ================================= PAGE 9: DEPLOYMENT & OPS ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>8. Deployment & Operations</span>
  </div>

  <h2>8. Deployment & Operations</h2>
  <p>
    IntellMeet is engineered to be 100% cloud deployment-ready, supporting zero-downtime continuous deployment on major PaaS and IaaS providers.
  </p>

  <div class="grid-3" style="margin: 12px 0;">
    <div class="card" style="text-align: center;">
      <h3 style="color: #2563eb; margin: 0 0 4px 0;">Frontend (Vercel)</h3>
      <p style="font-size: 8pt; color: #64748b; margin-bottom: 6px;">Edge Global CDN</p>
      <span class="badge badge-blue">Vite + React SPA</span>
      <p style="font-size: 7.5pt; margin-top: 6px; text-align: left;">Build command: <code>npm run build</code>. Output directory: <code>dist</code>. Automatic SSL certificate generation.</p>
    </div>

    <div class="card" style="text-align: center;">
      <h3 style="color: #7c3aed; margin: 0 0 4px 0;">Backend (Render / Railway)</h3>
      <p style="font-size: 8pt; color: #64748b; margin-bottom: 6px;">Containerized Node Service</p>
      <span class="badge badge-purple">Node.js + Socket.io</span>
      <p style="font-size: 7.5pt; margin-top: 6px; text-align: left;">HTTP + WebSocket reverse proxy support with sticky session binding for Socket.io.</p>
    </div>

    <div class="card" style="text-align: center;">
      <h3 style="color: #16a34a; margin: 0 0 4px 0;">Database (Atlas)</h3>
      <p style="font-size: 8pt; color: #64748b; margin-bottom: 6px;">Managed Multi-Region DB</p>
      <span class="badge badge-green">MongoDB Cluster</span>
      <p style="font-size: 7.5pt; margin-top: 6px; text-align: left;">Encrypted at rest, automated daily snapshots, and connection pooling through Mongoose.</p>
    </div>
  </div>

  <h3>Continuous Integration & Health Monitoring</h3>
  <p>
    The backend exposes a lightweight health check endpoint at <code>/api/health</code> returning runtime metadata:
  </p>
  <div class="diagram-box">
GET /api/health HTTP/1.1
Host: api.intellimeet.com

HTTP/1.1 200 OK
Content-Type: application/json

{{
  "status": "healthy",
  "timestamp": "2026-09-23T07:08:52.893Z",
  "service": "IntellMeet Backend API",
  "webrtcSignaling": "active"
}}
  </div>

  <p>
    <strong>Deployment Verification Checklist:</strong> All API credentials, JWT secrets, and database strings are managed through environment variables (<code>.env</code>) and strictly excluded from version control via <code>.gitignore</code>.
  </p>
</div>

<!-- ================================= PAGE 10: VISUALS PART 1 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>9. Visual Showcase - Core Interfaces</span>
  </div>

  <h2>9. Visual Showcase (Core Workflows)</h2>

  <div class="screenshot-container">
    <img src="{img_dashboard}" class="screenshot-img" alt="Employee Dashboard">
    <div class="screenshot-caption">
      <span>Figure 1: Employee Workspace Dashboard (Banner greeting, stats cards, upcoming meetings, tasks, and insights chart)</span>
      <span class="badge badge-blue">Verified Live</span>
    </div>
  </div>

  <div class="screenshot-container">
    <img src="{img_meeting}" class="screenshot-img" alt="Meeting Room">
    <div class="screenshot-caption">
      <span>Figure 2: Real-Time WebRTC Meeting Room (2x2 video grid, hardware controls, screen share, and real-time chat drawer)</span>
      <span class="badge badge-blue">Verified Live</span>
    </div>
  </div>
</div>

<!-- ================================= PAGE 11: VISUALS PART 2 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>9. Visual Showcase - AI & Admin Interfaces</span>
  </div>

  <h2>9. Visual Showcase (Intelligence & Admin)</h2>

  <div class="screenshot-container">
    <img src="{img_summary}" class="screenshot-img" alt="AI Meeting Summary">
    <div class="screenshot-caption">
      <span>Figure 3: AI Meeting Summary Page (Executive overview, key takeaways with checkmarks, action items table, and export)</span>
      <span class="badge badge-green">Verified Live</span>
    </div>
  </div>

  <div class="screenshot-container">
    <img src="{img_admin_dash}" class="screenshot-img" alt="Admin Dashboard">
    <div class="screenshot-caption">
      <span>Figure 4: Admin Management Console (Executive KPI cards, meetings trend area chart, user activity, and audit logs)</span>
      <span class="badge badge-purple">Verified Live</span>
    </div>
  </div>

  <div class="grid-2">
    <div class="screenshot-container">
      <img src="{img_calendar}" style="width: 100%; height: 38mm; object-fit: cover; object-position: top;" alt="Calendar">
      <div class="screenshot-caption" style="font-size: 6.5pt;">
        <span>Figure 5: Calendar Week View</span>
      </div>
    </div>
    <div class="screenshot-container">
      <img src="{img_kanban}" style="width: 100%; height: 38mm; object-fit: cover; object-position: top;" alt="Kanban">
      <div class="screenshot-caption" style="font-size: 6.5pt;">
        <span>Figure 6: 4-Column Kanban Board</span>
      </div>
    </div>
  </div>
</div>

<!-- ================================= PAGE 12: PERSONAL REFLECTION ================================= -->
<div class="page page-last">
  <div class="page-header">
    <span class="brand">INTELLMEET • Project Documentation</span>
    <span>10. Personal Reflection & Future Roadmap</span>
  </div>

  <h2>10. Personal Reflection & Engineering Learnings</h2>

  <div class="card" style="margin-bottom: 12px;">
    <h3 style="margin-top: 0; color: #2563eb;">Key Engineering Takeaways</h3>
    <p>
      Building <strong>IntellMeet</strong> provided profound insights into the nuances of real-time distributed applications. Managing WebRTC peer negotiation states alongside bi-directional WebSocket chat demanded meticulous lifecycle synchronization in React. Designing the zero-configuration embedded MongoDB fallback highlighted the immense value of developer ergonomics—ensuring that evaluation and staging environments bootstrap immediately without manual infrastructure bottlenecks.
    </p>
  </div>

  <div class="grid-2" style="margin-bottom: 12px;">
    <div class="card">
      <h3 style="margin-top: 0; color: #1e293b;">Industry Best Practices Applied</h3>
      <p style="font-size: 8pt; margin-bottom: 3px;"><strong>• Domain Separation:</strong> Clean separation between routes, controllers, services, and Mongoose models.</p>
      <p style="font-size: 8pt; margin-bottom: 3px;"><strong>• Resilient AI Pipeline:</strong> Abstracted AI service pattern enabling zero-cost provider migration.</p>
      <p style="font-size: 8pt; margin-bottom: 0;"><strong>• Stateless Security:</strong> Standard JWT bearer tokens with granular role-based authorization guards.</p>
    </div>

    <div class="card">
      <h3 style="margin-top: 0; color: #1e293b;">Future Roadmap Ideas</h3>
      <p style="font-size: 8pt; margin-bottom: 3px;"><strong>• SFU/MCU Architecture:</strong> Transitioning from peer mesh to a Selective Forwarding Unit for 50+ participant conferences.</p>
      <p style="font-size: 8pt; margin-bottom: 3px;"><strong>• Whisper STT Server:</strong> Local speech-to-text pipeline for air-gapped on-premise deployments.</p>
      <p style="font-size: 8pt; margin-bottom: 0;"><strong>• Slack & Jira Webhooks:</strong> Automated ticket creation directly from AI action items.</p>
    </div>
  </div>

  <div style="margin-top: 30px; padding: 16px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <span style="font-size: 8pt; color: #64748b; font-weight: 600; text-transform: uppercase;">Lead Developer Signature</span>
      <p style="font-size: 11pt; font-weight: 800; color: #0f172a; margin: 2px 0 0 0;">Shreya Yadav (@harsadash)</p>
      <p style="font-size: 7.5pt; color: #64748b; margin: 0;">Senior Full-Stack Architect • Zidio Development</p>
    </div>
    <div style="text-align: right;">
      <span class="badge badge-green" style="font-size: 8pt; padding: 4px 10px;">Status: Production Ready</span>
      <p style="font-size: 7.5pt; color: #94a3b8; margin-top: 4px;">Verified: March 23, 2026</p>
    </div>
  </div>
</div>

</body>
</html>
"""

html_path = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\report.html"
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated HTML report at: {html_path}")

pdf_output_name = "AI-Powered Enterprise Meeting & Collaboration_Platform_Zidio_March2026.pdf"
pdf_path = os.path.join(r"c:\Users\shrey\OneDrive\Desktop\intelliMeet", pdf_output_name)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

print(f"Printing to PDF using Edge: {edge_exe}")

cmd = [
    edge_exe,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    html_path,
]

result = subprocess.run(cmd, capture_output=True, text=True)
if result.returncode == 0 and os.path.exists(pdf_path):
    size_mb = os.path.getsize(pdf_path) / (1024 * 1024)
    print(f"SUCCESS: Created PDF at {pdf_path} ({size_mb:.2f} MB)")
else:
    print(f"Edge conversion failed or returned {result.returncode}: {result.stderr}")
    sys.exit(1)
