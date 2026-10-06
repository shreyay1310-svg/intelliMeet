#!/usr/bin/env python3
"""
IntelliMeet - Member 2 (Backend) Installation Guide PDF Generator
Generates a professional PDF with clickable hyperlinks.
"""

import os
import sys

def install_if_missing(package):
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", package, "--quiet"])

try:
    from reportlab.lib.pagesizes import A4
    from reportlab.lib import colors
    from reportlab.lib.units import cm, mm
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
    from reportlab.platypus import (
        SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
        HRFlowable, KeepTogether
    )
    from reportlab.platypus.flowables import HRFlowable
    from reportlab.graphics.shapes import Drawing, Rect, String
    from reportlab.graphics import renderPDF
    from reportlab.lib.colors import HexColor
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
except ImportError:
    print("Installing reportlab...")
    install_if_missing("reportlab")
    from reportlab.lib.pagesizes import A4
    from reportlab.lib import colors
    from reportlab.lib.units import cm, mm
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
    from reportlab.platypus import (
        SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
        HRFlowable, KeepTogether
    )
    from reportlab.lib.colors import HexColor
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont

# ── Color Palette ──────────────────────────────────────────────────────────────
C_NAVY       = HexColor("#0F172A")   # dark headings
C_BLUE       = HexColor("#2563EB")   # primary blue
C_BLUE_LIGHT = HexColor("#DBEAFE")   # blue tint bg
C_INDIGO     = HexColor("#4F46E5")   # accent
C_GREEN      = HexColor("#059669")   # success / optional
C_GREEN_LIGHT= HexColor("#D1FAE5")
C_AMBER      = HexColor("#D97706")   # warning
C_AMBER_LIGHT= HexColor("#FEF3C7")
C_PURPLE     = HexColor("#7C3AED")
C_PURPLE_LIGHT=HexColor("#EDE9FE")
C_SLATE_50   = HexColor("#F8FAFC")
C_SLATE_100  = HexColor("#F1F5F9")
C_SLATE_200  = HexColor("#E2E8F0")
C_SLATE_500  = HexColor("#64748B")
C_SLATE_700  = HexColor("#334155")
C_WHITE      = HexColor("#FFFFFF")
C_GRAD1      = HexColor("#0F172A")   # header gradient start
C_GRAD2      = HexColor("#1E3A5F")   # header gradient end

PAGE_W, PAGE_H = A4
MARGIN_L = 2.0 * cm
MARGIN_R = 2.0 * cm
MARGIN_T = 1.5 * cm
MARGIN_B = 2.0 * cm
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

# ── Styles ─────────────────────────────────────────────────────────────────────
def build_styles():
    base = getSampleStyleSheet()

    styles = {
        "doc_title": ParagraphStyle(
            "doc_title",
            fontName="Helvetica-Bold",
            fontSize=22,
            textColor=C_WHITE,
            leading=28,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "doc_subtitle": ParagraphStyle(
            "doc_subtitle",
            fontName="Helvetica",
            fontSize=10,
            textColor=HexColor("#94A3B8"),
            leading=14,
            alignment=TA_CENTER,
        ),
        "doc_meta": ParagraphStyle(
            "doc_meta",
            fontName="Helvetica",
            fontSize=8,
            textColor=HexColor("#64748B"),
            leading=12,
            alignment=TA_CENTER,
        ),
        "section_title": ParagraphStyle(
            "section_title",
            fontName="Helvetica-Bold",
            fontSize=13,
            textColor=C_NAVY,
            leading=18,
            spaceBefore=14,
            spaceAfter=6,
        ),
        "step_heading": ParagraphStyle(
            "step_heading",
            fontName="Helvetica-Bold",
            fontSize=11,
            textColor=C_BLUE,
            leading=16,
            spaceBefore=10,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "body",
            fontName="Helvetica",
            fontSize=9,
            textColor=C_SLATE_700,
            leading=14,
            spaceAfter=4,
        ),
        "body_bold": ParagraphStyle(
            "body_bold",
            fontName="Helvetica-Bold",
            fontSize=9,
            textColor=C_NAVY,
            leading=14,
            spaceAfter=3,
        ),
        "code": ParagraphStyle(
            "code",
            fontName="Courier",
            fontSize=8.5,
            textColor=HexColor("#1E3A5F"),
            leading=13,
            leftIndent=10,
            spaceAfter=2,
        ),
        "note": ParagraphStyle(
            "note",
            fontName="Helvetica-Oblique",
            fontSize=8.5,
            textColor=C_AMBER,
            leading=13,
            leftIndent=8,
            spaceAfter=4,
        ),
        "tip": ParagraphStyle(
            "tip",
            fontName="Helvetica",
            fontSize=8.5,
            textColor=C_GREEN,
            leading=13,
            leftIndent=8,
            spaceAfter=4,
        ),
        "table_header": ParagraphStyle(
            "table_header",
            fontName="Helvetica-Bold",
            fontSize=8.5,
            textColor=C_WHITE,
            leading=12,
            alignment=TA_CENTER,
        ),
        "table_cell": ParagraphStyle(
            "table_cell",
            fontName="Helvetica",
            fontSize=8.5,
            textColor=C_NAVY,
            leading=12,
        ),
        "table_cell_code": ParagraphStyle(
            "table_cell_code",
            fontName="Courier-Bold",
            fontSize=8,
            textColor=C_BLUE,
            leading=12,
        ),
        "link": ParagraphStyle(
            "link",
            fontName="Helvetica",
            fontSize=8.5,
            textColor=C_BLUE,
            leading=13,
        ),
        "footer": ParagraphStyle(
            "footer",
            fontName="Helvetica",
            fontSize=7.5,
            textColor=C_SLATE_500,
            leading=11,
            alignment=TA_CENTER,
        ),
        "tag": ParagraphStyle(
            "tag",
            fontName="Helvetica-Bold",
            fontSize=7.5,
            textColor=C_WHITE,
            leading=11,
            alignment=TA_CENTER,
        ),
    }
    return styles


# ── Helper: Code block ─────────────────────────────────────────────────────────
def code_block(lines, styles, title=None):
    elements = []
    block_rows = []
    if title:
        block_rows.append([Paragraph(f"<b>{title}</b>", styles["body_bold"])])

    code_lines = [Paragraph(f'<font name="Courier" size="8.5" color="#1E40AF">{line}</font>', styles["code"]) for line in lines]

    bg_table = Table(
        [[p] for p in code_lines],
        colWidths=[CONTENT_W - 0.4*cm],
    )
    bg_table.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, -1), HexColor("#EFF6FF")),
        ("LEFTPADDING",  (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING",   (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 6),
        ("ROUNDEDCORNERS", [6]),
        ("BOX",          (0, 0), (-1, -1), 0.5, HexColor("#BFDBFE")),
    ]))
    elements.append(Spacer(1, 4))
    if title:
        header = Table([[Paragraph(f"  {title}", styles["body_bold"])]], colWidths=[CONTENT_W - 0.4*cm])
        header.setStyle(TableStyle([
            ("BACKGROUND",   (0, 0), (-1, -1), HexColor("#BFDBFE")),
            ("LEFTPADDING",  (0, 0), (-1, -1), 8),
            ("TOPPADDING",   (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
        ]))
        elements.append(header)
    elements.append(bg_table)
    elements.append(Spacer(1, 4))
    return elements


# ── Helper: Info box ───────────────────────────────────────────────────────────
def info_box(text, styles, bg=None, border=None, icon="💡"):
    bg = bg or C_AMBER_LIGHT
    border = border or C_AMBER
    t = Table(
        [[Paragraph(f"{icon}  {text}", styles["body"])]],
        colWidths=[CONTENT_W - 0.4*cm],
    )
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), bg),
        ("LEFTPADDING",   (0, 0), (-1, -1), 12),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 12),
        ("TOPPADDING",    (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("BOX",           (0, 0), (-1, -1), 1, border),
        ("ROUNDEDCORNERS", [6]),
    ]))
    return [Spacer(1, 4), t, Spacer(1, 4)]


# ── Step badge ─────────────────────────────────────────────────────────────────
def step_badge_row(step_num, title, styles, color=C_BLUE):
    badge = Table(
        [[Paragraph(f"<b>STEP {step_num}</b>", styles["tag"])]],
        colWidths=[1.4*cm],
    )
    badge.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, -1), color),
        ("LEFTPADDING",  (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING",   (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 4),
        ("ROUNDEDCORNERS", [4]),
    ]))
    row = Table(
        [[badge, Paragraph(f"<b>{title}</b>", styles["step_heading"])]],
        colWidths=[1.6*cm, CONTENT_W - 1.6*cm],
    )
    row.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return [Spacer(1, 6), row]


# ── Main PDF builder ───────────────────────────────────────────────────────────
def build_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title="IntelliMeet – Member 2 Backend Installation Guide",
        author="IntelliMeet Team",
        subject="Backend Setup & Dependency Installation Guide for Member 2",
    )

    styles = build_styles()
    story = []

    # ── HEADER BANNER ──────────────────────────────────────────────────────────
    header_data = [
        [Paragraph("IntelliMeet", styles["doc_title"])],
        [Paragraph("Member 2 (Backend) — Complete Installation Guide", styles["doc_subtitle"])],
        [Spacer(1, 6)],
        [Paragraph("AI-Powered Enterprise Meeting &amp; Collaboration Platform  |  Zidio Development  |  September 2026", styles["doc_meta"])],
    ]
    header_table = Table(header_data, colWidths=[CONTENT_W])
    header_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), C_NAVY),
        ("LEFTPADDING",   (0, 0), (-1, -1), 20),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 20),
        ("TOPPADDING",    (0, 0), (-1, -1), 20),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 20),
        ("ROUNDEDCORNERS", [8]),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 14))

    # ── OVERVIEW BOX ──────────────────────────────────────────────────────────
    overview = Table(
        [[
            Paragraph("📋  <b>Overview</b>", styles["body_bold"]),
            Paragraph(
                "Yeh guide Member 2 (Backend Developer) ke liye hai. Isme sab kuch cover kiya gaya hai — "
                "system-level tools se lekar Node.js packages, environment setup, aur server start karne tak. "
                "Sab commands copy-paste ready hain.",
                styles["body"],
            )
        ]],
        colWidths=[2.8*cm, CONTENT_W - 2.8*cm],
    )
    overview.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), C_BLUE_LIGHT),
        ("BOX",           (0, 0), (-1, -1), 1, C_BLUE),
        ("LEFTPADDING",   (0, 0), (-1, -1), 12),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 12),
        ("TOPPADDING",    (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("ROUNDEDCORNERS", [6]),
    ]))
    story.append(overview)
    story.append(Spacer(1, 14))

    # ══════════════════════════════════════════════════════════════════════════
    # STEP 1 — Prerequisite Software
    # ══════════════════════════════════════════════════════════════════════════
    story += step_badge_row(1, "Prerequisite Software Install Karo (System Level)", styles, C_INDIGO)
    story.append(Paragraph(
        "Yeh tools ek baar system mein install hote hain. Agar already installed hai toh skip karo.",
        styles["body"],
    ))
    story.append(Spacer(1, 6))

    prereq_data = [
        [
            Paragraph("<b>Software</b>", styles["table_header"]),
            Paragraph("<b>Version</b>", styles["table_header"]),
            Paragraph("<b>Download Link (Clickable)</b>", styles["table_header"]),
            Paragraph("<b>Zaroorat</b>", styles["table_header"]),
        ],
        [
            Paragraph("Node.js", styles["table_cell"]),
            Paragraph("v18+ LTS", styles["table_cell_code"]),
            Paragraph('<link href="https://nodejs.org/en/download">nodejs.org/en/download</link>', styles["link"]),
            Paragraph("✅ Required", styles["table_cell"]),
        ],
        [
            Paragraph("Git", styles["table_cell"]),
            Paragraph("Latest", styles["table_cell_code"]),
            Paragraph('<link href="https://git-scm.com/downloads">git-scm.com/downloads</link>', styles["link"]),
            Paragraph("✅ Required", styles["table_cell"]),
        ],
        [
            Paragraph("VS Code", styles["table_cell"]),
            Paragraph("Latest", styles["table_cell_code"]),
            Paragraph('<link href="https://code.visualstudio.com">code.visualstudio.com</link>', styles["link"]),
            Paragraph("✅ Required", styles["table_cell"]),
        ],
        [
            Paragraph("Postman", styles["table_cell"]),
            Paragraph("Latest", styles["table_cell_code"]),
            Paragraph('<link href="https://www.postman.com/downloads">postman.com/downloads</link>', styles["link"]),
            Paragraph("🔧 Recommended", styles["table_cell"]),
        ],
        [
            Paragraph("MongoDB Community", styles["table_cell"]),
            Paragraph("v7+", styles["table_cell_code"]),
            Paragraph('<link href="https://www.mongodb.com/try/download/community">mongodb.com/try/download</link>', styles["link"]),
            Paragraph("⚡ Optional*", styles["table_cell"]),
        ],
    ]

    prereq_table = Table(
        prereq_data,
        colWidths=[3.2*cm, 2.0*cm, 6.5*cm, 2.8*cm],
    )
    prereq_table.setStyle(TableStyle([
        # Header row
        ("BACKGROUND",    (0, 0), (-1, 0), C_INDIGO),
        ("TEXTCOLOR",     (0, 0), (-1, 0), C_WHITE),
        ("FONTNAME",      (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",      (0, 0), (-1, 0), 8.5),
        # Alternating rows
        ("BACKGROUND",    (0, 1), (-1, 1), C_WHITE),
        ("BACKGROUND",    (0, 2), (-1, 2), C_SLATE_50),
        ("BACKGROUND",    (0, 3), (-1, 3), C_WHITE),
        ("BACKGROUND",    (0, 4), (-1, 4), C_SLATE_50),
        ("BACKGROUND",    (0, 5), (-1, 5), C_WHITE),
        # Grid
        ("GRID",          (0, 0), (-1, -1), 0.4, C_SLATE_200),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [C_WHITE, C_SLATE_50]),
        # Padding
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("ROUNDEDCORNERS", [4]),
    ]))
    story.append(prereq_table)
    story += info_box(
        "MongoDB install karna OPTIONAL hai! IntelliMeet project automatically "
        "mongodb-memory-server use karta hai local development ke liye — koi alag DB setup ki zaroorat nahi.",
        styles,
        bg=C_GREEN_LIGHT,
        border=C_GREEN,
        icon="✅",
    )

    # ══════════════════════════════════════════════════════════════════════════
    # STEP 2 — Clone / Copy project
    # ══════════════════════════════════════════════════════════════════════════
    story += step_badge_row(2, "Project Clone / Copy Karo", styles, C_BLUE)
    story.append(Paragraph(
        "Git repository se project clone karo, ya ZIP extract karke folder mein jaao:",
        styles["body"],
    ))
    story += code_block([
        "# Option A: Git se clone karo",
        "git clone https://github.com/your-org/intelliMeet.git",
        "",
        "# Option B: ZIP extract ke baad",
        "cd intelliMeet",
    ], styles, title="Terminal / PowerShell")

    # ══════════════════════════════════════════════════════════════════════════
    # STEP 3 — Root dependencies
    # ══════════════════════════════════════════════════════════════════════════
    story += step_badge_row(3, "Root Dependencies Install Karo", styles, C_BLUE)
    story.append(Paragraph(
        "Project root folder ( <font name='Courier' size='8.5'>intelliMeet/</font> ) mein yeh command chalaao:",
        styles["body"],
    ))
    story += code_block([
        "# intelliMeet/ (root) mein",
        "npm install",
    ], styles)
    story.append(Paragraph(
        "Yeh <b>concurrently</b> package install karta hai — jisse ek hi command se frontend aur backend dono chalte hain.",
        styles["body"],
    ))

    # ══════════════════════════════════════════════════════════════════════════
    # STEP 4 — Server dependencies
    # ══════════════════════════════════════════════════════════════════════════
    story += step_badge_row(4, "Server (Backend) Dependencies Install Karo", styles, C_BLUE)
    story.append(Paragraph(
        "<font name='Courier' size='8.5'>server/</font> folder mein jaao aur npm install chalaao:",
        styles["body"],
    ))
    story += code_block([
        "cd server",
        "npm install",
    ], styles)
    story.append(Spacer(1, 6))

    # Sub-tables for dependencies
    story.append(Paragraph("📦  Production Dependencies (Auto Install Honge)", styles["body_bold"]))
    story.append(Spacer(1, 4))

    prod_deps = [
        [
            Paragraph("<b>Package</b>", styles["table_header"]),
            Paragraph("<b>Version</b>", styles["table_header"]),
            Paragraph("<b>Kaam (Purpose)</b>", styles["table_header"]),
        ],
        ["express",             "^4.21.2", "Web server framework — API routes handle karta hai"],
        ["mongoose",            "^8.9.5",  "MongoDB ODM — database models aur queries"],
        ["mongodb-memory-server","^10.1.4","Local dev ke liye in-memory MongoDB (no setup needed!)"],
        ["socket.io",           "^4.8.1",  "Real-time WebSocket + WebRTC signaling"],
        ["jsonwebtoken",        "^9.0.2",  "JWT tokens — login/auth ke liye"],
        ["bcryptjs",            "^3.0.2",  "Password hashing — secure storage"],
        ["dotenv",              "^16.4.7", ".env file se environment variables load karta hai"],
        ["cors",                "^2.8.5",  "Cross-Origin Resource Sharing allow karta hai"],
        ["helmet",              "^8.0.0",  "HTTP security headers automatically set karta hai"],
        ["express-rate-limit",  "^7.5.0",  "API pe rate limiting — DDoS protection"],
        ["multer",              "^2.4.0",  "File/image upload middleware (avatar ke liye)"],
        ["cloudinary",          "^2.11.0", "Cloud image hosting — avatar upload (optional)"],
        ["ioredis",             "^6.0.0",  "Redis client — future caching (optional)"],
    ]

    prod_table_data = [prod_deps[0]]
    for row in prod_deps[1:]:
        prod_table_data.append([
            Paragraph(f'<font name="Courier-Bold" size="8" color="#1D4ED8">{row[0]}</font>', styles["table_cell"]),
            Paragraph(f'<font name="Courier" size="8" color="#6B7280">{row[1]}</font>', styles["table_cell"]),
            Paragraph(row[2], styles["table_cell"]),
        ])

    prod_table = Table(prod_table_data, colWidths=[3.8*cm, 2.2*cm, CONTENT_W - 6.0*cm])
    prod_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), C_BLUE),
        ("FONTNAME",      (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",      (0, 0), (-1, 0), 8.5),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [C_WHITE, C_SLATE_50]),
        ("GRID",          (0, 0), (-1, -1), 0.4, C_SLATE_200),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("TOPPADDING",    (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(prod_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph("🔧  Dev Dependencies (TypeScript Tools)", styles["body_bold"]))
    story.append(Spacer(1, 4))

    dev_deps_data = [
        [
            Paragraph("<b>Package</b>", styles["table_header"]),
            Paragraph("<b>Version</b>", styles["table_header"]),
            Paragraph("<b>Kaam (Purpose)</b>", styles["table_header"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#1D4ED8">typescript</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8" color="#6B7280">^5.7.3</font>', styles["table_cell"]),
            Paragraph("TypeScript compiler — .ts files ko .js mein convert karta hai", styles["table_cell"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#1D4ED8">tsx</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8" color="#6B7280">^4.19.2</font>', styles["table_cell"]),
            Paragraph("TypeScript files directly run karne ke liye (dev server)", styles["table_cell"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#1D4ED8">@types/express, @types/node etc.</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8" color="#6B7280">Various</font>', styles["table_cell"]),
            Paragraph("TypeScript type definitions — IDE autocomplete ke liye", styles["table_cell"]),
        ],
    ]

    dev_table = Table(dev_deps_data, colWidths=[3.8*cm, 2.2*cm, CONTENT_W - 6.0*cm])
    dev_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), C_SLATE_700),
        ("FONTNAME",      (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",      (0, 0), (-1, 0), 8.5),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [C_WHITE, C_SLATE_50]),
        ("GRID",          (0, 0), (-1, -1), 0.4, C_SLATE_200),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("TOPPADDING",    (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(dev_table)

    # ══════════════════════════════════════════════════════════════════════════
    # STEP 5 — .env Setup
    # ══════════════════════════════════════════════════════════════════════════
    story += step_badge_row(5, ".env File Banao (Environment Configuration)", styles, C_PURPLE)
    story.append(Paragraph(
        "<font name='Courier' size='8.5'>server/</font> folder mein <font name='Courier' size='8.5'>.env.example</font> "
        "file ko copy karke <font name='Courier' size='8.5'>.env</font> banao:",
        styles["body"],
    ))
    story += code_block([
        "# Windows (PowerShell)",
        "copy .env.example .env",
        "",
        "# Linux / macOS",
        "cp .env.example .env",
    ], styles, title="Terminal")

    story.append(Paragraph(".env file mein yeh minimum configuration chahiye:", styles["body"]))
    story.append(Spacer(1, 4))

    env_data = [
        [
            Paragraph("<b>Variable</b>", styles["table_header"]),
            Paragraph("<b>Default Value</b>", styles["table_header"]),
            Paragraph("<b>Note</b>", styles["table_header"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#1D4ED8">PORT</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8">5000</font>', styles["table_cell"]),
            Paragraph("Backend server port", styles["table_cell"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#1D4ED8">NODE_ENV</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8">development</font>', styles["table_cell"]),
            Paragraph("development / production", styles["table_cell"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#1D4ED8">CLIENT_URL</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8">http://localhost:5173</font>', styles["table_cell"]),
            Paragraph("Frontend URL (CORS ke liye)", styles["table_cell"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#1D4ED8">MONGO_URI</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8">(khali chhod do)</font>', styles["table_cell"]),
            Paragraph("✅ Khali = auto memory DB use hoga!", styles["table_cell"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#1D4ED8">JWT_SECRET</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8">any_random_string</font>', styles["table_cell"]),
            Paragraph("Koi bhi secret string daal do", styles["table_cell"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#059669">CLOUDINARY_*</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8">(optional)</font>', styles["table_cell"]),
            Paragraph("⚡ Optional — base64 fallback auto-kaam karta hai", styles["table_cell"]),
        ],
        [
            Paragraph('<font name="Courier-Bold" size="8" color="#059669">OPENAI_API_KEY</font>', styles["table_cell"]),
            Paragraph('<font name="Courier" size="8">(optional)</font>', styles["table_cell"]),
            Paragraph("⚡ Optional — AI summaries built-in synthesizer se bhi kaam karti hain", styles["table_cell"]),
        ],
    ]

    env_table = Table(env_data, colWidths=[3.8*cm, 4.0*cm, CONTENT_W - 7.8*cm])
    env_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), C_PURPLE),
        ("FONTNAME",      (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",      (0, 0), (-1, 0), 8.5),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [C_WHITE, C_SLATE_50]),
        ("GRID",          (0, 0), (-1, -1), 0.4, C_SLATE_200),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("TOPPADDING",    (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(env_table)

    # ══════════════════════════════════════════════════════════════════════════
    # STEP 6 — Start Server
    # ══════════════════════════════════════════════════════════════════════════
    story += step_badge_row(6, "Server Start Karo", styles, C_GREEN)
    story.append(Paragraph(
        "Ab server chalaane ke liye teen options hain:",
        styles["body"],
    ))
    story.append(Spacer(1, 4))

    start_options = [
        [
            Paragraph("Option", styles["table_header"]),
            Paragraph("Command", styles["table_header"]),
            Paragraph("Effect", styles["table_header"]),
        ],
        [
            Paragraph("A — Both", styles["table_cell"]),
            Paragraph('<font name="Courier-Bold" size="8.5" color="#059669">cd intelliMeet &amp;&amp; npm run dev</font>', styles["table_cell"]),
            Paragraph("Frontend + Backend dono ek saath start", styles["table_cell"]),
        ],
        [
            Paragraph("B — Server only", styles["table_cell"]),
            Paragraph('<font name="Courier-Bold" size="8.5" color="#059669">cd server &amp;&amp; npm run dev</font>', styles["table_cell"]),
            Paragraph("Sirf backend server (port 5000)", styles["table_cell"]),
        ],
        [
            Paragraph("C — Root shortcut", styles["table_cell"]),
            Paragraph('<font name="Courier-Bold" size="8.5" color="#059669">npm run server</font>', styles["table_cell"]),
            Paragraph("Root se sirf server start karo", styles["table_cell"]),
        ],
    ]

    start_table = Table(start_options, colWidths=[2.5*cm, 6.5*cm, CONTENT_W - 9.0*cm])
    start_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), C_GREEN),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [C_WHITE, C_GREEN_LIGHT]),
        ("GRID",          (0, 0), (-1, -1), 0.4, C_SLATE_200),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(start_table)
    story.append(Spacer(1, 6))

    story.append(Paragraph("Server successfully start hone ke baad yeh output dikhega:", styles["body"]))
    story += code_block([
        "=================================================",
        "🚀 IntellMeet Server running on http://localhost:5000",
        "📡 WebSocket & WebRTC signaling ready",
        "🌐 Client URL: http://localhost:5173",
        "=================================================",
    ], styles, title="Expected Console Output")

    # ══════════════════════════════════════════════════════════════════════════
    # STEP 7 — Verify
    # ══════════════════════════════════════════════════════════════════════════
    story += step_badge_row(7, "Verify — Server Kaam Kar Raha Hai Ya Nahi", styles, C_AMBER)
    story.append(Paragraph(
        "Browser mein yeh URLs open karke confirm karo ki server live hai:",
        styles["body"],
    ))
    story.append(Spacer(1, 6))

    verify_data = [
        [
            Paragraph("<b>Check</b>", styles["table_header"]),
            Paragraph("<b>URL</b>", styles["table_header"]),
            Paragraph("<b>Expected Response</b>", styles["table_header"]),
        ],
        [
            Paragraph("Health Check", styles["table_cell"]),
            Paragraph('<link href="http://localhost:5000/api/health">http://localhost:5000/api/health</link>', styles["link"]),
            Paragraph('{ "status": "healthy" }', styles["table_cell"]),
        ],
        [
            Paragraph("Auth Test", styles["table_cell"]),
            Paragraph('<link href="http://localhost:5000/api/auth/me">http://localhost:5000/api/auth/me</link>', styles["link"]),
            Paragraph('401 Unauthorized (correct — no token)', styles["table_cell"]),
        ],
        [
            Paragraph("Frontend", styles["table_cell"]),
            Paragraph('<link href="http://localhost:5173">http://localhost:5173</link>', styles["link"]),
            Paragraph("IntelliMeet login page", styles["table_cell"]),
        ],
    ]

    verify_table = Table(verify_data, colWidths=[2.8*cm, 6.2*cm, CONTENT_W - 9.0*cm])
    verify_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), C_AMBER),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [C_WHITE, C_AMBER_LIGHT]),
        ("GRID",          (0, 0), (-1, -1), 0.4, C_SLATE_200),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(verify_table)

    # ══════════════════════════════════════════════════════════════════════════
    # QUICK REFERENCE — One-Shot Commands
    # ══════════════════════════════════════════════════════════════════════════
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width=CONTENT_W, thickness=1, color=C_SLATE_200))
    story.append(Spacer(1, 8))
    story.append(Paragraph("⚡  Quick Reference — One-Shot Copy-Paste Commands", styles["section_title"]))
    story.append(Paragraph("Agar sirf commands chahiye toh yeh paste karo ek baar:", styles["body"]))

    story += code_block([
        "# Step 1: Root install",
        "npm install",
        "",
        "# Step 2: Server install",
        "cd server && npm install",
        "",
        "# Step 3: .env banao (Windows PowerShell)",
        "copy .env.example .env",
        "",
        "# Step 4: Dono start karo",
        "cd .. && npm run dev",
        "",
        "# Verify karo",
        "# Browser open karo: http://localhost:5000/api/health",
    ], styles, title="Complete Setup Commands")

    # ══════════════════════════════════════════════════════════════════════════
    # Useful Links
    # ══════════════════════════════════════════════════════════════════════════
    story.append(Spacer(1, 6))
    story.append(Paragraph("🔗  Useful Reference Links", styles["section_title"]))

    links_data = [
        [
            Paragraph("<b>Resource</b>", styles["table_header"]),
            Paragraph("<b>Clickable Link</b>", styles["table_header"]),
        ],
        [
            Paragraph("Node.js Download", styles["table_cell"]),
            Paragraph('<link href="https://nodejs.org/en/download">https://nodejs.org/en/download</link>', styles["link"]),
        ],
        [
            Paragraph("Express.js Docs", styles["table_cell"]),
            Paragraph('<link href="https://expressjs.com/en/4x/api.html">https://expressjs.com/en/4x/api.html</link>', styles["link"]),
        ],
        [
            Paragraph("Mongoose Docs", styles["table_cell"]),
            Paragraph('<link href="https://mongoosejs.com/docs">https://mongoosejs.com/docs</link>', styles["link"]),
        ],
        [
            Paragraph("Socket.io Docs", styles["table_cell"]),
            Paragraph('<link href="https://socket.io/docs/v4">https://socket.io/docs/v4</link>', styles["link"]),
        ],
        [
            Paragraph("JWT Introduction", styles["table_cell"]),
            Paragraph('<link href="https://jwt.io/introduction">https://jwt.io/introduction</link>', styles["link"]),
        ],
        [
            Paragraph("Cloudinary Node SDK", styles["table_cell"]),
            Paragraph('<link href="https://cloudinary.com/documentation/node_integration">https://cloudinary.com/documentation/node_integration</link>', styles["link"]),
        ],
        [
            Paragraph("TypeScript Handbook", styles["table_cell"]),
            Paragraph('<link href="https://www.typescriptlang.org/docs/handbook/intro.html">https://www.typescriptlang.org/docs/handbook/intro.html</link>', styles["link"]),
        ],
        [
            Paragraph("Postman Download", styles["table_cell"]),
            Paragraph('<link href="https://www.postman.com/downloads">https://www.postman.com/downloads</link>', styles["link"]),
        ],
    ]

    links_table = Table(links_data, colWidths=[4.0*cm, CONTENT_W - 4.0*cm])
    links_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), C_NAVY),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [C_WHITE, C_BLUE_LIGHT]),
        ("GRID",          (0, 0), (-1, -1), 0.4, C_SLATE_200),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(links_table)

    # ── FOOTER ─────────────────────────────────────────────────────────────────
    story.append(Spacer(1, 16))
    story.append(HRFlowable(width=CONTENT_W, thickness=0.5, color=C_SLATE_200))
    story.append(Spacer(1, 6))

    footer_data = [[
        Paragraph("IntelliMeet — AI-Powered Enterprise Meeting &amp; Collaboration Platform", styles["footer"]),
        Paragraph("Member 2 Backend Setup Guide  |  Zidio Development  |  September 2026", styles["footer"]),
    ]]
    footer_table = Table(footer_data, colWidths=[CONTENT_W / 2, CONTENT_W / 2])
    footer_table.setStyle(TableStyle([
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(footer_table)

    # ── BUILD PDF ──────────────────────────────────────────────────────────────
    doc.build(story)
    print(f"\n✅ PDF generated successfully!")
    print(f"📄 File: {output_path}")
    print(f"📁 Size: {os.path.getsize(output_path) / 1024:.1f} KB")


if __name__ == "__main__":
    output = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "IntelliMeet_Member2_Installation_Guide.pdf"
    )
    print("🔨 Generating IntelliMeet Member 2 Installation Guide PDF...")
    build_pdf(output)
    # Auto-open the PDF
    try:
        os.startfile(output)
        print("🚀 PDF opened automatically!")
    except Exception:
        print(f"   Open manually: {output}")
