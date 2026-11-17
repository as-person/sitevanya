# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS on GitHub Pages (repo `sitevanya`, served under `/sitevanya/` until a custom domain is attached). Visa pages are generated at build time by a small Node script from an export of the visa bot's SQLite database (`/root/bots/visabot/visa.db`: tables `visa_data` + `visa_overrides`, overrides win). No framework.

## Users

Russian-speaking independent travellers holding post-Soviet passports (primarily Russia; also Belarus, Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, Armenia, Azerbaijan, Ukraine). They plan their own trips on a modest-to-mid budget and arrive with a concrete question: "do I need a visa for X with my passport", "how much does the Annapurna trek really cost", "how do I open a bank card / get a SIM there". Most arrive on a phone, from a search engine (Yandex, Google) or from a link in Telegram. Non-Russian-speaking audiences are explicitly out of scope.

Secondary: existing readers of Ivan's Telegram channel looking for his tools, guide and story.

## Product Purpose

The site of Ivan Shmatov, a traveller since 2019 (quit a Moscow airport job, taught English in China, worked in Korea, hitchhiked to Magadan, 22 countries solo in 2025–26). It exists to be a destination people reach from search, not a link-in-bio: it turns real, first-hand travel knowledge into tools and pages, and routes visitors into his Telegram channel and bot. Success = new subscribers to @shmatov_ivan and new users of the visa bot, measurable via bot deep links (`?start=<source>`).

No paid products are sold yet; paid guides/services are planned later. The site must be able to add them without restructuring.

## Positioning

Everything comes from someone who went there himself and wrote down the real prices: daily trek costs in rupees and roubles, the visa process he personally went through (Japan, UK, India, Australia, Indonesia, Vietnam, Singapore, Nepal), bank cards opened as a tourist. The visa data is hand-corrected for post-Soviet passports, which generic visa sites get wrong.

## Operating Context

- Telegram channel https://t.me/shmatov_ivan (≈1.86K subscribers, ≈700 views per post). Channel description lists the bots and the contact @shmatov_ivan_claraterra.
- Visa bot https://t.me/visacheck_shmatov_bot — free, gated by channel subscription; supports `?start=guides` to open the guides menu directly; has a "Безвизовые страны" list for post-Soviet passports.
- Free Annapurna guide is delivered as a PDF by the visa bot (deep link `https://t.me/visacheck_shmatov_bot?start=guides`), in exchange for subscribing to the channel.
- Other platforms: YouTube @IvanShmatov, Dzen, VK.
- The flight-receipt bot (flycheck) is deliberately NOT promoted on the site.

## Capabilities and Constraints

- Visa status vocabulary: visa_free, visa_on_arrival, evisa, eta, visa_required, no_admission; plus allowed stay and Russian notes (some with links to Ivan's how-to posts).
- Visa data for post-Soviet passports was manually verified by the owner; base data scraped from Wikipedia. Pages must show the passport, status, stay, notes and a "check in the bot / verify before travel" reminder.
- Paid products: none yet. Do not show prices or "buy" actions. Donations limited to the one working T-Bank link.
- Must work well on phones and inside Telegram's in-app browser; needs OG previews.

## Brand Commitments

- Voice: first person, plain, a little self-ironic, informal "ты/вы" — pick "вы" consistently on the site. Specific numbers over adjectives.
- Name: Иван Шматов. Canonical Telegram handle: @shmatov_ivan.

## Evidence on Hand

- Annapurna guide PDF, 58 pages, autumn 2026 (local copy in session scratchpad; source on server `/root/bots/visabot/Аннапурна_гайд_журнальный.pdf`): 17 days, Thorong La 5416 m, 2 passes above 5000 m, 40 799 NPR (~22 400 ₽) per person for 16 days, ≈2 550 NPR/day.
- Guide downloads: 49 in the first 5 days (48 unique).
- Visa bot: 341 users, 904 checks (as of 17.11.2026).
- Channel posts with daily trek prices (Oct–Nov 2026), visa how-tos, bank card posts (Vietnam BIDV, Nepal Khalti).
- Photos: Ivan's portraits in `images/`; channel photos and guide pages approved for use.
- Absent: testimonials, press, prices for services, exact lifetime country count. Do not fabricate these.

## Product Principles

1. Give first: the visa answer and the guide are free and immediate; subscription is asked for after value, never before.
2. First-hand or nothing: every number on the site is one Ivan paid or saw.
3. Search-first pages: each page answers one concrete question a traveller types into a search engine.
4. One door into Telegram: every page ends in the channel or the bot, with a tracked deep link.

## Accessibility & Inclusion

WCAG AA contrast, keyboard operable, works at 320px width and in Telegram's in-app browser, respects reduced motion.
