/* ============================================================
   zin.js — všechno, co se na webu hýbe
   ============================================================ */

/* Seznam textů v pořadí, jak vycházely.
   Nový text = přidej řádek na konec (s = název souboru bez .html). */
var TEXTY = [
  {
    "s": "pickle-jar",
    "n": "Pickle Jar",
    "en": "Pickle Jar",
    "k": "texty",
    "d": "2026-11-06"
  },
  {
    "s": "herakles",
    "n": "Héraklés",
    "en": "Heracles",
    "k": "texty",
    "d": "2026-11-06"
  },
  {
    "s": "celsius-233",
    "n": "Celsius 233",
    "en": "Celsius 233",
    "k": "texty",
    "d": "2026-11-08"
  },
  {
    "s": "hudebni-nastroj",
    "n": "Hudební nástroj",
    "en": "Musical Instrument",
    "k": "texty",
    "d": "2026-11-08"
  },
  {
    "s": "kdo-podrzi-petu",
    "n": "Kdo podrží Péťu?",
    "en": "Who Will Hold Péťa?",
    "k": "texty",
    "d": "2026-11-10"
  },
  {
    "s": "sestikraska",
    "n": "Šestikráska",
    "en": "Six-Petal Daisy",
    "k": "basne",
    "d": "2026-11-10"
  },
  {
    "s": "sozalenije",
    "n": "Сожаление",
    "en": "Сожаление (Regret)",
    "k": "basne",
    "d": "2026-11-10"
  },
  {
    "s": "ruze-ve-vlasech",
    "n": "Růže ve vlasech",
    "en": "Roses in Her Hair",
    "k": "basne",
    "d": "2026-11-10"
  },
  {
    "s": "dopis",
    "n": "Dopis",
    "en": "The Letter",
    "k": "basne",
    "d": "2026-11-10"
  },
  {
    "s": "az-papir-zezloutne",
    "n": "Až papír zežloutne",
    "en": "When the Paper Yellows",
    "k": "basne",
    "d": "2026-11-10"
  },
  {
    "s": "zastrelil-se-prvniho-maje",
    "n": "Zastřelil se prvního máje",
    "en": "He Shot Himself on the First of May",
    "k": "basne",
    "d": "2026-11-10"
  },
  {
    "s": "jeden-z-prokletych-basniku",
    "n": "Jeden z prokletých básníků",
    "en": "One of the Cursed Poets",
    "k": "basne",
    "d": "2026-11-10"
  }
];

var EN = document.documentElement.lang === 'en';
var T = EN ? {
  predchozi: '☜ previous', dalsi: 'next ☞', rukopisStr: 'Manuscript page', predStr: 'Previous page', dalStr: 'Next page',
  zavrit: 'close', cistText: ' read the text ☞', precteno: 'read ', krat: '×', zvukZap: 'sound: on', zvukVyp: 'sound: off',
  nalepit: 'stick it again', nahoru: '↑ top', nahoruPopis: 'Back to top', anonym: 'anonymous',
  myslis: 'what do you think', podpis: 'signature', nepovinne: '(optional)', naWeb: 'feel free to put it on the site',
  poslat: 'send ☞', posilam: 'sending…', diky: 'Thanks! Got it. <span class="zvyraz">Majmi will read it.</span>',
  chyba: 'Something went wrong. Try again in a moment.', navstev: 'visits: ', cist: '▶ read aloud', stop: '■ stop', menu: '☰ menu', menuZavrit: '✕ close',
  slov: 'words', sdilet: 'share ↗', zkopirovano: 'link copied ✓', nove: 'new', odberNadpis: 'Don’t miss the next one', odberText: 'Leave your e-mail and Majmi will let you know when something new shows up. No spam, just texts.', odberMail: 'your@mail.com', odberTlacitko: 'let me know ☞', odberRss: 'or follow via an RSS reader', odberDiky: 'Got it! You’ll hear when there’s something new.', hledat: 'search', hledatPopis: 'search the texts… (a word, a line)', hledatMenu: 'search… (text, line, “reviews”…)', nicNenalezeno: 'Nothing. Try another word.', nahodny: '🎲 random text', pokracovat: '↓ continue where you left off', citovat: 'quote ↗', coRikaji: 'What people say', k: 'on'
} : {
  predchozi: '☜ předchozí', dalsi: 'další ☞', rukopisStr: 'Stránka rukopisu', predStr: 'Předchozí stránka', dalStr: 'Další stránka',
  zavrit: 'zavřít', cistText: ' číst text ☞', precteno: 'přečteno ', krat: '×', zvukZap: 'zvuk: zap', zvukVyp: 'zvuk: vyp',
  nalepit: 'nalepit znovu', nahoru: '↑ nahoru', nahoruPopis: 'Zpět nahoru', anonym: 'anonym',
  myslis: 'co si o tom myslíš', podpis: 'podpis', nepovinne: '(nepovinné)', naWeb: 'klidně to dej na web',
  poslat: 'poslat ☞', posilam: 'posílám…', diky: 'Díky! Došlo to. <span class="zvyraz">Majmi si to přečte.</span>',
  chyba: 'Něco se pokazilo. Zkus to za chvíli znovu.', navstev: 'návštěv: ', cist: '▶ přečíst nahlas', stop: '■ zastavit', menu: '☰ menu', menuZavrit: '✕ zavřít',
  slov: 'slov', sdilet: 'sdílet ↗', zkopirovano: 'odkaz zkopírován ✓', nove: 'nové', odberNadpis: 'Ať ti nic neuteče', odberText: 'Nech mi mail a dám ti vědět, až sem přibude něco nového. Žádný spam, jen texty.', odberMail: 'tvuj@mail.cz', odberTlacitko: 'dej mi vědět ☞', odberRss: 'nebo odebírej přes RSS čtečku', odberDiky: 'Mám tě! Ozvu se, až bude něco nového.', hledat: 'hledat', hledatPopis: 'hledat v textech… (slovo, verš)', hledatMenu: 'hledat… (text, verš, „recenze“…)', nicNenalezeno: 'Nic. Zkus jiné slovo.', nahodny: '🎲 náhodný text', pokracovat: '↓ pokračovat, kde jsi skončil', citovat: 'citovat ↗', coRikaji: 'Co říkají lidi', k: 'k'
};

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
  var kusy = document.querySelectorAll('.kus, .rozcestnik a, .fotky figure, .podtitul, .slova, .proc, .majmi, .listovani a, .basen-kus, .listek');
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
  var ted = TEXTY.filter(function (t) { return t.s === nav.getAttribute('data-text'); })[0];
  if (!ted) return;
  var PORADI = TEXTY.filter(function (t) { return t.k === ted.k; });   // texty mezi sebou, básně mezi sebou
  var i = PORADI.indexOf(ted);
  if (i < 0) return;
  function odkaz(t, kam, trida) {
    var a = document.createElement('a');
    a.href = t.s + '.html';
    a.className = trida;
    a.innerHTML = '<span class="kam"></span><span class="nazev"></span>';
    a.querySelector('.kam').textContent = kam;
    a.querySelector('.nazev').textContent = EN ? t.en : t.n;
    nav.appendChild(a);
  }
  if (PORADI[i - 1]) odkaz(PORADI[i - 1], T.predchozi, 'predchozi');
  if (PORADI[i + 1]) odkaz(PORADI[i + 1], T.dalsi, 'dalsi');
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
  box.setAttribute('aria-label', T.rukopisStr);
  box.innerHTML =
    '<img alt="">' +
    '<div class="ovladani">' +
      '<button class="dymo zpet" aria-label="' + T.predStr + '">☜</button>' +
      '<span class="popis-fotky"></span>' +
      '<button class="dymo vpred" aria-label="' + T.dalStr + '">☞</button>' +
      '<button class="dymo zavrit">' + T.zavrit + '</button>' +
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
      a.textContent = T.cistText;
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

/* ---------- 8) Počítadlo přečtení (GoatCounter: majmi.goatcounter.com) ----------
   <span class="precteno" data-pocitadlo="pickle-jar" hidden></span>
   Návštěvy počítá skript GoatCounteru v <head>, tady se jen čtou čísla.
   CZ i EN verze se sčítají dohromady. */
var Pocitadlo = (function () {
  var GC = 'https://majmi.goatcounter.com/counter/';
  function cislo(cesta) {
    return fetch(GC + encodeURIComponent(cesta) + '.json')
      .then(function (r) { return r.status === 404 ? { count: '0' } : r.json(); })
      .then(function (d) { var n = parseInt(String(d.count).replace(/\D/g, ''), 10); return isNaN(n) ? null : n; });
  }
  function napocitej(el, cil, popisek) {
    el.hidden = false;
    if (!pohyb || cil < 2) { el.textContent = popisek(cil); return; }
    var start = null, trvani = Math.min(900, 300 + cil * 20);
    function krok(t) {
      if (!start) start = t;
      var k = Math.min(1, (t - start) / trvani);
      el.textContent = popisek(Math.round(cil * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(krok);
    }
    requestAnimationFrame(krok);
  }
  if (window.fetch) document.querySelectorAll('[data-pocitadlo]').forEach(function (el) {
    cislo('/majmi/texty/' + el.getAttribute('data-pocitadlo') + '.html')
      .then(function (n) { if (n !== null) napocitej(el, n, function (x) { return T.precteno + x + T.krat; }); })
      .catch(function () {});
  });
  return { cislo: cislo, napocitej: napocitej };
})();

/* ---------- 9) Zvuky dělané pusou ----------
   Soubory ve složce zvuky/ (mp3). Když soubor chybí, je ticho.
   Přepínač zvuku se ukáže, až když existuje aspoň jeden zvuk.
   Každé přehrání má trochu jinou výšku, aby to neznělo jako robot. */
var Zvuk = (function () {
  // kolik variant má který zvuk (klik.mp3, klik2.mp3 … klik6.mp3)
  var ZVUKY = { klik: 6, sust: 1, plesk: 1, fuk: 1, bzz: 1 };
  var koren = document.querySelector('script[src*="zin.js"]').getAttribute('src').replace(/zin\.js.*$/, '');
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
    prepinac = document.querySelector('.prepinac-zvuku');
    if (!prepinac) return;
    function popis() {
      prepinac.textContent = zapnuto ? T.zvukZap : T.zvukVyp;
      prepinac.setAttribute('aria-pressed', zapnuto);
    }
    popis();
    prepinac.hidden = false;
    prepinac.addEventListener('click', function () {
      zapnuto = !zapnuto;
      try { localStorage.setItem('zvuk', zapnuto ? 'zap' : 'vyp'); } catch (e) {}
      popis();
      if (zapnuto) hraj('klik');
    });
  }

  // kdy co zní
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, odemkni, true);
  });
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('.prepinac-zvuku, .nahoru, .menu-tlacitko, .menu-panel summary, .ctecka')) return;
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
    el.setAttribute('title', T.nalepit);
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
  b.textContent = T.nahoru;
  b.setAttribute('aria-label', T.nahoruPopis);
  document.body.appendChild(b);
  // ukáže se, jakmile horní lišta zmizí z obrazovky
  var lista = document.querySelector('.horni');
  if (lista && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (z) {
      b.classList.toggle('videt', !z[0].isIntersecting);
    }).observe(lista);
  } else {
    addEventListener('scroll', function () { b.classList.toggle('videt', scrollY > 200); }, { passive: true });
  }
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

/* ---------- 12) Recenze ----------
   Formulář: jen text, podpis nepovinný. Přijde Majmimu na mail.
   Zveřejnění = přidat záznam do recenze.json:
   { "herakles": [ { "text": "Myšlenkoberoucí.", "kdo": "Kubas" } ] } */
(function () {
  var MAIL = 'tobikb8@gmail.com';
  var sekce = document.querySelectorAll('.recenze[data-text]');
  if (!sekce.length) return;
  var koren = document.querySelector('script[src*="zin.js"]').getAttribute('src').replace(/zin\.js.*$/, '');

  // zveřejněné recenze: soubory recenze/<text>/*.json (zveřejňují se klikem z mailu)
  // + starší ručně psané v recenze.json
  var REPO = 'https://api.github.com/repos/Majmi-cz/majmi/contents/recenze/';
  // režim pro Majmiho: otevři web s #majmi na konci adresy (vypnutí: #nemajmi)
  var spravce = false;
  try {
    if (location.hash === '#majmi') localStorage.setItem('majmi-spravce', '1');
    if (location.hash === '#nemajmi') localStorage.removeItem('majmi-spravce');
    spravce = localStorage.getItem('majmi-spravce') === '1';
  } catch (e) {}
  function vykresli(box, seznam) {
    seznam.forEach(function (r) {
      if (!r || !r.text) return;
      var d = document.createElement('div');
      d.className = 'dopis vystrizek' + (box.children.length % 2 ? ' b' : '');
      var p = document.createElement('p'); p.textContent = r.text;
      var k = document.createElement('p'); k.className = 'kdo-pise'; k.textContent = '— ' + (r.kdo || T.anonym);
      d.appendChild(p); d.appendChild(k);
      if (spravce && r._cesta) {
        var x = document.createElement('a');
        x.className = 'smazat-recenzi';
        x.href = 'https://github.com/Majmi-cz/majmi/delete/main/' + r._cesta;
        x.target = '_blank'; x.rel = 'noopener';
        x.textContent = '✕ smazat';
        d.appendChild(x);
      }
      box.appendChild(d);
    });
  }
  sekce.forEach(function (sek) {
    var klic = sek.getAttribute('data-klic');
    var box = sek.querySelector('.dopisy');
    if (!box || !klic) return;
    var stare = fetch(koren + 'recenze.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (v) { return v[klic] || []; })
      .catch(function () { return []; });
    var nove = fetch(REPO + klic)
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (soubory) {
        soubory = (Array.isArray(soubory) ? soubory : []).filter(function (f) { return /\.json$/.test(f.name); })
          .sort(function (x, y) { return x.name < y.name ? -1 : 1; });
        return Promise.all(soubory.map(function (f) {
          return fetch(f.download_url).then(function (r) { return r.json(); }).then(function (o) { if (o) o._cesta = f.path; return o; }).catch(function () { return null; });
        }));
      })
      .catch(function () { return []; });
    Promise.all([stare, nove]).then(function (v) { vykresli(box, v[0].concat(v[1])); });
  });

  sekce.forEach(function (sek, k) {
    var nazev = sek.getAttribute('data-text');
    var f = document.createElement('form');
    f.className = 'formular vystrizek paska';
    f.innerHTML =
      '<label for="r-text' + k + '">' + T.myslis + '</label>' +
      '<textarea id="r-text' + k + '" name="recenze" required maxlength="1500"></textarea>' +
      '<label for="r-jmeno' + k + '">' + T.podpis + ' <span class="nepovinne">' + T.nepovinne + '</span></label>' +
      '<input type="text" id="r-jmeno' + k + '" name="jmeno" maxlength="60" autocomplete="nickname">' +
      '<label class="zaskrt"><input type="checkbox" name="zverejnit" value="ano"> ' + T.naWeb + '</label>' +
      '<input type="text" name="_honey" class="past" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<button type="submit" class="dymo">' + T.poslat + '</button>' +
      '<p class="stav" role="status"></p>';
    sek.appendChild(f);
    var stav = f.querySelector('.stav'), tl = f.querySelector('button');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f);
      if (d.get('_honey')) return;
      var jm = (d.get('jmeno') || '').trim() || T.anonym;
      var ven = d.get('zverejnit') ? 'ANO' : 'ne';
      var poslat = new FormData();
      poslat.append('Text', nazev + (EN ? ' [EN]' : ''));
      poslat.append('Recenze', d.get('recenze'));
      poslat.append('Podpis', jm);
      poslat.append('Zveřejnit', ven);
      if (ven === 'ANO') {
        // odkaz, který otevře GitHub s předvyplněnou recenzí -> stačí kliknout na „Commit changes“
        var klic = sek.getAttribute('data-klic') || 'ostatni';
        var obsah = JSON.stringify({ text: d.get('recenze'), kdo: jm, datum: new Date().toISOString().slice(0, 10) }, null, 2);
        var soubor = Date.now() + '.json';
        poslat.append('ZVEŘEJNIT (klikni a dej Commit changes)',
          'https://github.com/Majmi-cz/majmi/new/main?filename=' + encodeURIComponent('recenze/' + klic + '/' + soubor) + '&value=' + encodeURIComponent(obsah));
        poslat.append('SMAZAT (až bude zveřejněná, klikni a dej Commit changes)',
          'https://github.com/Majmi-cz/majmi/delete/main/recenze/' + klic + '/' + soubor);
      }
      poslat.append('_subject', (ven === 'ANO' ? '★ ' : '') + 'Recenze: ' + nazev + ' (' + jm + ')');
      poslat.append('_template', 'box');
      poslat.append('_captcha', 'false');
      tl.disabled = true;
      stav.textContent = T.posilam;
      fetch('https://formsubmit.co/ajax/' + MAIL, { method: 'POST', headers: { Accept: 'application/json' }, body: poslat })
        .then(function (r) {
          // FormSubmit vrací 200, i když text odpovědi nejde přečíst -> stačí, že server přijal
          if (!r.ok) throw 0;
          return r.text().then(function (t) { try { console.log('FormSubmit:', t); } catch (e) {} });
        })
        .then(function () {
          f.innerHTML = '<p style="margin:0">' + T.diky + '</p>';
          try { if (typeof Zvuk !== 'undefined') Zvuk.hraj('plesk'); } catch (e) {}
        })
        .catch(function () {
          tl.disabled = false;
          stav.textContent = T.chyba;
        });
    });
  });
})();

/* ---------- 14) Menu ☰ (je v HTML, tady se jen otevírá a zavírá) ---------- */
(function () {
  var b = document.querySelector('.menu-tlacitko');
  var p = document.getElementById('menu-panel');
  if (!b || !p) return;
  function nastav(o) {
    p.hidden = !o;
    b.setAttribute('aria-expanded', o);
    b.textContent = o ? T.menuZavrit : T.menu;
  }
  b.addEventListener('click', function (e) {
    e.stopPropagation();
    nastav(p.hidden);
    if (typeof Zvuk !== 'undefined') Zvuk.hraj('sust');
  });
  document.addEventListener('click', function (e) {
    if (!p.hidden && !p.contains(e.target) && e.target !== b) nastav(false);
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && !p.hidden) { nastav(false); b.focus(); } });
})();

/* ---------- 15) Celkové počítadlo návštěv (v hlavičce vpravo) ---------- */
(function () {
  var info = document.querySelector('.horni .info');
  if (!info || !window.fetch) return;
  Pocitadlo.cislo('TOTAL').then(function (n) {
    if (n === null) return;
    var s = document.createElement('span');
    s.className = 'celkem';
    info.appendChild(document.createElement('br'));
    info.appendChild(s);
    Pocitadlo.napocitej(s, n, function (x) { return T.navstev + x; });
  }).catch(function () {});
})();

/* ---------- 16) Čtečka: přečte text nahlas (hlas z prohlížeče) ---------- */
(function () {
  var clanek = document.getElementById('prepis');
  var meta = document.querySelector('.hlava .meta');
  if (!clanek || !meta || !('speechSynthesis' in window)) return;
  var jazyk = EN ? 'en' : 'cs';
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'dymo ctecka';
  b.textContent = T.cist;
  meta.appendChild(b);
  var hraje = false;

  function hlas() {
    var v = speechSynthesis.getVoices().filter(function (x) { return x.lang && x.lang.toLowerCase().indexOf(jazyk) === 0; });
    return v[0] || null;
  }
  function textKCteni() {
    var c = clanek.cloneNode(true);
    c.querySelectorAll('aside, .listek, script').forEach(function (e) { e.remove(); });
    c.querySelectorAll('.replika .dymo').forEach(function (e) { e.textContent = e.textContent + ': '; });
    c.querySelectorAll('.osoby .dymo').forEach(function (e) { e.textContent = e.textContent + '. '; });
    return c.innerText.replace(/\s+\n/g, '\n');
  }
  function kousky(t) {
    // prohlížeče useknou dlouhé čtení, proto po větách / verších
    var out = [], kus = '';
    t.split(/(?<=[.!?…])\s+|\n+/).forEach(function (v) {
      v = v.trim(); if (!v) return;
      if ((kus + ' ' + v).length > 200) { if (kus) out.push(kus); kus = v; } else kus = kus ? kus + ' ' + v : v;
    });
    if (kus) out.push(kus);
    return out;
  }
  function stop() {
    hraje = false;
    speechSynthesis.cancel();
    b.textContent = T.cist;
  }
  b.addEventListener('click', function () {
    if (hraje) return stop();
    speechSynthesis.cancel();
    var v = hlas();
    var casti = kousky(textKCteni());
    if (!casti.length) return;
    hraje = true;
    b.textContent = T.stop;
    casti.forEach(function (c, i) {
      var u = new SpeechSynthesisUtterance(c);
      u.lang = EN ? 'en-GB' : 'cs-CZ';
      if (v) u.voice = v;
      u.rate = 0.95;
      if (i === casti.length - 1) u.onend = function () { if (hraje) stop(); };
      speechSynthesis.speak(u);
    });
  });
  addEventListener('pagehide', function () { speechSynthesis.cancel(); });
  // hlasy se načítají později
  if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = function () {};
})();

/* ---------- 17) Doba čtení + sdílet (v hlavičce textu) ---------- */
(function () {
  var clanek = document.getElementById('prepis');
  var meta = document.querySelector('.hlava .meta');
  if (!clanek || !meta) return;
  var c = clanek.cloneNode(true);
  c.querySelectorAll('aside, .listek').forEach(function (e) { e.remove(); });
  var slov = (c.textContent.match(/\S+/g) || []).length;
  var min = Math.max(1, Math.round(slov / 180));
  var cas = document.createElement('span');
  cas.className = 'doba';
  cas.textContent = '~' + min + ' min';
  cas.title = slov + ' ' + T.slov;
  meta.insertBefore(cas, meta.querySelector('.precteno') || null);

  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'dymo sdilet';
  b.textContent = T.sdilet;
  meta.appendChild(b);
  b.addEventListener('click', function () {
    var data = { title: document.title, url: location.href.split('#')[0] };
    if (navigator.share) { navigator.share(data).catch(function () {}); return; }
    var hotovo = function () { b.textContent = T.zkopirovano; setTimeout(function () { b.textContent = T.sdilet; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(data.url).then(hotovo, function () { prompt(T.sdilet, data.url); });
    else prompt(T.sdilet, data.url);
  });
})();

/* ---------- 18) Štítek NOVÉ u textů mladších než 4 dny (jen na kartách) ---------- */
(function () {
  var ted = Date.now();
  TEXTY.forEach(function (t) {
    if (!t.d || ted - Date.parse(t.d) > 4 * 864e5) return;
    document.querySelectorAll('a.kus[href$="texty/' + t.s + '.html"] h3').forEach(function (el) {
      if (el.querySelector('.nove')) return;
      var n = document.createElement('span');
      n.className = 'nove';
      n.textContent = T.nove;
      el.appendChild(n);
    });
  });
})();

/* ---------- 19) Odběr: RSS + „dej mi vědět“ e-mailem (na konci textu a na obálce) ---------- */
(function () {
  var kam = document.querySelector('.recenze') || document.querySelector('.obalka');
  if (!kam || document.body.classList.contains('e404')) return;
  var koren = document.querySelector('script[src*="zin.js"]').getAttribute('src').replace(/zin\.js.*$/, '');
  var box = document.createElement('section');
  box.className = 'odber vystrizek b paska';
  box.id = 'odber';
  box.innerHTML = '<h2 class="odber-nadpis"></h2><p class="odber-text"></p>' +
    '<form><label><span class="vid"></span><input type="email" name="email" required autocomplete="email"></label> ' +
    '<button class="dymo" type="submit"></button></form>' +
    '<p class="odber-rss"><a class="dymo" href="' + koren + 'feed.xml">RSS</a> <span></span></p><p class="odber-stav" role="status"></p>';
  box.querySelector('.odber-nadpis').textContent = T.odberNadpis;
  box.querySelector('.odber-text').textContent = T.odberText;
  box.querySelector('.vid').textContent = 'e-mail';
  box.querySelector('input').placeholder = T.odberMail;
  box.querySelector('button').textContent = T.odberTlacitko;
  box.querySelector('.odber-rss span').textContent = T.odberRss;
  kam.parentNode.insertBefore(box, kam.nextSibling);
  var form = box.querySelector('form'), stav = box.querySelector('.odber-stav');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData();
    d.append('email', form.email.value);
    d.append('_subject', 'Zápisník: nový odběratel');
    d.append('_template', 'box');
    d.append('_captcha', 'false');
    d.append('co', 'Chce vědět o nových textech. Stránka: ' + location.href);
    stav.textContent = T.posilam;
    fetch('https://formsubmit.co/ajax/tobikb8@gmail.com', { method: 'POST', headers: { Accept: 'application/json' }, body: d })
      .then(function (r) { if (!r.ok) throw 0; form.hidden = true; stav.textContent = T.odberDiky; })
      .catch(function () { stav.textContent = T.chyba; });
  });
})();

/* ---------- 20) Hledání (⌕ v hlavičce + nahoře v menu) ----------
   Hledá v textech a navíc zná „zkratky“: napíšeš třeba „hvězdička“ nebo „komentář“
   a nabídne recenze, i když to slovo na webu nikde není. Seznam slov je v ZKRATKY. */
(function () {
  if (!window.fetch) return;
  var koren = document.querySelector('script[src*="zin.js"]').getAttribute('src').replace(/zin\.js.*$/, '');
  var jaz = koren + (EN ? 'en/' : '');
  var naTextu = !!document.querySelector('.recenze[data-klic]');
  var ZKRATKY = [
    { cz: 'Recenze — napiš mi, co si myslíš', en: 'Reviews — tell me what you think', kam: naTextu ? '#recenze' : 'index.html#recenze-obalka',
      slova: 'recenze recenzovat recenzi hodnoceni hodnotit ohodnotit hvezdicka hvezdicky hvezda hvezdy znamka body like lajk palec komentar komentare komentovat napis mi napsat vzkaz nazor nazory feedback zpetna vazba kritika chvala co rikaji lidi review reviews rating rate star stars comment comments opinion kontakt contact' },
    { cz: 'Odběr — dám ti vědět o novém textu', en: 'Subscribe — get told about new texts', kam: naTextu ? '#odber' : 'index.html#odber',
      slova: 'odber odebirat odebirani newsletter mail email e-mail upozorneni upozornit novinky nove texty rss feed ctecka rss sledovat follow subscribe notify notification news' },
    { cz: 'Rukopis — fotky ze sešitu', en: 'Manuscript — photos from the notebook', kam: 'rukopis.html',
      slova: 'rukopis rukopisy fotky foto fotka obrazky sesit zapisnik scan sken rucne psane original propiska manuscript photos photo notebook handwriting' },
    { cz: 'O zápisníku — proč to celé je (a co je M.A.J.M.I.)', en: 'About — why this exists (and what M.A.J.M.I. means)', kam: 'o-zapisniku.html',
      slova: 'o zapisniku o mne proc kdo jsi kdo je autor autor majmi m.a.j.m.i zkratka narodil bio zivotopis about author who why me' },
    { cz: 'Všechny texty', en: 'All texts', kam: 'texty.html', slova: 'texty vsechno seznam obsah archiv texts all list archive' },
    { cz: 'Dialogy', en: 'Dialogues', kam: 'texty.html#dialogy', slova: 'dialogy dialog drama dramata hra divadlo rozhovor dialogue dialogues play theatre' },
    { cz: 'Úvahy', en: 'Essays', kam: 'texty.html#uvahy', slova: 'uvahy uvaha eseje esej teze zamysleni essay essays thoughts' },
    { cz: 'Básně', en: 'Poems', kam: 'texty.html#basne', slova: 'basne basen basnicky poezie verse versiky rym rymy poems poem poetry verse rhyme' },
    { cz: '🎲 Náhodný text', en: '🎲 Random text', kam: '?nahodny', slova: 'nahodny nahoda nahodne prekvap me prekvapeni cokoliv random surprise lucky' },
    { cz: 'Obálka', en: 'Cover', kam: 'index.html', slova: 'obalka domu uvod hlavni stranka zacatek home cover start main' },
    { cz: '▶ Přečíst nahlas (na stránce textu)', en: '▶ Read aloud (on a text page)', kam: '?ctecka', slova: 'nahlas cteni nahlas precist predcitat audio poslech hlas tts read aloud listen voice' },
    { cz: 'English version', en: 'Česká verze', kam: '?jazyk', slova: 'anglicky anglictina english preklad translation cesky cestina czech jazyk language' }
  ];
  function bez(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function vzdal(a, b) {   // Levenshtein, na překlepy
    if (Math.abs(a.length - b.length) > 2) return 9;
    var p = [], i, j;
    for (j = 0; j <= b.length; j++) p[j] = j;
    for (i = 1; i <= a.length; i++) {
      var d = p[0]; p[0] = i;
      for (j = 1; j <= b.length; j++) { var t = p[j]; p[j] = Math.min(p[j] + 1, p[j - 1] + 1, d + (a[i - 1] === b[j - 1] ? 0 : 1)); d = t; }
    }
    return p[b.length];
  }
  function sedi(q, slova) {
    var sl = slova.split(' ');
    for (var i = 0; i < sl.length; i++) {
      var w = sl[i];
      if (w.indexOf(q) === 0 || (q.length >= 4 && q.indexOf(w) === 0 && w.length >= 4)) return true;
      if (q.length >= 5 && w.length >= 5 && Math.min(vzdal(q, w.slice(0, q.length - 1)), vzdal(q, w.slice(0, q.length)), vzdal(q, w.slice(0, q.length + 1))) <= (q.length >= 7 ? 2 : 1)) return true;
    }
    // víc slov („co říkají lidi“)
    return q.indexOf(' ') > 0 && (' ' + slova + ' ').indexOf(' ' + q) >= 0;
  }
  function akce(kam, e) {
    if (kam === '?nahodny') { e.preventDefault(); location.href = jaz + 'texty/' + TEXTY[Math.floor(Math.random() * TEXTY.length)].s + '.html'; return; }
    if (kam === '?jazyk') { var j = document.querySelector('.horni .jazyk'); if (j) { e.preventDefault(); location.href = j.href; } return; }
    if (kam === '?ctecka') {
      var c = document.querySelector('.ctecka');
      e.preventDefault();
      if (c) { zavriMenu(); c.click(); } else location.href = jaz + 'texty/' + TEXTY[0].s + '.html';
      return;
    }
    if (kam.charAt(0) === '#') zavriMenu();
  }
  function zavriMenu() { var p = document.getElementById('menu-panel'), b = document.querySelector('.menu-tlacitko'); if (p && !p.hidden && b) b.click(); }

  var data = null, nacita = null;
  function nacti() {
    if (!nacita) nacita = fetch(koren + 'hledani.json').then(function (r) { return r.json(); }).then(function (d) { data = d; return d; })
      .catch(function () { nacita = null; });
    return nacita;
  }
  function polozka(ol, nazev, kat, href, trida) {
    var li = document.createElement('li'), a = document.createElement('a');
    if (trida) li.className = trida;
    a.href = href;
    a.innerHTML = '<strong></strong> <span class="kat"></span><span class="ukazka"></span>';
    a.querySelector('strong').textContent = nazev;
    a.querySelector('.kat').textContent = kat;
    li.appendChild(a); ol.appendChild(li);
    return a;
  }
  function hledac(vstup, ol, max) {
    function hledej() {
      var q = bez(vstup.value.trim()).replace(/\s+/g, ' ');
      ol.innerHTML = '';
      if (q.length < 2) return;
      var nalez = 0;
      ZKRATKY.forEach(function (z) {
        if (!sedi(q, z.slova)) return;
        nalez++;
        var kam = z.kam;
        var href = kam.charAt(0) === '?' ? '#' : kam.charAt(0) === '#' ? kam : jaz + kam;
        polozka(ol, EN ? z.en : z.cz, '☞', href, 'zkratka').addEventListener('click', function (e) { akce(kam, e); });
      });
      if (data) data.forEach(function (d) {
        var nazev = EN ? d.en : d.n, text = EN ? d.t_en : d.t, i = bez(text).indexOf(q);
        if (i < 0 && bez(nazev).indexOf(q) < 0) return;
        if (max && nalez >= max) return;
        nalez++;
        var a = polozka(ol, nazev, EN ? d.k_en : d.k, jaz + 'texty/' + d.s + '.html');
        if (i >= 0) {
          var od = Math.max(0, i - 50), uk = a.querySelector('.ukazka');
          uk.appendChild(document.createTextNode((od ? '…' : '') + text.slice(od, i).replace(/\s+/g, ' ')));
          var m = document.createElement('mark'); m.textContent = text.slice(i, i + q.length); uk.appendChild(m);
          uk.appendChild(document.createTextNode(text.slice(i + q.length, i + q.length + 60).replace(/\s+/g, ' ') + '…'));
        }
      });
      if (!nalez && data) { var li = document.createElement('li'); li.className = 'nic'; li.textContent = T.nicNenalezeno; ol.appendChild(li); }
    }
    vstup.addEventListener('focus', nacti);
    vstup.addEventListener('input', function () { hledej(); if (!data) (nacti() || Promise.resolve()).then(hledej); });
    vstup.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var a = ol.querySelector('a'); if (a) { e.preventDefault(); a.click(); } }
    });
  }

  var panel = document.getElementById('menu-panel');
  if (!panel) return;
  var mb = document.createElement('div');
  mb.className = 'menu-hledani';
  mb.innerHTML = '<label><span class="vid"></span><input type="search" autocomplete="off" enterkeyhint="go"></label><ol class="vysledky" aria-live="polite"></ol>';
  mb.querySelector('.vid').textContent = T.hledat;
  var vstup = mb.querySelector('input');
  vstup.placeholder = T.hledatMenu;
  panel.insertBefore(mb, panel.firstChild);
  hledac(vstup, mb.querySelector('ol'), 6);

  // nenápadná lupa úplně vlevo v hlavičce: otevře menu a skočí do hledání
  var horni = document.querySelector('.horni');
  var mt = document.querySelector('.menu-tlacitko');
  if (horni && mt) {
    var lupa = document.createElement('button');
    lupa.type = 'button';
    lupa.className = 'dymo lupa';
    lupa.innerHTML = '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 10l4.5 4.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
    lupa.title = lupa.ariaLabel = T.hledat;
    lupa.setAttribute('aria-label', T.hledat);
    horni.insertBefore(lupa, horni.firstChild);
    lupa.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.hidden) mt.click();
      vstup.focus();
    });
  }
  addEventListener('keydown', function (e) {   // klávesa / = hledat
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName) && lupa) { e.preventDefault(); lupa.click(); }
  });
})();

/* ---------- 21) Pokračovat ve čtení (prohlížeč si pamatuje, kde jsi skončil) ---------- */
(function () {
  var clanek = document.getElementById('prepis');
  if (!clanek) return;
  var klic = 'kde-' + location.pathname.replace(/^.*\//, '');
  function max() { return document.documentElement.scrollHeight - innerHeight; }
  var ulozeno = 0;
  try { ulozeno = parseFloat(localStorage.getItem(klic)) || 0; } catch (e) {}
  if (ulozeno > 0.08 && ulozeno < 0.85 && scrollY < 50 && !location.hash) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'dymo pokracovat';
    b.textContent = T.pokracovat;
    document.body.appendChild(b);
    var pryc = function () { b.remove(); };
    b.addEventListener('click', function () { scrollTo({ top: ulozeno * max(), behavior: pohyb ? 'smooth' : 'auto' }); pryc(); });
    setTimeout(pryc, 9000);
  }
  var t = null;
  addEventListener('scroll', function () {
    clearTimeout(t);
    t = setTimeout(function () { try { var m = max(); if (m > 0) localStorage.setItem(klic, (scrollY / m).toFixed(3)); } catch (e) {} }, 400);
  }, { passive: true });
})();

/* ---------- 22) Označ kus textu → „citovat ↗“ (zkopíruje citát i s odkazem) ---------- */
(function () {
  var clanek = document.getElementById('prepis');
  if (!clanek || !window.getSelection) return;
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'dymo citovat';
  b.textContent = T.citovat;
  b.hidden = true;
  document.body.appendChild(b);
  var citat = '';
  function schovej() { b.hidden = true; }
  document.addEventListener('selectionchange', function () {
    var sel = getSelection();
    if (!sel.rangeCount || sel.isCollapsed) return schovej();
    var r = sel.getRangeAt(0);
    if (!clanek.contains(r.commonAncestorContainer)) return schovej();
    citat = sel.toString().trim().replace(/\s+/g, ' ');
    if (citat.length < 3) return schovej();
    var o = r.getBoundingClientRect();
    b.style.left = Math.max(8, Math.min(innerWidth - 140, o.left + o.width / 2 - 60)) + 'px';
    b.style.top = (o.top + scrollY - 44) + 'px';
    b.hidden = false;
  });
  b.addEventListener('mousedown', function (e) { e.preventDefault(); });
  b.addEventListener('click', function () {
    var nazev = document.title.replace(/\s+—.*$/, '');
    var url = location.href.split('#')[0];
    var t = '„' + citat + '“ — Majmi, ' + nazev;
    var hotovo = function () { b.textContent = T.zkopirovano; setTimeout(function () { b.textContent = T.citovat; schovej(); }, 1500); };
    if (navigator.share && matchMedia('(pointer: coarse)').matches) { navigator.share({ text: t, url: url }).catch(function () {}); return; }
    if (navigator.clipboard) navigator.clipboard.writeText(t + '\n' + url).then(hotovo, function () {});
  });
})();

/* ---------- 23) Recenze na obálce: poslední vzkazy ze všech textů ---------- */
(function () {
  var obalka = document.querySelector('.obalka');
  if (!obalka || !window.fetch || document.body.classList.contains('e404')) return;
  var sekce = document.createElement('section');
  sekce.className = 'recenze recenze-obalka';
  sekce.id = 'recenze-obalka';
  sekce.innerHTML = '<h2 class="odber-nadpis"></h2><div class="dopisy"></div>';
  sekce.querySelector('h2').textContent = T.coRikaji;
  var odber = document.querySelector('.odber');
  obalka.parentNode.insertBefore(sekce, odber || obalka.nextSibling);
  sekce.hidden = true;
  var box = sekce.querySelector('.dopisy');
  var koren = document.querySelector('script[src*="zin.js"]').getAttribute('src').replace(/zin\.js.*$/, '');
  var stare = fetch(koren + 'recenze.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).catch(function () { return {}; })
    .then(function (v) { var out = []; Object.keys(v).forEach(function (k) { (v[k] || []).forEach(function (r) { r._k = k; out.push(r); }); }); return out; });
  var nove = fetch('https://api.github.com/repos/Majmi-cz/majmi/git/trees/main?recursive=1')
    .then(function (r) { return r.ok ? r.json() : { tree: [] }; })
    .then(function (d) {
      var soubory = (d.tree || []).filter(function (f) { return /^recenze\/[^/]+\/\d+\.json$/.test(f.path); })
        .sort(function (a, b) { return parseInt(b.path.split('/')[2]) - parseInt(a.path.split('/')[2]); }).slice(0, 4);
      return Promise.all(soubory.map(function (f) {
        return fetch('https://raw.githubusercontent.com/Majmi-cz/majmi/main/' + f.path).then(function (r) { return r.json(); })
          .then(function (o) { o._k = f.path.split('/')[1]; return o; }).catch(function () { return null; });
      }));
    }).catch(function () { return []; });
  Promise.all([nove, stare]).then(function (v) {
    var vse = v[0].concat(v[1]).filter(function (r) { return r && r.text; }).slice(0, 4);
    if (!vse.length) return;
    vse.forEach(function (r, i) {
      var t = TEXTY.filter(function (x) { return x.s === r._k; })[0];
      var d = document.createElement('div');
      d.className = 'dopis vystrizek' + (i % 2 ? ' b' : '');
      var p = document.createElement('p'); p.textContent = r.text;
      var k = document.createElement('p'); k.className = 'kdo-pise'; k.textContent = '— ' + (r.kdo || T.anonym) + (t ? ' ' + T.k + ' ' : '');
      if (t) { var a = document.createElement('a'); a.href = 'texty/' + t.s + '.html'; a.textContent = EN ? t.en : t.n; k.appendChild(a); }
      d.appendChild(p); d.appendChild(k); box.appendChild(d);
    });
    sekce.hidden = false;
    if (location.hash === '#recenze-obalka') sekce.scrollIntoView();
  });
})();

/* odkazy na sekce, které vyrábí až skript (#odber, #recenze-obalka) */
if (location.hash === '#odber') { var _o = document.getElementById('odber'); if (_o) _o.scrollIntoView(); }
