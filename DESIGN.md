---
name: Иван Шматов
description: A traveller's visa checker and trek guide, set as a Crouwel-style gridded type specimen in white, ink and one blue.
colors:
  crouwel-blue: "#0057ff"
  ink: "#111111"
  ink-soft: "#3d434d"
  ink-muted: "#5d6470"
  paper: "#ffffff"
  surface: "#f5f7fa"
  guide-line: "#e8ecf3"
  strike: "#ffffff"
typography:
  mega:
    fontFamily: "Tektur, Arial Narrow, sans-serif"
    fontSize: "clamp(4.6rem, 15.5vw, 13.5rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.01em"
  display:
    fontFamily: "Tektur, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 1.6rem + 3.6vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 0.95
  headline:
    fontFamily: "Tektur, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 1.45rem + 2vw, 3.2rem)"
    fontWeight: 700
    lineHeight: 1
  title:
    fontFamily: "Tektur, Arial Narrow, sans-serif"
    fontSize: "clamp(1.45rem, 1.25rem + 0.9vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.01em"
  lead:
    fontFamily: "Golos, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.15rem, 1.06rem + 0.4vw, 1.4rem)"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Golos, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"tnum\", \"lnum\""
  small:
    fontFamily: "Golos, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(0.84rem, 0.8rem + 0.15vw, 0.92rem)"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Tektur, Arial Narrow, sans-serif"
    fontSize: "clamp(0.84rem, 0.8rem + 0.15vw, 0.92rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 3.4vw, 40px)"
  cell-pad: "clamp(24px, 3.4vw, 44px)"
  section: "clamp(44px, 6vw, 84px)"
  row-gap: "12px"
  max: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.crouwel-blue}"
    textColor: "{colors.paper}"
    typography: "{typography.lead}"
    rounded: "{rounded.none}"
    padding: "0.6em 1.15em 0.6em 1.3em"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.crouwel-blue}"
    rounded: "{rounded.none}"
    padding: "0.6em 1.15em 0.6em 1.3em"
    height: "56px"
  button-ghost-hover:
    backgroundColor: "{colors.crouwel-blue}"
    textColor: "{colors.paper}"
  button-small:
    padding: "0.35em 0.8em 0.35em 1em"
    height: "44px"
    typography: "{typography.body}"
  form-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "60px"
    padding: "10px 46px 10px 16px"
  verdict-free:
    backgroundColor: "{colors.crouwel-blue}"
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    height: "52px"
    padding: "6px 16px 8px"
  verdict-arrival:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.crouwel-blue}"
    typography: "{typography.title}"
    height: "52px"
  verdict-required:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    height: "52px"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "52px"
    padding: "10px 14px"
  chip-hover:
    backgroundColor: "{colors.crouwel-blue}"
    textColor: "{colors.paper}"
  nav-link:
    textColor: "{colors.crouwel-blue}"
    typography: "{typography.body}"
    padding: "10px 0"
  nav-link-current:
    textColor: "{colors.ink}"
---

# Design System: Иван Шматов

## Overview

**Creative North Star: "The Visa Specimen Sheet"**

The site is a Wim Crouwel–style gridded type specimen: white paper, a faint 12-column layout under everything, ink type, and one hard blue that draws every cell border. The visa answer is literally a cell on that grid, and its fill tells you the status before you read the word. Structure is the argument for reliability: precise hairlines, square corners, monumental uppercase headings, numbers set like a timetable.

Density is calm but firm. Content sits in bordered panels split by blue verticals (3:2 or 2:3), lists are ruled like a ledger, photos sit inside bordered cells with a caption bar. Nothing floats, nothing is rounded, nothing casts a shadow. Motion is minimal and mechanical: the check result rebuilds in six stepped frames, and colour swaps on hover in 160 ms.

Confirmed rejections from the owner: the earlier playful zine direction (childish, handwritten); the graph-paper square grid (school notebook); any decorative diagonal "/" mark; flag emoji; generated or stock faces. The system must read grown-up.

**Key Characteristics:**
- White paper, ink #111, one accent (Crouwel blue) used for every line, link and primary plane.
- Faint vertical column guides only: 12 columns, 4 on phones. No horizontal grid lines.
- Tektur, heavy and uppercase, for headings and numerals; Golos for everything people read or click.
- Square corners and 1.5px blue hairlines everywhere; panels share borders like table cells.
- Visa status = cell treatment + the status in words, always both.
- Real photos in bordered cells; the Annapurna image is a blue halftone dot matrix made from a real photo.

## Colors

One accent on white and ink: Crouwel blue does all the structural and interactive work, ink carries text and the "visa required" fill.

### Primary
- **Crouwel Blue** (`crouwel-blue`): every cell border and rule (1.5px), links, the primary button plane, nav underline, the focus ring, text selection, numerals in stats/timeline/route, the "без визы" fill, the hatch of e-visa/ETA, the halftone dots.

### Neutral
- **Ink** (`ink`): headings and body text; the solid "нужна виза" cell and the "запрещён" cell; the hover plane of primary buttons.
- **Soft Ink** (`ink-soft`): secondary text: ledes, notes, captions, list descriptions, byline.
- **Muted Ink** (`ink-muted`): tertiary text only: placeholders, disclaimer, stay values in country lists.
- **Paper** (`paper`): page ground and every cell fill; text on blue and ink planes.
- **Surface** (`surface`): quiet hover fill for ledger rows and passport switch tabs; scrollbar track.
- **Guide Line** (`guide-line`): the column guides behind the page, soft dividers inside lists (country list, TOC, breadcrumbs, mobile nav top rule).

### Status signal
- **Strike** (`strike`): only the 3px white diagonal strike across the ink "запрещён" verdict cell (paper white reused, no extra hue). Nowhere else.

### Named Rules
**The One Blue Rule.** Blue is the only hue. If something needs emphasis, it gets a blue line, a blue plane or blue type; never a second accent colour.

**The Status Cell Rule.** Visa status is always named in words and encoded as a cell treatment, identically in the big verdict and the 14px marker: solid blue = без визы; blue outline on white = по прилёту; blue 135° hatch on white = e-visa / ETA; solid ink = нужна виза; ink with a diagonal strike = запрещён. Never colour alone, never an icon alone.

## Typography

**Display Font:** Tektur (fallback Arial Narrow, sans-serif), self-hosted, variable 400–900, Cyrillic + Latin subsets.
**Body Font:** Golos (fallback system-ui, -apple-system, Segoe UI, sans-serif), self-hosted, variable 400–900.

**Character:** Tektur's chamfered, grid-built capitals carry the specimen voice; Golos is the plain, legible Russian text face that does the actual explaining. All numerals are tabular and lining.

### Hierarchy
- **Mega** (700, clamp(4.6rem, 15.5vw, 13.5rem); 25vw under 600px; line-height 0.82, uppercase): the one monumental word per page ("ВИЗА?", "404").
- **Display** (700, step 4, 0.95, uppercase): guide title, big step counters in the guide.
- **Headline** (700, step 3, 1, uppercase): section heads, footer CTA head, stats numerals (clamped down to clamp(1.35rem … 2.1rem) inside stat cells).
- **Title** (700, step 2, 1.05, uppercase): sub-heads, status group heads, the verdict word. Country page titles use clamp(1.7rem, 1.3rem + 1.6vw, 2.7rem).
- **Lead** (Golos 500–600, step 1, 1.3–1.5): ledes, form labels and inputs, button text, the hero quote.
- **Body** (Golos 400, step 0, 1.55): running text; measure held to 44–60ch.
- **Small** (Golos 400–600, step −1): notes, captions, hints, disclaimer.
- **Label** (Tektur 600, step −1, letter-spacing 0.06–0.08em, uppercase, blue): panel titles, photo caption bars, route day labels.

### Named Rules
**The Tektur Uppercase Rule.** Tektur is set only in uppercase or as numerals (years, counts, prices, step numbers). Its lowercase Cyrillic reads odd. Running text, labels in sentence case, nav and buttons are Golos.

**The No Kicker Rule.** No eyebrow or kicker label above a heading. A small blue Tektur label is allowed only as a panel's own title or a caption bar, never stacked over a bigger heading.

## Layout

The page is a centred column `min(100% − 2 × gutter, 1320px)` with a fixed background of faint vertical guides at 1/12 of that width (1/4 under 760px), plus a right edge line. Horizontal bands span full width and close with a 1.5px blue rule; inside each band a **split** puts two panels side by side (3fr:2fr, or 2fr:3fr for the guide, 1fr:1fr even) separated by a blue vertical, each padded clamp(24px, 3.4vw, 44px). Sections pad clamp(44px, 6vw, 84px) vertically; section heads sit on a blue rule with heading left and a short Soft Ink note right.

Collections are cell grids with shared borders (top+left on the container, right+bottom on each cell): trips (4 columns, first photo spans 2×2), chips (auto-fill ≥220px), guide pages (4 → 2), steps (3 → 1), stats (4 → 2 between 961–1500px and under 600px), the horizontal day-by-day route (158px columns, scroll-snap, right-edge fade mask).

Breakpoints: 1500 / 960 (splits stack, the vertical rule becomes a top rule) / 860 (nav becomes a horizontally scrolling row under the brand, Telegram button collapses to its icon) / 760 / 600 (phone type and padding). Works from 320px.

### Named Rules
**The Column Guide Rule.** The background shows faint vertical column guides only, 12 on desktop and 4 on phones, in Guide Line. Never a squared graph-paper grid.

## Elevation & Depth

Completely flat. There are no shadows and no blur anywhere; depth is drawn, not lit. Hierarchy comes from blue hairlines, solid colour planes (blue, ink) and the bands of the grid. Bands use a 60% white fill so the column guides show faintly through.

### Named Rules
**The Drawn-Not-Lit Rule.** Separate things with a 1.5px blue line or a solid plane; never with a shadow, gradient lift or rounded card.

## Shapes

Every corner is square (0px): buttons, inputs, cells, photos, markers, focus rings. Lines come in two weights: 1.5px blue for structure (cell edges, section rules), 1px blue or Guide Line for ledger dividers inside lists; 2px for the verdict border and the route line. Small solid blue squares (6px) separate items in meta lines and fact rows; 12px squares bullet the guide TOC. Photos are cropped with object-fit inside bordered cells, never masked into circles.

## Components

### Buttons
Firm, flat planes that end in a glyph on the right, label left (`justify-content: space-between`).
- **Shape:** square (0px), 1.5px border, min-height 56px (64px in the checker, 44px small).
- **Primary:** Crouwel Blue plane, Paper text, Golos 600 at step 1.
- **Hover / Focus:** plane flips to Ink in 160ms cubic-bezier(.2,.8,.2,1); focus is a 3px blue outline offset 2px.
- **Ghost:** Paper fill, blue border and text; hover fills blue with Paper text.
- **Small / Wide:** small for in-result links; wide spans the form column.
- **End glyph:** a plain line arrow for site links; the Telegram paper-plane icon for any button that opens Telegram. Icons are 1.3em line SVGs, 1.6 stroke, square caps and mitred joins.

### Chips
Bordered grid cells, not pills: Paper fill, Ink Golos 500, min-height 52px, each led by the 14px status marker. Hover/focus fills blue with Paper text. The last "Все N стран" cell is blue text with an arrow.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** Paper on a translucent band.
- **Shadow Strategy:** none (see Elevation).
- **Border:** 1.5px Crouwel Blue, shared with neighbours.
- **Internal Padding:** 12–22px inside cells; photo cells carry a caption bar (blue top rule) that flips to a blue plane on hover.

### Inputs / Fields
Form rows are two-cell strips: a label cell (Golos 500, step 1) and the control, divided by a blue vertical, the whole row bordered. Controls are borderless, min-height 60px, with a blue chevron for selects. Focus is shown on the whole row (`:focus-within`, 3px blue outline). Placeholders use Muted Ink. The passport-page filter uses the same strip.

### Navigation
Brand name left, Golos 500 links centred in blue, current/hover link turns Ink with a 2px blue underline, ghost Telegram button right, blue hairline under the bar. Under 860px the links drop to their own row with a Guide Line top rule, scroll horizontally with a white fade on the right, and the Telegram button shrinks to its icon (44px target). Breadcrumbs are Small text above the page title.

### Visa Verdict Cell (signature)
The answer to "нужна ли виза". Tektur 700 uppercase at Title size, min-height 52px, 2px border, filled per the Status Cell Rule; the matching 14px marker repeats the treatment in lists, chips, jump links and group heads. In the checker it sits inside a bordered result cell under a "Паспорт → Страна" line, followed by stay, Ivan's note and a small ghost button. On each check the result rebuilds with a stepped reveal (420ms, `steps(6)`, clip-path left to right); reduced motion shows it at once.

### Ledger Lists
Cheat lists, timeline and fact tables are ruled ledgers: a blue top rule, 1px blue row dividers, bold blue (or Ink) term, Soft Ink description. Timeline years sit in their own Tektur blue cell divided by a blue vertical.

### Stats Strip
Four bordered cells of big blue Tektur numerals with a Small Soft Ink caption: real, first-hand numbers only.

## Do's and Don'ts

### Do:
- **Do** draw every container with the 1.5px Crouwel Blue line and square corners; let neighbouring cells share borders.
- **Do** name the visa status in words and encode it as the cell treatment: solid blue = без визы, blue outline = по прилёту, blue hatch = e-visa/ETA, solid ink = нужна виза, ink + strike = запрещён.
- **Do** set headings and numerals in Tektur uppercase; set text, labels, nav and buttons in Golos.
- **Do** end site-link buttons in a plain line arrow and Telegram buttons in the Telegram icon.
- **Do** use real photos only, inside bordered cells with a caption bar.
- **Do** keep the background to faint vertical column guides: 12 columns, 4 on phones.
- **Do** keep motion to colour swaps (160ms) and the stepped result rebuild, and honour reduced motion.

### Don't:
- **Don't** add a decorative diagonal "/" anywhere: not after headings, not in buttons, not in the logo, not as list bullets.
- **Don't** draw a graph-paper square grid; it reads as a school notebook.
- **Don't** make it childish or handwritten: no zine textures, scribbles, stickers, tilted elements or rounded friendly shapes.
- **Don't** set Tektur in lowercase or sentence case.
- **Don't** put eyebrow or kicker labels above headings.
- **Don't** use flag emoji (Windows renders them as letters).
- **Don't** use generated or stock faces.
- **Don't** add shadows, rounded corners or a second accent colour.
