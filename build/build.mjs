// Сборка статического сайта: node build/build.mjs
// Пишет в корень репозитория (GitHub Pages раздаёт его как есть).
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PASSPORTS, ALL_PASSPORTS, STATUS, entriesFor, UPDATED } from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://as-person.github.io/sitevanya/';
const TG = 'https://t.me/shmatov_ivan';
const BOT = 'https://t.me/visacheck_shmatov_bot';
const BOT_GUIDE = 'https://t.me/visacheck_shmatov_bot?start=guides';
const CHECKS = '900+';
const YEAR = new Date().getFullYear();

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/(\d) (?=\d|м(?![а-яё])|₽|дн|ден|стр|час|мес|год|лет)/g, '$1\u00a0');
const urls = [];
const nbText = (html) => html.replace(/>([^<]+)</g, (m, t) => '>' + t
  .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0')
  .replace(/(\d) (?=(?:м|км|₽|\$|дн|ден|стр|час|мес|лет|год|руп|паспорт|стран|провер)(?![a-z]))/g, '$1\u00a0')
  .replace(/© (\d{4}) /g, '©\u00a0$1\u00a0') + '<');

function write(rel, html) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, nbText(html));
  if (rel.endsWith('index.html')) urls.push(rel.replace(/index\.html$/, ''));
}
const up = (depth) => (depth ? '../'.repeat(depth) : './');
const plural = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? b : c; };

// ---------- графика: прямые линии на сетке ----------
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-tg" viewBox="0 0 24 24"><path d="M21.6 3.4 2.6 10.8l6 2.1 2.2 6.6 3.2-4 4.9 3.7 2.7-15.8ZM8.6 12.9l10.8-7.5-8.6 9.6"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M3 12h17M13.5 5.5 20 12l-6.5 6.5"/></symbol>
<symbol id="i-out" viewBox="0 0 24 24"><path d="M6 18 18 6M8.5 6H18v9.5"/></symbol>
</svg>`;
const icon = (id) => `<svg class="ic" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const bslash = '<svg class="ic" aria-hidden="true"><use href="#i-arrow"/></svg>';
const tgEnd = icon('tg');
const slash = () => '';

// ---------- каркас ----------
function page({ depth, title, desc, path, body, current = '', og = 'assets/img/og.jpg', jsonld = '' }) {
  const r = up(depth);
  const nav = [
    ['visa/', 'Визы', 'visa'],
    ['guide/annapurna/', 'Гайд по Аннапурне', 'guide'],
    ['#polezno', 'Полезное', 'cheats'],
    ['#obo-mne', 'Обо мне', 'about'],
  ].map(([href, label, key]) => `<a href="${r}${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${path}">
<meta property="og:type" content="website">
<meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="Иван Шматов">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${SITE}${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="${r}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${r}assets/fonts/tektur-cyr.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${r}assets/fonts/golos-cyr.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${r}assets/css/site.css">
${jsonld}
</head>
<body>
<a class="skip" href="#main">К содержанию</a>
${SPRITE}
<header class="site-head">
  <div class="wrap">
    <a class="brand" href="${r}">Иван Шматов<span class="sr-only">, на главную</span></a>
    <nav class="nav" aria-label="Разделы"><div class="nav-scroll">${nav}</div></nav>
    <a class="btn btn--ghost head-tg" href="${TG}" rel="noopener" aria-label="Telegram-канал"><span class="label">Telegram-канал</span>${icon('tg')}</a>
  </div>
</header>
<main id="main">
${body}
</main>
${footer()}
<script src="${r}assets/js/check.js" defer></script>
</body>
</html>
`;
}

function footer() {
  return `<footer class="site-foot">
  <div class="wrap">
    <div class="foot-cta">
      <div>
        <h2>Пишу о том, где был сам</h2>
        <p>Визы, реальные цены по дням, банковские карты и сим-карты за границей, треки. Всё это сначала выходит в Telegram-канале.</p>
      </div>
      <a class="btn" href="${TG}" rel="noopener">Подписаться на канал${tgEnd}</a>
    </div>
    <div class="foot-links">
      <ul>
        <li><a href="${TG}" rel="noopener">Telegram</a></li>
        <li><a href="${BOT}" rel="noopener">Визовый бот</a></li>
        <li><a href="https://www.youtube.com/@IvanShmatov" rel="noopener">YouTube</a></li>
        <li><a href="https://vk.com/club230976446" rel="noopener">ВКонтакте</a></li>
        <li><a href="https://dzen.ru/id/5ff2362bfe4e686f6a7f4254" rel="noopener">Дзен</a></li>
      </ul>
      <ul>
        <li>Реклама и вопросы: <a href="https://t.me/shmatov_ivan_claraterra" rel="noopener">@shmatov_ivan_claraterra</a></li>
        <li><a href="https://www.tbank.ru/cf/A9KI33VJCd3" rel="noopener">Поддержать автора</a></li>
      </ul>
    </div>
    <p class="disclaimer">Визовые правила меняются. Данные — из базы визового бота: паспорта стран СНГ проверены вручную, остальные собраны из открытых источников. Перед поездкой сверяйтесь с сайтом посольства. © ${YEAR} Иван Шматов</p>
  </div>
</footer>`;
}

// ---------- данные для формы ----------
const dataDir = join(ROOT, 'assets', 'data');
if (existsSync(dataDir)) rmSync(dataDir, { recursive: true });
mkdirSync(dataDir, { recursive: true });
const ENTRIES = {};
for (const p of ALL_PASSPORTS) {
  const list = entriesFor(p.code);
  ENTRIES[p.code] = list;
  writeFileSync(join(dataDir, `visa-${p.code}.json`), JSON.stringify({
    slug: p.slug,
    c: list.map((e) => [e.code, e.name, e.slug, e.st.key, e.stay, e.note]),
  }));
}
const PASSPORT_COUNT = ALL_PASSPORTS.length;

// ---------- общие блоки ----------
const stats = (items) => `<ul class="stats">${items.map(([n, l]) => `<li><b>${n}</b><span>${l}</span></li>`).join('')}</ul>`;
function resultInner(passport, e, r, routePrefix = '') {
  return `<p class="from">${routePrefix}${esc(passport.name)} → ${esc(e.name)}</p>
      <p class="verdict" data-status="${e.st.key}">${esc(e.st.label)}</p>
      ${e.stay ? `<p class="stay">Срок: ${esc(e.stay)}</p>` : ''}
      ${e.note ? `<p class="note">${e.note}</p>` : ''}
      ${passport.slug ? `<p class="more"><a class="btn btn--ghost btn--sm" href="${r}visa/${passport.slug}/${e.slug}/">Подробнее: ${esc(e.name)}${bslash}</a></p>` : ''}`;
}

function checker(r, passportCode, destName, sample) {
  const opt = (p) => `<option value="${p.code}"${p.code === passportCode ? ' selected' : ''}>${esc(p.name)}</option>`;
  const opts = `<optgroup label="Страны СНГ">${PASSPORTS.map(opt).join('')}</optgroup><optgroup label="Все страны">${ALL_PASSPORTS.slice(PASSPORTS.length).map(opt).join('')}</optgroup>`;
  return `<h2 class="panel-title" id="check-title">Проверка визы</h2>
    <form class="checker" data-checker data-root="${r}" action="${r}visa/" autocomplete="off" aria-labelledby="check-title">
      <div class="row"><label for="f-passport">Паспорт:</label><select id="f-passport" name="passport">${opts}</select></div>
      <div class="row"><label for="f-dest">Куда:</label><input id="f-dest" name="dest" list="dest-list" placeholder="Например, Таиланд" value="${esc(destName)}" required></div>
      <datalist id="dest-list"></datalist>
      <button class="btn btn--wide" type="submit">Проверить${bslash}</button>
    </form>
    <div class="result" data-answer aria-live="polite">${slash()}${sample}</div>`;
}

const TRIPS = [
  { img: 'tilicho', post: 3129, cap: 'Озеро Тиличо, 4 919 м', sub: 'Непал · ноябрь 2026' },
  { img: 'larkya-pass', post: 3025, cap: 'Перевал Ларкья-Ла, 5 106 м', sub: 'Непал · октябрь 2026' },
  { img: 'perito-moreno', post: 2445, cap: 'Ледник Перито-Морено', sub: 'Аргентина · январь 2026' },
  { img: 'iguazu', post: 2504, cap: 'Водопады Игуасу', sub: 'Аргентина и Бразилия · 2026' },
  { img: 'papua', post: 2890, cap: 'Энаротали, Папуа', sub: 'Индонезия · 2024' },
];

const CHEATS = [
  {
    title: 'Визы, которые я оформлял сам',
    items: [
      [2946, 'Виза в Японию', 'визовый центр, справки, программа поездки'],
      [2879, 'Виза в Великобританию', 'сколько стоит и где сдавать биометрию'],
      [70, 'Виза в Индию', 'e-Visa на 30 дней, год и 5 лет'],
      [488, 'Виза в Австралию', 'подача, биометрия, сроки'],
      [674, 'Виза в Индонезию', 'по прилёту и электронная'],
      [196, 'Виза во Вьетнам', 'e-visa и безвиз на 45 дней'],
      [686, 'Сингапур', 'транзит 96 часов без визы'],
      [8, 'Виза в Непал', 'по прилёту в Катманду'],
    ],
  },
  {
    title: 'Деньги, связь, мелочи',
    items: [
      [2951, 'Банковская карта во Вьетнаме в 2026', 'BIDV по загранпаспорту и туристической визе'],
      [3113, 'Карта в Непале за 13 ₽', 'Khalti: QR, виртуальная карта, пополнение криптой'],
      [2969, 'Сим-карта для трека вокруг Аннапурны', 'NTC против Ncell, 100 ГБ за 700 ₽'],
      [2968, 'Пермит на Аннапурну', '3 000 рупий, 5 минут в иммиграционном офисе'],
      [99, 'Бизнес-зал бесплатно', 'без премиальных карт'],
      [529, 'Кемпинги в Новой Зеландии', 'где можно спать бесплатно, а где штраф'],
    ],
  },
];

// ---------- главная ----------
function home() {
  const r = up(0);
  const ru = PASSPORTS[0];
  const jp = ENTRIES.RU.find((e) => e.code === 'JP');
  const trips = TRIPS.map((t, i) => `<a class="trip" href="${TG}/${t.post}" rel="noopener"><img src="assets/img/trips/${t.img}.webp" alt="${esc(t.cap)}" width="600" height="750"${i ? ' loading="lazy"' : ''}><span class="cap"><span><b>${esc(t.cap)}</b><small>${esc(t.sub)}</small></span>${icon('out')}</span></a>`).join('');
  const cheats = CHEATS.map((g) => `<div class="cheat"><h3>${esc(g.title)}</h3><ul>${g.items.map(([post, t, s]) => `<li><a href="${TG}/${post}" rel="noopener"><b>${esc(t)}</b><span>${esc(s)}</span>${icon('out')}</a></li>`).join('')}</ul></div>`).join('');

  const body = `
<section class="band hero" aria-labelledby="hero-title">
  <div class="wrap split">
    <div>
      <h1 id="hero-title" class="mega">Виза?${slash()}</h1>
      <p class="meta"><span>${CHECKS} проверок в боте</span><span>${PASSPORT_COUNT} паспортов</span><span>190+ стран</span></p>
      <figure class="portrait">
        <img src="assets/img/trips/ivan.webp" alt="Иван Шматов на треке в Непале" width="600" height="750" fetchpriority="high">
        <figcaption>
          <p class="quote">Проверяю визы перед каждой своей поездкой. Здесь та же база, что в моём боте.</p>
          <p class="sign">Иван Шматов<span>путешествую сам с 2019 года</span></p>
        </figcaption>
      </figure>
    </div>
    <div>
      ${checker(r, 'RU', 'Япония', resultInner(ru, jp, r))}
    </div>
  </div>
</section>
<section class="band guide-row" aria-labelledby="guide-title">
  <div class="wrap split">
    <div>
      <h2 id="guide-title"><a href="guide/annapurna/">Трек вокруг Аннапурны</a></h2>
      ${stats([['58', 'страниц в бесплатном PDF'], ['17', 'дней пешком'], ['5 416', 'метров — Торонг-Ла'], ['≈22 400 ₽', 'еда и жильё за 16 дней']])}
      <div class="btn-row">
      <a class="btn" href="${BOT_GUIDE}" rel="noopener">Забрать бесплатно в боте${tgEnd}</a>
      <a class="btn btn--ghost" href="guide/annapurna/">Что внутри${bslash}</a>
      </div>
      <p class="note">Маршрут по дням, реальные цены в рупиях и рублях, документы и акклиматизация — по нашему походу осенью 2026 года.</p>
    </div>
    <div>
      <a class="plate" href="guide/annapurna/" aria-label="Подробнее о гайде по Аннапурне">${slash()}<img src="assets/img/annapurna-dots.png" alt="Склон Аннапурны, растровая сетка из фото с трека" width="900" height="600" loading="lazy"><span class="cap"><span>Аннапурна · 8 091 м</span><span>Подробнее →</span></span></a>
    </div>
  </div>
</section>
<section class="section band" aria-labelledby="trips-title">
  <div class="wrap">
    <div class="section-head"><h2 id="trips-title">Где был сам</h2><p>Каждое фото ведёт на пост: как туда добраться и сколько это стоило.</p></div>
    <div class="trips">${trips}</div>
  </div>
</section>
<section class="section band" id="polezno" aria-labelledby="cheats-title">
  <div class="wrap">
    <div class="section-head"><h2 id="cheats-title">Перед поездкой</h2><p>Пошаговые разборы из канала: что сделал, сколько заплатил, где споткнулся.</p></div>
    <div class="split split--even">${cheats}</div>
  </div>
</section>
<section class="section about" id="obo-mne" aria-labelledby="about-title">
  <div class="wrap">
    <div class="section-head"><h2 id="about-title">Обо мне</h2></div>
    <div class="split split--about">
      <div>
        <p class="intro">Работал в московском аэропорту. 6 марта 2019 года уволился и в тот же день улетел в Китай — с тех пор в дороге.</p>
        <ol class="timeline">
          <li><span class="y">2019</span><div><b>Китай и Вьетнам</b><p>Учитель английского в Китае, потом Ханой и Дананг.</p></div></li>
          <li><span class="y">2019</span><div><b>Корея с $50 в кармане</b><p>41 день работы и 19 дней путешествий — вывез из страны $2 500.</p></div></li>
          <li><span class="y">2021</span><div><b>Автостопом до Магадана</b><p>Зимой через всю страну, по Колыме.</p></div></li>
          <li><span class="y">2024</span><div><b>Папуа и Эверест</b><p>Задержали военные в Энаротали, позже — одиночный поход к базовому лагерю Эвереста.</p></div></li>
          <li><span class="y">2025–26</span><div><b>22 страны соло</b><p>От Гонконга и Австралии до Патагонии, Перу и Парагвая.</p></div></li>
          <li><span class="y">2026</span><div><b>Аннапурна и Манаслу</b><p>17 дней пешком, два перевала выше 5 000 м — и гайд по итогам.</p></div></li>
        </ol>
      </div>
      <div class="about-photos">
        <figure><img src="assets/img/trips/team.webp" alt="Иван с друзьями на финише трека вокруг Аннапурны" width="600" height="450" loading="lazy"><figcaption>Финиш трека вокруг Аннапурны, 2026</figcaption></figure>
        <figure><img src="assets/img/trips/hongkong.webp" alt="Иван в Гонконге" width="600" height="450" loading="lazy"><figcaption>Гонконг</figcaption></figure>
      </div>
    </div>
  </div>
</section>`;
  const jsonld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Иван Шматов', url: SITE, sameAs: [TG, 'https://www.youtube.com/@IvanShmatov', 'https://dzen.ru/id/5ff2362bfe4e686f6a7f4254'] })}</script>`;
  write('index.html', page({ depth: 0, path: '', title: 'Иван Шматов — нужна ли виза, гайды и честные цены из поездок', desc: `Проверьте за 5 секунд, нужна ли виза: ${PASSPORT_COUNT} паспортов, включая Россию, Беларусь, Казахстан и другие страны СНГ. Бесплатный гайд по треку вокруг Аннапурны и разборы из поездок.`, body, jsonld }));
}

// ---------- визовые страницы ----------
function passportSwitch(r, current) {
  return `<ul class="passport-switch" aria-label="Паспорт">${PASSPORTS.map((p) => `<li><a href="${r}visa/${p.slug}/"${p.code === current ? ' aria-current="page"' : ''}>${esc(p.name)}</a></li>`).join('')}</ul>`;
}

const GROUP_ORDER = ['visa_free', 'visa_on_arrival', 'eta', 'evisa', 'visa_required', 'no_admission'];
const GROUP_TITLE = {
  visa_free: 'Без визы', visa_on_arrival: 'Виза по прилёту', eta: 'Разрешение ETA',
  evisa: 'Электронная виза', visa_required: 'Нужна виза заранее', no_admission: 'Въезд запрещён',
};

function passportPage(p) {
  const depth = 2, r = up(depth);
  const list = ENTRIES[p.code];
  const groups = GROUP_ORDER.map((s) => {
    const items = list.filter((e) => e.status === s);
    if (!items.length) return '';
    return `<section class="group" id="${STATUS[s].key}" data-group><h2><span class="mark" data-status="${STATUS[s].key}" aria-hidden="true"></span>${GROUP_TITLE[s]}<span class="count">${items.length} ${plural(items.length, 'страна', 'страны', 'стран')}</span></h2>
    <ul class="country-list">${items.map((e) => `<li data-name="${esc(e.name)}"><a href="${e.slug}/"><span class="n">${esc(e.name)}</span><span class="s">${esc(e.stay || 'срок уточняйте')}</span></a></li>`).join('')}</ul></section>`;
  }).join('');
  const free = list.filter((e) => e.status === 'visa_free').length;
  const jump = `<ul class="jump" aria-label="Перейти к группе">${GROUP_ORDER.map((st) => { const n = list.filter((e) => e.status === st).length; return n ? `<li><a href="#${STATUS[st].key}"><span class="mark" data-status="${STATUS[st].key}" aria-hidden="true"></span>${GROUP_TITLE[st]}<span class="n">${n}</span></a></li>` : ''; }).join('')}</ul>`;
  const body = `
<div class="wrap crumbs"><ol><li><a href="${r}">Главная</a></li><li><a href="${r}visa/">Визы</a></li><li>Паспорт: ${esc(p.name)}</li></ol></div>
<section class="section" style="padding-top:clamp(24px,4vw,48px)"><div class="wrap">
  <h1 class="page-title">Куда можно без визы гражданам ${esc(p.gen)}</h1>
  <p class="lede" style="margin-bottom:26px">С паспортом ${esc(p.gen)} без визы — ${free} ${plural(free, 'страна', 'страны', 'стран')}. Ниже все страны по типу въезда: нажмите на страну, чтобы увидеть срок и подробности.</p>
  ${passportSwitch(r, p.code)}
  ${jump}
  <div class="filter"><label for="flt">Найти</label><input id="flt" data-filter type="search" placeholder="Название страны"></div>
  <p class="empty" data-filter-empty hidden>Такой страны в списке нет. Попробуйте другое написание.</p>
  <div class="groups">${groups}</div>
</div></section>`;
  write(`visa/${p.slug}/index.html`, page({ depth, path: `visa/${p.slug}/`, current: 'visa', title: `Куда можно без визы гражданам ${p.gen} — список стран ${YEAR}`, desc: `Безвизовые страны для паспорта ${p.gen}: ${free} ${plural(free, 'страна', 'страны', 'стран')} без визы, а также виза по прилёту и электронные визы. Список проверен вручную.`, body }));
}

const POPULAR = ['TH', 'VN', 'TR', 'GE', 'AE', 'CN', 'ID', 'JP', 'KR', 'IN', 'EG', 'NP', 'US', 'GB', 'FR', 'DE', 'IT', 'ES', 'MY', 'SG', 'PH', 'LK', 'MV', 'CU', 'MX', 'BR', 'AR', 'RS', 'ME', 'AM', 'AZ', 'KZ', 'UZ', 'KG', 'IL', 'QA', 'OM', 'MA', 'TN', 'CA', 'AU', 'NZ'];
function countryPage(p, e) {
  const depth = 3, r = up(depth);
  const same = ENTRIES[p.code].filter((x) => x.status === e.status && x.code !== e.code);
  const others = [...POPULAR.map((c) => same.find((x) => x.code === c)).filter(Boolean), ...same.filter((x) => !POPULAR.includes(x.code))].slice(0, 11);
  const samePlace = PASSPORTS.filter((q) => q.code !== p.code && ENTRIES[q.code].some((x) => x.code === e.code));
  const h1 = `${e.name}: нужна ли виза гражданам ${p.gen}`;
  const body = `
<div class="wrap crumbs"><ol><li><a href="${r}">Главная</a></li><li><a href="${r}visa/">Визы</a></li><li><a href="${r}visa/${p.slug}/">Паспорт: ${esc(p.name)}</a></li><li>${esc(e.name)}</li></ol></div>
<section class="band"><div class="wrap split">
  <div>
    <h1 class="page-title">${esc(h1)}</h1>
    <p class="verdict" data-status="${e.st.key}">${esc(e.st.label)}</p>
    <dl class="facts-table">
      <dt>Паспорт</dt><dd>${esc(p.name)}</dd>
      <dt>Страна</dt><dd>${esc(e.name)}</dd>
      ${e.stay ? `<dt>Срок</dt><dd>${esc(e.stay)}</dd>` : ''}
      ${e.note ? `<dt>Важно</dt><dd>${e.note}</dd>` : ''}
    </dl>
  </div>
  <aside class="ivan-note" aria-label="Перед поездкой">
    <p class="who"><img src="${r}assets/img/trips/ivan.webp" alt="" width="58" height="58">Перед поездкой проверьте</p>
    <ul>
      ${e.guide ? `<li>Оформлял сам и всё расписал: <a href="${e.guide.url}" rel="noopener">${esc(e.guide.title)}</a></li>` : ''}
      <li>Паспорт должен действовать ещё минимум 6 месяцев на дату въезда — так требуют многие страны.</li>
      <li>На границе или при посадке могут попросить обратный билет или билет в третью страну.</li>
      <li>Правила меняются: сверьтесь с сайтом посольства перед покупкой билетов.</li>
    </ul>
    <a class="btn btn--ghost btn--wide" href="${BOT}" rel="noopener">Проверить в боте${tgEnd}</a>
  </aside>
</div></section>
<section class="section"><div class="wrap">
  ${others.length ? `<h2 class="sub-h">Тоже «${esc(e.st.short.toLowerCase())}» для паспорта ${esc(p.gen)}</h2>
  <ul class="chips">${others.map((x) => `<li><a href="../${x.slug}/"><span class="mark" data-status="${x.st.key}" aria-hidden="true"></span>${esc(x.name)}</a></li>`).join('')}<li class="chip-all"><a href="../#${e.st.key}">Все ${same.length + 1} ${plural(same.length + 1, 'страна', 'страны', 'стран')}${bslash}</a></li></ul>` : ''}
  ${samePlace.length ? `<h2 class="sub-h" style="margin-top:44px">${esc(e.name)} для других паспортов</h2>
  <ul class="chips">${samePlace.map((q) => { const x = ENTRIES[q.code].find((y) => y.code === e.code); return `<li><a href="${r}visa/${q.slug}/${e.slug}/"><span class="mark" data-status="${x.st.key}" aria-hidden="true"></span>${esc(q.name)}: ${esc(x.st.short.toLowerCase())}</a></li>`; }).join('')}</ul>` : ''}
</div></section>`;
  const desc = `${e.st.label}${e.stay ? `, срок ${e.stay}` : ''}. ${e.name} для граждан ${p.gen}: тип въезда, срок пребывания и что проверить перед поездкой.`;
  const jsonld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: `${e.name}: нужна ли виза гражданам ${p.gen}?`, acceptedAnswer: { '@type': 'Answer', text: `${e.st.label}${e.stay ? `. Срок пребывания: ${e.stay}` : ''}.` } }] })}</script>`;
  write(`visa/${p.slug}/${e.slug}/index.html`, page({ depth, path: `visa/${p.slug}/${e.slug}/`, current: 'visa', title: `${h1} в ${YEAR} году`, desc, body, jsonld }));
}

function visaIndex() {
  const depth = 1, r = up(depth);
  const ru = ENTRIES.RU;
  const th = ru.find((e) => e.code === 'TH');
  const popular = ['TH', 'VN', 'TR', 'GE', 'AE', 'CN', 'ID', 'JP', 'KR', 'IN', 'EG', 'NP'].map((c) => ru.find((e) => e.code === c)).filter(Boolean);
  const body = `
<div class="wrap crumbs"><ol><li><a href="${r}">Главная</a></li><li>Визы</li></ol></div>
<section class="band hero" aria-labelledby="v-title">
  <div class="wrap split">
    <div>
      <h1 id="v-title" class="mega">Виза?${slash()}</h1>
      <p class="meta"><span>${PASSPORT_COUNT} паспортов</span><span>190+ стран</span><span>та же база, что в боте</span></p>
      <div class="dots" aria-hidden="true"></div>
    </div>
    <div>${checker(r, 'RU', '', resultInner(PASSPORTS[0], th, r, 'Например: '))}</div>
  </div>
</section>
<section class="section"><div class="wrap">
  <div class="section-head"><h2>Все страны по паспорту</h2><p>Списки «без визы / по прилёту / нужна виза» для паспортов стран СНГ.</p></div>
  ${passportSwitch(r, '')}
  <h2 class="sub-h" style="margin-top:44px">Частые вопросы с паспортом России</h2>
  <ul class="chips">${popular.map((e) => `<li><a href="rossiya/${e.slug}/"><span class="mark" data-status="${e.st.key}" aria-hidden="true"></span>${esc(e.name)}: ${esc(e.st.short.toLowerCase())}</a></li>`).join('')}</ul>
</div></section>`;
  write('visa/index.html', page({ depth, path: 'visa/', current: 'visa', title: `Нужна ли виза — проверка по паспорту (${YEAR})`, desc: `Проверка визы для ${PASSPORT_COUNT} паспортов: Россия, Беларусь, Казахстан, Узбекистан, Кыргызстан, Таджикистан, Армения, Азербайджан, Украина и другие. Без визы, по прилёту, e-visa.`, body }));
}

// ---------- гайд ----------
const ROUTE = [
  [1, 'Нади Базар', '≈930 м', '≈630 ₽'], [2, 'Санджапу', '', '≈650 ₽'], [3, 'Чамдже', '1 420 м', '≈960 ₽'],
  [4, 'Наче', '2 260 м', ''], [5, 'Крюк к Манаслу', '+1 600 м за день', '≈1 220 ₽'], [6, 'Бимтанг', '3 710 м', '≈1 430 ₽'],
  [7, 'Хай Кэмп', '4 400 м', '≈1 240 ₽'], [8, 'Ларкья-Ла', '5 106 м', '', true], [9, 'Тилче → Чаме', 'джип', ''],
  [10, 'Верхний Писанг', '3 300 м', '≈850 ₽'], [11, 'Нгавал', '', ''], [12, 'Мананг', '3 540 м', '≈2 580 ₽'],
  [13, 'Ice Lake', '4 620 м', '≈1 810 ₽'], [14, 'База Тиличо', '4 130 м', ''], [15, 'Озеро Тиличо', '4 919 м', ''],
  [16, 'Як Карка', '', ''], [17, 'Торонг-Ла', '5 416 м', '', true],
];
const TOC = ['Коротко о треке', 'Когда идти', 'Документы и разрешения', 'Деньги, карты и связь', 'Как добраться до старта', 'Карта маршрута', 'Готовые планы на 10, 14 и 17 дней', 'Катманду и Покхара до и после трека', 'Маршрут по дням — наш реальный опыт', 'Крюк к Манаслу и перевал Ларкья-Ла', 'Мананг и акклиматизация', 'Перевал Торонг-Ла и спуск в Муктинатх', 'Лучшие места для фото', 'Горная болезнь — самое важное', 'Карточка на экстренный случай', 'Жильё и еда', 'Бюджет', 'Снаряжение — чек-лист', 'Подготовка тела: план на 6 недель', 'Здоровье, вода и страховка', 'Самостоятельно или с гидом', 'Безопасность и местные правила', 'Разговорник: 20 фраз на непальском', 'Полезные приложения', 'Вопросы и ответы', 'Частые ошибки и чек-лист перед выходом'];

function guidePage() {
  const depth = 2, r = up(depth);
  const route = ROUTE.map(([d, place, h, cost, pass]) => `<li${pass ? ' class="pass"' : ''}><span class="d">День ${d}</span><p class="p">${esc(place)}</p>${h ? `<p class="h">${esc(h)}</p>` : ''}${cost ? `<p class="c">${esc(cost)} в день</p>` : ''}</li>`).join('');
  const pages = [['numbers', 'Маршрут в цифрах'], ['map', 'Карта маршрута'], ['day', 'Каждый день: цены и ночлег'], ['budget', 'Где спали и сколько платили']]
    .map(([f, c]) => `<figure><img src="${r}assets/img/guide/${f}.webp" alt="Страница гайда: ${esc(c)}" width="654" height="926" loading="lazy"><figcaption>${esc(c)}</figcaption></figure>`).join('');
  const body = `
<div class="wrap crumbs"><ol><li><a href="${r}">Главная</a></li><li>Гайд по Аннапурне</li></ol></div>
<section class="band" aria-labelledby="g-title">
  <div class="wrap split split--guide">
    <div><div class="cover-cell"><img src="${r}assets/img/guide/cover.webp" alt="Обложка гайда «Трек вокруг Аннапурны»" width="654" height="926" fetchpriority="high"></div></div>
    <div>
      <h1 id="g-title" class="g-title">Трек вокруг Аннапурны</h1>
      <p class="lede">Гайд, по которому мы прошли сами: маршрут по дням, реальные цены, документы, акклиматизация и снаряжение. Собран по нашему походу осенью 2026 года.</p>
      ${stats([['58', 'страниц'], ['17', 'дней пешком'], ['5 416 м', 'высшая точка'], ['≈$500', 'на человека, все траты']])}
      <div class="cta-row">
        <a class="btn" href="${BOT_GUIDE}" rel="noopener">Забрать бесплатно в боте${tgEnd}</a>
        <small>PDF придёт в Telegram. Бот попросит подписаться на канал — это и есть «оплата».</small>
      </div>
    </div>
  </div>
</section>
<section class="section" aria-labelledby="route-title">
  <div class="wrap">
    <div class="section-head"><h2 id="route-title">17 дней по сетке</h2><p>Наш реальный маршрут с крюком к Манаслу. Синие клетки — перевалы выше 5 000 м. Цены — сколько уходило на человека в день на еду и ночлег.</p></div>
    <div class="route-scroll" tabindex="0" role="region" aria-label="Маршрут по дням, листается вбок"><ol class="route">${route}</ol></div><p class="scroll-hint">Листайте вбок → все 17 дней</p>
  </div>
</section>
<section class="section" aria-labelledby="pages-title" style="padding-top:0">
  <div class="wrap">
    <div class="section-head"><h2 id="pages-title">Так выглядит внутри</h2><p>Журнальная вёрстка, карта с ключевыми точками и ссылками на Google Карты, таблицы цен.</p></div>
    <div class="pages">${pages}</div>
  </div>
</section>
<section class="section" aria-labelledby="toc-title" style="padding-top:0">
  <div class="wrap">
    <div class="section-head"><h2 id="toc-title">Что внутри</h2><p>26 разделов — от пермита до разговорника.</p></div>
    <ul class="toc">${TOC.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  </div>
</section>
<section class="section" aria-labelledby="how-title" style="padding-top:0">
  <div class="wrap">
    <div class="section-head"><h2 id="how-title">Как получить</h2></div>
    <ol class="steps">
      <li><b>Откройте бота</b><p>Кнопка ниже сразу открывает раздел «Путеводители».</p></li>
      <li><b>Подпишитесь на канал</b><p>Бот проверит подписку на @shmatov_ivan — без неё не пустит.</p></li>
      <li><b>Нажмите «Аннапурна»</b><p>PDF на 58 страниц придёт в чат. Сохраните его в офлайн до трека.</p></li>
    </ol>
    <a class="btn" href="${BOT_GUIDE}" rel="noopener">Забрать гайд${tgEnd}</a>
  </div>
</section>`;
  write('guide/annapurna/index.html', page({ depth, path: 'guide/annapurna/', current: 'guide', og: 'assets/img/og-guide.jpg', title: 'Трек вокруг Аннапурны — бесплатный гайд: маршрут по дням и реальные цены (2026)', desc: 'Гайд на 58 страниц по треку вокруг Аннапурны: 17 дней, перевал Торонг-Ла 5 416 м, цены в рупиях и рублях, пермиты, акклиматизация, снаряжение. Бесплатно в Telegram.', body }));
}

function notFound() {
  const body = `<section class="band hero"><div class="wrap split"><div>
  <h1 class="mega">404${slash()}</h1>
  <p class="meta"><span>Такой страницы нет</span><span>возможно, она переехала</span></p></div>
  <div><p class="lede" style="margin-bottom:22px">Проверить визу можно на главной, а гайд и разборы — в меню сверху.</p><a class="btn" href="/sitevanya/">На главную${bslash}</a></div></div></section>`;
  const html = page({ depth: 0, path: '404.html', title: 'Страница не найдена — Иван Шматов', desc: 'Страница не найдена.', body })
    .replace(/(href|src)="\.\/(?!\/)/g, '$1="/sitevanya/');
  writeFileSync(join(ROOT, '404.html'), html);
}

// ---------- запуск ----------
if (existsSync(join(ROOT, 'visa'))) rmSync(join(ROOT, 'visa'), { recursive: true });
home();
visaIndex();
for (const p of PASSPORTS) {
  passportPage(p);
  for (const e of ENTRIES[p.code]) countryPage(p, e);
}
guidePage();
notFound();

writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);
writeFileSync(join(ROOT, '.nojekyll'), '');
console.log(`pages: ${urls.length}, passports in checker: ${PASSPORT_COUNT}, visa data updated: ${UPDATED}`);
