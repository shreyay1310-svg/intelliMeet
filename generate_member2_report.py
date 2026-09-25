import os
import subprocess
import sys

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>IntelliMeet - Member 2 (Backend) Week 1 Progress & Audit Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {
    size: A4 portrait;
    margin: 12mm 14mm 14mm 14mm;
    @bottom-right {
      content: "Page " counter(page);
      font-family: 'Plus Jakarta Sans', sans-serif;
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
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 9pt;
    line-height: 1.5;
  }

  .header-card {
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
    color: #ffffff;
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 18px;
    position: relative;
    overflow: hidden;
  }

  .header-card::after {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0) 70%);
    border-radius: 50%;
  }

  .badge-tag {
    display: inline-block;
    padding: 4px 10px;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    border-radius: 20px;
    background: rgba(99, 102, 241, 0.25);
    color: #a5b4fc;
    border: 1px solid rgba(165, 180, 252, 0.3);
    margin-bottom: 10px;
  }

  .header-title {
    font-size: 18pt;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
    color: #ffffff;
  }

  .header-subtitle {
    font-size: 9.5pt;
    color: #cbd5e1;
    margin-bottom: 14px;
    font-weight: 400;
  }

  .header-meta-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }

  .meta-item {
    font-size: 7.5pt;
  }

  .meta-label {
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }

  .meta-val {
    color: #ffffff;
    font-weight: 600;
    font-size: 8.5pt;
  }

  /* KPI Cards */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 18px;
  }

  .kpi-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 14px;
    border-left: 4px solid #3b82f6;
  }

  .kpi-card.green { border-left-color: #10b981; }
  .kpi-card.amber { border-left-color: #f59e0b; }
  .kpi-card.purple { border-left-color: #8b5cf6; }

  .kpi-title {
    font-size: 7.5pt;
    font-weight: 600;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.5px;
  }

  .kpi-value {
    font-size: 16pt;
    font-weight: 800;
    color: #0f172a;
    margin: 2px 0;
  }

  .kpi-desc {
    font-size: 7.5pt;
    color: #64748b;
  }

  /* Section styles */
  .section-title {
    font-size: 11pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 16px 0 10px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-title::before {
    content: "";
    width: 4px;
    height: 14px;
    background: #4f46e5;
    border-radius: 2px;
    display: inline-block;
  }

  /* Table styling */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
    font-size: 8pt;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  thead {
    background: #f1f5f9;
  }

  th {
    padding: 9px 10px;
    text-align: left;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    font-size: 7pt;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #cbd5e1;
  }

  td {
    padding: 8px 10px;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
    color: #334155;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }

  /* Status Badges */
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 7pt;
    font-weight: 700;
    white-space: nowrap;
  }

  .status-done {
    background: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }

  .status-partial {
    background: #fffbeb;
    color: #92400e;
    border: 1px solid #fde68a;
  }

  .status-missing {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  .status-ahead {
    background: #f5f3ff;
    color: #5b21b6;
    border: 1px solid #ddd6fe;
  }

  .code-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 7pt;
    background: #f1f5f9;
    color: #334155;
    padding: 1px 5px;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }

  /* Two Column Cards Grid */
  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .info-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px 14px;
  }

  .info-box.success {
    border-top: 3px solid #10b981;
    background: #f0fdf4;
  }

  .info-box.warning {
    border-top: 3px solid #ef4444;
    background: #fef2f2;
  }

  .box-title {
    font-size: 8.5pt;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .info-box.success .box-title { color: #065f46; }
  .info-box.warning .box-title { color: #991b1b; }

  .bullet-list {
    list-style: none;
  }

  .bullet-list li {
    position: relative;
    padding-left: 14px;
    margin-bottom: 6px;
    font-size: 7.8pt;
    line-height: 1.4;
  }

  .bullet-list.success-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
  }

  .bullet-list.warning-list li::before {
    content: "✕";
    position: absolute;
    left: 0;
    color: #ef4444;
    font-weight: bold;
  }

  .page-break {
    page-break-before: always;
  }

  .priority-badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 6.5pt;
    font-weight: 700;
    text-transform: uppercase;
  }

  .priority-high { background: #fee2e2; color: #b91c1c; }
  .priority-med { background: #fef3c7; color: #b45309; }
  .priority-low { background: #e0e7ff; color: #4338ca; }

  .recommendation-card {
    background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 12px 16px;
    margin-top: 10px;
  }

  .footer-stamp {
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    font-size: 7pt;
    color: #94a3b8;
  }
</style>
</head>
<body>

  <!-- ================= PAGE 1 ================= -->
  <div class="header-card">
    <div class="badge-tag">Audited Milestone Report</div>
    <div class="header-title">IntellMeet — Backend Workstream Audit</div>
    <div class="header-subtitle">Member 2 (Backend, Database & Real-Time Infrastructure) • Week 1 Deliverables vs Actual Progress</div>
    
    <div class="header-meta-grid">
      <div class="meta-item">
        <div class="meta-label">Project</div>
        <div class="meta-val">IntellMeet (MERN + AI)</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Team Member</div>
        <div class="meta-val">Member 2 (Backend Lead)</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Target Milestone</div>
        <div class="meta-val">Week 1 (Days 1 to 7)</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Audit Date</div>
        <div class="meta-val">March 2026 (Live Audit)</div>
      </div>
    </div>
  </div>

  <!-- KPI SUMMARY -->
  <div class="kpi-grid">
    <div class="kpi-card green">
      <div class="kpi-title">Week 1 Completion</div>
      <div class="kpi-value">78%</div>
      <div class="kpi-desc">Core architecture & APIs operational</div>
    </div>
    <div class="kpi-card purple">
      <div class="kpi-title">Ahead-of-Schedule</div>
      <div class="kpi-value">4 Features</div>
      <div class="kpi-desc">WebRTC, Live Chat, Tasks & Admin</div>
    </div>
    <div class="kpi-card amber">
      <div class="kpi-title">Pending Week 1 Gaps</div>
      <div class="kpi-value">4 Critical</div>
      <div class="kpi-desc">Refresh Token, Redis, Cloudinary, Delete</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-title">Code Health</div>
      <div class="kpi-value">Production</div>
      <div class="kpi-desc">TypeScript + MongoMemoryServer ready</div>
    </div>
  </div>

  <!-- SECTION 1: DAY-BY-DAY COMPARISON TABLE -->
  <div class="section-title">Day-by-Day Execution Plan vs Actual Implementation</div>
  <table>
    <thead>
      <tr>
        <th style="width: 10%;">Day</th>
        <th style="width: 32%;">Planned Milestone (28-Day Plan)</th>
        <th style="width: 43%;">Actual Implemented Codebase Status</th>
        <th style="width: 15%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Day 1</strong></td>
        <td>MERN boilerplate with Vite & Express; MongoDB setup; install dependencies; initial commit.</td>
        <td>Express + TS server, Helmet, CORS, Rate Limit in <span class="code-tag">server.ts</span>. Mongoose connection with Memory-Server fallback in <span class="code-tag">config/db.ts</span>.</td>
        <td><span class="status-pill status-done">✓ Completed</span></td>
      </tr>
      <tr>
        <td><strong>Day 2</strong></td>
        <td>User model & auth routes (signup, login); JWT with refresh tokens; password hashing with bcrypt.</td>
        <td><span class="code-tag">User.ts</span> with bcrypt pre-save hashing & roles. Register, Login, Me in <span class="code-tag">authController.ts</span>. <em>*Refresh tokens not implemented.</em></td>
        <td><span class="status-pill status-partial">⚠ Partial (No Refresh)</span></td>
      </tr>
      <tr>
        <td><strong>Day 3</strong></td>
        <td>Profile creation & avatar upload via Cloudinary; protected routes with middleware; auth rate limiting.</td>
        <td>JWT verify & role RBAC in <span class="code-tag">middleware/auth.ts</span>. Profile update working. Global rate limiting set. <em>*Cloudinary upload & auth rate limit missing.</em></td>
        <td><span class="status-pill status-partial">⚠ Partial (No Cloudinary)</span></td>
      </tr>
      <tr>
        <td><strong>Day 4</strong></td>
        <td>Meeting model and basic CRUD for meetings; WebRTC setup for video calls (peer connection logic).</td>
        <td><span class="code-tag">Meeting.ts</span> schema; Create, Get, RoomId lookup in <span class="code-tag">meetingController.ts</span>. WebRTC signaling in <span class="code-tag">socketHandler.ts</span>. <em>*Delete API missing.</em></td>
        <td><span class="status-pill status-done">✓ Mostly Done (85%)</span></td>
      </tr>
      <tr>
        <td><strong>Day 5</strong></td>
        <td>Redis setup for session and meeting caching; Socket.io server configuration for real-time features.</td>
        <td>Socket.io server configured with room joins, participant roster, audio/video toggle, screen sharing. <em>*Redis cache completely missing (in-memory Map used).</em></td>
        <td><span class="status-pill status-partial">⚠ Partial (No Redis)</span></td>
      </tr>
      <tr>
        <td><strong>Day 6</strong></td>
        <td>Basic chat functionality in meetings; Real-time notification setup using Socket.io events.</td>
        <td><span class="code-tag">Message.ts</span> chat persistence, typing indicators & system logs working. <span class="code-tag">Notification.ts</span> REST API ready. <em>*Socket notification push missing.</em></td>
        <td><span class="status-pill status-done">✓ Mostly Done (80%)</span></td>
      </tr>
      <tr>
        <td><strong>Day 7</strong></td>
        <td>Week 1 Checkpoint: Backend running locally, auth working, meeting creation, Postman test, README.</td>
        <td>Local TS server operational with automated seeding (<span class="code-tag">seedData.ts</span>). Detailed <span class="code-tag">README.md</span> present. <em>*.git repo & Postman file missing.</em></td>
        <td><span class="status-pill status-done">✓ Completed</span></td>
      </tr>
    </tbody>
  </table>

  <!-- TWO COLUMN ANALYSIS -->
  <div class="card-grid">
    <div class="info-box success">
      <div class="box-title">
        <span>🏆 What Member 2 Did Exceptionally Well</span>
      </div>
      <ul class="bullet-list success-list">
        <li><strong>Rock-solid Foundation:</strong> Express 4 + TypeScript setup with strict typing, central error handling, and robust CORS/Helmet security.</li>
        <li><strong>Resilient Database Fallback:</strong> Added <span class="code-tag">mongodb-memory-server</span> so teammates can run the server instantly even without local MongoDB installed.</li>
        <li><strong>Early Delivery of Week 2 WebRTC:</strong> Implemented <span class="code-tag">webrtc:offer</span>, <span class="code-tag">webrtc:answer</span>, and <span class="code-tag">webrtc:ice-candidate</span> a whole week ahead of schedule.</li>
        <li><strong>Early Delivery of Week 3 Modules:</strong> Full Task Management CRUD (<span class="code-tag">taskController.ts</span>), Notification CRUD, and Admin Audit Logging already implemented.</li>
      </ul>
    </div>

    <div class="info-box warning">
      <div class="box-title">
        <span>⚠️ Critical Gaps That Must Be Resolved</span>
      </div>
      <ul class="bullet-list warning-list">
        <li><strong>Missing Refresh Tokens:</strong> Day 2 specified JWT with refresh tokens. Currently only a 7-day single token is issued without refresh rotation or cookie storage.</li>
        <li><strong>Missing Cloudinary Integration:</strong> Day 3 specified avatar upload via Cloudinary. No Multer or Cloudinary SDK exists; avatars rely solely on URL strings.</li>
        <li><strong>Missing Redis Session Cache:</strong> Day 5 specified Redis setup for active meeting rooms. Server currently tracks users in in-memory JavaScript Maps.</li>
        <li><strong>Missing Meeting Delete API:</strong> CRUD is incomplete without <span class="code-tag">DELETE /api/meetings/:id</span> in <span class="code-tag">meetingController.ts</span>.</li>
      </ul>
    </div>
  </div>

  <div class="footer-stamp">
    <span>IntellMeet AI Enterprise Platform • Zidio Development Internship</span>
    <span>Page 1 of 2</span>
  </div>

  <!-- ================= PAGE 2 ================= -->
  <div class="page-break"></div>

  <div class="section-title">Deep-Dive Technical Gap Analysis & Action Plan</div>

  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Missing Feature</th>
        <th style="width: 12%;">Priority</th>
        <th style="width: 35%;">Requirement vs Codebase Reality</th>
        <th style="width: 35%;">Recommended Fix for Member 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>JWT Refresh Token Rotation</strong></td>
        <td><span class="priority-badge priority-high">High Priority</span></td>
        <td>Plan requires access token (short lived) + refresh token (long lived). Codebase only generates one token (<span class="code-tag">expiresIn: 7d</span>).</td>
        <td>Create <span class="code-tag">POST /api/auth/refresh</span> endpoint. Store refresh token in HTTP-only cookie or DB model with invalidation logic.</td>
      </tr>
      <tr>
        <td><strong>Cloudinary Avatar Upload</strong></td>
        <td><span class="priority-badge priority-high">High Priority</span></td>
        <td>Plan requires media upload for user profiles. Server has neither <span class="code-tag">cloudinary</span> nor <span class="code-tag">multer</span> in <span class="code-tag">package.json</span>.</td>
        <td>Install <span class="code-tag">cloudinary</span> & <span class="code-tag">multer</span>. Create <span class="code-tag">POST /api/users/avatar</span> route to handle multipart form file uploads.</td>
      </tr>
      <tr>
        <td><strong>Meeting Delete API (CRUD)</strong></td>
        <td><span class="priority-badge priority-high">High Priority</span></td>
        <td>CRUD definition requires Create, Read, Update, Delete. <span class="code-tag">meetingController.ts</span> has everything except delete.</td>
        <td>Add <span class="code-tag">deleteMeeting</span> in <span class="code-tag">meetingController.ts</span> and bind <span class="code-tag">router.delete('/:id')</span> in <span class="code-tag">meetingRoutes.ts</span>.</td>
      </tr>
      <tr>
        <td><strong>Redis Session Caching</strong></td>
        <td><span class="priority-badge priority-med">Medium Priority</span></td>
        <td>Plan specifies Redis caching for meetings & sessions. Current code uses local <span class="code-tag">new Map()</span> which does not scale horizontally.</td>
        <td>Install <span class="code-tag">ioredis</span>. Cache active room participants and temporary meeting state in Redis hashes or key-value stores.</td>
      </tr>
      <tr>
        <td><strong>Auth-Specific Rate Limiting</strong></td>
        <td><span class="priority-badge priority-med">Medium Priority</span></td>
        <td>Day 3 specifies rate limiting on auth routes to prevent brute-force attacks. Currently only a broad 1000 req/15min rule exists on <span class="code-tag">/api</span>.</td>
        <td>Configure strict limiter (5–10 requests per 15 mins) specifically mounted on <span class="code-tag">/api/auth/login</span> and <span class="code-tag">/api/auth/register</span>.</td>
      </tr>
      <tr>
        <td><strong>Socket Notification Push</strong></td>
        <td><span class="priority-badge priority-low">Low Priority</span></td>
        <td>Day 6 specifies real-time notification setup. REST APIs exist, but notifications are not pushed over Socket.io to online clients.</td>
        <td>Emit <span class="code-tag">notification:received</span> inside <span class="code-tag">socketHandler.ts</span> when tasks or meeting invites are triggered.</td>
      </tr>
    </tbody>
  </table>

  <!-- AHEAD OF SCHEDULE SHOWCASE -->
  <div class="section-title">Ahead-of-Schedule Features Delivered by Member 2</div>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Feature Module</th>
        <th style="width: 15%;">Original Week</th>
        <th style="width: 60%;">What Has Already Been Implemented</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>WebRTC Peer Signalling</strong></td>
        <td>Week 2 (Backend)</td>
        <td>Full low-latency signaling (<span class="code-tag">webrtc:offer</span>, <span class="code-tag">webrtc:answer</span>, <span class="code-tag">webrtc:ice-candidate</span>) implemented in <span class="code-tag">sockets/socketHandler.ts</span>. Ready for Frontend Member 1!</td>
      </tr>
      <tr>
        <td><strong>In-Meeting Real-time Chat</strong></td>
        <td>Week 2 (Backend)</td>
        <td>Persistent chat system using <span class="code-tag">Message.ts</span>, room broadcasting, real-time typing indicators (<span class="code-tag">chat:typing</span>), and automatic arrival/departure system messages.</td>
      </tr>
      <tr>
        <td><strong>Task & Kanban Backend APIs</strong></td>
        <td>Week 3 (Backend)</td>
        <td>Full Task CRUD (<span class="code-tag">Task.ts</span>, <span class="code-tag">taskController.ts</span>) with status transitions (to-do, in-progress, completed), priority levels, meeting linkage, and assignee population.</td>
      </tr>
      <tr>
        <td><strong>Admin Governance & Audit Logs</strong></td>
        <td>Week 3 (Backend)</td>
        <td>Enterprise audit trail (<span class="code-tag">AuditLog.ts</span>) recording user registration, logins, meeting creation, and admin user status toggles in <span class="code-tag">adminController.ts</span>.</td>
      </tr>
    </tbody>
  </table>

  <!-- EXECUTIVE RECOMMENDATIONS -->
  <div class="recommendation-card">
    <div style="font-size: 8.5pt; font-weight: 700; color: #1e293b; margin-bottom: 6px;">
      📌 Executive Recommendation for Week 2 Handoff
    </div>
    <div style="font-size: 7.8pt; color: #475569; line-height: 1.5;">
      Member 2 has delivered exceptional architectural groundwork. Because Member 2 has already completed the WebRTC signaling and Chat modules slated for Week 2, the team is in a <strong>very strong position</strong>. To achieve 100% compliance with Week 1 specifications before moving forward:
      <br/>
      <strong>Immediate Step (1-2 Hours):</strong> Implement <span class="code-tag">deleteMeeting</span> in <span class="code-tag">meetingController.ts</span> and add auth-specific rate limiting.
      <br/>
      <strong>Secondary Step (1 Day):</strong> Implement Refresh Tokens and Cloudinary/S3 image uploads so Member 1 (Frontend) can integrate genuine profile picture uploads during Week 2.
    </div>
  </div>

  <div class="footer-stamp">
    <span>IntellMeet AI Enterprise Platform • Zidio Development Internship</span>
    <span>Page 2 of 2</span>
  </div>

</body>
</html>
"""

html_path = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\member2_week1_report.html"
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated HTML report at: {html_path}")

pdf_output_name = "IntelliMeet_Member2_Week1_Progress_Report.pdf"
pdf_path = os.path.join(r"c:\Users\shrey\OneDrive\Desktop\intelliMeet", pdf_output_name)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

print(f"Converting HTML to PDF via: {edge_exe}")

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
    size_kb = os.path.getsize(pdf_path) / 1024
    print(f"SUCCESS: Created PDF at: {pdf_path} ({size_kb:.2f} KB)")
else:
    print(f"Edge conversion failed or returned {result.returncode}: {result.stderr}")
    sys.exit(1)
