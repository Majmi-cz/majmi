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
  var kusy = document.querySelectorAll('.kus, .rozcestnik a, .fotky figure, .podtitul, .slova, .proc, .listovani a, .basen-kus');
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

/* ---------- 9) Zvuky dělané pusou ----------
   Soubory ve složce zvuky/ (mp3). Když soubor chybí, je ticho.
   Přepínač zvuku se ukáže, až když existuje aspoň jeden zvuk.
   Každé přehrání má trochu jinou výšku, aby to neznělo jako robot. */
var Zvuk = (function () {
  // kolik variant má který zvuk (klik.mp3, klik2.mp3 … klik6.mp3)
  var ZVUKY = { klik: 6, sust: 1, plesk: 1, fuk: 1, bzz: 1 };
  var koren = document.querySelector('script[src$="zin.js"]').getAttribute('src').replace('zin.js', '');
  var zapnuto = true;
  try { zapnuto = localStorage.getItem('zvuk') !== 'vyp'; } catch (e) {}
  var ctx = null, buffery = {}, data = {}, prepinac = null;
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC || !window.fetch) return { hraj: function () {}, hrajKdyzBezi: function () {}, pripraveno: function () { return Promise.resolve(false); } };
  // Prohlížeč dovolí zvuk hned po načtení, pokud už člověk na webu někdy kliknul.
  try { ctx = new AC(); } catch (e) {}
  var klikHotovy, klikySlib = new Promise(function (r) { klikHotovy = r; });

  // stáhnout zvuky (jen data, AudioContext až po prvním kliknutí)
  // každý zvuk může mít varianty: klik.mp3, klik2.mp3 … klik6.mp3
  var varianty = {};
  Object.keys(ZVUKY).forEach(function (n) {
    for (var c = 1; c <= ZVUKY[n]; c++) (function (soubor) {
      fetch(koren + 'zvuky/' + soubor + '.mp3')
        .then(function (r) { if (!r.ok) throw 0; return r.arrayBuffer(); })
        .then(function (b) {
          data[soubor] = b;
          (varianty[n] = varianty[n] || []).push(soubor);
          if (!ctx) ctx = new AC();
          dekoduj(soubor);
          ukazPrepinac();
        })
        .catch(function () {});
    })(c === 1 ? n : n + c);
  });
  var posledni = {};
  function vyberVariantu(n) {
    var v = (varianty[n] || []).filter(function (s) { return buffery[s]; });
    if (!v.length) return null;
    if (v.length > 1) v = v.filter(function (s) { return s !== posledni[n]; }); // ne dvakrát stejný po sobě
    return (posledni[n] = v[Math.floor(Math.random() * v.length)]);
  }

  var odemceno = false;
  function odemkni() {
    if (!ctx) ctx = new AC();
    Object.keys(data).forEach(dekoduj);
    if (ctx.state !== 'running') ctx.resume();
    // Safari / iPhone: zvuk se odemkne až přehráním něčeho přímo při kliknutí
    if (!odemceno) {
      var ticho = ctx.createBufferSource();
      ticho.buffer = ctx.createBuffer(1, 1, 22050);
      ticho.connect(ctx.destination);
      ticho.start(0);
      odemceno = true;
    }
  }
  function dekoduj(n) {
    if (!ctx || buffery[n] || !data[n]) return;
    var kopie = data[n].slice(0);
    ctx.decodeAudioData(kopie, function (buf) { buffery[n] = buf; if (n.indexOf('klik') === 0) klikHotovy(); }, function () {});
  }
  function hraj(n, hlasitost) {
    if (!zapnuto) return;
    odemkni();
    var soubor = vyberVariantu(n);
    if (!soubor) return;
    var buf = buffery[soubor];
    var zdroj = ctx.createBufferSource();
    zdroj.buffer = buf;
    zdroj.playbackRate.value = 0.88 + Math.random() * 0.24;
    var g = ctx.createGain();
    g.gain.value = (hlasitost || 0.6) * (0.85 + Math.random() * 0.3);
    zdroj.connect(g).connect(ctx.destination);
    zdroj.start();
  }
  function ukazPrepinac() {
    if (prepinac) return;
    var nav = document.querySelector('.navigace');
    if (!nav) return;
    prepinac = document.createElement('button');
    prepinac.className = 'dymo prepinac-zvuku';
    prepinac.type = 'button';
    function popis() {
      prepinac.textContent = zapnuto ? 'zvuk: zap' : 'zvuk: vyp';
      prepinac.setAttribute('aria-pressed', zapnuto);
    }
    popis();
    prepinac.addEventListener('click', function () {
      zapnuto = !zapnuto;
      try { localStorage.setItem('zvuk', zapnuto ? 'zap' : 'vyp'); } catch (e) {}
      popis();
      if (zapnuto) hraj('klik');
    });
    nav.appendChild(prepinac);
  }

  // kdy co zní
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, odemkni, true);
  });
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('.prepinac-zvuku, .nahoru')) return;
    if (t.closest('.prohlizec .zavrit')) return hraj('fuk');
    if (t.closest('.prohlizec .zpet, .prohlizec .vpred, .zalozky button')) return hraj('sust');
    if (t.closest('.fotky img, .rukopis-stranky img')) return hraj('plesk');
    var a = t.closest('a[href]');
    if (a && !e.defaultPrevented && a.origin === location.origin && !e.metaKey && !e.ctrlKey) {
      // nechat zvuk dohrát, než se přejde na další stránku
      var n = a.closest('.kus, .rozcestnik, .listovani') ? 'plesk' : 'klik';
      if (!zapnuto || !(varianty[n] || []).some(function (s) { return buffery[s]; })) return;
      hraj(n);
      e.preventDefault();
      setTimeout(function () { location.href = a.href; }, 140);
      return;
    }
    if (t.closest('button, .dymo')) hraj('klik');
  });
  // jednou za návštěvu "bzz" kopírky při prvním kliknutí na webu
  document.addEventListener('pointerdown', function () {
    try {
      if (sessionStorage.getItem('bzz')) return;
      sessionStorage.setItem('bzz', '1');
    } catch (e) { return; }
    setTimeout(function () { hraj('bzz', 0.35); }, 60);
  }, { once: true });
  addEventListener('keydown', function (e) {
    var box = document.querySelector('.prohlizec');
    if (!box || box.hidden) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') hraj('sust');
    if (e.key === 'Escape') hraj('fuk');
  });

  function hrajKdyzBezi(n, hlasitost) {
    if (!ctx || ctx.state !== 'running') return;
    hraj(n, hlasitost);
  }

  // Počká (nejvýš chvilku), jestli může zvuk hrát a jestli jsou kliky připravené.
  // Když prohlížeč zvuk nepustí, pozná se to za ~150 ms a nečeká se zbytečně.
  var klikyOk = false;
  klikySlib.then(function () { klikyOk = true; });
  function pripraveno(limit) {
    return new Promise(function (hotovo) {
      if (!zapnuto || !ctx) return hotovo(false);
      if (ctx.state !== 'running') { try { ctx.resume().catch(function () {}); } catch (e) {} }
      var start = Date.now();
      (function zkus() {
        var t = Date.now() - start;
        if (ctx.state === 'running' && klikyOk) return hotovo(true);
        if (ctx.state !== 'running' && t > 150) return hotovo(false);
        if (t > (limit || 700)) return hotovo(false);
        setTimeout(zkus, 25);
      })();
    });
  }

  return { hraj: hraj, hrajKdyzBezi: hrajKdyzBezi, pripraveno: pripraveno };
})();

/* ---------- 10) Klik na nadpis: písmena se nalepí znovu a každé cvakne ---------- */
(function () {
  function zvukyPismen(el) {
    if (typeof Zvuk === 'undefined') return;
    var pismena = el.querySelectorAll('.p');
    pismena.forEach(function (p, i) {
      setTimeout(function () { Zvuk.hrajKdyzBezi('klik', 0.3); }, 80 + i * 55 + 190);
    });
  }
  document.querySelectorAll('h1.vystrizky, h1 .vystrizky').forEach(function (el) {
    el.classList.add('klikaci');
    el.setAttribute('title', 'nalepit znovu');
    el.addEventListener('click', function () {
      // funguje i s vypnutými animacemi v systému – je to akce, kterou si člověk sám vyžádal
      el.classList.add('prehrat');
      el.querySelectorAll('.p').forEach(function (p) {
        p.style.animation = 'none';
        void p.offsetWidth;          // donutit prohlížeč zapomenout animaci
        p.style.animation = '';
      });
      zvukyPismen(el);
    });
    // při načtení: písmena chvilku počkají, až budou zvuky připravené, pak padají i s cvakáním
    if (pohyb && typeof Zvuk !== 'undefined') {
      el.classList.add('ceka-na-zvuk');
      Zvuk.pripraveno(700).then(function (muze) {
        el.classList.remove('ceka-na-zvuk');
        if (muze) zvukyPismen(el);
      });
    }
  });
})();

/* ---------- 11) Na konci stránky: štítek „↑ nahoru“ ---------- */
(function () {
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'dymo nahoru';
  b.textContent = '↑ nahoru';
  b.setAttribute('aria-label', 'Zpět nahoru');
  document.body.appendChild(b);
  var ceka = false;
  function obnov() {
    ceka = false;
    var vyska = document.documentElement.scrollHeight;
    var dole = scrollY + innerHeight > vyska - 260;
    b.classList.toggle('videt', vyska > innerHeight * 1.4 && dole);
  }
  addEventListener('scroll', function () { if (!ceka) { ceka = true; requestAnimationFrame(obnov); } }, { passive: true });
  addEventListener('resize', obnov);
  obnov();
  b.addEventListener('click', function () {
    if (typeof Zvuk !== 'undefined') Zvuk.hraj('sust');
    scrollTo({ top: 0, behavior: pohyb ? 'smooth' : 'auto' });
    // až dojede nahoru, nadpis se znovu nalepí
    var start = Date.now();
    (function hlidej() {
      if (scrollY < 4 || Date.now() - start > 2000) {
        var h = document.querySelector('h1.vystrizky, h1 .vystrizky');
        if (h) h.click();
        return;
      }
      requestAnimationFrame(hlidej);
    })();
  });
})();
