---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief: site (home, visa pages, guide page)

Scope: whole site — home `/` (Persuade), visa index `/visa/` and generated `/visa/<passport>/<country>/` pages for post-Soviet passports (Read/Operate), Annapurna guide `/guide/annapurna/` (Persuade). The on-page visa checker covers all 196 passports from the bot's database. Code-led build; critique reference: `.impeccable/mocks/decision/r1-crouwel.png` (decision comp chosen by the user, round 2 after the zine was rejected as childish). Craft bar: `.impeccable/reference/crouwel-board.png`, `.impeccable/reference/crouwel-hero.png`.

Audience/job: Russian-speaking traveller, on a phone, asking "нужна ли мне виза в X"; then takes the free Annapurna guide via the bot and subscribes to the channel.
Proof on hand: 900+ bot checks, 196 passports, 190+ countries, guide 58 pages / 17 days / 5 416 m / ≈22 400 ₽, real photos, Ivan's how-to posts. No prices, no paid products, no testimonials.
Constraints: GitHub Pages under /sitevanya/ (relative URLs), no paid offers, flycheck bot not shown, Russian only. User feedback: must feel grown-up, not childish.

## Direction contract

THESIS: A rigorous Crouwel-style type specimen where the visa answer is a cell on the grid: structure is the proof of reliability. Refuses the category default (full-bleed mountain photo + headline + article cards) and the rejected playful zine.

OWN-WORLD: White ground with a faint 12-column layout grid (vertical column guides only, no graph-paper squares — user rejected the squared grid as school-notebook) and an offset-dot texture; ink #111; Crouwel blue #0057ff as the single accent for hairline cell borders, links and the primary button plane. No decorative diagonal "/" anywhere — the owner rejected it; buttons end in a plain arrow, Telegram buttons in the Telegram icon. Display: Tektur (chamfered, grid-built, Cyrillic) in heavy weights; text: Golos. Visa status is a cell treatment, always named in words: без визы = solid blue cell, по прилёту = blue outline, e-visa/ETA = blue diagonal hatch, нужна виза = solid ink, запрещён = ink with a diagonal strike. Photos sit inside bordered cells; Annapurna appears as a blue halftone dot matrix derived from a real channel photo.

STORY: The visitor sees "ВИЗА?" at monumental scale, picks passport and country in the grid-aligned form, and the result cell answers instantly with status, stay and Ivan's how-to link; believes it because the system is precise and Ivan checked it himself; then takes the free guide in the bot and subscribes.

FIRST VIEWPORT: Top bar: "Иван Шматов /" left, Визы · Гайд по Аннапурне · Полезное · Обо мне centred, outlined "Telegram-канал" button right, blue hairline under it. Left ~60% cell: "ВИЗА?" in Tektur 900 spanning the cell, a long blue diagonal after it, one meta line (Иван Шматов · путешествую сам с 2019 года · 900+ проверок · 196 паспортов), blue rule, dot texture. Right ~40% cell divided by a blue vertical rule: form rows (Паспорт | select, Куда | input) as bordered grid rows, full-width blue "Проверить →" button, result cell below. Primary action = Проверить. Next row (guide) starts at the fold edge.

FORM: Crouwel gridded type specimen, chosen by the user from the re-rolled hand (challenger, competitive verdict; not on own grounded list); seed:9d2277a1491dca9e (re-roll 1).
Signature interaction: on check, the result cell rebuilds cell by cell (stepped clip-path reveal) ; reduced motion shows the result at once.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
