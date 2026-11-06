// 1) Vystřižená písmena: každý znak z .vystrizky dostane jiné písmo,
//    papír a natočení. Náhoda je "zamčená" podle textu, takže se to
//    při každém načtení neskládá jinak.
(function () {
  var pisma = [
    { f: '"Anton", sans-serif', s: 1.0 },
    { f: '"Archivo", sans-serif', s: .82 },
    { f: '"Morris", serif', s: 1.0 },
    { f: '"Bodoni", serif', s: .95, i: true },
    { f: '"Stroj", monospace', s: .9 }
  ];
  var papiry = [
    ['#fbfbf7', '#121212'],
    ['#121212', '#fbfbf7'],
    ['#f4e23a', '#121212'],
    ['#d8d5cb', '#121212'],
    ['transparent', '#121212'],
    ['#fbfbf7', '#121212']
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
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(/\s+/).forEach(function (slovo) {
      var w = document.createElement('span');
      w.className = 'slovo';
      w.setAttribute('aria-hidden', 'true');
      el.appendChild(w);
      Array.from(slovo).forEach(function (ch) {
      var s = document.createElement('span');
      var p = pisma[Math.floor(r() * pisma.length)];
      var pap = papiry[Math.floor(r() * papiry.length)];
      s.className = 'p';
      s.textContent = ch;
      s.style.fontFamily = p.f;
      if (p.i) s.style.fontStyle = 'italic';
      s.style.fontSize = (p.s * (0.86 + r() * 0.28)).toFixed(2) + 'em';
      s.style.background = pap[0];
      s.style.color = pap[1];
      s.style.transform = 'rotate(' + ((r() - .5) * 12).toFixed(1) + 'deg) translateY(' + ((r() - .5) * .12).toFixed(2) + 'em)';
      w.appendChild(s);
      });
    });
  });
})();

// 2) Přepínání přepis / rukopis
document.querySelectorAll('.zalozky [role="tab"]').forEach(function (tab, _, all) {
  tab.addEventListener('click', function () {
    all.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on);
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  });
});
