"""Generates the README artwork for Ubique in the Nodal Studio charte.

Fonts are subset to the glyphs used and embedded as data URIs so the SVGs
render identically through GitHub's <img> proxy. Output: .github/assets/.

    uv run --with fonttools --with brotli python scripts/build_readme_art.py .
"""
import base64
import io
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

REPO = Path(sys.argv[1])
FONTS = REPO / "scripts/assets/brand/fonts"
OUT = REPO / ".github/assets"
OUT.mkdir(parents=True, exist_ok=True)

CREAM, INK, TEAL = "#FFFDE9", "#030406", "#2D7F8C"


def font_face(family, file, weight, text):
    font = TTFont(FONTS / file)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga"]
    sub = subset.Subsetter(opts)
    sub.populate(text=text + " ")
    sub.subset(font)
    buf = io.BytesIO()
    font.flavor = "woff2"
    font.save(buf)
    data = base64.b64encode(buf.getvalue()).decode()
    return (f"@font-face{{font-family:'{family}';font-weight:{weight};"
            f"src:url(data:font/woff2;base64,{data}) format('woff2')}}")


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;")


BADGE_BG = "M27.01 0h60.16c14.85 0 27 12.15 27 27v60.16c0 14.85-12.15 27-27 27H27.01c-14.85 0-27-12.15-27-27V27.01C0 12.15 12.15 0 27.01 0z"
BADGE_I = "M22.03 15.58v83.01"
BADGE_S = "M23.2 18.7l41.52 65.79.11.07c2.96 5.04 9.16 8.48 16.01 8.48 9.8 0 17.74-7.04 17.74-15.72 0-4.46-1.26-7.61-3.4-10.21l-28.57-22.31c-2.14-2.6-3.05-5.52-3.05-8.97 0-8.68 7.94-15.72 17.74-15.72 6.85 0 12.79 3.44 15.75 8.48"


def badge(x, y, size, bg, fg):
    s = size / 114.17
    return (f'<g transform="translate({x} {y}) scale({s:.4f})">'
            f'<path fill="{bg}" d="{BADGE_BG}"/>'
            f'<path fill="none" stroke="{fg}" stroke-width="12" d="{BADGE_I}"/>'
            f'<path fill="none" stroke="{fg}" stroke-width="12" stroke-linejoin="bevel" d="{BADGE_S}"/></g>')


# ---------------------------------------------------------------- banner
W, H = 1280, 600
KICKER = "MATHEMATICAL & QUANTITATIVE LIBRARY"
TAG = ["Vectors, matrices, statistics", "and quantitative finance for",
       "TypeScript, on WebAssembly."]
WORD = "Ubique"
SIGN = "BY NODAL STUDIO"
CELL = "C[4,6]"


def banner(dark):
    bg, fg = (INK, CREAM) if dark else (CREAM, INK)
    faces = "".join([
        font_face("Cabinet", "display.woff2", 800, WORD),
        font_face("Cabinet", "display-medium.woff2", 500, KICKER + SIGN + CELL),
        font_face("General", "body-medium.woff2", 500, "".join(TAG)),
    ])
    # lattice: 9×9 nodes, bottom-right, row 4 and column 6 sweep into C[4,6]
    step, n = 34, 9
    x0, y0 = W - 60 - (n - 1) * step - 40, H - 72 - (n - 1) * step
    ri, cj = 4, 6
    dots = []
    for r in range(n):
        for c in range(n):
            on = (r == ri and c <= cj) or (c == cj and r <= ri)
            cls = ' class="on"' if on else ""
            dots.append(f'<circle{cls} cx="{x0 + c * step}" cy="{y0 + r * step}" r="{3 if on else 2}"/>')
    cx, cy = x0 + cj * step, y0 + ri * step
    row_len, col_len = cj * step, ri * step
    css = f"""{faces}
.k{{font:500 15px Cabinet,sans-serif;letter-spacing:3.3px;fill:{fg}}}
.t{{font:500 27px General,sans-serif;fill:{fg}}}
.w{{font:800 268px Cabinet,sans-serif;letter-spacing:-5.4px;fill:{fg}}}
.dots circle{{fill:{fg};opacity:.2}}
.dots circle.on{{opacity:.85}}
.sweep{{fill:none;stroke:{fg};stroke-width:2.2}}
#row{{stroke-dasharray:{row_len};stroke-dashoffset:{row_len};animation:draw 4.8s cubic-bezier(.6,0,.2,1) infinite}}
#col{{stroke-dasharray:{col_len};stroke-dashoffset:{col_len};animation:draw 4.8s cubic-bezier(.6,0,.2,1) infinite}}
#cell,#lbl{{opacity:0;animation:pop 4.8s cubic-bezier(.22,1,.36,1) infinite;transform-box:fill-box;transform-origin:center}}
@keyframes draw{{0%{{stroke-dashoffset:var(--l)}}35%,85%{{stroke-dashoffset:0;opacity:1}}100%{{stroke-dashoffset:0;opacity:0}}}}
@keyframes pop{{0%,35%{{opacity:0;transform:scale(.6)}}45%,85%{{opacity:1;transform:scale(1)}}100%{{opacity:0;transform:scale(1)}}}}
@media (prefers-reduced-motion:reduce){{#row,#col{{animation:none;stroke-dashoffset:0}}#cell,#lbl{{animation:none;opacity:1}}}}"""
    css = css.replace("#row{", f"#row{{--l:{row_len};").replace("#col{", f"#col{{--l:{col_len};")
    tag = "".join(
        f'<text class="t" x="{W - 64}" y="{92 + i * 36}" text-anchor="end">{esc(line)}</text>'
        for i, line in enumerate(TAG))
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Ubique — mathematical and quantitative library by Nodal Studio">
<style>{css}</style>
<rect width="{W}" height="{H}" rx="28" fill="{bg}"/>
<rect x="18" y="18" width="{W - 36}" height="{H - 36}" rx="44" fill="none" stroke="{fg}" stroke-width="2.4"/>
<rect x="52" y="74" width="50" height="3" fill="{fg}"/>
<text class="k" x="122" y="81">{esc(KICKER)}</text>
{tag}
<g class="dots">{''.join(dots)}</g>
<path id="row" class="sweep" d="M{x0} {cy}h{row_len}"/>
<path id="col" class="sweep" d="M{cx} {y0}v{col_len}"/>
<rect id="cell" x="{cx - 13}" y="{cy - 13}" width="26" height="26" rx="6" fill="{fg}"/>
<text id="lbl" class="k" x="{cx + 24}" y="{cy - 20}">{CELL}</text>
<text class="w" x="40" y="{H - 92}">{WORD}</text>
{badge(W - 64 - 34, H - 60 - 34, 34, fg, bg)}
<text class="k" x="{W - 64 - 34 - 16}" y="{H - 60 - 11}" text-anchor="end">{SIGN}</text>
</svg>"""


# ---------------------------------------------------------------- footer
FW, FH = 1280, 300
F_KICK = "BUILT AND MAINTAINED BY"
F_NAME = "Nodal Studio"
F_TAG = "Independent software studio · Barcelona & Paris · nodalstudio.io"


def footer():
    faces = "".join([
        font_face("Cabinet", "display.woff2", 800, F_NAME),
        font_face("Cabinet", "display-medium.woff2", 500, F_KICK),
        font_face("General", "body.woff2", 400, F_TAG),
    ])
    s = 520 / 114.17
    big = (f'<g transform="translate({FW - 420} 24) scale({s:.4f})" opacity=".2">'
           f'<path fill="none" stroke="{CREAM}" stroke-width="12" d="{BADGE_I}"/>'
           f'<path fill="none" stroke="{CREAM}" stroke-width="12" stroke-linejoin="bevel" d="{BADGE_S}"/></g>')
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {FW} {FH}" width="{FW}" height="{FH}" role="img" aria-label="Built and maintained by Nodal Studio">
<style>{faces}
.k{{font:500 15px Cabinet,sans-serif;letter-spacing:3.3px;fill:{CREAM}}}
.n{{font:800 112px Cabinet,sans-serif;letter-spacing:-2.2px;fill:{CREAM}}}
.t{{font:400 21px General,sans-serif;fill:{CREAM};opacity:.6}}</style>
<clipPath id="c"><rect width="{FW}" height="{FH}" rx="28"/></clipPath>
<g clip-path="url(#c)"><rect width="{FW}" height="{FH}" fill="{INK}"/>{big}</g>
<rect x="56" y="70" width="50" height="3" fill="{CREAM}"/>
<text class="k" x="126" y="77">{F_KICK}</text>
{badge(56, 118, 92, CREAM, INK)}
<text class="n" x="172" y="200">{F_NAME}</text>
<text class="t" x="58" y="256">{esc(F_TAG)}</text>
</svg>"""


(OUT / "banner-light.svg").write_text(banner(False))
(OUT / "banner-dark.svg").write_text(banner(True))
(OUT / "footer.svg").write_text(footer())
for f in sorted(OUT.glob("*.svg")):
    print(f.name, f.stat().st_size)
