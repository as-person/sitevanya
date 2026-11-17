// Слой данных: читает data/visa.json (выгрузка из visa.db бота) и готовит
// нормализованные записи для генерации страниц.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const raw = JSON.parse(readFileSync(join(root, 'data', 'visa.json'), 'utf8'));

// Паспорта, которые показываем (постсоветские), в порядке важности.
// gen — родительный падеж для заголовков «гражданам России».
export const PASSPORTS = [
  { code: 'RU', slug: 'rossiya', name: 'Россия', gen: 'России', dat: 'России' },
  { code: 'BY', slug: 'belarus', name: 'Беларусь', gen: 'Беларуси', dat: 'Беларуси' },
  { code: 'KZ', slug: 'kazakhstan', name: 'Казахстан', gen: 'Казахстана', dat: 'Казахстана' },
  { code: 'UZ', slug: 'uzbekistan', name: 'Узбекистан', gen: 'Узбекистана', dat: 'Узбекистана' },
  { code: 'KG', slug: 'kyrgyzstan', name: 'Кыргызстан', gen: 'Кыргызстана', dat: 'Кыргызстана' },
  { code: 'TJ', slug: 'tadzhikistan', name: 'Таджикистан', gen: 'Таджикистана', dat: 'Таджикистана' },
  { code: 'AM', slug: 'armeniya', name: 'Армения', gen: 'Армении', dat: 'Армении' },
  { code: 'AZ', slug: 'azerbaydzhan', name: 'Азербайджан', gen: 'Азербайджана', dat: 'Азербайджана' },
  { code: 'UA', slug: 'ukraina', name: 'Украина', gen: 'Украины', dat: 'Украины' },
];

// Статусы: порядок = от «проще всего» к «сложнее всего».
export const STATUS = {
  visa_free:       { key: 'free',     label: 'Без визы',            short: 'Без визы',     rank: 0 },
  visa_on_arrival: { key: 'arrival',  label: 'Виза по прилёту',     short: 'По прилёту',   rank: 1 },
  eta:             { key: 'eta',      label: 'Электронное разрешение (ETA)', short: 'ETA', rank: 2 },
  evisa:           { key: 'evisa',    label: 'Электронная виза',    short: 'E-visa',       rank: 3 },
  visa_required:   { key: 'required', label: 'Нужна виза',          short: 'Нужна виза',   rank: 4 },
  no_admission:    { key: 'banned',   label: 'Въезд запрещён',      short: 'Запрещён',     rank: 5 },
};

const TR = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k',
  л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
  ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};
export function slugify(s) {
  return s.toLowerCase().split('').map((c) => (c in TR ? TR[c] : c)).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function flag(code) {
  if (!/^[A-Z]{2}$/.test(code)) return '';
  return String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

// Разрешаем в заметках только <a href="https://..."> и <b>; остальное экранируем.
export function cleanNote(html) {
  if (!html) return '';
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const parts = [];
  const re = /<a\s+href="(https:\/\/[^"]+)">([\s\S]*?)<\/a>|<b>([\s\S]*?)<\/b>/g;
  let last = 0, m;
  while ((m = re.exec(html))) {
    parts.push(esc(html.slice(last, m.index)));
    if (m[1]) parts.push(`<a href="${m[1].replace(/"/g, '')}" rel="noopener" target="_blank">${esc(m[2])}</a>`);
    else parts.push(`<strong>${esc(m[3])}</strong>`);
    last = re.lastIndex;
  }
  parts.push(esc(html.slice(last)));
  return parts.join('').trim().replace(/\n+/g, '<br>');
}

// Ссылка на личный разбор Ивана в канале, если есть в заметке.
function guideLink(note) {
  const m = note && note.match(/<a href="(https:\/\/t\.me\/shmatov_ivan\/\d+)">([^<]+)<\/a>/);
  return m ? { url: m[1], title: m[2] } : null;
}

const names = raw.names;
export const UPDATED = raw.updated;

// Страны-назначения: только с нормальным названием и не совпадающие с паспортом.
const countrySlugs = new Map();
for (const [code, name] of Object.entries(names)) {
  let slug = slugify(name);
  if ([...countrySlugs.values()].includes(slug)) slug = `${slug}-${code.toLowerCase()}`;
  countrySlugs.set(code, slug);
}

export function countryName(code) { return names[code] || code; }

// Все паспорта из базы бота: сначала СНГ (со своими страницами), потом остальные по алфавиту.
export const ALL_PASSPORTS = (() => {
  const cis = new Set(PASSPORTS.map((p) => p.code));
  const rest = Object.keys(raw.passports)
    .filter((c) => !cis.has(c) && names[c])
    .map((c) => ({ code: c, slug: null, name: names[c] }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  return [...PASSPORTS, ...rest];
})();
export function countrySlug(code) { return countrySlugs.get(code); }

export function entriesFor(passportCode) {
  const rows = raw.passports[passportCode] || {};
  return Object.entries(rows)
    .filter(([dest]) => dest !== passportCode && names[dest] && STATUS[rows[dest][0]])
    .map(([dest, [req, stay, note]]) => ({
      code: dest,
      name: names[dest],
      slug: countrySlugs.get(dest),
      flag: flag(dest),
      status: req,
      st: STATUS[req],
      stay: stay && stay !== 'NULL' ? stay : '',
      note: cleanNote(note),
      guide: guideLink(note),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}
