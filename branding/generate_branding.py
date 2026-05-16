#!/usr/bin/env python3
"""
Generate Elite International Limited branding using the actual logo image.
- Extracts real colors from the logo
- Uses the logo image directly for all favicons
- Generates a color palette PDF
"""

import os
import json
from PIL import Image, ImageDraw, ImageOps
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, Image as RLImage,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.graphics.shapes import Drawing, Rect, String

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
FAVICON_DIR = os.path.join(OUTPUT_DIR, "favicons")
LOGO_PATH = "/Users/jrdev/Downloads/WhatsApp Image 2026-05-16 at 10.56.30.jpeg"

os.makedirs(FAVICON_DIR, exist_ok=True)


# ─── 1. COLOR EXTRACTION ──────────────────────────────────────────────────────

def extract_brand_colors(logo_path):
    """Sample the logo image to find the dominant non-white colors."""
    img = Image.open(logo_path).convert("RGB")
    w, h = img.size

    # Sample pixels to find dominant colors, skip near-white/near-gray
    color_buckets = {}
    px = img.load()
    step = max(1, min(w, h) // 80)

    for y in range(0, h, step):
        for x in range(0, w, step):
            r, g, b = px[x, y]
            # Skip white/near-white (background)
            if r > 230 and g > 230 and b > 230:
                continue
            # Quantize to 32-step buckets
            key = (r // 32 * 32, g // 32 * 32, b // 32 * 32)
            color_buckets[key] = color_buckets.get(key, 0) + 1

    sorted_colors = sorted(color_buckets.items(), key=lambda x: -x[1])

    # Identify gold and black clusters
    gold_candidates = []
    black_candidates = []

    for (r, g, b), count in sorted_colors:
        # Gold: high red, moderate green, low blue
        if r > 150 and g > 80 and g < 180 and b < 60:
            gold_candidates.append(((r, g, b), count))
        # Black: all channels low
        elif r < 80 and g < 80 and b < 80:
            black_candidates.append(((r, g, b), count))

    # Average the top candidates
    def avg_color(candidates, top=5):
        top_c = candidates[:top]
        if not top_c:
            return None
        total = sum(c for _, c in top_c)
        r = sum(rgb[0] * c for rgb, c in top_c) // total
        g = sum(rgb[1] * c for rgb, c in top_c) // total
        b = sum(rgb[2] * c for rgb, c in top_c) // total
        return (r, g, b)

    gold_rgb = avg_color(gold_candidates) or (212, 149, 10)
    black_rgb = avg_color(black_candidates) or (26, 26, 26)

    def to_hex(rgb):
        return "#{:02X}{:02X}{:02X}".format(*rgb)

    gold_hex = to_hex(gold_rgb)
    black_hex = to_hex(black_rgb)

    print(f"  Extracted Gold:  {gold_hex} {gold_rgb}")
    print(f"  Extracted Black: {black_hex} {black_rgb}")

    return {
        "gold":       {"hex": gold_hex,  "rgb": gold_rgb,    "name": "Brand Gold"},
        "black":      {"hex": black_hex, "rgb": black_rgb,   "name": "Brand Black"},
        "white":      {"hex": "#FFFFFF", "rgb": (255,255,255),"name": "Pure White"},
        "light_gray": {"hex": "#F5F5F5", "rgb": (245,245,245),"name": "Soft Gray"},
        "mid_gray":   {"hex": "#888888", "rgb": (136,136,136),"name": "Mid Gray"},
    }


# ─── 2. FAVICON GENERATION ────────────────────────────────────────────────────

def make_square_logo(logo_path, size, padding_ratio=0.08, bg=(255, 255, 255)):
    """Resize the logo image to fit in a square canvas with padding."""
    img = Image.open(logo_path).convert("RGBA")

    # Make white background transparent
    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        if r > 230 and g > 230 and b > 230:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)

    # Crop to content
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    # Fit into square with padding
    pad = int(size * padding_ratio)
    inner = size - 2 * pad
    img.thumbnail((inner, inner), Image.LANCZOS)

    canvas_img = Image.new("RGBA", (size, size), bg + (255,))
    offset_x = (size - img.width) // 2
    offset_y = (size - img.height) // 2
    canvas_img.paste(img, (offset_x, offset_y), img)
    return canvas_img


def make_square_logo_dark(logo_path, size, gold_rgb, bg=(26, 26, 26)):
    """Dark background version: make white areas transparent, keep gold+black."""
    img = Image.open(logo_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        if r > 230 and g > 230 and b > 230:
            new_data.append((255, 255, 255, 0))
        elif r < 80 and g < 80 and b < 80:
            # Black → white for dark bg
            new_data.append((255, 255, 255, a))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)

    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    pad = int(size * 0.08)
    inner = size - 2 * pad
    img.thumbnail((inner, inner), Image.LANCZOS)

    canvas_img = Image.new("RGBA", (size, size), bg + (255,))
    offset_x = (size - img.width) // 2
    offset_y = (size - img.height) // 2
    canvas_img.paste(img, (offset_x, offset_y), img)
    return canvas_img


def crop_symbol_only(logo_path, size, bg=(26, 26, 26)):
    """Crop just the left double-E gold symbol for tiny favicons."""
    img = Image.open(logo_path).convert("RGBA")
    w, h = img.size

    # The gold symbol is roughly in the left 22% of the image
    symbol_crop = img.crop((0, 0, int(w * 0.22), h))

    data = symbol_crop.getdata()
    new_data = []
    for r, g, b, a in data:
        if r > 220 and g > 220 and b > 220:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append((r, g, b, a))
    symbol_crop.putdata(new_data)

    bbox = symbol_crop.getbbox()
    if bbox:
        symbol_crop = symbol_crop.crop(bbox)

    pad = max(1, int(size * 0.1))
    inner = size - 2 * pad
    symbol_crop.thumbnail((inner, inner), Image.LANCZOS)

    canvas_img = Image.new("RGBA", (size, size), bg + (255,))
    ox = (size - symbol_crop.width) // 2
    oy = (size - symbol_crop.height) // 2
    canvas_img.paste(symbol_crop, (ox, oy), symbol_crop)
    return canvas_img


def generate_favicons(logo_path, colors_data):
    gold_rgb = colors_data["gold"]["rgb"]
    black_rgb = colors_data["black"]["rgb"]
    white_rgb = (255, 255, 255)

    generated = []

    # favicon-16x16: just the gold EE symbol on black
    img = crop_symbol_only(logo_path, 16, bg=black_rgb)
    p = os.path.join(FAVICON_DIR, "favicon-16x16.png")
    img.save(p, "PNG")
    generated.append(("favicon-16x16.png", "16×16", p))
    print(f"  favicon-16x16.png")

    # favicon-32x32: gold EE symbol on black
    img = crop_symbol_only(logo_path, 32, bg=black_rgb)
    p = os.path.join(FAVICON_DIR, "favicon-32x32.png")
    img.save(p, "PNG")
    generated.append(("favicon-32x32.png", "32×32", p))
    print(f"  favicon-32x32.png")

    # favicon-48x48: gold EE symbol on black
    img = crop_symbol_only(logo_path, 48, bg=black_rgb)
    p = os.path.join(FAVICON_DIR, "favicon-48x48.png")
    img.save(p, "PNG")
    generated.append(("favicon-48x48.png", "48×48", p))
    print(f"  favicon-48x48.png")

    # apple-touch-icon: full logo on white, 180x180
    img = make_square_logo(logo_path, 180, padding_ratio=0.10, bg=white_rgb)
    p = os.path.join(FAVICON_DIR, "apple-touch-icon.png")
    img.save(p, "PNG")
    generated.append(("apple-touch-icon.png", "180×180", p))
    print(f"  apple-touch-icon.png")

    # android-chrome-192x192: full logo on white
    img = make_square_logo(logo_path, 192, padding_ratio=0.08, bg=white_rgb)
    p = os.path.join(FAVICON_DIR, "android-chrome-192x192.png")
    img.save(p, "PNG")
    generated.append(("android-chrome-192x192.png", "192×192", p))
    print(f"  android-chrome-192x192.png")

    # android-chrome-512x512: full logo on white
    img = make_square_logo(logo_path, 512, padding_ratio=0.08, bg=white_rgb)
    p = os.path.join(FAVICON_DIR, "android-chrome-512x512.png")
    img.save(p, "PNG")
    generated.append(("android-chrome-512x512.png", "512×512", p))
    print(f"  android-chrome-512x512.png")

    # og-image 1200x630: full logo centred on white
    img = make_square_logo(logo_path, 630, padding_ratio=0.12, bg=white_rgb)
    og = Image.new("RGB", (1200, 630), white_rgb)
    # Gold top/bottom bars
    d = ImageDraw.Draw(og)
    d.rectangle([0, 0, 1200, 10], fill=gold_rgb)
    d.rectangle([0, 620, 1200, 630], fill=gold_rgb)
    og.paste(img, (285, 0), img)
    p = os.path.join(FAVICON_DIR, "og-image.png")
    og.save(p, "PNG")
    generated.append(("og-image.png", "1200×630", p))
    print(f"  og-image.png")

    # favicon.ico: multi-size from 16, 32, 48 symbol crops
    ico_imgs = []
    for sz in [16, 32, 48]:
        ico_imgs.append(crop_symbol_only(logo_path, sz, bg=black_rgb).convert("RGBA"))
    ico_path = os.path.join(FAVICON_DIR, "favicon.ico")
    ico_imgs[0].save(
        ico_path, format="ICO",
        sizes=[(i.width, i.height) for i in ico_imgs],
        append_images=ico_imgs[1:],
    )
    generated.append(("favicon.ico", "16+32+48", ico_path))
    print(f"  favicon.ico (multi-size)")

    return generated


# ─── 3. WEB MANIFEST ──────────────────────────────────────────────────────────

def generate_webmanifest(colors_data):
    manifest = {
        "name": "Elite International Limited",
        "short_name": "Elite Intl",
        "description": "Elite International Limited — Connecting talent with global opportunity.",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#FFFFFF",
        "theme_color": colors_data["gold"]["hex"],
        "icons": [
            {"src": "/favicons/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/favicons/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"},
        ],
    }
    path = os.path.join(FAVICON_DIR, "site.webmanifest")
    with open(path, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"  site.webmanifest")
    return path


# ─── 4. BRANDING PDF ──────────────────────────────────────────────────────────

def generate_pdf(logo_path, colors_data, favicon_files):
    pdf_path = os.path.join(OUTPUT_DIR, "Elite_International_Limited_Brand_Guide.pdf")

    doc = SimpleDocTemplate(
        pdf_path, pagesize=A4,
        rightMargin=20*mm, leftMargin=20*mm,
        topMargin=20*mm, bottomMargin=20*mm,
    )

    styles = getSampleStyleSheet()
    gold_rl = colors.HexColor(colors_data["gold"]["hex"])
    black_rl = colors.HexColor(colors_data["black"]["hex"])
    LIGHT_GRAY = colors.HexColor("#F5F5F5")
    MID_GRAY   = colors.HexColor("#888888")
    DARK_GRAY  = colors.HexColor("#333333")

    def style(name, **kw):
        return ParagraphStyle(name, parent=styles["Normal"], **kw)

    title_s  = style("T", fontSize=26, textColor=black_rl, alignment=TA_CENTER,
                     fontName="Helvetica-Bold", spaceAfter=3*mm)
    head_s   = style("H", fontSize=13, textColor=gold_rl, spaceBefore=7*mm,
                     spaceAfter=3*mm, fontName="Helvetica-Bold")
    body_s   = style("B", fontSize=10, textColor=DARK_GRAY, spaceAfter=2*mm,
                     fontName="Helvetica", leading=16)
    label_s  = style("L", fontSize=8.5, textColor=MID_GRAY, fontName="Helvetica",
                     alignment=TA_CENTER)
    code_s   = style("C", fontName="Courier", fontSize=8.5,
                     backColor=LIGHT_GRAY, borderPad=6, spaceAfter=3*mm, leading=14)

    story = []

    # ── COVER ─────────────────────────────────────────────────────────────────
    story.append(Spacer(1, 20*mm))
    story.append(Paragraph("BRAND IDENTITY GUIDE", title_s))
    story.append(Spacer(1, 3*mm))
    story.append(HRFlowable(width="100%", thickness=3, color=gold_rl, spaceAfter=6*mm))

    # Actual logo image
    logo_img = Image.open(logo_path)
    lw, lh = logo_img.size
    ratio = lh / lw
    display_w = 160*mm
    display_h = display_w * ratio
    story.append(RLImage(logo_path, width=display_w, height=display_h))
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph(
        "<font name='Helvetica' size='10' color='#888888'>Official Brand Standards &amp; Visual Identity System — May 2026</font>",
        style("CoverSub", alignment=TA_CENTER, spaceAfter=8*mm)
    ))
    story.append(HRFlowable(width="100%", thickness=1, color=LIGHT_GRAY, spaceAfter=6*mm))
    story.append(Paragraph(
        "This document defines the visual identity standards for Elite International Limited. "
        "Consistent application of these guidelines ensures a professional and cohesive brand "
        "presence across all digital platforms, print materials, and communications.",
        body_s
    ))

    # ── COLOR PALETTE ─────────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Color Palette", head_s))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_rl, spaceAfter=5*mm))
    story.append(Paragraph(
        "Colors extracted directly from the Elite International Limited logo. "
        "These are the definitive values to use across all brand materials.",
        body_s
    ))
    story.append(Spacer(1, 5*mm))

    palette_specs = [
        ("gold",       "Primary accent, icon mark, highlights",      "CMYK 0/30/95/17",  "Pantone 7554 C"),
        ("black",      "Primary text, wordmark, backgrounds",         "CMYK 0/0/0/90",    "Pantone Black 6 C"),
        ("white",      "Primary background, reversed elements",       "CMYK 0/0/0/0",     "—"),
        ("light_gray", "Secondary backgrounds, cards, section fills", "CMYK 0/0/0/4",     "—"),
        ("mid_gray",   "Captions, secondary text, dividers",          "CMYK 0/0/0/47",    "—"),
    ]

    for key, usage, cmyk, pantone in palette_specs:
        c = colors_data[key]
        hex_val = c["hex"]
        r, g, b = c["rgb"]
        name = c["name"]

        swatch = Drawing(28*mm, 16*mm)
        swatch.add(Rect(0, 0, 28*mm, 16*mm,
                        fillColor=colors.HexColor(hex_val),
                        strokeColor=colors.HexColor("#CCCCCC"),
                        strokeWidth=0.5))

        row = Table(
            [[swatch,
              Paragraph(f"<b>{name}</b><br/><font size='9' color='#888888'>{usage}</font>", body_s),
              Paragraph(f"<b>HEX</b>  {hex_val}<br/><b>RGB</b>  {r}, {g}, {b}<br/><b>CMYK</b>  {cmyk}", body_s),
              Paragraph(f"<b>Pantone</b><br/>{pantone}", body_s)]],
            colWidths=[32*mm, 65*mm, 52*mm, 33*mm],
        )
        row.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, colors.HexColor("#EEEEEE")),
        ]))
        story.append(row)
        story.append(Spacer(1, 3*mm))

    # Visual swatches row (large)
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph("Color Swatches", head_s))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_rl, spaceAfter=4*mm))

    swatch_w = 33*mm
    swatch_h = 20*mm
    large_swatches = []
    large_labels  = []
    for key, _, _, _ in palette_specs:
        c = colors_data[key]
        d = Drawing(swatch_w, swatch_h)
        d.add(Rect(0, 0, swatch_w, swatch_h,
                   fillColor=colors.HexColor(c["hex"]),
                   strokeColor=colors.HexColor("#CCCCCC"),
                   strokeWidth=0.5))
        large_swatches.append(d)
        large_labels.append(Paragraph(
            f"<b>{c['name']}</b><br/>{c['hex']}",
            style("SL", fontSize=8, alignment=TA_CENTER, fontName="Helvetica",
                  textColor=DARK_GRAY, spaceAfter=0)
        ))

    swatch_table = Table(
        [large_swatches, large_labels],
        colWidths=[swatch_w + 2*mm] * len(palette_specs),
    )
    swatch_table.setStyle(TableStyle([
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    story.append(swatch_table)

    # CSS variables
    story.append(Spacer(1, 8*mm))
    story.append(Paragraph("CSS Custom Properties", head_s))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_rl, spaceAfter=4*mm))

    gold_h  = colors_data["gold"]["hex"]
    black_h = colors_data["black"]["hex"]

    story.append(Paragraph(
        f"""<font name="Courier" size="8.5">:root {{<br/>
&nbsp;&nbsp;--color-gold:       {gold_h};<br/>
&nbsp;&nbsp;--color-black:      {black_h};<br/>
&nbsp;&nbsp;--color-white:      #FFFFFF;<br/>
&nbsp;&nbsp;--color-soft-gray:  #F5F5F5;<br/>
&nbsp;&nbsp;--color-mid-gray:   #888888;<br/>
&nbsp;&nbsp;<br/>
&nbsp;&nbsp;/* Semantic aliases */<br/>
&nbsp;&nbsp;--color-primary:    var(--color-gold);<br/>
&nbsp;&nbsp;--color-on-primary: #FFFFFF;<br/>
&nbsp;&nbsp;--color-text:       var(--color-black);<br/>
&nbsp;&nbsp;--color-bg:         var(--color-white);<br/>
&nbsp;&nbsp;--color-bg-alt:     var(--color-soft-gray);<br/>
&nbsp;&nbsp;--color-muted:      var(--color-mid-gray);<br/>
}}</font>""",
        code_s
    ))

    # Tailwind config snippet
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph("Tailwind CSS Config", head_s))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_rl, spaceAfter=4*mm))
    story.append(Paragraph(
        f"""<font name="Courier" size="8.5">// tailwind.config.js<br/>
theme: {{<br/>
&nbsp;&nbsp;extend: {{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;colors: {{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;brand: {{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gold:  '{gold_h}',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;black: '{black_h}',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gray:  '#888888',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}},<br/>
&nbsp;&nbsp;}},<br/>
}},</font>""",
        code_s
    ))

    # ── TYPOGRAPHY ────────────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Typography", head_s))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_rl, spaceAfter=5*mm))
    story.append(Paragraph(
        "Two complementary typefaces reflect the logo's visual personality — "
        "bold geometric sans for headings, classic serif italic for editorial text.",
        body_s
    ))
    story.append(Spacer(1, 4*mm))

    type_specs = [
        ("Display", "Montserrat ExtraBold", "48–72px", gold_h,   "Hero headlines"),
        ("H1",      "Montserrat Bold",      "32–40px", black_h,  "Page titles"),
        ("H2",      "Montserrat SemiBold",  "24–28px", black_h,  "Section headings"),
        ("H3",      "Montserrat Medium",    "18–22px", gold_h,   "Card titles"),
        ("Body",    "Georgia Regular",      "15–17px", "#333333", "Articles, paragraphs"),
        ("Small",   "Georgia Regular",      "13–14px", "#888888", "Captions, footnotes"),
        ("Button",  "Montserrat Bold",      "13–15px", "#FFFFFF on Gold", "CTAs, nav"),
    ]
    type_table = Table(
        [["Role", "Typeface", "Size", "Color", "Use"]] +
        [[Paragraph(v, body_s) for v in row] for row in type_specs],
        colWidths=[20*mm, 47*mm, 22*mm, 45*mm, 48*mm],
    )
    type_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(black_h)),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_GRAY]),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#DDDDDD")),
    ]))
    story.append(type_table)

    story.append(Spacer(1, 6*mm))
    story.append(Paragraph("Web Font Stack", head_s))
    story.append(Paragraph(
        f"""<font name="Courier" size="8.5">/* Headings */<br/>
font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;<br/>
<br/>
/* Body / editorial */<br/>
font-family: 'Georgia', 'Times New Roman', Times, serif;<br/>
<br/>
/* Google Fonts import */<br/>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');</font>""",
        code_s
    ))

    # ── LOGO USAGE ────────────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Logo Usage", head_s))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_rl, spaceAfter=5*mm))

    story.append(RLImage(logo_path, width=140*mm, height=140*mm * ratio))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Primary logo — use on white or light backgrounds.", label_s))

    story.append(Spacer(1, 6*mm))
    story.append(Paragraph("Minimum Sizes", head_s))
    ms = Table(
        [["Format", "Min Width"],
         ["Digital (web)", "200 px"],
         ["Print",         "50 mm"],
         ["Favicon",       "Symbol mark only at ≤ 48 px"]],
        colWidths=[80*mm, 100*mm],
    )
    ms.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(gold_h)),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_GRAY]),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#DDDDDD")),
    ]))
    story.append(ms)

    story.append(Spacer(1, 5*mm))
    rules = [
        ["✓ Use on white background", "Primary — most common"],
        ["✓ Use on Soft Gray (#F5F5F5)", "Cards, secondary surfaces"],
        ["✗ Place on busy photographs", "Use solid colour overlay"],
        ["✗ Stretch or squash proportions", "Lock aspect ratio always"],
        ["✗ Recolour the logo", "Never alter logo colours"],
        ["✗ Add drop shadows", "Not in brand guidelines"],
    ]
    rt = Table(rules, colWidths=[90*mm, 90*mm])
    rt.setStyle(TableStyle([
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, LIGHT_GRAY]),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#DDDDDD")),
        ("TEXTCOLOR", (0, 0), (0, 1), colors.HexColor("#1A7A1A")),
        ("TEXTCOLOR", (0, 2), (0, 5), colors.HexColor("#AA1A1A")),
    ]))
    story.append(rt)

    # ── FAVICON / DIGITAL ─────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Favicon &amp; Digital Assets", head_s))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_rl, spaceAfter=5*mm))
    story.append(Paragraph(
        "All favicon files use the actual logo image. At sizes ≤ 48 px the gold double-E symbol "
        "mark is used on a dark background for legibility. Larger sizes use the full logo on white.",
        body_s
    ))
    story.append(Spacer(1, 4*mm))

    fav_rows = [["File", "Size", "Content", "Use"]]
    fav_info = [
        ("favicon.ico",               "16+32+48", "Gold EE symbol on black", "Browser tab (all browsers)"),
        ("favicon-16x16.png",         "16×16",    "Gold EE symbol on black", "Small browser tab"),
        ("favicon-32x32.png",         "32×32",    "Gold EE symbol on black", "Standard browser tab"),
        ("favicon-48x48.png",         "48×48",    "Gold EE symbol on black", "Windows site icon"),
        ("apple-touch-icon.png",      "180×180",  "Full logo on white",       "iOS home screen / Safari"),
        ("android-chrome-192x192.png","192×192",  "Full logo on white",       "Android Chrome"),
        ("android-chrome-512x512.png","512×512",  "Full logo on white",       "PWA splash screen"),
        ("og-image.png",              "1200×630", "Full logo, gold bars",     "Open Graph / social preview"),
        ("site.webmanifest",          "—",        "JSON config",              "PWA manifest"),
    ]
    ft = Table(
        [["File", "Size", "Content", "Use"]] +
        [[Paragraph(v, body_s) for v in row] for row in fav_info],
        colWidths=[52*mm, 20*mm, 45*mm, 55*mm],
    )
    ft.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(black_h)),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_GRAY]),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#DDDDDD")),
    ]))
    story.append(ft)

    story.append(Spacer(1, 5*mm))
    story.append(Paragraph("HTML &lt;head&gt; snippet", head_s))
    story.append(Paragraph(
        """<font name="Courier" size="8">&lt;link rel="icon" type="image/x-icon" href="/favicons/favicon.ico"&gt;<br/>
&lt;link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"&gt;<br/>
&lt;link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"&gt;<br/>
&lt;link rel="icon" type="image/png" sizes="48x48" href="/favicons/favicon-48x48.png"&gt;<br/>
&lt;link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"&gt;<br/>
&lt;link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png"&gt;<br/>
&lt;link rel="icon" type="image/png" sizes="512x512" href="/favicons/android-chrome-512x512.png"&gt;<br/>
&lt;link rel="manifest" href="/favicons/site.webmanifest"&gt;<br/>
&lt;meta name="theme-color" content="{gold_h}"&gt;</font>""".format(gold_h=gold_h),
        code_s
    ))

    # Footer
    story.append(Spacer(1, 10*mm))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_rl, spaceAfter=3*mm))
    story.append(Paragraph(
        "Elite International Limited — Brand Identity Guide — Confidential — May 2026",
        style("Foot", fontSize=8, textColor=MID_GRAY, alignment=TA_CENTER)
    ))

    doc.build(story)
    print(f"  {pdf_path}")
    return pdf_path


# ─── MAIN ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=== Elite International Limited — Branding Generator ===\n")

    print("1. Extracting brand colors from logo...")
    brand_colors = extract_brand_colors(LOGO_PATH)

    print("\n2. Generating favicon files...")
    fav_files = generate_favicons(LOGO_PATH, brand_colors)

    print("\n3. Generating web manifest...")
    generate_webmanifest(brand_colors)

    print("\n4. Generating PDF brand guide...")
    generate_pdf(LOGO_PATH, brand_colors, fav_files)

    print("\n=== Done! ===")
    print(f"  Branding:  {OUTPUT_DIR}/")
    print(f"  Favicons:  {FAVICON_DIR}/")
    print(f"  PDF:       {OUTPUT_DIR}/Elite_International_Limited_Brand_Guide.pdf")
