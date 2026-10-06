import os
import subprocess
import sys

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>IntellMeet - Live Deployment & Operations Guide</title>
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
    font-size: 8.8pt;
    line-height: 1.5;
  }

  .page {
    page-break-after: always;
    position: relative;
    min-height: 250mm;
    padding-bottom: 10px;
  }

  .page-last {
    page-break-after: avoid;
  }

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #e2e8f0;
    padding-bottom: 6px;
    margin-bottom: 16px;
    font-size: 7.8pt;
    color: #64748b;
    font-weight: 500;
  }

  .page-header .brand {
    color: #0284c7;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  /* Cover Banner */
  .cover-banner {
    background: linear-gradient(135deg, #0f172a 0%, #0369a1 60%, #0284c7 100%);
    color: #ffffff;
    border-radius: 12px;
    padding: 22px 24px;
    margin-bottom: 18px;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
  }

  .badge-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(2, 132, 199, 0.35);
    border: 1px solid rgba(186, 230, 253, 0.4);
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 7.5pt;
    font-weight: 600;
    color: #bae6fd;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .banner-title {
    font-size: 20pt;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #ffffff;
    line-height: 1.2;
  }

  .banner-title span {
    color: #38bdf8;
  }

  .banner-desc {
    color: #e0f2fe;
    font-size: 8.5pt;
    margin-top: 6px;
    max-width: 650px;
    line-height: 1.4;
  }

  .banner-meta {
    display: flex;
    gap: 20px;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    font-size: 7.8pt;
    color: #bae6fd;
  }

  .banner-meta strong {
    color: #f0f9ff;
  }

  h2 {
    font-size: 12.5pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin: 14px 0 8px 0;
    padding-bottom: 4px;
    border-bottom: 2px solid #0284c7;
    display: inline-block;
  }

  h3 {
    font-size: 9.5pt;
    font-weight: 700;
    color: #0f172a;
    margin: 10px 0 5px 0;
  }

  p {
    margin-bottom: 8px;
    color: #334155;
  }

  /* Diagrams */
  .diagram-box {
    background: #0f172a;
    color: #38bdf8;
    padding: 12px 14px;
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.2pt;
    line-height: 1.4;
    white-space: pre;
    margin: 8px 0 14px 0;
    border: 1px solid #1e293b;
  }

  .code-block {
    background: #0f172a;
    color: #f1f5f9;
    border-radius: 8px;
    padding: 10px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.1pt;
    line-height: 1.45;
    white-space: pre-wrap;
    margin: 6px 0 10px 0;
    border: 1px solid #334155;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px 0;
    font-size: 8pt;
  }

  th {
    background: #f0f9ff;
    color: #0369a1;
    font-weight: 700;
    text-align: left;
    padding: 6.5px 10px;
    border: 1px solid #bae6fd;
  }

  td {
    padding: 6px 10px;
    border: 1px solid #e2e8f0;
    color: #334155;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  .badge {
    display: inline-block;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 7pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .badge-green { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
  .badge-blue { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
  .badge-amber { background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; }

  /* Steps and Cards */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 11px 13px;
    margin-bottom: 10px;
  }

  .card-step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    background: #0284c7;
    color: #ffffff;
    font-weight: 800;
    font-size: 7.5pt;
    margin-right: 6px;
  }

  .checklist-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 4.5px 0;
    font-size: 8pt;
    border-bottom: 1px dotted #e2e8f0;
  }

  .check-icon {
    color: #16a34a;
    font-weight: 900;
    font-size: 9pt;
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

<!-- ================================= PAGE 1: DEPLOYMENT ARCHITECTURE & STEPS 1-2 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • LIVE DEPLOYMENT & OPERATIONS GUIDE</span>
    <span>Part 1: Cloud Architecture & Service Configuration</span>
  </div>

  <div class="cover-banner">
    <div class="badge-tag">✦ Production Deployment Blueprint • 100% Free Tier</div>
    <h1 class="banner-title">Live Cloud <span>Deployment Manual</span></h1>
    <p class="banner-desc">
      Comprehensive step-by-step instructions for deploying <strong>IntellMeet</strong> to public HTTPS/WSS endpoints 
      using Vercel, Render, and MongoDB Atlas with zero hosting costs and full WebRTC signaling support.
    </p>
    <div class="banner-meta">
      <div><strong>Architecture:</strong> Jamstack + Cloud Containers</div>
      <div><strong>Author:</strong> Shreya Yadav (@harsadash)</div>
      <div><strong>SSL/TLS:</strong> Automated Let's Encrypt</div>
      <div><strong>Document ID:</strong> ZIDIO-DEPLOY-05</div>
    </div>
  </div>

  <h2>🏗️ High-Availability Cloud Architecture Blueprint</h2>
  <div class="diagram-box">
+-----------------------------------------------------------------------------------------------+
|                                      PUBLIC CLOUD PLATFORM                                    |
|                                                                                               |
|   [ CLIENT BROWSER ]                                                                          |
|            |                                                                                  |
|            |  HTTPS (Port 443)                                                                |
|            v                                                                                  |
|   +---------------------------------------+                                                   |
|   |         VERCEL EDGE NETWORK           |                                                   |
|   |   - React 18 + Vite SPA               |  Public Frontend:                                 |
|   |   - Global CDN Edge Distribution      |  https://intellimeet-app.vercel.app               |
|   |   - Automatic Brotli/Gzip Compression |                                                   |
|   +-------------------+-------------------+                                                   |
|                       |                                                                       |
|                       |  REST HTTPS & WebSockets WSS                                          |
|                       v                                                                       |
|   +---------------------------------------+       TLS Connection       +------------------+   |
|   |          RENDER WEB SERVICE           | -------------------------> |  MONGODB ATLAS   |   |
|   |   - Node.js + Express REST API        |  mongodb+srv://...         |  - M0 512MB Clust|   |
|   |   - Socket.io WSS Signaling Server    |                            |  - Auto Backups  |   |
|   |   - WebRTC Peer Broker                |  Public API / WSS:         |  - AWS / Mumbai  |   |
|   |   - In-Memory Redis/Cache Fallback    |  https://intellimeet-api   |  - TLS 1.3 Gated |   |
|   +---------------------------------------+    .onrender.com           +------------------+   |
+-----------------------------------------------------------------------------------------------+</div>

  <h2>🚀 Step-by-Step Deployment Instructions</h2>

  <div class="card">
    <div style="display:flex; align-items:center; margin-bottom: 6px;">
      <span class="card-step-num">1</span>
      <h3 style="margin:0;">Database Setup (MongoDB Atlas Managed Free Tier)</h3>
    </div>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">1. Sign in to <a href="https://www.mongodb.com/cloud/atlas" style="color:#0284c7; text-decoration:none; font-weight:600;">mongodb.com/cloud/atlas</a> and click <strong>Create Deployment</strong> &rarr; Select <strong>M0 Free Cluster</strong>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">2. Choose provider region (e.g., AWS / Mumbai or Frankfurt) closest to primary users.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">3. Under <strong>Database Access</strong>, create an admin user (e.g., <code>intellimeet_admin</code>) with a strong password.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">4. Under <strong>Network Access</strong>, add IP <code>0.0.0.0/0</code> (Allow Access from Anywhere) to permit Render containers to connect.</p>
    <p style="font-size: 7.9pt; margin-bottom: 0;">5. Click <strong>Connect &rarr; Drivers</strong> and copy your connection string:</p>
    <div class="code-block" style="margin-top:4px;">mongodb+srv://intellimeet_admin:&lt;password&gt;@cluster0.abcde.mongodb.net/intellimeet?retryWrites=true&amp;w=majority</div>
  </div>

  <div class="card">
    <div style="display:flex; align-items:center; margin-bottom: 6px;">
      <span class="card-step-num">2</span>
      <h3 style="margin:0;">Backend Service Deployment (Render.com Web Service)</h3>
    </div>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">1. Sign in to <a href="https://render.com" style="color:#0284c7; text-decoration:none; font-weight:600;">render.com</a> and click <strong>New + &rarr; Web Service</strong> &rarr; Connect repository <code>harsadash/intelliMeet</code>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">2. Configure settings: <strong>Root Directory:</strong> <code>server</code> | <strong>Runtime:</strong> <code>Node</code> | <strong>Build:</strong> <code>npm install &amp;&amp; npm run build</code> | <strong>Start:</strong> <code>npm start</code>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">3. Under <strong>Environment Variables</strong>, add <code>NODE_ENV=production</code>, <code>MONGO_URI</code>, <code>JWT_SECRET</code>, <code>JWT_REFRESH_SECRET</code>, and <code>CLIENT_URL</code>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 0;">4. Click <strong>Create Web Service</strong>. Render provisions the container and assigns: <code>https://intellimeet-api.onrender.com</code>.</p>
  </div>
</div>

<!-- ================================= PAGE 2: STEPS 3-4 & ENV MATRIX ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • LIVE DEPLOYMENT & OPERATIONS GUIDE</span>
    <span>Part 2: Frontend Deployment & Environment Matrix</span>
  </div>

  <h2>🚀 Step-by-Step Deployment Instructions (Contd.)</h2>

  <div class="card">
    <div style="display:flex; align-items:center; margin-bottom: 6px;">
      <span class="card-step-num">3</span>
      <h3 style="margin:0;">Frontend Client Deployment (Vercel Free Tier)</h3>
    </div>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">1. Sign in to <a href="https://vercel.com" style="color:#0284c7; text-decoration:none; font-weight:600;">vercel.com</a> with GitHub and click <strong>Add New... &rarr; Project</strong>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">2. Import repository <code>intelliMeet</code>. Select Framework Preset: <strong>Vite</strong>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">3. Set <strong>Root Directory:</strong> <code>client</code> | <strong>Build Command:</strong> <code>npm run build</code> | <strong>Output Directory:</strong> <code>dist</code>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">4. Under <strong>Environment Variables</strong>, configure:</p>
    <div class="code-block" style="margin: 4px 0;">VITE_API_URL=https://intellimeet-api.onrender.com
VITE_SOCKET_URL=https://intellimeet-api.onrender.com</div>
    <p style="font-size: 7.9pt; margin-bottom: 0;">5. Click <strong>Deploy</strong>. Vercel compiles React assets and assigns: <code>https://intellimeet-app.vercel.app</code>.</p>
  </div>

  <div class="card">
    <div style="display:flex; align-items:center; margin-bottom: 6px;">
      <span class="card-step-num">4</span>
      <h3 style="margin:0;">Bidirectional Linkage & CORS Origin Synchronization</h3>
    </div>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">1. Navigate back to Render Dashboard &rarr; <code>intellimeet-api</code> &rarr; <strong>Environment</strong>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 4px;">2. Update <code>CLIENT_URL</code> to match your production Vercel domain: <code>https://intellimeet-app.vercel.app</code>.</p>
    <p style="font-size: 7.9pt; margin-bottom: 0;">3. Click <strong>Save Changes</strong>. Render automatically cycles and redeploys the service with the new CORS origin.</p>
  </div>

  <h2>🔑 Production Environment Configuration Matrix</h2>
  <p style="font-size: 8pt; color: #64748b;">
    Detailed reference of all production variables required across backend and frontend environments:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Variable Key</th>
        <th style="width: 15%;">Scope</th>
        <th style="width: 40%;">Description & Requirement Standard</th>
        <th style="width: 20%;">Default / Sample</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>NODE_ENV</code></td>
        <td><span class="badge badge-blue">Backend</span></td>
        <td>Enables Express production optimizations, secure cookies, and disabled stack traces.</td>
        <td><code>production</code></td>
      </tr>
      <tr>
        <td><code>PORT</code></td>
        <td><span class="badge badge-blue">Backend</span></td>
        <td>Web server listen port. Cloud platforms (Render/Railway) inject this automatically.</td>
        <td><code>10000 / 5000</code></td>
      </tr>
      <tr>
        <td><code>MONGO_URI</code></td>
        <td><span class="badge badge-blue">Backend</span></td>
        <td>Connection string for MongoDB Atlas cluster (with credentials and DB name).</td>
        <td><code>mongodb+srv://...</code></td>
      </tr>
      <tr>
        <td><code>JWT_SECRET</code></td>
        <td><span class="badge badge-blue">Backend</span></td>
        <td>Cryptographic secret key for signing short-lived access JWT tokens (15m expiration).</td>
        <td><code>32+ Char Random</code></td>
      </tr>
      <tr>
        <td><code>JWT_REFRESH_SECRET</code></td>
        <td><span class="badge badge-blue">Backend</span></td>
        <td>Independent secret key for signing long-lived rotatable refresh tokens (7d).</td>
        <td><code>32+ Char Random</code></td>
      </tr>
      <tr>
        <td><code>CLIENT_URL</code></td>
        <td><span class="badge badge-blue">Backend</span></td>
        <td>Authorized frontend domain for CORS whitelist and Socket.io handshake validation.</td>
        <td><code>https://...vercel.app</code></td>
      </tr>
      <tr>
        <td><code>OPENAI_API_KEY</code></td>
        <td><span class="badge badge-amber">Optional</span></td>
        <td>API key for GPT-4o-mini synthesis. If omitted, offline heuristic synthesizer runs.</td>
        <td><code>sk-proj-...</code></td>
      </tr>
      <tr>
        <td><code>VITE_API_URL</code></td>
        <td><span class="badge badge-green">Frontend</span></td>
        <td>Target backend URL for Axios HTTP requests (/api/auth, /api/meetings, /api/tasks).</td>
        <td><code>https://...onrender.com</code></td>
      </tr>
      <tr>
        <td><code>VITE_SOCKET_URL</code></td>
        <td><span class="badge badge-green">Frontend</span></td>
        <td>Target backend WebSocket gateway for Socket.io signaling & in-room chat.</td>
        <td><code>https://...onrender.com</code></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ================================= PAGE 3: PRODUCTION TEMPLATES & VERIFICATION ================================= -->
<div class="page page-last">
  <div class="page-header">
    <span class="brand">INTELLMEET • LIVE DEPLOYMENT & OPERATIONS GUIDE</span>
    <span>Part 3: Production Templates, Verification Matrix & Operations</span>
  </div>

  <h2>📄 Production File Templates</h2>

  <div class="grid-2">
    <div>
      <h3>Backend Template: <code>server/.env.production</code></h3>
      <div class="code-block">NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://admin:pass@cluster0.xyz.mongodb.net/intellimeet?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_access_token_key_2026
JWT_REFRESH_SECRET=super_secret_jwt_refresh_token_key_2026
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CLIENT_URL=https://intellimeet-app.vercel.app
OPENAI_API_KEY=sk-proj-your_key_here_or_leave_empty</div>
    </div>

    <div>
      <h3>Frontend Template: <code>client/.env.production</code></h3>
      <div class="code-block"># Production REST API Endpoint
VITE_API_URL=https://intellimeet-api.onrender.com

# Production WebSocket Gateway
VITE_SOCKET_URL=https://intellimeet-api.onrender.com

# Build Mode Indicator
VITE_APP_ENV=production</div>
      <div style="font-size: 7.5pt; color: #64748b; background: #f1f5f9; padding: 8px; border-radius: 6px; margin-top: 8px; border: 1px solid #e2e8f0;">
        <strong>Security Warning:</strong> Never commit filled <code>.env.production</code> files with real secrets to public GitHub repositories. Inject values directly via the Vercel & Render dashboards.
      </div>
    </div>
  </div>

  <h2>🌐 Live Verification Matrix (Post-Deployment Audit)</h2>
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; margin: 8px 0 12px 0;">
    <div class="checklist-row"><span class="check-icon">✓</span><span><strong>HTTPS SSL Validation:</strong> Frontend URL loads with a valid security padlock icon; zero mixed-content warnings.</span></div>
    <div class="checklist-row"><span class="check-icon">✓</span><span><strong>WSS Protocol Upgrade:</strong> Socket.io signaling establishes connection over <code>wss://</code> without HTTP polling fallback.</span></div>
    <div class="checklist-row"><span class="check-icon">✓</span><span><strong>CORS Whitelist:</strong> Inspecting DevTools Network panel reveals zero <code>Access-Control-Allow-Origin</code> errors.</span></div>
    <div class="checklist-row"><span class="check-icon">✓</span><span><strong>Database Read/Write:</strong> Logging into <code>employee@intellimeet.io</code> retrieves meetings and saves new tasks to Atlas.</span></div>
    <div class="checklist-row"><span class="check-icon">✓</span><span><strong>Multi-Peer WebRTC:</strong> Two separate browser windows join <code>/meeting/demo-room-101</code> and stream video peer-to-peer.</span></div>
    <div class="checklist-row" style="border-bottom:none;"><span class="check-icon">✓</span><span><strong>AI Post-Meeting Summary:</strong> Clicking "Generate Summary" delivers structured takeaways on the live domain.</span></div>
  </div>

  <h2>⚙️ Free-Tier Operations & Performance Tuning</h2>
  <div class="grid-2">
    <div class="card">
      <h3 style="margin-top:0; color:#0284c7;">Cold-Start Mitigation</h3>
      <p style="font-size: 7.8pt; margin-bottom: 0;">
        Render free web services spin down after 15 minutes of inactivity. Initial requests may experience a 30–45 second wake-up delay. A free health-check ping (e.g., UptimeRobot pinging <code>/api/health</code> every 10 minutes) keeps the container active during evaluation windows.
      </p>
    </div>
    <div class="card">
      <h3 style="margin-top:0; color:#0284c7;">STUN / TURN Relay Traversal</h3>
      <p style="font-size: 7.8pt; margin-bottom: 0;">
        Default STUN configuration utilizes Google's public STUN servers (<code>stun:stun.l.google.com:19302</code>). For symmetric NAT enterprise firewalls, adding a free Metered.ca TURN server credential ensures 100% video connectivity across restricted networks.
      </p>
    </div>
  </div>

  <div class="sign-box">
    <div>
      <span style="font-size: 7.5pt; color: #64748b; font-weight: 600; text-transform: uppercase;">Lead DevOps & Full-Stack Architect</span>
      <p style="font-size: 11pt; font-weight: 800; color: #0f172a; margin: 2px 0 0 0;">Shreya Yadav (@harsadash)</p>
      <p style="font-size: 7.5pt; color: #64748b; margin: 0;">Cloud Architecture & Delivery • Zidio Development</p>
    </div>
    <div style="text-align: right;">
      <span class="badge badge-green" style="font-size: 8pt; padding: 4px 10px;">Status: Production Certified</span>
      <p style="font-size: 7.5pt; color: #94a3b8; margin-top: 4px;">Verified: March 2026</p>
    </div>
  </div>
</div>

</body>
</html>
"""

html_path = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\05_Live_Deployment_Guide\deployment_guide_temp.html"
pdf_path = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\05_Live_Deployment_Guide\IntellMeet_Live_Deployment_Guide.pdf"

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generating PDF 05 via Edge...")
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
    print(f"SUCCESS: Generated PDF 05 at {pdf_path} ({size_kb:.1f} KB)")
    os.remove(html_path)
else:
    print(f"ERROR: {result.stderr}")
    sys.exit(1)
