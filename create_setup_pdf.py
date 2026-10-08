#!/usr/bin/env python3
"""
Generate a professional, publication-quality Setup & Deployment Guide PDF for IntellMeet.
"""

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)
from reportlab.lib.colors import HexColor

# ── Color Palette ─────────────────────────────────────────────────────────────
C_PRIMARY = HexColor("#1E3A8A")    # Deep Navy
C_ACCENT  = HexColor("#2563EB")    # Royal Blue
C_TEXT    = HexColor("#1E293B")    # Slate 800
C_MUTED   = HexColor("#64748B")    # Slate 500
C_BG_BOX  = HexColor("#F8FAFC")    # Slate 50
C_BORDER  = HexColor("#CBD5E1")    # Slate 300
C_SUCCESS = HexColor("#059669")    # Emerald Green
C_SUCCESS_BG = HexColor("#ECFDF5")
C_WARN    = HexColor("#D97706")    # Amber
C_WARN_BG = HexColor("#FFFBEB")

def build_pdf(filename="IntelliMeet_Setup_Deployment_Guide.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=C_PRIMARY,
        alignment=TA_LEFT
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=C_MUTED,
        alignment=TA_LEFT
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=C_PRIMARY,
        spaceBefore=10,
        spaceAfter=4
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=C_ACCENT,
        spaceBefore=6,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=C_TEXT,
        alignment=TA_LEFT,
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=HexColor("#0F172A"),
        spaceAfter=0
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    table_body = ParagraphStyle(
        'TableBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=C_TEXT
    )

    story = []

    # Header / Title Block
    story.append(Paragraph("IntellMeet — Full-Stack Setup & Deployment Master Guide", title_style))
    story.append(Paragraph("Complete Walkthrough: Backend Server, MongoDB Database, API Connectivity, Live Deployment (Vercel & Render) & Troubleshooting", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT, spaceBefore=6, spaceAfter=8))

    # Meta Quick Info Box
    meta_data = [
        [
            Paragraph("<b>Project:</b> IntellMeet (MERN + WebRTC + AI)", body_style),
            Paragraph("<b>Live Frontend:</b> <font color='#2563EB'><u>https://intelli-meet-nine.vercel.app</u></font>", body_style)
        ],
        [
            Paragraph("<b>Repository:</b> github.com/shreyay1310-svg/intelliMeet", body_style),
            Paragraph("<b>Render Deploy Blueprint:</b> 1-Click via render.yaml", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[240, 280])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_BG_BOX),
        ('BOX', (0,0), (-1,-1), 1, C_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 8))

    # 1. Architecture Overview
    story.append(Paragraph("1. System Architecture & Real-Time Connectivity", h1_style))
    story.append(Paragraph(
        "IntellMeet is an enterprise meeting and collaboration suite built with a modern MERN stack. "
        "The application is bifurcated into an independent frontend single-page application (React 18 + Vite) "
        "and a scalable, event-driven Node.js backend with persistent WebSocket signaling for WebRTC peer connections.",
        body_style
    ))

    arch_data = [
        [Paragraph("Layer", table_header), Paragraph("Technology", table_header), Paragraph("Deployment Host", table_header), Paragraph("Role & Connectivity", table_header)],
        [
            Paragraph("<b>Frontend</b>", table_body),
            Paragraph("React 18, Vite, TypeScript, Tailwind", table_body),
            Paragraph("<b>Vercel</b> (Edge CDN)", table_body),
            Paragraph("Serves UI, connects via HTTP REST to <i>/api</i> and Socket.io for WebRTC signaling.", table_body)
        ],
        [
            Paragraph("<b>Backend</b>", table_body),
            Paragraph("Node.js, Express, TypeScript, Socket.io", table_body),
            Paragraph("<b>Render.com</b> (Web Service)", table_body),
            Paragraph("REST endpoints, JWT verification, real-time room signaling, and AI summarization engine.", table_body)
        ],
        [
            Paragraph("<b>Database</b>", table_body),
            Paragraph("MongoDB Atlas Cloud / Local 7.0", table_body),
            Paragraph("<b>MongoDB Cloud</b> (M0 Free)", table_body),
            Paragraph("NoSQL document storage for Users, Meetings, Action Items, Transcripts, and Audit Logs.", table_body)
        ]
    ]
    t_arch = Table(arch_data, colWidths=[65, 140, 105, 210])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_PRIMARY),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, C_BG_BOX]),
        ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 8))

    # 2. Database Decisions & Guidance
    story.append(Paragraph("2. Database Configuration: MongoDB vs SQL Server (SSMS)", h1_style))
    story.append(Paragraph(
        "<b>Should you switch the database to SQL Server (SSMS)?</b><br/>"
        "<b>Answer: NO.</b> Migrating to SQL Server is strongly discouraged for this project due to the following technical constraints:",
        body_style
    ))

    db_reasons = [
        "<b>Mongoose ODM Architecture:</b> All models (<i>User.ts, Meeting.ts, Task.ts, Summary.ts, Transcript.ts</i>) use Mongoose schemas. Mongoose cannot communicate with Microsoft SQL Server; moving would require rewriting the entire backend in TypeORM/Prisma with custom relational SQL queries.",
        "<b>Hierarchical Data Models:</b> Meeting rooms store dynamic participant arrays, live chat streams, and AI action bullets. In MongoDB, these are cleanly persisted as nested JSON subdocuments. In SQL Server, it would require 8+ relational tables and expensive multi-table JOINs.",
        "<b>Cloud Hosting & Cost:</b> MongoDB Atlas provides a 100% free lifetime cloud tier (M0) that seamlessly links with Render and Vercel. Hosting a dedicated MS SQL Server instance on the cloud is expensive and non-trivial on free-tier platforms.",
        "<b>Visual Management Alternative:</b> If you desire a graphical studio interface identical to SQL Server Management Studio (SSMS), install <b>MongoDB Compass</b>. It provides visual schemas, live document editors, and index inspection."
    ]
    for r in db_reasons:
        story.append(Paragraph(f"• {r}", body_style))
    story.append(Spacer(1, 8))

    # 3. Step-by-Step Production Deployment
    story.append(Paragraph("3. Live Production Deployment: Vercel + Render", h1_style))
    story.append(Paragraph(
        "Because Socket.io requires a persistent TCP connection for WebRTC signaling, Vercel Serverless functions cannot host the backend. "
        "The optimal production architecture is: <b>Vercel for Frontend</b> and <b>Render for Backend</b>.",
        body_style
    ))

    story.append(Paragraph("Part A: Frontend Deployment on Vercel", h2_style))
    story.append(Paragraph(
        "• <b>Active Production Link:</b> <font color='#2563EB'><u>https://intelli-meet-nine.vercel.app</u></font><br/>"
        "• <b>Status:</b> Deployed and auto-synced with the GitHub repository <code>shreyay1310-svg/intelliMeet</code>.<br/>"
        "• <b>Vercel Settings:</b> Root Directory = <code>client</code> | Framework = <code>Vite</code> | Output = <code>dist</code>.",
        body_style
    ))

    story.append(Paragraph("Part B: 1-Click Backend Deployment on Render (Automated via Blueprint)", h2_style))
    story.append(Paragraph(
        "We configured and pushed an automated <code>render.yaml</code> Blueprint to your repository. You do not need to configure build scripts manually:",
        body_style
    ))

    render_steps = [
        "1. Open the Direct Deploy Link: <b>https://render.com/deploy?repo=https://github.com/shreyay1310-svg/intelliMeet</b>",
        "2. Sign in with GitHub and authorize repository access.",
        "3. Render automatically parses <code>render.yaml</code>, setting Service = <i>intellimeet-api</i>, Root = <i>server</i>, Build = <i>npm install && npm run build</i>, and Start = <i>npm run start</i>.",
        "4. Click <b>'Apply'</b>. Render will provision the container and provide your live backend URL (e.g., <code>https://intellimeet-api.onrender.com</code>).",
        "5. Go to Vercel -> Project Settings -> <b>Environment Variables</b> -> Add <code>VITE_API_URL = https://intellimeet-api.onrender.com</code> and click <b>Redeploy</b>."
    ]
    for s in render_steps:
        story.append(Paragraph(s, body_style))
    story.append(Spacer(1, 8))

    # Page Break for clean reading
    story.append(PageBreak())

    # 4. Troubleshooting & Issues Resolved Today
    story.append(Paragraph("4. Diagnostic & Troubleshooting Log (Issues Solved Today)", h1_style))
    story.append(Paragraph(
        "During setup, four distinct runtime and environment blockers were systematically diagnosed and resolved:",
        body_style
    ))

    issues_data = [
        [Paragraph("Symptom / Error", table_header), Paragraph("Root Cause Identified", table_header), Paragraph("Resolution Applied", table_header)],
        [
            Paragraph("<b>Error: Unexpected end of JSON input</b>", table_body),
            Paragraph("Frontend called <i>/api/auth/register</i> on Vercel where no backend was running, returning an empty HTML 404.", table_body),
            Paragraph("Refactored <code>client/src/services/api.ts</code> to dynamically read <code>VITE_API_URL</code> with robust non-JSON fallback and error reporting.", table_body)
        ],
        [
            Paragraph("<b>Error: Request failed with status 500</b>", table_body),
            Paragraph("MongoDB Atlas authentication failure: <code>bad auth (code: 8000)</code> caused by angle brackets <code>&lt; &gt;</code> around password in <code>MONGO_URI</code>.", table_body),
            Paragraph("Sanitized connection string format in <code>server/.env</code>. Guided Atlas password reset and IP whitelist (0.0.0.0/0).", table_body)
        ],
        [
            Paragraph("<b>fatal: index.lock exists & refspec main does not match</b>", table_body),
            Paragraph("PowerShell session was positioned in user home folder <code>C:\\Users\\shreya</code> rather than workspace root.", table_body),
            Paragraph("Navigated to <code>C:\\Users\\shreya\\OneDrive\\Desktop\\intelliMeet</code>, added Git to PATH, committed, and successfully pushed to origin.", table_body)
        ],
        [
            Paragraph("<b>npm error ENOSPC: no space left on device</b>", table_body),
            Paragraph("System C: drive was at 100% capacity (0 MB free space), causing child process crashes (<code>EPERM</code>) and build failures.", table_body),
            Paragraph("Cleaned 1.67 GB of cached temporary build files to restore operating system stability and allow compilation.", table_body)
        ]
    ]
    t_issues = Table(issues_data, colWidths=[120, 185, 215])
    t_issues.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_PRIMARY),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, C_BG_BOX]),
        ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_issues)
    story.append(Spacer(1, 8))

    # 5. Local Execution Cheat-Sheet
    story.append(Paragraph("5. Local Development Execution Guide", h1_style))
    story.append(Paragraph("To run the full stack simultaneously on your local computer:", body_style))

    commands = [
        ("Step 1: Start Backend (Port 5000)", "cd server && npm run dev"),
        ("Step 2: Start Frontend (Port 5173)", "cd client && npm run dev"),
        ("Or Start Both Together from Root", "npm run dev")
    ]
    cmd_data = [[Paragraph("Action", table_header), Paragraph("Terminal Command", table_header)]]
    for action, cmd in commands:
        cmd_data.append([Paragraph(f"<b>{action}</b>", table_body), Paragraph(f"<code>{cmd}</code>", code_style)])
    
    t_cmd = Table(cmd_data, colWidths=[200, 320])
    t_cmd.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_PRIMARY),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, C_BG_BOX]),
        ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_cmd)
    story.append(Spacer(1, 8))

    # 6. Default Demo Credentials
    story.append(Paragraph("6. Pre-Seeded Workspace Credentials", h1_style))
    story.append(Paragraph("The platform automatically provisions verified seed credentials for instant evaluation:", body_style))

    cred_data = [
        [Paragraph("Role", table_header), Paragraph("Email", table_header), Paragraph("Password", table_header), Paragraph("Designation & Team", table_header)],
        [Paragraph("<b>Employee</b>", table_body), Paragraph("shreya@zidio.in", table_body), Paragraph("Password123!", code_style), Paragraph("Product Designer, Product Team", table_body)],
        [Paragraph("<b>Administrator</b>", table_body), Paragraph("admin@zidio.in", table_body), Paragraph("Password123!", code_style), Paragraph("Enterprise Admin, Executive Team", table_body)]
    ]
    t_cred = Table(cred_data, colWidths=[80, 140, 110, 190])
    t_cred.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_PRIMARY),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, C_BG_BOX]),
        ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_cred)
    story.append(Spacer(1, 12))

    # Footer Notice
    footer_text = (
        "<i>IntellMeet Documentation & Installation Blueprint | Generated automatically for Shreya Yadav | "
        "Repository: https://github.com/shreyay1310-svg/intelliMeet</i>"
    )
    story.append(Paragraph(footer_text, subtitle_style))

    doc.build(story)
    print(f"PDF generated successfully: {filename}")

if __name__ == "__main__":
    build_pdf()
