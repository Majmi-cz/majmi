/* ============================================================
   zin.js — všechno, co se na webu hýbe
   ============================================================ */

/* Seznam textů v pořadí, jak vycházely.
   Nový text = přidej řádek na konec (s = název souboru bez .html). */
var TEXTY = [
  { s: 'pickle-jar', n: 'Pickle Jar' },
  { s: 'herakles', n: 'Héraklés' }
];

var pohyb = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
if (pohyb) document.documentElement.classList.add('js-pohyb');

/* ---------- 1) Světlo kopírky: jen při prvním otevření webu ---------- */
(function () {
  if (!pohyb) return;
  try {
    if (sessionStorage.getItem('kopirka')) return;
    sessionStorage.setItem('kopirka', '1');
  } catch (e) { return; }
  document.documentElement.classList.add('js-kopirka');
  setTimeout(function () { document.documentElement.classList.remove('js-kopirka'); }, 1600);
})();

/* ---------- 2) Vystřižená písmena ----------
   Každý znak z .vystrizky dostane jiné písmo, papír a natočení.
   Náhoda je "zamčená" podle textu, takže se to pokaždé složí stejně. */
(function () {
  var pisma = [
    { f: '"Anton", sans-serif', s: 1.0 },
    { f: '"Archivo", sans-serif', s: .82 },
    { f: '"Morris", serif', s: 1.0 },
    { f: '"Bodoni", serif', s: .95, i: true },
    { f: '"Stroj", monospace', s: .9 }
  ];
  var papiry = [
    ['#fbfbf7', '#121212'], ['#121212', '#fbfbf7'], ['#f4e23a', '#121212'],
    ['#d8d5cb', '#121212'], ['transparent', '#121212'], ['#fbfbf7', '#121212']
  ];
  function nahoda(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }
  document.querySelectorAll('.vystrizky').forEach(function (el) {
    var text = el.textContent.trim();
    var seed = 7;
    for (var k = 0; k < text.length; k++) seed = (seed * 31 + text.charCodeAt(k)) % 2147483647;
    var r = nahoda(seed);
    var poradi = 0;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(/\s+/).forEach(function (slovo) {
      var w = document.createElement('span');
      w.className = 'slovo';
      w.setAttribute('aria-hidden', 'true');
      el.appendChild(w);
      Array.from(slovo).forEach(function (ch) {
        var p = pisma[Math.floor(r() * pisma.length)];
        var pap = papiry[Math.floor(r() * papiry.length)];
        var naklon = ((r() - .5) * 12).toFixed(1);
        var s = document.createElement('span');
        s.className = 'p';
        s.textContent = ch;
        s.style.fontFamily = p.f;
        if (p.i) s.style.fontStyle = 'italic';
        s.style.fontSize = (p.s * (0.86 + r() * 0.28)).toFixed(2) + 'em';
        s.style.background = pap[0];
        s.style.color = pap[1];
        s.style.transform = 'rotate(' + naklon + 'deg) translateY(' + ((r() - .5) * .12).toFixed(2) + 'em)';
        s.style.setProperty('--i', poradi++);
        s.style.setProperty('--naklon', naklon + 'deg');
        w.appendChild(s);
      });
    });
  });
})();

/* ---------- 3) Lístky a fotky se přilepí, až k nim doscrolluješ ---------- */
(function () {
  if (!pohyb || !('IntersectionObserver' in window)) return;
  var kusy = document.querySelectorAll('.kus, .rozcestnik a, .fotky figure, .podtitul, .slova, .listovani a');
  var io = new IntersectionObserver(function (zaznamy) {
    var n = 0;
    zaznamy.forEach(function (z) {
      if (!z.isIntersecting) return;
      var zpozdeni = n++ * 90;
      var el = z.target;
      el.style.setProperty('--zpozdeni', zpozdeni + 'ms');
      el.classList.add('nalepeno');
      io.unobserve(el);
      // po nalepení uklidit, ať zpoždění nebrzdí efekt při najetí myší
      setTimeout(function () { el.classList.remove('ceka', 'nalepeno'); }, zpozdeni + 900);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
  kusy.forEach(function (el) { el.classList.add('ceka'); io.observe(el); });
})();

/* ---------- 4) Přepínání přepis / rukopis ---------- */
document.querySelectorAll('.zalozky [role="tab"]').forEach(function (tab, _, all) {
  tab.addEventListener('click', function () {
    all.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on);
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  });
});

/* ---------- 5) Ukazatel čtení (jen na stránce textu) ---------- */
(function () {
  if (!document.querySelector('.list-textu')) return;
  var bar = document.createElement('div');
  bar.className = 'postup';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var ceka = false;
  function obnov() {
    ceka = false;
    var max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
  }
  addEventListener('scroll', function () {
    if (!ceka) { ceka = true; requestAnimationFrame(obnov); }
  }, { passive: true });
  addEventListener('resize', obnov);
  obnov();
})();

/* ---------- 6) Předchozí / další text ----------
   <nav class="listovani" data-text="herakles"></nav> */
(function () {
  var nav = document.querySelector('.listovani[data-text]');
  if (!nav) return;
  var i = TEXTY.findIndex(function (t) { return t.s === nav.getAttribute('data-text'); });
  if (i < 0) return;
  function odkaz(t, kam, trida) {
    var a = document.createElement('a');
    a.href = t.s + '.html';
    a.className = trida;
    a.innerHTML = '<span class="kam"></span><span class="nazev"></span>';
    a.querySelector('.kam').textContent = kam;
    a.querySelector('.nazev').textContent = t.n;
    nav.appendChild(a);
  }
  if (TEXTY[i - 1]) odkaz(TEXTY[i - 1], '☜ předchozí', 'predchozi');
  if (TEXTY[i + 1]) odkaz(TEXTY[i + 1], 'další ☞', 'dalsi');
})();

/* ---------- 7) Prohlížení fotek rukopisu přes celou obrazovku ---------- */
(function () {
  var fotky = Array.from(document.querySelectorAll('.fotky img, .rukopis-stranky img'));
  if (!fotky.length) return;
  var box = document.createElement('div');
  box.className = 'prohlizec';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Stránka rukopisu');
  box.innerHTML =
    '<img alt="">' +
    '<div class="ovladani">' +
      '<button class="dymo zpet" aria-label="Předchozí stránka">☜</button>' +
      '<span class="popis-fotky"></span>' +
      '<button class="dymo vpred" aria-label="Další stránka">☞</button>' +
      '<button class="dymo zavrit">zavřít</button>' +
    '</div>';
  document.body.appendChild(box);
  var img = box.querySelector('img');
  var popis = box.querySelector('.popis-fotky');
  var ted = 0, predtim = null;

  function ukaz(i) {
    ted = (i + fotky.length) % fotky.length;
    var f = fotky[ted];
    img.src = f.currentSrc || f.src;
    img.alt = f.alt;
    var fig = f.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    popis.textContent = (cap ? cap.textContent : f.alt) + '  (' + (ted + 1) + ' / ' + fotky.length + ')';
    var odkaz = f.closest('a');
    if (odkaz && odkaz.getAttribute('href')) {
      var a = document.createElement('a');
      a.href = odkaz.getAttribute('href');
      a.textContent = ' číst text ☞';
      popis.appendChild(a);
    }
  }
  function otevri(i) {
    predtim = document.activeElement;
    ukaz(i);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    box.querySelector('.zavrit').focus();
  }
  function zavri() {
    box.hidden = true;
    document.body.style.overflow = '';
    if (predtim) predtim.focus();
  }
  fotky.forEach(function (f, i) {
    f.addEventListener('click', function (e) { e.preventDefault(); otevri(i); });
  });
  box.querySelector('.zpet').onclick = function () { ukaz(ted - 1); };
  box.querySelector('.vpred').onclick = function () { ukaz(ted + 1); };
  box.querySelector('.zavrit').onclick = zavri;
  box.addEventListener('click', function (e) { if (e.target === box) zavri(); });
  addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') zavri();
    if (e.key === 'ArrowLeft') ukaz(ted - 1);
    if (e.key === 'ArrowRight') ukaz(ted + 1);
  });
  // swipe na mobilu
  var x0 = null;
  box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) ukaz(ted + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();

/* ---------- 8) Počítadlo přečtení (služba Abacus, zdarma, bez registrace) ----------
   <span class="precteno" data-pocitadlo="pickle-jar" data-pricist hidden></span>
   Na stránce textu přičte 1 (jednou za návštěvu), v seznamu jen čte. */
(function () {
  var API = 'https://abacus.jasoncameron.dev';
  var NS = 'majmi-cz-zapisnik';
  var naWebu = location.hostname === 'majmi-cz.github.io';
  function napocitej(el, cil) {
    el.hidden = false;
    if (!pohyb || cil < 2) { el.textContent = 'přečteno ' + cil + '×'; return; }
    var start = null, trvani = Math.min(900, 300 + cil * 20);
    function krok(t) {
      if (!start) start = t;
      var k = Math.min(1, (t - start) / trvani);
      el.textContent = 'přečteno ' + Math.round(cil * (1 - Math.pow(1 - k, 3))) + '×';
      if (k < 1) requestAnimationFrame(krok);
    }
    requestAnimationFrame(krok);
  }
  document.querySelectorAll('[data-pocitadlo]').forEach(function (el) {
    var klic = el.getAttribute('data-pocitadlo');
    var pricist = el.hasAttribute('data-pricist') && naWebu;
    if (pricist) {
      try {
        if (sessionStorage.getItem('precteno-' + klic)) pricist = false;
        else sessionStorage.setItem('precteno-' + klic, '1');
      } catch (e) {}
    }
    fetch(API + (pricist ? '/hit/' : '/get/') + NS + '/' + klic)
      .then(function (r) { return r.status === 404 ? { value: 0 } : r.json(); })
      .then(function (d) { if (typeof d.value === 'number') napocitej(el, d.value); })
      .catch(function () {});
  });
})();
