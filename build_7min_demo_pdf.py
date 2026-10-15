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
<title>IntellMeet - 7-Minute Demo & Feedback Video Master Guide</title>
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

  .page-header .time-tag {
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
    background: linear-gradient(145deg, #090e1a 0%, #111827 40%, #0c2340 100%);
    color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(9, 14, 26, 0.4);
  }

  .cover-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(37, 99, 235, 0.3);
    border: 1px solid rgba(147, 197, 253, 0.45);
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 7.6pt;
    font-weight: 700;
    color: #93c5fd;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .cover-title {
    font-size: 32pt;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.08;
    margin: 12px 0 6px 0;
    letter-spacing: -0.025em;
  }

  .cover-title span {
    color: #38bdf8;
    background: linear-gradient(to right, #38bdf8, #818cf8);
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
    max-height: 60mm;
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
        ✦ ZIDIO FINAL SUBMISSION • 7-MINUTE LIVE DEMO & FEEDBACK VIDEO
      </div>
      <h1 class="cover-title">
        7-MINUTE <span>VIDEO SCRIPT</span> & INTERFACE GUIDE
      </h1>
      <p class="cover-tagline">
        Exact Spoken Script & Screen Action Synchronization Guide for IntelliMeet
      </p>
      <p class="cover-desc">
        Engineered specifically to satisfy <strong>Step 4: Feedback Video (4 Marks)</strong> and <strong>Step 5: Live Demo Requirements</strong>. 
        Provides an exact minute-by-minute spoken script (in both Hinglish and English) alongside precise 
        <strong>[SCREEN ACTIONS]</strong> indicating exactly which URL, button, and interface to showcase at each second.
      </p>
    </div>

    <div>
      <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 10px; padding: 10px 14px; margin-top: 10px;">
        <span style="font-size: 7pt; text-transform: uppercase; color: #38bdf8; font-weight: 800; letter-spacing: 0.05em;">7-Minute Timeline Master Breakdown</span>
        <table style="width: 100%; border-collapse: collapse; margin-top: 5px; font-size: 7.1pt; color: #f8fafc;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
              <th style="background: none; border: none; color: #93c5fd; width: 14%;">Timestamp</th>
              <th style="background: none; border: none; color: #93c5fd; width: 22%;">Segment Focus</th>
              <th style="background: none; border: none; color: #93c5fd; width: 34%;">On-Screen Interface to Show</th>
              <th style="background: none; border: none; color: #93c5fd; width: 30%;">Zidio Criteria Satisfied</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>0:00 – 1:00</strong></td><td>Hook & Public Live URL</td><td>Login Page, HTTPS Padlock, Demo Auto-Fill</td><td>Step 5: Public, HTTPS, No Sign-up</td></tr>
            <tr><td><strong>1:00 – 2:15</strong></td><td>Dashboard & Calendar</td><td>Employee Dashboard, KPI stats, Calendar .ics</td><td>Step 5: Core UI, Fast Load &lt;5s</td></tr>
            <tr><td><strong>2:15 – 3:45</strong></td><td>WebRTC Video Calling</td><td>Active Meeting Room, Screen Share, Chat Drawer</td><td>Step 5: Core Functionality Live Demo</td></tr>
            <tr><td><strong>3:45 – 5:00</strong></td><td>AI Summary & Kanban</td><td>AI Post-Meeting Summary, 4-Col Kanban Board</td><td>Step 5: Full Task Conversion Loop</td></tr>
            <tr><td><strong>5:00 – 6:00</strong></td><td>Admin & Mobile Layout</td><td>Admin Dashboard, Analytics, Mobile F12 View</td><td>Step 5: Mobile Responsive Check</td></tr>
            <tr><td><strong>6:00 – 7:00</strong></td><td>Learnings & Feedback</td><td>GitHub Repo, Architecture, Sign-Off</td><td>Step 4: Feedback & Reflection (4 Mks)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="cover-meta-grid">
        <div class="cover-meta-item">
          <span class="cover-meta-label">Presenter / Architect</span>
          <span class="cover-meta-value">Shreya Yadav (@harsadash)</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Live Production URL</span>
          <span class="cover-meta-value">https://intelli-meet-nine.vercel.app</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Demo Employee Account</span>
          <span class="cover-meta-value">employee@intellimeet.io • Password123!</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Demo Admin Account</span>
          <span class="cover-meta-value">admin@intellimeet.io • AdminPass123!</span>
        </div>
      </div>

      <div style="margin-top: 10px; display: flex; justify-content: space-between; font-size: 7pt; color: #94a3b8;">
        <span>Target Duration: 6:45 – 7:15 Minutes</span>
        <span>Resolution: 1080p FHD (1920x1080) • 60 FPS Preferred</span>
      </div>
    </div>
  </div>
</div>

<!-- ================================= PAGE 2: MINUTE 0:00 - 1:00 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • 7-MIN VIDEO GUIDE</span>
    <span class="time-tag">⏱️ 0:00 – 1:00 | PHASE 1</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">1</span> Minute 0:00 – 1:00: Hook, Public Live URL & Demo Login</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [0:00 - 0:15]:</strong> Start with browser open at <code>https://intelli-meet-nine.vercel.app</code>. Hover your mouse over the <strong>HTTPS padlock icon</strong> in the browser address bar to prove HTTPS enforcement.<br>
        <strong>2. [0:15 - 0:35]:</strong> Showcase the clean landing and authentication interface. Point to the tagline: <em>"Turn Meetings into Meaningful Outcomes."</em><br>
        <strong>3. [0:35 - 1:00]:</strong> Point out that users don't need tedious manual signup (Step 5 requirement). Click the <strong>"Demo Employee"</strong> quick-fill button, then click <strong>"Sign In"</strong>. Highlight that the page loads in under 2 seconds!
      </p>
    </div>

    <div class="screen-card">
      <div class="screen-card-header">
        <span class="screen-title">Interface to Show: Public Authentication Portal & HTTPS Live URL</span>
        <span class="badge badge-blue">STEP 5: HTTPS & NO SIGNUP</span>
      </div>
      <img src="__IMG_01__" class="screen-img" alt="Login Portal Screenshot">
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Namaste everyone! Mera naam Shreya Yadav hai, aur aaj main present karne ja rahi hoon <strong>IntellMeet</strong> — ek production-ready AI-Powered Enterprise Meeting aur Real-Time Collaboration Platform, jise maine Zidio Enterprise Track submission ke liye architect kiya hai. Sabse pehle, aap dekh sakte hain ki hamari application publicly accessible hai live production URL <strong>intelli-meet-nine.vercel.app</strong> par, with valid HTTPS SSL encryption. Zidio Live Demo requirements ke anusaar, evaluators ko tedious sign-up karne ki zarurat nahi hai — humne 1-click Demo credentials provide kiye hain. Chaliye Demo Employee select karke Sign In karte hain!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Hello everyone! My name is Shreya Yadav, and today I'm excited to present <strong>IntellMeet</strong> — an AI-Powered Enterprise Meeting and Real-Time Collaboration Platform built for the Zidio Enterprise Portfolio submission. As you can see, our application is fully deployed and publicly accessible at <strong>intelli-meet-nine.vercel.app</strong> with HTTPS SSL security. To fulfill the live demo guidelines, core functionality is immediately accessible without manual registration via 1-click demo accounts. Let's log in as an Employee!"</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • 7-Minute Video Master Teleprompter</span>
    <span>Page 2 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 3: MINUTE 1:00 - 2:15 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • 7-MIN VIDEO GUIDE</span>
    <span class="time-tag">⏱️ 1:00 – 2:15 | PHASE 2</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">2</span> Minute 1:00 – 2:15: Employee Dashboard & Calendar Scheduling</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [1:00 - 1:35]:</strong> Show the Employee Dashboard greeting banner <em>("Good morning, Shreya 👋")</em>. Move mouse across the 3 KPI stat cards: <strong>Total Meetings (24)</strong>, <strong>Upcoming (3)</strong>, and <strong>Active Tasks (8)</strong>. Show the weekly meeting insights Recharts graph.<br>
        <strong>2. [1:35 - 2:15]:</strong> Click <strong>"Calendar"</strong> on the left sidebar. The interactive calendar view opens (`/calendar`). Click on an upcoming meeting chip to display the popup modal. Click the <strong>"Download .ics"</strong> button and show the browser download bar confirming RFC-5545 calendar export.
      </p>
    </div>

    <div class="grid-2">
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 1: Employee Workspace Dashboard</span>
          <span class="badge badge-green">DASHBOARD</span>
        </div>
        <img src="__IMG_02__" class="screen-img" alt="Employee Dashboard" style="max-height: 48mm;">
      </div>
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 2: Calendar & .ICS Download</span>
          <span class="badge badge-blue">CALENDAR</span>
        </div>
        <img src="__IMG_05__" class="screen-img" alt="Interactive Calendar" style="max-height: 48mm;">
      </div>
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Login karte hi hum Employee Dashboard par enter hote hain. Top par personalized greeting banner hai jahan se instant meeting host ya join kar sakte hain. Niche real-time KPI metrics hain: Total Meetings, Pending Tasks, aur Hours Saved, saath hi Recharts weekly trends graph. Ab left sidebar se <strong>Calendar</strong> module open karte hain. Yahan employees apne scheduled sessions dekh sakte hain. Sabse badiya feature yeh hai ki single click me standard <strong>.ics calendar file</strong> download ho jaati hai, jisse aap Google Calendar, Outlook ya Apple Calendar ke saath instant sync kar sakte hain!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Upon authentication, we land on the Employee Dashboard. The top banner offers instant meeting actions, followed by real-time KPI cards for meeting counts and active tasks, plus an interactive Recharts analytics chart. Moving to the <strong>Calendar</strong> module, employees can visualize upcoming sessions in week or month views. Clicking any event allows downloading an RFC-5545 compliant <strong>.ics calendar invite</strong>, enabling one-click synchronization with Google Calendar, Microsoft Outlook, and Apple Calendar."</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • 7-Minute Video Master Teleprompter</span>
    <span>Page 3 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 4: MINUTE 2:15 - 3:45 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • 7-MIN VIDEO GUIDE</span>
    <span class="time-tag">⏱️ 2:15 – 3:45 | PHASE 3</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">3</span> Minute 2:15 – 3:45: Real-Time WebRTC Video Conferencing & HUD</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [2:15 - 2:40]:</strong> Click <strong>"+ New Meeting"</strong> or join an active room (`/meeting/demo-room-101`). Allow camera/mic permissions. Dynamic video grid renders with camera stream.<br>
        <strong>2. [2:40 - 3:15]:</strong> Test floating HUD controls: Click <strong>Mute Microphone</strong> (icon turns red), Click <strong>Toggle Camera</strong> (video placeholder shows), and Click <strong>"Share Screen"</strong> (open window select modal). Point to the live call duration timer (e.g., <code>04:22</code>).<br>
        <strong>3. [3:15 - 3:45]:</strong> Click the <strong>Chat Icon</strong> to open the right-side Collaboration Drawer. Type <em>"Welcome to our live sprint review!"</em> and press Enter. Point to the participant roster.
      </p>
    </div>

    <div class="screen-card">
      <div class="screen-card-header">
        <span class="screen-title">Interface to Show: Active WebRTC Conference Room with Screen Share & Chat Drawer</span>
        <span class="badge badge-purple">WEBRTC & SOCKET.IO</span>
      </div>
      <img src="__IMG_03__" class="screen-img" alt="WebRTC Meeting Room" style="max-height: 52mm;">
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Ab aate hain core conferencing engine par. 'New Meeting' click karte hi room ID generate hoti hai aur low-latency WebRTC peer connection initiate ho jata hai over Socket.io signaling. Niche floating HUD me full controls hain: mic mute/unmute, camera toggle, aur high-definition 1080p Screen Sharing bina kisi lag ke. Sath me native MediaRecorder se session recording bhi available hai. Right side me collaboration drawer hai jahan live participants list aur real-time chat box hai, jisse meeting ke dauran uninterrupted text messaging ho sakti hai."</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Now let's examine our core real-time conferencing engine. Launching a meeting initiates an ultra-low-latency WebRTC PeerConnection orchestrated by our Socket.io signaling server. The floating bottom HUD provides instant hardware controls: microphone mute, camera toggle, session recording via the MediaRecorder API, and full 1080p screen sharing. The sliding right-hand collaboration drawer provides live room chat and participant presence without disrupting the active video grid."</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • 7-Minute Video Master Teleprompter</span>
    <span>Page 4 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 5: MINUTE 3:45 - 5:00 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • 7-MIN VIDEO GUIDE</span>
    <span class="time-tag">⏱️ 3:45 – 5:00 | PHASE 4</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">4</span> Minute 3:45 – 5:00: AI Meeting Intelligence & 4-Column Kanban Board</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [3:45 - 4:25]:</strong> Click <strong>"Leave / End Meeting"</strong>. The AI Meeting Summary page loads (`/summary/:id`). Highlight the <strong>Executive Summary</strong>, <strong>Key Decisions</strong>, and the <strong>Extracted Action Items</strong> with assignee tags and priority badges.<br>
        <strong>2. [4:25 - 4:40]:</strong> Click the green <strong>"Convert to Task"</strong> button next to an action item. A toast notification confirms: <em>"Task successfully added to Kanban board!"</em><br>
        <strong>3. [4:40 - 5:00]:</strong> Click <strong>"Kanban Board"</strong> on the sidebar (`/kanban`). Show the 4 columns: <strong>To Do</strong>, <strong>In Progress</strong>, <strong>Review</strong>, <strong>Completed</strong>. Drag the newly created card from "To Do" to "In Progress".
      </p>
    </div>

    <div class="grid-2">
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 1: AI Executive Summary & Action Items</span>
          <span class="badge badge-purple">DUAL AI ENGINE</span>
        </div>
        <img src="__IMG_04__" class="screen-img" alt="AI Summary Screen" style="max-height: 48mm;">
      </div>
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 2: 4-Column Drag-and-Drop Kanban Board</span>
          <span class="badge badge-green">KANBAN TASKS</span>
        </div>
        <img src="__IMG_07__" class="screen-img" alt="Kanban Board" style="max-height: 48mm;">
      </div>
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Ab IntellMeet ka sabse revolutionary feature dekhte hain — hamara AI Meeting Intelligence Engine. Meeting end hote hi transcript synthesize hoti hai. Agar OpenAI API key available hai toh GPT-4o-mini executive summary banata hai, aur agar offline ya key na ho toh hamara built-in heuristic NLP engine failover handle karta hai. Yahan summary ke saath identified action items hain. Jab main <strong>'Convert to Task'</strong> click karti hoon, yeh item directly hamare <strong>4-Column Kanban Board</strong> me inject ho jata hai! Chaliye card ko drag karke 'In Progress' me daalte hain — instant database synchronization!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Now let's explore our flagship capability — the AI Meeting Intelligence Engine. Upon call termination, the transcript is synthesized. We engineered a dual-AI architecture: OpenAI GPT-4o-mini acts as primary, backed by a deterministic heuristic NLP synthesizer for offline resiliency. The AI extracts executive takeaways and concrete action items with assignees. Clicking <strong>'Convert to Task'</strong> immediately synchronizes the item to our <strong>4-Column Kanban Board</strong>, completing the loop from spoken discussion to agile execution!"</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • 7-Minute Video Master Teleprompter</span>
    <span>Page 5 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 6: MINUTE 5:00 - 6:00 ================================= -->
<div class="page">
  <div class="page-header">
    <span class="brand">INTELLMEET • 7-MIN VIDEO GUIDE</span>
    <span class="time-tag">⏱️ 5:00 – 6:00 | PHASE 5</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">5</span> Minute 5:00 – 6:00: Admin Governance, Telemetry & Mobile Test</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [5:00 - 5:35]:</strong> Click user avatar -> Log out. Log in with <code>admin@intellimeet.io</code>. Open the Admin Console (`/admin`). Show the 4 KPI cards (Total Users, Active Rooms, System Health 99.9%). Point out the Recharts Meeting Trends and Peak Hours charts. Click <strong>"Export CSV"</strong> to show telemetry download.<br>
        <strong>2. [5:35 - 6:00]:</strong> Press <strong>F12 / Ctrl+Shift+I</strong> to open DevTools. Toggle <strong>Device Toolbar (Mobile View - iPhone 14 / Pixel)</strong>. Scroll smoothly, tap the hamburger menu to show the collapsed mobile drawer, verifying 100% mobile responsiveness (Step 5 requirement)!
      </p>
    </div>

    <div class="grid-2">
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 1: Admin Governance & Telemetry Analytics</span>
          <span class="badge badge-purple">ADMIN PORTAL</span>
        </div>
        <img src="__IMG_09__" class="screen-img" alt="Admin Telemetry Analytics" style="max-height: 48mm;">
      </div>
      <div class="screen-card">
        <div class="screen-card-header">
          <span class="screen-title">Interface 2: Mobile Responsive View (DevTools F12)</span>
          <span class="badge badge-green">STEP 5: MOBILE TEST</span>
        </div>
        <img src="__IMG_08__" class="screen-img" alt="Admin Management Dashboard" style="max-height: 48mm;">
      </div>
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT (Hinglish - Natural & Fluent):</div>
      <em>"Ab enterprise administration layer dekhte hain. Admin account se log in karne par Admin Governance Console open hota hai. Yahan se organization-wide user management, role elevation (Member se Admin), aur Recharts telemetry charts dekh sakte hain, saath hi 1-click CSV telemetry export bhi supported hai. Ab Zidio Step 5 requirement ko verify karne ke liye main DevTools me <strong>Mobile Responsive View</strong> toggle karti hoon. Aap dekh sakte hain ki layout fluidly adapt hota hai, sidebar cleanly drawer me collapse hoti hai, aur mobile screen par bhi audio/video controls 100% accessible hain!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT (English Alternative):</div>
      <em>"Now let's examine the administrative governance tier. Logging in as an Administrator unlocks the Admin Console, featuring user CRUD, role elevation, and rich Recharts telemetry tracking meeting volume and peak hours, complete with 1-click CSV exports. To verify Zidio's mobile responsiveness requirement, I'll toggle Chrome DevTools into mobile simulation. Notice how the layout fluidly reflows, the sidebar becomes a responsive drawer, and video controls remain thumb-friendly on smaller viewports."</em>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • 7-Minute Video Master Teleprompter</span>
    <span>Page 6 of 7</span>
  </div>
</div>

<!-- ================================= PAGE 7: MINUTE 6:00 - 7:00 ================================= -->
<div class="page page-last">
  <div class="page-header">
    <span class="brand">INTELLMEET • 7-MIN VIDEO GUIDE</span>
    <span class="time-tag">⏱️ 6:00 – 7:00 | PHASE 6</span>
  </div>

  <div class="page-body">
    <h2><span class="step-box">6</span> Minute 6:00 – 7:00: Step 4 Feedback Video & Personal Reflection</h2>

    <div class="card-action">
      <div class="title">🖥️ EXACT SCREEN ACTION (Kis Point Par Kya Interface Dikhana Hai):</div>
      <p style="font-size: 7.4pt; margin: 0; color: #14532d;">
        <strong>1. [6:00 - 6:20]:</strong> Close DevTools. Return browser to the GitHub repository (<code>shreyay1310-svg/intelliMeet</code>) or the main dashboard.<br>
        <strong>2. [6:20 - 6:50]:</strong> Switch to webcam / full screen (or show README badges & commit history) to deliver the heartfelt Step 4 reflection on <strong>Learnings</strong>, <strong>Challenges</strong>, and <strong>Key Takeaways</strong>.<br>
        <strong>3. [6:50 - 7:00]:</strong> Thank the Zidio mentorship team and mentors with a confident concluding smile.
      </p>
    </div>

    <div class="grid-3" style="margin: 4px 0 6px 0;">
      <div class="card">
        <span class="badge badge-blue">What I Learned</span>
        <h4 style="margin-top: 3px;">Full-Stack Mastery</h4>
        <p style="font-size: 7.1pt; margin: 0;">Mastered WebRTC peer handshakes, Socket.io signaling, dual AI fallback design, and production monorepo TypeScript.</p>
      </div>
      <div class="card">
        <span class="badge badge-amber">Challenges Solved</span>
        <h4 style="margin-top: 3px;">Real-Time Engineering</h4>
        <p style="font-size: 7.1pt; margin: 0;">Solved ICE candidate race conditions with buffering queues, and prevented AI outages with local heuristic synthesizers.</p>
      </div>
      <div class="card">
        <span class="badge badge-green">Key Takeaway</span>
        <h4 style="margin-top: 3px;">Production Mindset</h4>
        <p style="font-size: 7.1pt; margin: 0;">Shifted from building toy demo apps to shipping secure, resilient, cloud-deployed enterprise platforms on Vercel & Render.</p>
      </div>
    </div>

    <div class="card-speech-hi">
      <div class="speech-label-hi">🗣️ SPOKEN SCRIPT — STEP 4 FEEDBACK VIDEO (Hinglish):</div>
      <em>"Finally, aate hain **Step 4: Personal Reflection aur Feedback** par. Is project ke dauran meri sabse badi learning WebRTC peer-to-peer protocols aur fault-tolerant AI pipelines ko design karna rahi. Sabse bada challenge tha ICE candidates ka race condition, jise maine queueing buffer implement karke solve kiya. Saath hi dual AI fallback ne hume 100% zero-crash reliability di. Is internship track ne mujhe ek true Full-Stack Architect ka perspective diya — kaise modular clean architecture, OWASP security, aur cloud deployment ko balance kiya jata hai. Zidio Development team aur mere mentors ka tahe dil se shukriya. Thank you so much!"</em>
    </div>

    <div class="card-speech">
      <div class="speech-label">🗣️ SPOKEN SCRIPT — STEP 4 FEEDBACK VIDEO (English):</div>
      <em>"Finally, addressing **Step 4: Personal Reflection and Feedback**. Designing IntellMeet elevated my understanding of distributed real-time protocols and resilient AI systems. Overcoming the WebRTC ICE candidate race condition using asynchronous queueing buffers and building an offline heuristic fallback taught me defensive engineering. This Zidio program transformed how I build software — emphasizing security, scalability, and polished user experience. A huge thank you to the Zidio evaluation team and mentors for this invaluable learning experience!"</em>
    </div>

    <div style="margin-top: 6px; padding: 8px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 6.8pt; color: #64748b; font-weight: 700; text-transform: uppercase;">Lead Full-Stack Architect Sign-Off</span>
        <p style="font-size: 9.6pt; font-weight: 800; color: #0f172a; margin: 1px 0 0 0;">Shreya Yadav (@harsadash)</p>
      </div>
      <div style="text-align: right;">
        <span class="badge badge-green" style="font-size: 7pt; padding: 2px 7px;">Status: Step 4 & 5 Verified</span>
        <p style="font-size: 6.8pt; color: #94a3b8; margin-top: 2px;">Duration: 7:00 Minutes Exact</p>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span class="lead">IntellMeet • 7-Minute Video Master Teleprompter</span>
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

html_path = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\report_7min_temp.html"
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

pdf_destinations = [
    r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\IntelliMeet_7Min_Demo_And_Feedback_Video_Guide.pdf",
    r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\03_Demo_Video_Walkthrough\IntelliMeet_7Min_Demo_And_Feedback_Video_Guide.pdf",
    r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\04_Feedback_Video\IntelliMeet_7Min_Demo_And_Feedback_Video_Guide.pdf",
    r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\Zidio_Submission_Package\ALL_PDFS\IntelliMeet_7Min_Demo_And_Feedback_Video_Guide.pdf"
]

temp_pdf = r"c:\Users\shrey\OneDrive\Desktop\intelliMeet\temp_generated_7min.pdf"

print("Compiling 7-minute guide PDF via Edge...")
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
    print(f"Generated 7-Minute Guide PDF with EXACT page count: {total_pages} pages")
    
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
    print("SUCCESS: 7-Minute Master Guide PDF created and distributed!")
else:
    print(f"Edge execution error: {result.stderr}")
    sys.exit(1)
