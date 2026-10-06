import os
import base64
import subprocess
import sys

def get_image_base64(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"
    return ""

img_dir = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\07_Screenshots_and_Visuals"

img_01 = get_image_base64(os.path.join(img_dir, "01_Login_Authentication.png"))
img_02 = get_image_base64(os.path.join(img_dir, "02_Employee_Dashboard.png"))
img_03 = get_image_base64(os.path.join(img_dir, "03_WebRTC_Meeting_Room.png"))
img_04 = get_image_base64(os.path.join(img_dir, "04_AI_Meeting_Summary.png"))
img_05 = get_image_base64(os.path.join(img_dir, "05_Interactive_Calendar.png"))
img_06 = get_image_base64(os.path.join(img_dir, "06_Task_Management.png"))
img_07 = get_image_base64(os.path.join(img_dir, "07_Kanban_Board.png"))
img_08 = get_image_base64(os.path.join(img_dir, "08_Admin_Dashboard.png"))
img_09 = get_image_base64(os.path.join(img_dir, "09_Platform_Analytics.png"))
img_10 = get_image_base64(os.path.join(img_dir, "10_Meeting_Preferences.png"))
img_11 = get_image_base64(os.path.join(img_dir, "11_AI_Configuration.png"))
img_12 = get_image_base64(os.path.join(img_dir, "12_Billing_Settings.png"))

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>IntellMeet - Complete Technical Project Report (21 Sections)</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {
    size: A4;
    margin: 15mm 14mm 15mm 14mm;
    @bottom-right {
      content: "Page " counter(page);
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      color: #94a3b8;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 8.6pt;
    line-height: 1.48;
  }

  .page {
    page-break-after: always;
    position: relative;
    min-height: 250mm;
    padding-bottom: 8px;
  }

  .page-last {
    page-break-after: avoid;
  }

  /* Page Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 5px;
    margin-bottom: 14px;
    font-size: 7.6pt;
    color: #64748b;
    font-weight: 500;
  }

  .page-header .brand {
    color: #2563eb;
    font-weight: 800;
  }

  /* Cover Page */
  .cover-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 248mm;
    padding: 28px;
    background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 48%, #172554 100%);
    color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.25);
  }

  .cover-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(37, 99, 235, 0.25);
    border: 1px solid rgba(147, 197, 253, 0.35);
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 8pt;
    font-weight: 600;
    color: #93c5fd;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .cover-title {
    font-size: 34pt;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.08;
    margin: 14px 0 8px 0;
    letter-spacing: -0.025em;
  }

  .cover-title span {
    color: #60a5fa;
  }

  .cover-tagline {
    font-size: 13.5pt;
    font-weight: 400;
    color: #cbd5e1;
    max-width: 580px;
    line-height: 1.35;
  }

  .cover-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    padding: 16px 20px;
    border-radius: 12px;
    margin-top: 24px;
  }

  .cover-meta-item {
    display: flex;
    flex-direction: column;
  }

  .cover-meta-label {
    font-size: 7.2pt;
    text-transform: uppercase;
    color: #94a3b8;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .cover-meta-value {
    font-size: 10pt;
    color: #f8fafc;
    font-weight: 700;
    margin-top: 2px;
  }

  /* Headings */
  h2 {
    font-size: 12.5pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin: 12px 0 6px 0;
    padding-bottom: 3px;
    border-bottom: 2px solid #2563eb;
    display: inline-block;
  }

  h3 {
    font-size: 9.6pt;
    font-weight: 700;
    color: #1e293b;
    margin: 9px 0 4px 0;
  }

  h4 {
    font-size: 8.6pt;
    font-weight: 700;
    color: #334155;
    margin: 6px 0 2px 0;
  }

  p {
    margin-bottom: 6px;
    color: #334155;
    text-align: justify;
  }

  /* TOC Grid */
  .toc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 14px;
    margin: 8px 0 14px 0;
  }

  .toc-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    border-bottom: 1px dotted #cbd5e1;
    font-size: 7.8pt;
    font-weight: 600;
  }

  .toc-item .num {
    color: #2563eb;
    margin-right: 6px;
  }

  .toc-item .page-num {
    color: #64748b;
    font-weight: 700;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 6px 0 10px 0;
    font-size: 7.6pt;
  }

  th {
    background: #f1f5f9;
    color: #0f172a;
    font-weight: 700;
    text-align: left;
    padding: 5.5px 8px;
    border: 1px solid #cbd5e1;
  }

  td {
    padding: 5px 8px;
    border: 1px solid #e2e8f0;
    color: #334155;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  /* Badges */
  .badge {
    display: inline-block;
    padding: 1.5px 6px;
    border-radius: 3px;
    font-size: 6.8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .badge-blue { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .badge-green { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .badge-purple { background: #faf5ff; color: #7e22ce; border: 1px solid #e9d5ff; }
  .badge-amber { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }

  /* Cards & Grids */
  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 7px;
    padding: 9px 12px;
    margin-bottom: 8px;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }

  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin: 6px 0;
  }

  .stat-box {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
  }

  .stat-box .val {
    font-size: 13pt;
    font-weight: 800;
    color: #2563eb;
  }

  .stat-box .lbl {
    font-size: 6.8pt;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
  }

  /* Diagram Box */
  .diagram-box {
    background: #0f172a;
    color: #38bdf8;
    padding: 9px 11px;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 6.8pt;
    line-height: 1.35;
    white-space: pre;
    margin: 6px 0;
    border: 1px solid #1e293b;
  }

  .code-inline {
    font-family: 'JetBrains Mono', monospace;
    background: #e2e8f0;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 7.4pt;
    color: #0f172a;
  }

  /* Screenshot Showcase */
  .screen-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  }

  .screen-card-header {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .screen-title {
    font-size: 8.4pt;
    font-weight: 700;
    color: #0f172a;
  }

  .screen-img {
    width: 100%;
    max-height: 80mm;
    object-fit: cover;
    object-position: top;
    display: block;
  }

  .screen-desc {
    padding: 7px 12px;
    font-size: 7.6pt;
    color: #475569;
    background: #ffffff;
    border-top: 1px solid #f1f5f9;
    line-height: 1.4;
  }

  .sign-box {
    margin-top: 14px;
    padding: 12px 16px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
      <p style="color: #94a3b8; font-size: 8.8pt; margin-top: 10px; max-width: 600px; line-height: 1.4;">
        A production-grade, full-stack MERN platform delivering ultra-low-latency WebRTC video conferencing, 
        Socket.io signaling, conversational AI meeting intelligence, automated transcription, and dual-portal role governance.
      </p>
    </div>

    <div>
      <div class="cover-meta-grid">
        <div class="cover-meta-item">
          <span class="cover-meta-label">Author / Lead Full-Stack Architect</span>
          <span class="cover-meta-value">Shreya Yadav</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">GitHub Repository & Profile</span>
          <span class="cover-meta-value">@shreyay1310-svg / intelliMeet</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Curriculum Track</span>
          <span class="cover-meta-value">Full-Stack MERN + AI Enterprise</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Submission Term</span>
          <span class="cover-meta-value">March 2026</span>
        </div>
      </div>

      <div style="margin-top: 22px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.12); display: flex; justify-content: space-between; font-size: 7.8pt; color: #94a3b8;">
        <span>Document ID: ZIDIO-DOC-INTELLMEET-2026-FINAL</span>
        <span>Standard: Complete Technical Report (21 Sections)</span>
      </div>
    </div>
  </div>
</div>

<!-- ================================= PAGE 2: TOC & OVERVIEW & PROBLEM ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>1. Table of Contents & Executive Overview</span>
  </div>

  <h2>1. Table of Contents (Complete 21 Sections)</h2>
  <div class="toc-grid">
    <div class="toc-item"><span><span class="num">01.</span> Cover Page & Executive Metadata</span><span class="page-num">Page 1</span></div>
    <div class="toc-item"><span><span class="num">02.</span> Project Overview</span><span class="page-num">Page 2</span></div>
    <div class="toc-item"><span><span class="num">03.</span> Problem Statement</span><span class="page-num">Page 2</span></div>
    <div class="toc-item"><span><span class="num">04.</span> Core Engineering Objectives</span><span class="page-num">Page 3</span></div>
    <div class="toc-item"><span><span class="num">05.</span> Target Users & Use Cases</span><span class="page-num">Page 3</span></div>
    <div class="toc-item"><span><span class="num">06.</span> Key Features & Functional Breakdown</span><span class="page-num">Pages 3–4</span></div>
    <div class="toc-item"><span><span class="num">07.</span> Technology Stack & Rationale</span><span class="page-num">Page 4</span></div>
    <div class="toc-item"><span><span class="num">08.</span> System Architecture & Data Flow</span><span class="page-num">Page 5</span></div>
    <div class="toc-item"><span><span class="num">09.</span> Database Design & Schema Models</span><span class="page-num">Page 5</span></div>
    <div class="toc-item"><span><span class="num">10.</span> API & Backend Service Structure</span><span class="page-num">Page 6</span></div>
    <div class="toc-item"><span><span class="num">11.</span> Real-Time WebRTC & Signaling Flow</span><span class="page-num">Page 6</span></div>
    <div class="toc-item"><span><span class="num">12.</span> AI Workflow & Synthesis Engine</span><span class="page-num">Page 6</span></div>
    <div class="toc-item"><span><span class="num">13.</span> Security Posture & RBAC</span><span class="page-num">Page 7</span></div>
    <div class="toc-item"><span><span class="num">14.</span> Development Timeline & Sprints</span><span class="page-num">Page 7</span></div>
    <div class="toc-item"><span><span class="num">15.</span> Quality Assurance & Testing Strategy</span><span class="page-num">Page 7</span></div>
    <div class="toc-item"><span><span class="num">16.</span> Deployment Architecture & CI/CD</span><span class="page-num">Page 7</span></div>
    <div class="toc-item"><span><span class="num">17.</span> Visual Application Showcase</span><span class="page-num">Pages 8–13</span></div>
    <div class="toc-item"><span><span class="num">18.</span> Technical Challenges & Solutions</span><span class="page-num">Page 14</span></div>
    <div class="toc-item"><span><span class="num">19.</span> Learnings & Professional Growth</span><span class="page-num">Page 14</span></div>
    <div class="toc-item"><span><span class="num">20.</span> Future Roadmap & Scalability</span><span class="page-num">Page 15</span></div>
    <div class="toc-item"><span><span class="num">21.</span> Conclusion & Architect Sign-Off</span><span class="page-num">Page 15</span></div>
  </div>

  <h2>2. Project Overview</h2>
  <p>
    Modern enterprise teams spend upwards of 23 hours every week in virtual conferences. However, the traditional meeting lifecycle suffers from acute information decay: audio and video terminate, participants scramble to take disparate manual notes, agreed action items fail to be assigned to project trackers, and management lacks visibility into operational team alignment.
  </p>
  <p>
    <strong>IntellMeet</strong> is an end-to-end enterprise collaboration platform engineered to unify real-time peer-to-peer conferencing with artificial intelligence and post-meeting execution workflows. Built from the ground up on the MERN stack with TypeScript, IntellMeet transforms ephemeral voice and video streams into searchable enterprise knowledge bases, structured summaries, and automated Kanban action items.
  </p>

  <h2>3. Problem Statement</h2>
  <div class="grid-2" style="margin-top: 6px;">
    <div class="card">
      <h3 style="margin-top:0; color:#dc2626;">1. Context Fragmentation</h3>
      <p style="font-size: 7.8pt; margin-bottom: 0;">Video calls happen in one app (Zoom/Meet), task tracking in another (Jira/Trello), and meeting documentation in unorganized cloud docs.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#dc2626;">2. Information Decay</h3>
      <p style="font-size: 7.8pt; margin-bottom: 0;">Critical decisions and verbal commitments evaporate post-call without dedicated administrative note-takers.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#dc2626;">3. High Operational Overhead</h3>
      <p style="font-size: 7.8pt; margin-bottom: 0;">Manually transcribing recordings and extracting deliverables consumes hours of administrative labor weekly.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#dc2626;">4. Zero Governance Visibility</h3>
      <p style="font-size: 7.8pt; margin-bottom: 0;">Organizations lack centralized telemetry over meeting frequency, duration metrics, and cross-team engagement.</p>
    </div>
  </div>
</div>

<!-- ================================= PAGE 3: OBJECTIVES, USERS & FEATURES 1 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>2. Objectives, Personas & Functional Breakdown</span>
  </div>

  <h2>4. Core Engineering Objectives</h2>
  <div class="grid-4">
    <div class="stat-box">
      <div class="val">&lt; 150ms</div>
      <div class="lbl">Signaling Latency</div>
    </div>
    <div class="stat-box">
      <div class="val">100%</div>
      <div class="lbl">Offline Fallback</div>
    </div>
    <div class="stat-box">
      <div class="val">1-Click</div>
      <div class="lbl">Task Conversion</div>
    </div>
    <div class="stat-box">
      <div class="val">2-Tier</div>
      <div class="lbl">Role RBAC (Admin)</div>
    </div>
  </div>

  <h2>5. Target Users & Enterprise Business Use Cases</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Target Persona</th>
        <th style="width: 38%;">Key Use Case</th>
        <th style="width: 37%;">Delivered Business Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Software Engineering Teams</strong></td>
        <td>Daily standups, architecture reviews, and sprint planning sessions.</td>
        <td>Screen share code; convert blockers directly into tracked Kanban backlog tasks with single click.</td>
      </tr>
      <tr>
        <td><strong>Product &amp; UI/UX Designers</strong></td>
        <td>Design critiques, user journey walkthroughs, and spec reviews.</td>
        <td>Low-latency screen sharing with in-meeting chat and timestamped decision tracking.</td>
      </tr>
      <tr>
        <td><strong>Executive Management</strong></td>
        <td>Strategic leadership alignment, client briefings, and retrospectives.</td>
        <td>Review high-level AI executive summaries without having to sit through 60-minute recordings.</td>
      </tr>
      <tr>
        <td><strong>IT &amp; Security Administrators</strong></td>
        <td>System governance, user lifecycle management, audit compliance.</td>
        <td>Oversee team accounts, monitor telemetry analytics, and audit security logs.</td>
      </tr>
    </tbody>
  </table>

  <h2>6. Key Features &amp; Functional Breakdown (Part 1)</h2>
  <div class="grid-2">
    <div class="card">
      <h3 style="margin-top:0; color:#2563eb;">6.1 Real-Time WebRTC Conferencing</h3>
      <p style="font-size: 7.7pt; margin-bottom: 3px;">• <strong>Dynamic Peer Grid:</strong> Adaptive multi-tile layout supporting participant spotlighting, camera feeds, and mute indicators.</p>
      <p style="font-size: 7.7pt; margin-bottom: 3px;">• <strong>Hardware Controls:</strong> Dynamic toggles for mic, camera, and display sharing (<code>getDisplayMedia</code>).</p>
      <p style="font-size: 7.7pt; margin-bottom: 0;">• <strong>In-Browser Recording:</strong> Native <code>MediaRecorder</code> stream capture with immediate replay and <code>.webm</code> file export.</p>
    </div>

    <div class="card">
      <h3 style="margin-top:0; color:#16a34a;">6.2 AI Meeting Intelligence</h3>
      <p style="font-size: 7.7pt; margin-bottom: 3px;">• <strong>Automated Speech Transcription:</strong> Continuous speech capture with speaker attribution.</p>
      <p style="font-size: 7.7pt; margin-bottom: 3px;">• <strong>Executive Summaries:</strong> High-level synthesis capturing core discussion threads, business context, and consensus.</p>
      <p style="font-size: 7.7pt; margin-bottom: 0;">• <strong>Action Item Extraction:</strong> Structured bullet points with assignees, priorities, and deadlines.</p>
    </div>
  </div>
</div>

<!-- ================================= PAGE 4: FEATURES 2 & TECH STACK ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>3. Features (Contd.) & Technology Stack</span>
  </div>

  <h2>6. Key Features &amp; Functional Breakdown (Part 2)</h2>
  <div class="grid-2">
    <div class="card">
      <h3 style="margin-top:0; color:#0284c7;">6.3 Team Workspace &amp; Task Workflow</h3>
      <p style="font-size: 7.7pt; margin-bottom: 3px;">• <strong>Employee Dashboard:</strong> Greeting banner, 4 KPI stats cards, upcoming meetings, today's tasks, and weekly charts.</p>
      <p style="font-size: 7.7pt; margin-bottom: 3px;">• <strong>Interactive Calendar:</strong> Week/Month views with one-click RFC-5545 <code>.ics</code> calendar file export.</p>
      <p style="font-size: 7.7pt; margin-bottom: 0;">• <strong>4-Column Kanban Board:</strong> Drag-and-drop workflow (<em>To Do</em>, <em>In Progress</em>, <em>Review</em>, <em>Completed</em>).</p>
    </div>

    <div class="card">
      <h3 style="margin-top:0; color:#7c3aed;">6.4 Admin Governance Console</h3>
      <p style="font-size: 7.7pt; margin-bottom: 3px;">• <strong>Platform Telemetry:</strong> Recharts area charts, user activity bars, and peak hour distribution.</p>
      <p style="font-size: 7.7pt; margin-bottom: 3px;">• <strong>User Governance:</strong> Complete CRUD, role promotion (Member &harr; Admin), and active toggling.</p>
      <p style="font-size: 7.7pt; margin-bottom: 0;">• <strong>Audit Logging:</strong> Enterprise activity logs with one-click telemetry CSV export.</p>
    </div>
  </div>

  <h2>7. Technology Stack &amp; Architectural Rationale</h2>
  <div class="diagram-box">
+---------------------------------------------------------------------------------------+
|                                    FRONTEND LAYER                                     |
|           React 18 + Vite + TypeScript + Tailwind CSS + Lucide Icons + Recharts       |
+---------------------------------------------------------------------------------------+
                                           |  HTTPS / WSS (Port 443 / 5000)
+---------------------------------------------------------------------------------------+
|                                    BACKEND LAYER                                      |
|          Node.js + Express.js + TypeScript + Socket.io Server + JWT + Helmet          |
+---------------------------------------------------------------------------------------+
           |                                  |                    |
+--------------------+              +--------------------+   +-------------+
|   DATABASE LAYER   |              |     AI ENGINE      |   | CACHE LAYER |
|  MongoDB + Mongoose|              | OpenAI GPT-4o-mini |   |    Redis    |
| (Atlas / In-Memory)|              |  + Heuristic Model |   |  (Fallback) |
+--------------------+              +--------------------+   +-------------+</div>

  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Layer</th>
        <th style="width: 25%;">Selected Tech</th>
        <th style="width: 32%;">Engineering Rationale</th>
        <th style="width: 25%;">Alternatives Considered</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Frontend</strong></td>
        <td><strong>React 18 + Vite + TS</strong></td>
        <td>Sub-second HMR builds, strict type safety across meeting states, and component reusability.</td>
        <td>Next.js (too heavy for SPA peer calling), Angular (inflexible).</td>
      </tr>
      <tr>
        <td><strong>Signaling</strong></td>
        <td><strong>Socket.io v4.8</strong></td>
        <td>Automatic transport fallback (WS to polling), room multiplexing, and auto-reconnect.</td>
        <td>Native WebSockets (lacks auto-reconnect &amp; rooms).</td>
      </tr>
      <tr>
        <td><strong>Media Engine</strong></td>
        <td><strong>WebRTC PeerConnection</strong></td>
        <td>Sub-200ms peer-to-peer UDP media communication with zero transcoding overhead.</td>
        <td>Agora/Twilio (costly proprietary API lock-in).</td>
      </tr>
      <tr>
        <td><strong>Database</strong></td>
        <td><strong>MongoDB + Mongoose</strong></td>
        <td>Flexible schema validation for dynamic summaries, transcripts, and action items.</td>
        <td>PostgreSQL (rigid schema migration overhead for AI text).</td>
      </tr>
      <tr>
        <td><strong>Security</strong></td>
        <td><strong>JWT + bcrypt + Helmet</strong></td>
        <td>Stateless authorization headers, salted password hashes, and rate limiting.</td>
        <td>Session cookies (cross-site origin complexities).</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ================================= PAGE 5: ARCHITECTURE & DATABASE ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>4. Architecture Data Flow & Schema Design</span>
  </div>

  <h2>8. System Architecture &amp; Data Flow</h2>
  <div class="diagram-box">
[ Client A Browser ]                                          [ Client B Browser ]
        |                                                              |
        | 1. Join Room (Socket.io)                                     | 1. Join Room (Socket.io)
        v                                                              v
   +------------------------------------------------------------------------+
   |                  Node.js / Express Signaling Server                    |
   |                   - Room State Management (Socket.io)                  |
   |                   - Participant Roster & Memory Cache                  |
   +------------------------------------------------------------------------+
        |                                                              |
        | 2. SDP Offer / Answer Exchange (Relayed via Socket.io)       |
        |<============================================================>|
        |                                                              |
        | 3. ICE Candidate Negotiation (Relayed via Socket.io)         |
        |<============================================================>|
        |                                                              |
        | 4. Direct P2P Audio / Video / Screen Stream (WebRTC UDP Mesh)|
        |==============================================================|</div>

  <h2>9. Database Design &amp; Schema Models (7 Normalized Collections)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Collection / File</th>
        <th style="width: 45%;">Core Fields &amp; Schema Types</th>
        <th style="width: 35%;">Business Role &amp; Integrity Rules</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>User.ts</code></td>
        <td><code>name, email (unique), password (hash), role ('member'|'admin'), avatar, refreshTokens[], isActive</code></td>
        <td>Governs authentication, role privileges, and active token rotation.</td>
      </tr>
      <tr>
        <td><code>Meeting.ts</code></td>
        <td><code>title, description, roomId (unique), hostId (ref), participants[], scheduledAt, duration, status, recordingUrl</code></td>
        <td>Persists conference sessions, calendar links, and recording URLs.</td>
      </tr>
      <tr>
        <td><code>Message.ts</code></td>
        <td><code>roomId (index), senderId (ref), senderName, text, createdAt</code></td>
        <td>Stores persistent in-meeting chat logs across all room sessions.</td>
      </tr>
      <tr>
        <td><code>Transcript.ts</code></td>
        <td><code>meetingId (ref), segments: [speaker, timestamp, text]</code></td>
        <td>Stores chronological speech utterances captured during video calls.</td>
      </tr>
      <tr>
        <td><code>Summary.ts</code></td>
        <td><code>meetingId (ref), executiveSummary, actionItems: [description, assignee, dueDate, priority], keyTakeaways[]</code></td>
        <td>Caches AI-synthesized intelligence for rapid retrieval and export.</td>
      </tr>
      <tr>
        <td><code>Task.ts</code></td>
        <td><code>title, description, assigneeId (ref), creatorId (ref), meetingId, priority, status, dueDate</code></td>
        <td>Drives the 4-column Kanban board and employee task lists.</td>
      </tr>
      <tr>
        <td><code>AuditLog.ts</code></td>
        <td><code>userId (ref), action, resource, ipAddress, timestamp</code></td>
        <td>Maintains immutable compliance audit trails for security review.</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ================================= PAGE 6: API, WEBRTC & AI ENGINE ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>5. API Structure, Signaling & AI Pipeline</span>
  </div>

  <h2>10. API &amp; Backend Service Structure</h2>
  <div class="grid-2">
    <div class="card">
      <h3 style="margin-top:0; color:#2563eb;">Authentication &amp; User Governance</h3>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-blue">POST</span> <code>/api/auth/register</code> - New account creation</p>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-blue">POST</span> <code>/api/auth/login</code> - Credentials verification &amp; token issue</p>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-blue">POST</span> <code>/api/auth/refresh</code> - Access token rotation</p>
      <p style="font-size:7.4pt; margin-bottom:0;"><span class="badge badge-green">GET</span> <code>/api/auth/me</code> - Restore user session</p>
    </div>

    <div class="card">
      <h3 style="margin-top:0; color:#2563eb;">Meeting Operations &amp; Calendar</h3>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-green">GET</span> <code>/api/meetings</code> - Query user's scheduled meetings</p>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-blue">POST</span> <code>/api/meetings</code> - Schedule new conference room</p>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-green">GET</span> <code>/api/meetings/:id</code> - Retrieve meeting details</p>
      <p style="font-size:7.4pt; margin-bottom:0;"><span class="badge badge-amber">DELETE</span> <code>/api/meetings/:id</code> - Cancel meeting</p>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <h3 style="margin-top:0; color:#16a34a;">AI Intelligence &amp; Summarization</h3>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-blue">POST</span> <code>/api/ai/summarize</code> - Extract summary &amp; tasks</p>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-blue">POST</span> <code>/api/ai/transcribe</code> - Parse audio utterances</p>
      <p style="font-size:7.4pt; margin-bottom:0;"><span class="badge badge-blue">POST</span> <code>/api/ai/chat</code> - Conversational workspace bot</p>
    </div>

    <div class="card">
      <h3 style="margin-top:0; color:#7c3aed;">Tasks &amp; Admin Telemetry</h3>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-green">GET</span> <code>/api/tasks</code> - List Kanban workspace tasks</p>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-purple">PATCH</span> <code>/api/tasks/:id/status</code> - Drag status update</p>
      <p style="font-size:7.4pt; margin-bottom:2px;"><span class="badge badge-green">GET</span> <code>/api/admin/metrics</code> - Telemetry chart metrics</p>
      <p style="font-size:7.4pt; margin-bottom:0;"><span class="badge badge-green">GET</span> <code>/api/admin/audit-logs</code> - Compliance logs</p>
    </div>
  </div>

  <h2>11. Real-Time WebRTC &amp; Socket.io Signaling Flow</h2>
  <p>1. <strong>Room Join:</strong> Client emits <code>meeting:join</code> with room and user identifiers. Server joins socket to room channel.</p>
  <p>2. <strong>Peer Discovery:</strong> Server broadcasts <code>meeting:participant-joined</code> to all existing peers in the room.</p>
  <p>3. <strong>SDP Negotiation:</strong> Initiator creates local <code>RTCPeerConnection</code>, generates an SDP <code>offer</code>, and routes it via <code>webrtc:offer</code>. Target peer replies with <code>webrtc:answer</code>.</p>
  <p>4. <strong>ICE Exchange:</strong> Peers stream discovered network candidates via <code>webrtc:ice-candidate</code> packets.</p>
  <p>5. <strong>Graceful Disconnection:</strong> Server detects socket drop, emits <code>meeting:participant-left</code>, and peers close media tracks.</p>

  <h2>12. AI Workflow &amp; Synthesis Engine</h2>
  <div class="diagram-box">
[ Live In-Meeting Audio / WebRTC Stream ] ===> [ MediaRecorder Parser ] ===> [ Speech-to-Text Utterance Engine ]
                                                                                         |
                                                                                         v
                                                                     +---------------------------------------+
                                                                     |       DUAL-TIER AI SYNTHESIS HUB      |
                                                                     |  Tier 1: OpenAI GPT-4o-mini (Cloud)   |
                                                                     |  Tier 2: Offline Heuristics (Local)   |
                                                                     +-------------------+-------------------+
                                                                                         |
                                           +---------------------------------------------+---------------------------------------------+
                                           v                                                                                           v
                          [ Executive Context Summary ]                                                              [ Action Items & Priorities ]
                                                                                                                                       |
                                                                                                                                       v
                                                                                                                          [ One-Click Kanban Task ]</div>
</div>

<!-- ================================= PAGE 7: SECURITY, TIMELINE, QA & DEPLOYMENT ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>6. Security, Timeline, QA Strategy & CI/CD</span>
  </div>

  <h2>13. Authentication, Authorization &amp; Security Posture</h2>
  <div class="grid-2">
    <div class="card">
      <h3 style="margin-top:0; color:#dc2626;">Defensive Security Controls</h3>
      <p style="font-size:7.6pt; margin-bottom:3px;">• <strong>Bcrypt Hashing:</strong> Salt rounds = 10; zero plain passwords in database.</p>
      <p style="font-size:7.6pt; margin-bottom:3px;">• <strong>Dual JWT Architecture:</strong> 15-minute access token + rotatable 7-day refresh token.</p>
      <p style="font-size:7.6pt; margin-bottom:0;">• <strong>Rate Limiting:</strong> 10 requests / 15m window on auth routes to prevent brute forcing.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#dc2626;">Network &amp; Role Hardening</h3>
      <p style="font-size:7.6pt; margin-bottom:3px;">• <strong>Helmet Headers:</strong> Strict CSP, XSS protection, and MIME sniff blocking.</p>
      <p style="font-size:7.6pt; margin-bottom:3px;">• <strong>Strict RBAC:</strong> <code>authorize('admin')</code> middleware blocks unauthorized portal routes.</p>
      <p style="font-size:7.6pt; margin-bottom:0;">• <strong>CORS Whitelist:</strong> Locked strictly to authorized frontend origins.</p>
    </div>
  </div>

  <h2>14. Development Timeline &amp; Milestone Execution</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Sprint Phase</th>
        <th style="width: 28%;">Key Modules Developed</th>
        <th style="width: 36%;">Milestone Objectives Achieved</th>
        <th style="width: 18%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Sprint 1 (Days 1–7)</strong></td>
        <td>Monorepo, TS config, Express, MongoDB Schemas, JWT Auth.</td>
        <td>Embedded MongoDB fallback, bcrypt encryption, register/login forms.</td>
        <td><span class="badge badge-green">100% Verified</span></td>
      </tr>
      <tr>
        <td><strong>Sprint 2 (Days 8–14)</strong></td>
        <td>WebRTC conference room, media controls, screen share, chat.</td>
        <td>P2P video streaming, Socket.io signaling, participant roster.</td>
        <td><span class="badge badge-green">100% Verified</span></td>
      </tr>
      <tr>
        <td><strong>Sprint 3 (Days 15–21)</strong></td>
        <td>AI summarization, action item extraction, 4-col Kanban board.</td>
        <td>Dual AI synthesis (GPT-4o-mini + fallback), task drag/drop.</td>
        <td><span class="badge badge-green">100% Verified</span></td>
      </tr>
      <tr>
        <td><strong>Sprint 4 (Days 22–28)</strong></td>
        <td>Admin telemetry dashboard, Recharts, QA audit, live deployment.</td>
        <td>Vercel + Render + Atlas deployment, 15-point pre-flight checklist.</td>
        <td><span class="badge badge-green">100% Verified</span></td>
      </tr>
    </tbody>
  </table>

  <h2>15. Quality Assurance &amp; Testing Strategy</h2>
  <p style="font-size:7.8pt;">• <strong>REST API Verification:</strong> 100% of endpoints verified using Postman collection with token assertion tests.</p>
  <p style="font-size:7.8pt;">• <strong>Cross-Browser Interoperability:</strong> WebRTC validated on Chromium (Chrome/Edge), Firefox, and Safari.</p>
  <p style="font-size:7.8pt;">• <strong>Responsive Viewports:</strong> Layout verified from 375px mobile screens up to 4K desktop displays.</p>

  <h2>16. Deployment Architecture &amp; CI/CD Pipeline</h2>
  <p style="font-size:7.8pt;">• <strong>Frontend:</strong> Hosted on Vercel Edge with automatic Brotli compression and SSL termination.</p>
  <p style="font-size:7.8pt;">• <strong>Backend:</strong> Containerized Node.js service on Render with continuous GitHub deployment and WSS support.</p>
  <p style="font-size:7.8pt;">• <strong>Database:</strong> MongoDB Atlas managed M0 cluster with TLS 1.3 encryption and automated daily snapshots.</p>
</div>

<!-- ================================= PAGE 8: SHOWCASE 1 & 2 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>17. Visual Application Showcase (1/6)</span>
  </div>

  <h2>17. Visual Application Showcase</h2>
  <p style="font-size: 7.8pt; color: #64748b; margin-bottom: 8px;">
    High-resolution verification captures of the live production interface across employee and admin portals:
  </p>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.1: Modern Split-Screen Authentication &amp; Role Selection</span>
      <span class="badge badge-blue">Authentication</span>
    </div>
    <img src="__IMG_01__" class="screen-img" alt="Login Screen">
    <div class="screen-desc">
      Modern split-screen layout featuring branded value proposition, quick-fill evaluation pills for instant Employee and Admin testing, password visibility toggles, and seamless JWT session initialization.
    </div>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.2: Employee Workspace Command Center</span>
      <span class="badge badge-green">Dashboard</span>
    </div>
    <img src="__IMG_02__" class="screen-img" alt="Dashboard Screen">
    <div class="screen-desc">
      Centralized command center featuring personalized executive greeting, 4 KPI stats counters, upcoming meeting agenda cards with platform tags, quick task completion toggles, and weekly activity charts.
    </div>
  </div>
</div>

<!-- ================================= PAGE 9: SHOWCASE 3 & 4 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>17. Visual Application Showcase (2/6)</span>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.3: Real-Time WebRTC Conferencing &amp; In-Meeting Workspace</span>
      <span class="badge badge-purple">WebRTC Video</span>
    </div>
    <img src="__IMG_03__" class="screen-img" alt="Meeting Room Screen">
    <div class="screen-desc">
      Ultra-low-latency peer-to-peer video conference room featuring dynamic 2x2 video grid, hardware mute/camera controls, high-framerate screen sharing, meeting duration timer, and integrated chat drawer.
    </div>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.4: Post-Meeting AI Intelligence &amp; Task Generation</span>
      <span class="badge badge-blue">AI Intelligence</span>
    </div>
    <img src="__IMG_04__" class="screen-img" alt="AI Summary Screen">
    <div class="screen-desc">
      Post-meeting intelligence engine displaying automated speech transcription, synthesized executive summaries, key discussion takeaways, and prioritized action items with single-click Kanban task creation.
    </div>
  </div>
</div>

<!-- ================================= PAGE 10: SHOWCASE 5 & 6 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>17. Visual Application Showcase (3/6)</span>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.5: Interactive Calendar &amp; RFC-5545 Export</span>
      <span class="badge badge-blue">Calendar</span>
    </div>
    <img src="__IMG_05__" class="screen-img" alt="Calendar Screen">
    <div class="screen-desc">
      Interactive scheduling calendar supporting Week and Month views, platform filtering (IntellMeet, Teams, Zoom), and instant client-side RFC-5545 <code>.ics</code> calendar file download for Google and Outlook.
    </div>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.6: Enterprise Task &amp; Deliverables Management</span>
      <span class="badge badge-green">Task Management</span>
    </div>
    <img src="__IMG_06__" class="screen-img" alt="Tasks Screen">
    <div class="screen-desc">
      Comprehensive task list view with priority badges (High, Medium, Low), assignee filters, due date indicators, and real-time MongoDB synchronization when checking off completed milestones.
    </div>
  </div>
</div>

<!-- ================================= PAGE 11: SHOWCASE 7 & 8 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>17. Visual Application Showcase (4/6)</span>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.7: 4-Column Drag-and-Drop Kanban Workflow Board</span>
      <span class="badge badge-purple">Kanban Board</span>
    </div>
    <img src="__IMG_07__" class="screen-img" alt="Kanban Screen">
    <div class="screen-desc">
      Agile project execution board featuring 4 distinct workflow stages (To Do, In Progress, Review, Completed) with drag-and-drop card transitions that immediately update task status via optimistic API mutations.
    </div>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.8: Executive Administration &amp; Governance Console</span>
      <span class="badge badge-amber">Admin Console</span>
    </div>
    <img src="__IMG_08__" class="screen-img" alt="Admin Dashboard Screen">
    <div class="screen-desc">
      Role-gated administrative portal displaying platform-wide health metrics, total active users, meeting duration averages, and full user governance table with role promotion and account status toggling.
    </div>
  </div>
</div>

<!-- ================================= PAGE 12: SHOWCASE 9 & 10 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>17. Visual Application Showcase (5/6)</span>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.9: Platform Telemetry &amp; Recharts Analytics Suite</span>
      <span class="badge badge-blue">Telemetry Reports</span>
    </div>
    <img src="__IMG_09__" class="screen-img" alt="Analytics Screen">
    <div class="screen-desc">
      Enterprise analytics reporting suite powered by Recharts, visualizing monthly meeting volume area charts, hourly peak call distributions, conference type donut charts, and automated CSV export.
    </div>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.10: Conference Hardware &amp; Audio/Video Preferences</span>
      <span class="badge badge-green">Settings</span>
    </div>
    <img src="__IMG_10__" class="screen-img" alt="Preferences Screen">
    <div class="screen-desc">
      Granular client configuration interface enabling microphone noise suppression, echo cancellation, video resolution selection (HD 720p vs. 1080p), and camera device enumeration.
    </div>
  </div>
</div>

<!-- ================================= PAGE 13: SHOWCASE 11 & 12 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>17. Visual Application Showcase (6/6)</span>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.11: AI Model Configuration &amp; Parameter Tuning</span>
      <span class="badge badge-purple">AI Settings</span>
    </div>
    <img src="__IMG_11__" class="screen-img" alt="AI Config Screen">
    <div class="screen-desc">
      Administrative settings panel allowing operators to select active AI models (GPT-4o-mini vs. local deterministic engine), calibrate extraction temperature, and customize summary prompt templates.
    </div>
  </div>

  <div class="screen-card">
    <div class="screen-card-header">
      <span class="screen-title">Figure 17.12: Enterprise Billing &amp; Subscription Tier Governance</span>
      <span class="badge badge-blue">Billing Governance</span>
    </div>
    <img src="__IMG_12__" class="screen-img" alt="Billing Screen">
    <div class="screen-desc">
      Enterprise tier management interface illustrating user license limits, cloud storage consumption, automated monthly invoices, and payment method configurations for enterprise rollouts.
    </div>
  </div>
</div>

<!-- ================================= PAGE 14: CHALLENGES & LEARNINGS ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>7. Technical Challenges & Engineering Learnings</span>
  </div>

  <h2>18. Technical Challenges &amp; Engineering Solutions</h2>
  
  <div class="card">
    <h3 style="margin-top:0; color:#dc2626;">Challenge 1: ICE Candidate Race Condition</h3>
    <p style="font-size:7.8pt; margin-bottom:2px;"><strong>Symptom:</strong> On high-speed low-latency network connections, ICE candidates frequently arrived before the receiving client had finished processing the SDP offer and invoking <code>setRemoteDescription</code>, throwing DOMExceptions.</p>
    <p style="font-size:7.8pt; margin-bottom:0;"><strong>Engineering Solution:</strong> Implemented an in-memory queue (<code>iceCandidateQueue[]</code>) that buffers candidates until the remote description state transitions to <code>have-remote-offer</code>, then flushes queued candidates sequentially.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0; color:#dc2626;">Challenge 2: Dual AI Reliability &amp; Graceful Degradation</h3>
    <p style="font-size:7.8pt; margin-bottom:2px;"><strong>Symptom:</strong> Third-party LLM rate-limiting, missing API keys, or upstream outages could cripple post-meeting evaluation and task generation.</p>
    <p style="font-size:7.8pt; margin-bottom:0;"><strong>Engineering Solution:</strong> Architected an abstracted <code>AIService</code> provider interface with deterministic heuristic fallback algorithms that parse transcripts into structured takeaways and action items even in air-gapped offline environments.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0; color:#dc2626;">Challenge 3: Mobile WebSocket Drops &amp; State Desynchronization</h3>
    <p style="font-size:7.8pt; margin-bottom:2px;"><strong>Symptom:</strong> Backgrounding mobile browsers caused OS-level socket closures, disconnecting users from active rooms.</p>
    <p style="font-size:7.8pt; margin-bottom:0;"><strong>Engineering Solution:</strong> Configured exponential backoff reconnection strategies in Socket.io and implemented a server-side peer reconciliation handshake upon reconnect.</p>
  </div>

  <h2>19. Learnings &amp; Professional Growth</h2>
  <p>
    Through the architectural design, implementation, and deployment of IntellMeet, I developed advanced engineering competencies across modern enterprise systems:
  </p>
  <div class="grid-2" style="margin-top:6px;">
    <div class="card">
      <h3 style="margin-top:0; color:#2563eb;">Distributed Real-Time Systems</h3>
      <p style="font-size:7.7pt; margin-bottom:0;">Mastered WebRTC peer connection negotiation lifecycles, STUN/TURN NAT traversal, and multi-client WebSocket signaling architectures.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#2563eb;">Type-Safe Monorepo Architecture</h3>
      <p style="font-size:7.7pt; margin-bottom:0;">Enforced strict end-to-end TypeScript interfaces across Express controllers and React contexts, eliminating runtime payload mismatch bugs.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#2563eb;">Production Cloud Security</h3>
      <p style="font-size:7.7pt; margin-bottom:0;">Hardened production deployments using dual-token JWT authentication, refresh token rotation, bcrypt password hashing, and strict CORS policies.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#2563eb;">Practical AI Engineering</h3>
      <p style="font-size:7.7pt; margin-bottom:0;">Designed multi-provider fallback pipelines that prioritize zero service downtime while harnessing modern generative AI capabilities.</p>
    </div>
  </div>
</div>

<!-- ================================= PAGE 15: ROADMAP, CONCLUSION & SIGNATURE ================================= -->
<div class="page page-last">
  <div class="page-header">
    <span class="brand">INTELLMEET • TECHNICAL PROJECT REPORT</span>
    <span>8. Future Roadmap, Conclusion & Lead Sign-Off</span>
  </div>

  <h2>20. Future Roadmap &amp; Scalability Enhancements</h2>
  
  <div class="grid-2">
    <div class="card">
      <h3 style="margin-top:0; color:#0284c7;">1. Selective Forwarding Unit (SFU)</h3>
      <p style="font-size:7.8pt; margin-bottom:0;">Transitioning from full-mesh P2P to a media router architecture (e.g., LiveKit or Mediasoup) to scale rooms past 50+ simultaneous active participants with adaptive bitrate scaling.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#0284c7;">2. Client-Side End-to-End Encryption</h3>
      <p style="font-size:7.8pt; margin-bottom:0;">Implementing WebRTC Insertable Streams to perform symmetric AES-GCM encryption on audio/video frames before they leave the browser.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#0284c7;">3. Multilingual Live Translation</h3>
      <p style="font-size:7.8pt; margin-bottom:0;">Integrating on-device Whisper STT models to deliver real-time multilingual subtitles and automatic translation across global distributed teams.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#0284c7;">4. Bi-Directional Enterprise Integrations</h3>
      <p style="font-size:7.8pt; margin-bottom:0;">Two-way synchronization with Google Calendar, Outlook 365, Slack webhooks, and automatic Jira issue creation directly from AI action items.</p>
    </div>
  </div>

  <h2>21. Conclusion</h2>
  <p>
    <strong>IntellMeet</strong> demonstrates how modern web technologies can transform enterprise video conferencing from a passive, ephemeral communication channel into an active, automated productivity engine. By combining robust full-stack engineering, real-time multimedia protocols, and practical artificial intelligence, the platform establishes a benchmark for modern team collaboration.
  </p>
  <p>
    Every functional milestone—from low-latency WebRTC video conferencing, RFC-5545 calendar integration, post-meeting AI intelligence, and Kanban task management to comprehensive administrative governance—has been implemented, verified, and packaged in full accordance with the standards of the Zidio Development Enterprise Track.
  </p>

  <div class="sign-box" style="margin-top:20px;">
    <div>
      <span style="font-size: 7.5pt; color: #64748b; font-weight: 600; text-transform: uppercase;">Lead Full-Stack Architect & Submitter</span>
      <p style="font-size: 11pt; font-weight: 800; color: #0f172a; margin: 2px 0 0 0;">Shreya Yadav (@shreyay1310-svg)</p>
      <p style="font-size: 7.5pt; color: #64748b; margin: 0;">Senior Full-Stack Architect • Zidio Development Enterprise Track</p>
    </div>
    <div style="text-align: right;">
      <span class="badge badge-green" style="font-size: 8pt; padding: 4px 10px;">Status: 100% Production Ready</span>
      <p style="font-size: 7.5pt; color: #94a3b8; margin-top: 4px;">Completed &amp; Certified: March 2026</p>
    </div>
  </div>
</div>

</body>
</html>
"""

# Replace image placeholders
html_content = html_content.replace("__IMG_01__", img_01)
html_content = html_content.replace("__IMG_02__", img_02)
html_content = html_content.replace("__IMG_03__", img_03)
html_content = html_content.replace("__IMG_04__", img_04)
html_content = html_content.replace("__IMG_05__", img_05)
html_content = html_content.replace("__IMG_06__", img_06)
html_content = html_content.replace("__IMG_07__", img_07)
html_content = html_content.replace("__IMG_08__", img_08)
html_content = html_content.replace("__IMG_09__", img_09)
html_content = html_content.replace("__IMG_10__", img_10)
html_content = html_content.replace("__IMG_11__", img_11)
html_content = html_content.replace("__IMG_12__", img_12)

html_path = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\02_Project_Report\report_full_temp.html"
pdf_path = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\02_Project_Report\IntellMeet_Project_Report_Zidio_2026.pdf"

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

print(f"Generating PDF 02 (Complete 21 Sections with 12 Embedded High-Res Screenshots) via Edge...")
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
    print(f"SUCCESS: Generated PDF 02 at {pdf_path} ({size_mb:.2f} MB)")
    os.remove(html_path)
else:
    print(f"ERROR: {result.stderr}")
    sys.exit(1)
