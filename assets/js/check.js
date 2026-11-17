// Проверка визы прямо на странице: данные — assets/data/visa-<паспорт>.json
(function () {
  document.documentElement.classList.add('js');
  var form = document.querySelector('[data-checker]');
  if (!form) return;

  var root = form.getAttribute('data-root') || './';
  var passport = form.querySelector('[name="passport"]');
  var dest = form.querySelector('[name="dest"]');
  var list = document.getElementById('dest-list');
  var out = document.querySelector('[data-answer]');
  var cache = {};

  var LABEL = {
    free: 'Без визы', arrival: 'Виза по прилёту', eta: 'Нужно разрешение ETA',
    evisa: 'Электронная виза', required: 'Нужна виза', banned: 'Въезд запрещён'
  };

  function load(code) {
    if (cache[code]) return Promise.resolve(cache[code]);
    return fetch(root + 'assets/data/visa-' + code + '.json')
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { cache[code] = d; return d; });
  }

  function norm(s) { return (s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/g, ''); }

  function fillList(data) {
    list.innerHTML = '';
    data.c.forEach(function (row) {
      var o = document.createElement('option');
      o.value = row[1];
      list.appendChild(o);
    });
  }

  function find(data, q) {
    var n = norm(q);
    if (!n) return null;
    var exact = null, starts = null;
    data.c.forEach(function (row) {
      var rn = norm(row[1]);
      if (rn === n) exact = row;
      else if (!starts && rn.indexOf(n) === 0) starts = row;
    });
    return exact || starts;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var slashSvg = out.querySelector('.slash');

  function reset() {
    out.classList.remove('is-drawing');
    out.innerHTML = '';
    if (slashSvg) out.appendChild(slashSvg);
  }

  function render(data, row) {
    reset();
    var pName = passport.options[passport.selectedIndex].text;
    if (!row) {
      out.appendChild(el('p', 'empty', 'Не нашёл такую страну. Попробуйте написать по-другому — например, «ОАЭ» или «Южная Корея».'));
      return;
    }
    var key = row[3];
    out.appendChild(el('p', 'from', pName + ' → ' + row[1]));
    var v = el('p', 'verdict', LABEL[key] || key);
    v.setAttribute('data-status', key);
    out.appendChild(v);
    if (row[4]) out.appendChild(el('p', 'stay', 'Срок: ' + row[4]));
    if (row[5]) {
      var note = el('p', 'note');
      note.innerHTML = row[5]; // заметки очищены при сборке: только <a> и <strong>
      out.appendChild(note);
    }
    if (data.slug) {
      var more = el('p', 'more');
      var a = el('a', 'btn btn--ghost btn--sm', 'Подробнее: ' + row[1]);
      a.insertAdjacentHTML('beforeend', '<svg class="ic" aria-hidden="true"><use href="#i-arrow"/></svg>');
      a.href = root + 'visa/' + data.slug + '/' + row[2] + '/';
      more.appendChild(a);
      out.appendChild(more);
    }
    void out.offsetWidth; // перезапуск анимации сборки клетки
    out.classList.add('is-drawing');
  }

  function onPassport() {
    load(passport.value).then(fillList).catch(function () {});
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    load(passport.value).then(function (data) {
      render(data, find(data, dest.value));
    }).catch(function () {
      reset();
      out.appendChild(el('p', 'empty', 'Не получилось загрузить данные. Проверьте интернет или спросите в боте.'));
    });
  });
  passport.addEventListener('change', onPassport);
  onPassport();
})();

// Фильтр списка стран на визовых страницах
(function () {
  var input = document.querySelector('[data-filter]');
  if (!input) return;
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-name]'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('[data-group]'));
  var empty = document.querySelector('[data-filter-empty]');
  function norm(s) { return (s || '').toLowerCase().replace(/ё/g, 'е'); }
  input.addEventListener('input', function () {
    var q = norm(input.value.trim());
    var shown = 0;
    items.forEach(function (li) {
      var ok = !q || norm(li.getAttribute('data-name')).indexOf(q) !== -1;
      li.hidden = !ok;
      if (ok) shown++;
    });
    groups.forEach(function (g) {
      g.hidden = !g.querySelector('[data-name]:not([hidden])');
    });
    if (empty) empty.hidden = shown !== 0;
  });
})();
