import os
import subprocess
import sys

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>IntelliMeet - Member 2 (Backend) Week 1 Milestone Completion Report</title>
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
    background: linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #047857 100%);
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
    background: radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(52,211,153,0) 70%);
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
    background: rgba(52, 211, 153, 0.25);
    color: #a7f3d0;
    border: 1px solid rgba(167, 243, 208, 0.4);
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
    color: #d1fae5;
    margin-bottom: 14px;
    font-weight: 400;
  }

  .header-meta-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  .meta-item {
    font-size: 7.5pt;
  }

  .meta-label {
    color: #a7f3d0;
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
    border-left: 4px solid #10b981;
  }

  .kpi-card.blue { border-left-color: #3b82f6; }
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
    font-size: 10.5pt;
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
    background: #059669;
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

  .info-box.blue {
    border-top: 3px solid #3b82f6;
    background: #eff6ff;
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
  .info-box.blue .box-title { color: #1e40af; }

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

  .bullet-list.blue-list li::before {
    content: "★";
    position: absolute;
    left: 0;
    color: #3b82f6;
    font-weight: bold;
  }

  .page-break {
    page-break-before: always;
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
    <div class="badge-tag">Milestone 100% Completed</div>
    <div class="header-title">IntellMeet — Backend Workstream Milestone Report</div>
    <div class="header-subtitle">Member 2 (Backend, Database & Real-Time) • Week 1 Execution Plan Fully Completed & Verified</div>
    
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
        <div class="meta-label">Milestone Status</div>
        <div class="meta-val">Week 1: 100% Complete</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Audit Timestamp</div>
        <div class="meta-val">September 2026 (Live Audit)</div>
      </div>
    </div>
  </div>

  <!-- KPI SUMMARY -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-title">Week 1 Completion</div>
      <div class="kpi-value">100%</div>
      <div class="kpi-desc">All Days 1 to 7 objectives met</div>
    </div>
    <div class="kpi-card purple">
      <div class="kpi-title">Ahead-of-Schedule</div>
      <div class="kpi-value">4 Modules</div>
      <div class="kpi-desc">WebRTC, Live Chat, Tasks & Admin</div>
    </div>
    <div class="kpi-card blue">
      <div class="kpi-title">Pending Gaps</div>
      <div class="kpi-value">0 Left</div>
      <div class="kpi-desc">All identified gaps closed</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-title">Build Status</div>
      <div class="kpi-value">Passing</div>
      <div class="kpi-desc">TypeScript 0 errors, Git initialized</div>
    </div>
  </div>

  <!-- SECTION 1: DAY-BY-DAY COMPARISON TABLE -->
  <div class="section-title">Day-by-Day Milestone Execution Status</div>
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
        <td>MERN boilerplate with Vite & Express; MongoDB setup; dependencies; folder structure; initial commit.</td>
        <td>Express + TS server in <span class="code-tag">server.ts</span>. Mongoose connection with Memory fallback in <span class="code-tag">db.ts</span>. Git initialized with 107 files committed.</td>
        <td><span class="status-pill status-done">✓ 100% Completed</span></td>
      </tr>
      <tr>
        <td><strong>Day 2</strong></td>
        <td>User model & auth routes; JWT implementation with refresh tokens; password hashing with bcrypt.</td>
        <td><span class="code-tag">User.ts</span> with bcrypt pre-save hashing & roles. Register, Login, Refresh token rotation (<span class="code-tag">/api/auth/refresh</span>), and Logout.</td>
        <td><span class="status-pill status-done">✓ 100% Completed</span></td>
      </tr>
      <tr>
        <td><strong>Day 3</strong></td>
        <td>Profile creation & avatar upload via Cloudinary; protected routes with middleware; auth rate limiting.</td>
        <td>Cloudinary SDK with Multer stream & Data URI fallback in <span class="code-tag">config/cloudinary.ts</span>. Strict 10-req limiter on auth in <span class="code-tag">rateLimiter.ts</span>.</td>
        <td><span class="status-pill status-done">✓ 100% Completed</span></td>
      </tr>
      <tr>
        <td><strong>Day 4</strong></td>
        <td>Meeting model and basic CRUD for meetings; WebRTC setup for video calls (peer connection logic).</td>
        <td>Full Meeting CRUD (Create, Read, Room join, Update, and <span class="code-tag">DELETE /api/meetings/:id</span>). Full WebRTC signaling in <span class="code-tag">socketHandler.ts</span>.</td>
        <td><span class="status-pill status-done">✓ 100% Completed</span></td>
      </tr>
      <tr>
        <td><strong>Day 5</strong></td>
        <td>Redis setup for session and meeting caching; Socket.io server configuration for real-time features.</td>
        <td>Redis client in <span class="code-tag">config/redis.ts</span> with <span class="code-tag">CacheService.ts</span> for active room participants with resilient in-memory fallback.</td>
        <td><span class="status-pill status-done">✓ 100% Completed</span></td>
      </tr>
      <tr>
        <td><strong>Day 6</strong></td>
        <td>Basic chat functionality in meetings; Real-time notification setup using Socket.io events.</td>
        <td><span class="code-tag">Message.ts</span> chat persistence with typing indicators. Real-time push notifications over <span class="code-tag">emitRealtimeNotification</span> on task assignments.</td>
        <td><span class="status-pill status-done">✓ 100% Completed</span></td>
      </tr>
      <tr>
        <td><strong>Day 7</strong></td>
        <td>Week 1 Checkpoint: Backend running locally, auth working, meeting creation, Postman test, README.</td>
        <td>Server compiles with 0 errors. Seed data automated (<span class="code-tag">seedData.ts</span>). Complete <span class="code-tag">IntellMeet_Postman_Collection.json</span> created.</td>
        <td><span class="status-pill status-done">✓ 100% Completed</span></td>
      </tr>
    </tbody>
  </table>

  <!-- TWO COLUMN ANALYSIS -->
  <div class="card-grid">
    <div class="info-box success">
      <div class="box-title">
        <span>🏆 Newly Completed Features (Previously Pending Gaps)</span>
      </div>
      <ul class="bullet-list success-list">
        <li><strong>JWT Refresh Token Rotation:</strong> Implemented <span class="code-tag">POST /api/auth/refresh</span> and revocation logic on user document in <span class="code-tag">authController.ts</span>.</li>
        <li><strong>Cloudinary Profile Avatar Upload:</strong> Integrated <span class="code-tag">cloudinary</span> + <span class="code-tag">multer</span> in <span class="code-tag">userController.ts</span> (<span class="code-tag">POST /api/users/avatar</span>) with seamless offline fallback.</li>
        <li><strong>Meeting Delete Endpoint:</strong> Implemented <span class="code-tag">DELETE /api/meetings/:id</span> with host/admin permission checks and AuditLog tracking.</li>
        <li><strong>Redis Caching Layer:</strong> Created <span class="code-tag">redis.ts</span> & <span class="code-tag">CacheService.ts</span> to cache meeting participants and sessions with zero-downtime memory adapter.</li>
        <li><strong>Brute-Force Rate Limiting:</strong> Added 10-attempt limiter on <span class="code-tag">/register</span>, <span class="code-tag">/login</span>, and <span class="code-tag">/refresh</span> in <span class="code-tag">rateLimiter.ts</span>.</li>
      </ul>
    </div>

    <div class="info-box blue">
      <div class="box-title">
        <span>🚀 Advanced Deliveries (Ahead of Schedule)</span>
      </div>
      <ul class="bullet-list blue-list">
        <li><strong>WebRTC Signalling (Week 2):</strong> Complete peer connection negotiation (<span class="code-tag">webrtc:offer</span>, <span class="code-tag">answer</span>, <span class="code-tag">ice-candidate</span>) ready for frontend video room.</li>
        <li><strong>In-Meeting Collaboration Chat (Week 2):</strong> Real-time messages, typing indicators, and room activity events saved to MongoDB and broadcast via Socket.io.</li>
        <li><strong>Task & Kanban Board APIs (Week 3):</strong> Full Task management CRUD with priority, due date, status workflow, and automatic notification dispatch.</li>
        <li><strong>Enterprise Audit & Governance:</strong> Central audit logging system tracking logins, registrations, and meeting operations.</li>
      </ul>
    </div>
  </div>

  <div class="footer-stamp">
    <span>IntellMeet AI Enterprise Platform • Zidio Development Internship</span>
    <span>Page 1 of 2</span>
  </div>

  <!-- ================= PAGE 2 ================= -->
  <div class="page-break"></div>

  <div class="section-title">Architecture Summary & Verification Matrix</div>

  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Module / Feature</th>
        <th style="width: 28%;">Implementation File</th>
        <th style="width: 35%;">API Endpoint / Mechanism</th>
        <th style="width: 15%;">Test Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Authentication & Refresh</strong></td>
        <td><span class="code-tag">controllers/authController.ts</span></td>
        <td><span class="code-tag">POST /api/auth/register</span><br/><span class="code-tag">POST /api/auth/login</span><br/><span class="code-tag">POST /api/auth/refresh</span></td>
        <td><span class="status-pill status-done">Verified ✓</span></td>
      </tr>
      <tr>
        <td><strong>Profile & Avatar Upload</strong></td>
        <td><span class="code-tag">controllers/userController.ts</span><br/><span class="code-tag">config/cloudinary.ts</span></td>
        <td><span class="code-tag">POST /api/users/avatar</span> (Multipart/form-data via Cloudinary SDK)</td>
        <td><span class="status-pill status-done">Verified ✓</span></td>
      </tr>
      <tr>
        <td><strong>Meeting Management (CRUD)</strong></td>
        <td><span class="code-tag">controllers/meetingController.ts</span></td>
        <td><span class="code-tag">GET, POST /api/meetings</span><br/><span class="code-tag">GET, PUT, DELETE /api/meetings/:id</span></td>
        <td><span class="status-pill status-done">Verified ✓</span></td>
      </tr>
      <tr>
        <td><strong>Redis Cache / State</strong></td>
        <td><span class="code-tag">config/redis.ts</span><br/><span class="code-tag">services/cacheService.ts</span></td>
        <td><span class="code-tag">CacheService.addRoomParticipant()</span><br/><span class="code-tag">CacheService.getRoomParticipants()</span></td>
        <td><span class="status-pill status-done">Verified ✓</span></td>
      </tr>
      <tr>
        <td><strong>Real-Time Signaling & Chat</strong></td>
        <td><span class="code-tag">sockets/socketHandler.ts</span></td>
        <td><span class="code-tag">webrtc:offer</span>, <span class="code-tag">webrtc:answer</span>, <span class="code-tag">chat:send</span>, <span class="code-tag">user:join</span></td>
        <td><span class="status-pill status-done">Verified ✓</span></td>
      </tr>
      <tr>
        <td><strong>Push Notifications</strong></td>
        <td><span class="code-tag">controllers/notificationController.ts</span></td>
        <td><span class="code-tag">emitRealtimeNotification()</span> to <span class="code-tag">user:userId</span> room</td>
        <td><span class="status-pill status-done">Verified ✓</span></td>
      </tr>
      <tr>
        <td><strong>Brute-Force Rate Limiting</strong></td>
        <td><span class="code-tag">middleware/rateLimiter.ts</span></td>
        <td>10 req/15min on auth endpoints, 1000 req/15min on general API</td>
        <td><span class="status-pill status-done">Verified ✓</span></td>
      </tr>
      <tr>
        <td><strong>Postman API Collection</strong></td>
        <td><span class="code-tag">IntellMeet_Postman_Collection.json</span></td>
        <td>Complete JSON collection with preconfigured requests & variables</td>
        <td><span class="status-pill status-done">Verified ✓</span></td>
      </tr>
    </tbody>
  </table>

  <!-- HANDOFF TO WEEK 2 -->
  <div class="info-box success" style="margin-top: 15px;">
    <div class="box-title">
      <span>🚀 Ready for Member 1 & Member 3 Week 2 Handoff</span>
    </div>
    <div style="font-size: 8pt; color: #334155; line-height: 1.5;">
      With all Week 1 deliverables 100% completed and key Week 2 real-time sockets already in place:
      <br/>
      • <strong>Member 1 (Frontend):</strong> Can directly connect the Meeting Lobby, WebRTC video tiles, chat drawer, and Cloudinary avatar uploads to the working backend endpoints.
      <br/>
      • <strong>Member 3 (AI/DevOps):</strong> Can integrate OpenAI transcription streams directly into meeting session endpoints with full confidence in authentication and state persistence.
      <br/>
      • <strong>Repository Status:</strong> Local Git repository initialized with all 107 files committed (<span class="code-tag">c4055a6</span>).
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

print(f"Generated updated HTML report at: {html_path}")

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
