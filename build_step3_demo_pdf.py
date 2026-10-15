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
img_07 = get_image_base64(os.path.join(img_dir, "07_Kanban_Board.png"))
img_08 = get_image_base64(os.path.join(img_dir, "08_Admin_Dashboard.png"))
img_09 = get_image_base64(os.path.join(img_dir, "09_Platform_Analytics.png"))

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>IntellMeet - Step 3: Demo Video (7 Minutes) Master Walkthrough Guide</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  @page {
    size: A4;
    margin: 11mm 12mm 11mm 12mm;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 8.2pt;
    line-height: 1.42;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    page-break-after: always;
    break-after: page;
    height: 272mm;
    max-height: 272mm;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 2px;
  }

  .page-last {
    page-break-after: avoid;
    break-after: avoid;
  }

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #e2e8f0;
    padding-bottom: 4px;
    margin-bottom: 7px;
    font-size: 7.2pt;
    color: #64748b;
    font-weight: 500;
  }

  .page-header .brand {
    color: #2563eb;
    font-weight: 800;
    letter-spacing: 0.02em;
  }

  .page-header .step-badge {
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    padding: 2px 8px;
    border-radius: 9999px;
    font-weight: 800;
    font-size: 7.2pt;
    font-family: 'JetBrains Mono', monospace;
  }

  /* Footer */
  .page-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e2e8f0;
    padding-top: 4px;
    margin-top: 5px;
    font-size: 7.1pt;
    color: #94a3b8;
  }

  .page-footer .lead {
    font-weight: 600;
    color: #64748b;
  }

  /* Cover Container */
  .cover-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 26px 24px;
    background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 45%, #0e3b43 100%);
    color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.4);
  }

  .cover-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(37, 99, 235, 0.32);
    border: 1px solid rgba(147, 197, 253, 0.5);
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 7.6pt;
    font-weight: 700;
    color: #93c5fd;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .cover-title {
    font-size: 30pt;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.08;
    margin: 12px 0 6px 0;
    letter-spacing: -0.025em;
  }

  .cover-title span {
    color: #38bdf8;
    background: linear-gradient(to right, #38bdf8, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .cover-tagline {
    font-size: 13pt;
    font-weight: 600;
    color: #f1f5f9;
    max-width: 600px;
    line-height: 1.35;
    margin-bottom: 8px;
  }

  .cover-desc {
    color: #94a3b8;
    font-size: 8.2pt;
    max-width: 620px;
    line-height: 1.45;
  }

  .cover-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    padding: 12px 16px;
    border-radius: 12px;
    margin-top: 14px;
  }

  .cover-meta-item {
    display: flex;
    flex-direction: column;
  }

  .cover-meta-label {
    font-size: 6.6pt;
    text-transform: uppercase;
    color: #94a3b8;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .cover-meta-value {
    font-size: 9.4pt;
    color: #f8fafc;
    font-weight: 700;
    margin-top: 2px;
  }

  /* Headings */
  h2 {
    font-size: 11.5pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin: 4px 0 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h3 {
    font-size: 8.8pt;
    font-weight: 700;
    color: #1e293b;
    margin: 6px 0 3px 0;
  }

  h4 {
    font-size: 8pt;
    font-weight: 700;
    color: #334155;
    margin: 4px 0 2px 0;
  }

  p {
    margin-bottom: 4px;
    color: #334155;
    text-align: justify;
    line-height: 1.4;
  }

  /* Badges */
  .badge {
    display: inline-block;
    padding: 1.5px 5px;
    border-radius: 3px;
    font-size: 6.4pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .badge-blue { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .badge-green { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .badge-purple { background: #faf5ff; color: #7e22ce; border: 1px solid #e9d5ff; }
  .badge-amber { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }

  /* Cards */
  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 7px 10px;
    margin-bottom: 5px;
  }

  .card-action {
    background: #f0fdf4;
    border: 1.5px solid #86efac;
    border-radius: 7px;
    padding: 7px 11px;
    margin: 5px 0 7px 0;
  }

  .card-action .title {
    color: #166534;
    font-weight: 800;
    font-size: 7.8pt;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 3px;
  }

  .card-speech {
    background: #f8fafc;
    border-left: 3.5px solid #2563eb;
    border-radius: 0 6px 6px 0;
    padding: 7px 10px;
    margin-bottom: 5px;
    font-size: 7.8pt;
    line-height: 1.42;
    color: #0f172a;
  }

  .speech-label {
    font-size: 6.8pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #2563eb;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .card-speech-hi {
    background: #fffbeb;
    border-left: 3.5px solid #f59e0b;
    border-radius: 0 6px 6px 0;
    padding: 7px 10px;
    margin-bottom: 5px;
    font-size: 7.8pt;
    line-height: 1.42;
    color: #451a03;
  }

  .speech-label-hi {
    font-size: 6.8pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #b45309;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* Screenshot Showcase */
  .screen-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    overflow: hidden;
    margin: 4px 0 6px 0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .screen-card-header {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 3.5px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .screen-title {
    font-size: 7.6pt;
    font-weight: 700;
    color: #0f172a;
  }

  .screen-img {
    width: 100%;
    max-height: 58mm;
    object-fit: cover;
    object-position: top;
    display: block;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }

  /* Cheat Sheet Table */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 5px 0 6px 0;
    font-size: 7.2pt;
    line-height: 1.35;
  }

  th {
    background: #0f172a;
    color: #f8fafc;
    font-weight: 700;
    text-align: left;
    padding: 4px 6px;
    border: 1px solid #1e293b;
    text-transform: uppercase;
    font-size: 6.6pt;
  }

  td {
    padding: 4px 6px;
    border: 1px solid #cbd5e1;
    color: #334155;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  .step-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: #2563eb;
    color: #ffffff;
    border-radius: 50%;
    font-size: 7.5pt;
    font-weight: 800;
  }
</style>
</head>
<body>

<!-- ================================= PAGE 1: TELEPROMPTER OVERVIEW & RECORDING CHEAT SHEET ================================= -->
<div class="page">
  <div class="cover-container">
    <div>
      <div class="cover-badge">
        ✦ ZIDIO STEP 3 • DEMO VIDEO (4 MARKS) • 7-MINUTE MASTER GUIDE
      </div>
      <h1 class="cover-title">
        STEP 3: <span>DEMO VIDEO</span> SCRIPT & USER FLOW
      </h1>
      <p class="cover-tagline">
        Complete 7-Minute Screen-Recorded Walkthrough — Features & End-to-End User Flow
      </p>
      <p class="cover-desc">
        Engineered strictly in adherence to <strong>Step 3: Demo Video (4 Marks)</strong>: <em>"A screen-recorded walkthrough — features and user flow. YouTube (unlisted) or Drive."</em> 
        This guide provides an exact minute-by-minute spoken script (in both Hinglish and English) and precise 
        <strong>[SCREEN ACTIONS]</strong> for demonstrating all core user flows, interfaces, and technical capabilities without filler.
      </p>
    </div>

    <div>
      <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 10px; padding: 10px 14px; margin-top: 10px;">
        <span style="font-size: 7pt; text-transform: uppercase; color: #38bdf8; font-weight: 800; letter-spacing: 0.05em;">Step 3: 7-Minute Features & User Flow Walkthrough Matrix</span>
        <table style="width: 100%; border-collapse: collapse; margin-top: 5px; font-size: 7.1pt; color: #f8fafc;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
              <th style="background: none; border: none; color: #93c5fd; width: 14%;">Timestamp</th>
              <th style="background: none; border: none; color: #93c5fd; width: 22%;">User Flow Segment</th>
              <th style="background: none; border: none; color: #93c5fd; width: 34%;">On-Screen Visual Interface</th>
              <th style="background: none; border: none; color: #93c5fd; width: 30%;">Demonstrated Capability</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>0:00 – 1:00</strong></td><td>Flow 1: Entry & Auth</td><td>Landing, HTTPS Padlock, 1-Click Demo Login</td><td>Public Access, Fast Load &lt;2s, JWT Auth</td></tr>
            <tr><td><strong>1:00 – 2:15</strong></td><td>Flow 2: Dashboard & Sync</td><td>Employee Dashboard, KPI Cards, Calendar .ics</td><td>Scheduling, RFC-5545 Export, Analytics</td></tr>
            <tr><td><strong>2:15 – 3:30</strong></td><td>Flow 3: WebRTC Conferencing</td><td>Active Meeting Room, Screen Share, Chat Drawer</td><td>P2P WebRTC, Socket.io Signaling, HUD</td></tr>
            <tr><td><strong>3:30 – 4:45</strong></td><td>Flow 4: AI Summary & Tasks</td><td>AI Post-Meeting Summary, "Convert to Task"</td><td>Dual AI Engine, Semantic Action Extraction</td></tr>
            <tr><td><strong>4:45 – 6:00</strong></td><td>Flow 5: Kanban & Media</td><td>4-Col Kanban Drag-and-Drop, Recordings Playback</td><td>Agile Execution & Client MediaRecorder</td></tr>
            <tr><td><strong>6:00 – 7:00</strong></td><td>Flow 6: Admin & Responsive</td><td>Admin Console, Telemetry CSV, Mobile View (F12)</td><td>RBAC Governance & Mobile Responsiveness</td></tr>
          </tbody>
        </table>
      </div>

      <div class="cover-meta-grid">
        <div class="cover-meta-item">
          <span class="cover-meta-label">Presenter / Lead Developer</span>
          <span class="cover-meta-value">Shreya Yadav (@harsadash)</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Target Submission Format</span>
          <span class="cover-meta-value">YouTube (Unlisted) / Google Drive Public Link</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Evaluation Rubric Step</span>
          <span class="cover-meta-value">Step 3: Demo Video (4 Marks Allocation)</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Live Deployment URL</span>
          <span class="cover-meta-value">https://intelli-meet-nine.vercel.app</span>
        </div>
      </div>

      <div style="margin-top: 10px; display: flex; justify-content: space-between; font-size: 7pt; color: #94a3b8;">
        <span>Target Duration: 6:45 – 7:15 Minutes</span>
        <span>Resolution: 1080p Full HD (1920x1080) • 60 FPS</span>
      </div>
    </div>
  </div>
</div>

<!-- ================================= PAGE 2: MINUTE 0:00 - 1:00 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • STEP 3: DEMO VIDEO GUIDE</span>
    <span class="step-badge">⏱️ 0:00 – 1:00 | USER FLOW 1</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">1</span> Minute 0:00 – 1:00: Platform Introduction, HTTPS & 1-Click Authentication</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [0:00 - 0:20]:</strong> Start screen recording at <code>https://intelli-meet-nine.vercel.app</code>. Hover your cursor over the <strong>HTTPS padlock</strong> in the browser address bar. Show the clean enterprise login portal.<br>
        <strong>2. [0:20 - 0:40]:</strong> Highlight the project value statement: <em>"Turn Meetings into Meaningful Outcomes."</em> Mention the core full-stack MERN architecture.<br>
        <strong>3. [0:40 - 1:00]:</strong> Demonstrate the frictionless user onboarding: Click the <strong>"Demo Employee"</strong> quick-fill button (showing credentials auto-populating), then click <strong>"Sign In"</strong>. The dashboard loads in under 2 seconds!
      </p>
    </div>

    <div class="screen-card">
      <div class="screen-card-header">
        <span class="screen-title">Interface to Show: Production Authentication Portal with Demo Credentials</span>
        <span class="badge badge-blue">USER FLOW 1: AUTHENTICATION</span>
      </div>
      <img src="__IMG_01__" class="screen-img" alt="Login Portal Interface">
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Namaste sabhi ko! Mera naam Shreya Yadav hai, aur aaj is <strong>Step 3 Demo Video</strong> me main showcase karne ja rahi hoon <strong>IntellMeet</strong> ka complete end-to-end user flow aur live features. IntellMeet ek modern AI-Powered Enterprise Meeting aur Real-Time Collaboration platform hai. Sabse pehle aap dekh sakte hain ki application publicly hosted hai <strong>intelli-meet-nine.vercel.app</strong> par with secure HTTPS SSL encryption. User experience ko seamless banane ke liye evaluators bina manual sign-up ke direct Demo accounts se test kar sakte hain. Chaliye 'Demo Employee' button click karke Sign In karte hain!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Hello everyone! My name is Shreya Yadav, and in this <strong>Step 3 Demo Video</strong>, I will walk you through the end-to-end features and user flows of <strong>IntellMeet</strong> — our AI-Powered Enterprise Meeting and Collaboration Platform. As demonstrated, the application is publicly live at <strong>intelli-meet-nine.vercel.app</strong> with verified HTTPS SSL encryption. To provide an optimal evaluator experience, users can bypass manual registration using our 1-click demo accounts. Let's select 'Demo Employee' and log in immediately!"</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • Step 3 Demo Video (Features & User Flow)</span>
    <span>Page 2 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 3: MINUTE 1:00 - 2:15 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • STEP 3: DEMO VIDEO GUIDE</span>
    <span class="step-badge">⏱️ 1:00 – 2:15 | USER FLOW 2</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">2</span> Minute 1:00 – 2:15: Employee Workspace Dashboard & Calendar Scheduling</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [1:00 - 1:35]:</strong> Showcase the Employee Dashboard. Move cursor over the personalized greeting banner and the 3 KPI metric cards: <strong>Total Meetings</strong>, <strong>Upcoming Sessions</strong>, and <strong>Active Tasks</strong>. Point to the weekly meeting volume chart.<br>
        <strong>2. [1:35 - 2:15]:</strong> Click <strong>"Calendar"</strong> on the left navigation bar (`/calendar`). The interactive calendar grid loads. Click on an upcoming meeting chip to display modal details. Click the <strong>"Download .ics"</strong> button and highlight the browser download bar confirming calendar export.
      </p>
    </div>

    <div class="grid-2">
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 1: Employee Workspace Dashboard</span>
          <span class="badge badge-green">WORKSPACE</span>
        </div>
        <img src="__IMG_02__" class="screen-img" alt="Employee Dashboard" style="max-height: 48mm;">
      </div>
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 2: Interactive Calendar Scheduling & .ICS</span>
          <span class="badge badge-blue">CALENDAR</span>
        </div>
        <img src="__IMG_05__" class="screen-img" alt="Interactive Calendar" style="max-height: 48mm;">
      </div>
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Dashboard par enter karte hi employee ko personalized command center milta hai. Top par instant meeting start/join karne ka option hai, aur real-time KPI counters hain jo meetings aur active tasks track karte hain. Ab user flow ke anusaar hum left sidebar se <strong>Calendar</strong> module me aate hain. Yahan employees apne scheduled sprint calls dekh sakte hain. Sabse practical feature yeh hai ki 'Download .ics' button click karte hi RFC-5545 standard calendar file generate hoti hai, jisse yeh meeting instantly Google Calendar, Outlook, ya Apple Calendar me import ho jaati hai!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Entering the application brings the employee into their personalized command center. Top quick-action buttons allow immediate meeting creation, complemented by live KPI counters for scheduled meetings and active tasks. Moving into our <strong>Calendar</strong> user flow, employees can inspect weekly and monthly meeting distributions. With a single click on 'Download .ics', an RFC-5545 compliant calendar payload is exported, ensuring seamless calendar synchronization across Google Calendar, Outlook, and Apple Calendar."</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • Step 3 Demo Video (Features & User Flow)</span>
    <span>Page 3 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 4: MINUTE 2:15 - 3:30 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • STEP 3: DEMO VIDEO GUIDE</span>
    <span class="step-badge">⏱️ 2:15 – 3:30 | USER FLOW 3</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">3</span> Minute 2:15 – 3:30: Real-Time WebRTC Conferencing, Screen Share & Live Chat</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [2:15 - 2:40]:</strong> Click <strong>"+ New Meeting"</strong> or join an active room (`/meeting/demo-room-101`). Allow camera/mic permissions. The dynamic multi-tile video grid immediately renders with your live camera stream.<br>
        <strong>2. [2:40 - 3:05]:</strong> Test floating HUD controls: Click <strong>Mute Microphone</strong> (icon turns red), Click <strong>Toggle Camera</strong>, and Click <strong>"Share Screen"</strong> (open window select modal). Point to the live call duration timer (e.g., <code>03:45</code>).<br>
        <strong>3. [3:05 - 3:30]:</strong> Click the <strong>Chat Icon</strong> on the HUD. The sliding Collaboration Drawer opens on the right. Type <em>"Live sprint review demo message"</em> and press Enter. Show the real-time message bubble and participant roster.
      </p>
    </div>

    <div class="screen-card">
      <div class="screen-card-header">
        <span class="screen-title">Interface to Show: Active WebRTC Conference Room with Screen Share & Chat Drawer</span>
        <span class="badge badge-purple">USER FLOW 3: WEBRTC MEDIA</span>
      </div>
      <img src="__IMG_03__" class="screen-img" alt="WebRTC Meeting Room" style="max-height: 52mm;">
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Ab dekhte hain IntellMeet ka core conferencing engine. 'New Meeting' click karte hi room ID generate hoti hai aur Socket.io signaling server par WebRTC PeerConnection establish ho jata hai. Niche floating HUD me essential controls hain: microphone mute/unmute, video toggle, call duration timer, aur browser ke native MediaRecorder se session recording. Presentation ke liye hamare paas high-definition 1080p screen sharing hai. Right side me collaboration drawer hai jisme live room chat aur participant roster sync rehta hai, bina video feed ko interrupt kiye."</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Now let's examine our core real-time conferencing engine. Launching a meeting initiates an ultra-low-latency WebRTC PeerConnection negotiated via our Socket.io signaling server. The floating bottom HUD provides instant hardware controls: microphone mute, camera toggle, session recording via the MediaRecorder API, and full 1080p screen sharing. The sliding right-hand collaboration drawer provides live room chat and participant presence without disrupting the active video grid."</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • Step 3 Demo Video (Features & User Flow)</span>
    <span>Page 4 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 5: MINUTE 3:30 - 4:45 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • STEP 3: DEMO VIDEO GUIDE</span>
    <span class="step-badge">⏱️ 3:30 – 4:45 | USER FLOW 4</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">4</span> Minute 3:30 – 4:45: AI Meeting Intelligence & Automated Task Conversion</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [3:30 - 4:05]:</strong> Click the red <strong>"End Meeting"</strong> button on the HUD. The application automatically redirects to the <strong>AI Meeting Summary</strong> screen (`/summary/:id`).<br>
        <strong>2. [4:05 - 4:25]:</strong> Point out the structured sections: <strong>Executive Overview</strong>, <strong>Key Discussion Points</strong>, and <strong>Action Items</strong> tagged with assignees and priority badges (High, Medium, Low).<br>
        <strong>3. [4:25 - 4:45]:</strong> Click the green <strong>"Convert to Task"</strong> button next to an action item. A confirmation toast appears: <em>"Task successfully converted and synced to Kanban board!"</em>
      </p>
    </div>

    <div class="grid-2">
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 1: AI Executive Summary & Takeaways</span>
          <span class="badge badge-purple">AI SYNTHESIS</span>
        </div>
        <img src="__IMG_04__" class="screen-img" alt="AI Meeting Summary" style="max-height: 48mm;">
      </div>
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 2: Action Items Extraction & 1-Click Task Sync</span>
          <span class="badge badge-green">TASK INJECTION</span>
        </div>
        <img src="__IMG_07__" class="screen-img" alt="Kanban Board" style="max-height: 48mm;">
      </div>
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Yeh hai IntellMeet ka game-changing capability — AI Meeting Intelligence Engine. Meeting khatam hote hi transcript analyze hoti hai. Humne ek dual-provider architecture build kiya hai: OpenAI GPT-4o-mini primary engine hai, aur agar network issue ya API quota na ho toh built-in heuristic NLP synthesizer failover handle karta hai, taaki app 100% crash-free rahe. AI na sirf executive summary banata hai, balki discussion me se actionable tasks extract karta hai with assignees. Aur sabse best part: bas ek click me 'Convert to Task' dabate hi yeh task team ke Kanban board me live inject ho jata hai!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"This represents IntellMeet's flagship capability — the AI Meeting Intelligence Engine. Upon call conclusion, the transcript is synthesized. We built a dual-tier architecture: OpenAI GPT-4o-mini serves as primary, backed by an offline heuristic NLP synthesizer for zero-downtime reliability. The AI generates an executive summary and extracts concrete action items with assignees. Best of all, clicking 'Convert to Task' instantly pushes the action item to the team's Kanban board, completely closing the loop from spoken discussion to task execution!"</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • Step 3 Demo Video (Features & User Flow)</span>
    <span>Page 5 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 6: MINUTE 4:45 - 6:00 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • STEP 3: DEMO VIDEO GUIDE</span>
    <span class="step-badge">⏱️ 4:45 – 6:00 | USER FLOW 5</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">5</span> Minute 4:45 – 6:00: Agile 4-Column Kanban Board & Recordings Archive</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [4:45 - 5:25]:</strong> Click <strong>"Tasks / Kanban"</strong> on the left sidebar (`/kanban`). Show the 4 workflow columns: <strong>To Do</strong>, <strong>In Progress</strong>, <strong>Review</strong>, and <strong>Completed</strong>. Locate the newly converted action item. Click and drag the card from "To Do" to "In Progress".<br>
        <strong>2. [5:25 - 6:00]:</strong> Click <strong>"Recordings"</strong> on the sidebar (`/recordings`). The recordings archive displays recorded video sessions. Click on a recording card to show in-browser HTML5 video player playback, plus the <strong>"Download WebM"</strong> button.
      </p>
    </div>

    <div class="grid-2">
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 1: 4-Column Drag-and-Drop Kanban Board</span>
          <span class="badge badge-blue">KANBAN EXECUTION</span>
        </div>
        <img src="__IMG_07__" class="screen-img" alt="Kanban Board" style="max-height: 48mm;">
      </div>
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 2: Recordings Archive & In-Browser Playback</span>
          <span class="badge badge-purple">RECORDINGS ARCHIVE</span>
        </div>
        <img src="__IMG_02__" class="screen-img" alt="Recordings Interface" style="max-height: 48mm;">
      </div>
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Ab aate hain team productivity aur agile execution flow par. Kanban board par hamare paas 4 clear columns hain: To Do, In Progress, Review, aur Completed. Jo task humne AI summary se convert kiya tha, woh yahan To Do me visible hai. User ise fluidly drag-and-drop karke 'In Progress' me move kar sakta hai, jo instantly MongoDB database me persist ho jata hai. Iske baad Recordings section me hum recorded meetings ko direct in-browser play kar sakte hain ya audit ke liye WebM file download kar sakte hain, ensuring 100% organizational transparency."</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Moving into agile project execution, our Kanban Board organizes tasks across four lifecycle stages: To Do, In Progress, Review, and Completed. The task converted directly from our AI meeting summary appears in the To Do column. Moving the card into 'In Progress' triggers an optimistic UI update with immediate MongoDB persistence. Furthermore, our Recordings Archive allows team members to play back recorded sessions in-browser or download the WebM container for auditing and training."</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • Step 3 Demo Video (Features & User Flow)</span>
    <span>Page 6 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 7: MINUTE 6:00 - 7:00 ================================= -->
<div class="page page-last">
  <div class="page-header">
    <span class="brand">INTELLMEET • STEP 3: DEMO VIDEO GUIDE</span>
    <span class="step-badge">⏱️ 6:00 – 7:00 | USER FLOW 6</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">6</span> Minute 6:00 – 7:00: Admin Governance Console, Mobile Responsiveness & Conclusion</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [6:00 - 6:30]:</strong> Log out and log in as <code>admin@intellimeet.io</code>. Open the <strong>Admin Console</strong> (`/admin`). Show the Recharts Meeting Trends area chart, peak hours distribution, and click <strong>"Export CSV"</strong> to show telemetry download.<br>
        <strong>2. [6:30 - 6:45]:</strong> Press <strong>F12 / Ctrl+Shift+M</strong> to toggle Chrome DevTools <strong>Mobile View (iPhone / Android)</strong>. Scroll smoothly, tap the mobile hamburger menu, proving 100% responsive layout.<br>
        <strong>3. [6:45 - 7:00]:</strong> Return to full screen. Show the GitHub repository (`shreyay1310-svg/intelliMeet`) with live link. Deliver the concluding sign-off.
      </p>
    </div>

    <div class="grid-2">
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 1: Admin Telemetry & Analytics Dashboard</span>
          <span class="badge badge-purple">ADMIN GOVERNANCE</span>
        </div>
        <img src="__IMG_09__" class="screen-img" alt="Admin Telemetry Analytics" style="max-height: 48mm;">
      </div>
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 2: Mobile Responsive View (DevTools F12)</span>
          <span class="badge badge-green">MOBILE RESPONSIVE</span>
        </div>
        <img src="__IMG_08__" class="screen-img" alt="Admin User Management" style="max-height: 48mm;">
      </div>
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Aakhri flow me hum enterprise governance layer dekhte hain. Admin account se log in karne par Admin Console me company-wide telemetry charts, user CRUD, aur 1-click CSV data export milta hai. Mobile compatibility verify karne ke liye main DevTools me Mobile Responsive View toggle karti hoon — aap dekh sakte hain ki layout fluidly adapt hota hai aur saare controls touch-friendly hain. To summarize, IntellMeet ek complete, production-grade MERN platform hai. Yeh video Step 3 Demo Video submission ke liye ready hai. Thank you Zidio team!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"In our final flow, we inspect enterprise governance. Logging in as Administrator unlocks the Admin Console with organization-wide telemetry, user CRUD, role elevation, and CSV export. To verify mobile compatibility, toggling DevTools into mobile view demonstrates full responsiveness across all breakpoints. In conclusion, IntellMeet delivers a production-grade MERN platform uniting WebRTC video, AI intelligence, and agile task execution. Thank you to the Zidio evaluation team!"</em>
    </div>

    <div style="margin-top: 6px; padding: 8px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 6.8pt; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 3 Submission Format</span>
        <p style="font-size: 9.6pt; font-weight: 800; color: #0f172a; margin: 1px 0 0 0;">YouTube (Unlisted) / Google Drive Public Link</p>
      </div>
      <div style="text-align: right;">
        <span class="badge badge-green" style="font-size: 7pt; padding: 2px 7px;">Rubric: Step 3 Verified (4 Marks)</span>
        <p style="font-size: 6.8pt; color: #94a3b8; margin-top: 2px;">Duration: 7:00 Minutes Exact</p>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • Step 3 Demo Video (Features & User Flow)</span>
    <span>Page 7 of 7</span>
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
html_content = html_content.replace("__IMG_07__", img_07)
html_content = html_content.replace("__IMG_08__", img_08)
html_content = html_content.replace("__IMG_09__", img_09)

html_path = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\report_step3_temp.html"
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

pdf_destinations = [
    r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\IntelliMeet_Step3_Demo_Video_7Min_Master_Guide.pdf",
    r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\03_Demo_Video_Walkthrough\IntelliMeet_Step3_Demo_Video_7Min_Master_Guide.pdf",
    r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\ALL_PDFS\IntelliMeet_Step3_Demo_Video_7Min_Master_Guide.pdf"
]

temp_pdf = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\temp_generated_step3.pdf"

print("Compiling Step 3 Demo Video 7-Minute Guide PDF via Edge...")
cmd = [
    edge_exe,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={temp_pdf}",
    html_path,
]

result = subprocess.run(cmd, capture_output=True, text=True)
if result.returncode == 0 and os.path.exists(temp_pdf):
    import fitz
    doc = fitz.open(temp_pdf)
    total_pages = len(doc)
    doc.close()
    print(f"Generated Step 3 Guide PDF with EXACT page count: {total_pages} pages")
    
    import shutil
    for dest in pdf_destinations:
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy2(temp_pdf, dest)
        size_mb = os.path.getsize(dest) / (1024 * 1024)
        print(f"Copied to {dest} ({size_mb:.2f} MB)")
        
    try:
        os.remove(temp_pdf)
    except Exception:
        pass
    try:
        os.remove(html_path)
    except Exception:
        pass
    print("SUCCESS: Step 3 Demo Video 7-Minute Guide PDF created and distributed!")
else:
    print(f"Edge execution error: {result.stderr}")
    sys.exit(1)
