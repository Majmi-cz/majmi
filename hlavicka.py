# Vygeneruje hlavičku (obálka · ☰ menu · CZ/EN · zvuk) a menu do všech stránek.
# Spusť po přidání textu nebo básně:  python3 hlavicka.py
# Nový text nebo báseň zapiš do seznamů TEXTY / BASNE níže.
import re, glob, os, json

TEXTY = [  # v pořadí, jak vycházely (I., II., …): (soubor, česky, anglicky, kategorie)
    ('pickle-jar', 'Pickle Jar', 'Pickle Jar', 'dialogy'),
    ('herakles', 'Héraklés', 'Heracles', 'dialogy'),
    ('celsius-233', 'Celsius 233', 'Celsius 233', 'úvahy'),
    ('hudebni-nastroj', 'Hudební nástroj', 'Musical Instrument', 'úvahy'),
    ('kdo-podrzi-petu', 'Kdo podrží Péťu?', 'Who Will Hold Péťa?', 'dialogy'),
]
BASNE = [  # (kotva v basne.html, česky, anglicky)
    ('sestikraska', 'Šestikráska', 'Six-Petal Daisy'),
    ('sozalenije', 'Сожаление', 'Сожаление (Regret)'),
    ('ruze-ve-vlasech', 'Růže ve vlasech', 'Roses in Her Hair'),
    ('dopis', 'Dopis', 'The Letter'),
    ('az-papir-zezloutne', 'Až papír zežloutne', 'When the Paper Yellows'),
    ('zastrelil-se-prvniho-maje', 'Zastřelil se prvního máje', 'He Shot Himself on the First of May'),
    ('jeden-z-prokletych-basniku', 'Jeden z prokletých básníků', 'One of the Cursed Poets'),
]
KAT = {'dialogy': 'dialogues', 'úvahy': 'essays', 'básně': 'poems'}
SLOVA = {
    'cs': dict(obalka='obálka', texty='texty', rukopis='rukopis', o='o zápisníku', menu='☰ menu', zvuk='zvuk: zap', jazyk='EN', jazyk_cil='en', jazyk_popis='Read in English'),
    'en': dict(obalka='cover', texty='texts', rukopis='manuscript', o='about', menu='☰ menu', zvuk='sound: on', jazyk='CZ', jazyk_cil='cs', jazyk_popis='Číst česky'),
}

def stranky():
    for f in sorted(glob.glob('*.html') + glob.glob('texty/*.html') + glob.glob('en/*.html') + glob.glob('en/texty/*.html')):
        yield f

def hlavicka(f, info):
    en = f.startswith('en/')
    jazyk = 'en' if en else 'cs'
    S = SLOVA[jazyk]
    rel = f[3:] if en else f                    # cesta v rámci jazyka
    hloubka = rel.count('/')
    up = '../' * hloubka
    protejsek = ('../' * (hloubka + (1 if en else 0))) + ('' if en else 'en/') + rel
    zde = rel

    def a(href, text, trida=''):
        cur = ' aria-current="page"' if href.split('#')[0] == zde and '#' not in href else ''
        return f'<a{" class=" + chr(34) + trida + chr(34) if trida else ""} href="{up}{href}"{cur}>{text}</a>'

    kat = []
    for k in ['dialogy', 'úvahy', 'básně']:
        dila = []
        if k == 'básně':
            for kotva, cz, eng in BASNE:
                dila.append(f'<li>{a("basne.html#" + kotva, eng if en else cz)}</li>')
        else:
            for s, cz, eng, kk in TEXTY:
                if kk == k:
                    dila.append(f'<li>{a("texty/" + s + ".html", eng if en else cz)}</li>')
        otevreno = ' open' if any(f'texty/{s}.html' == zde for s, _, _, kk in TEXTY if kk == k) or (k == 'básně' and zde == 'basne.html') else ''
        nazev = KAT[k] if en else k
        kat.append(f'<li><details{otevreno}><summary>{nazev} ({len(dila)})</summary><ul class="dila">{"".join(dila)}</ul></details></li>')

    return f'''<header class="horni">
    {a("index.html", S["obalka"], "dymo")}
    <button type="button" class="dymo menu-tlacitko" aria-expanded="false" aria-controls="menu-panel">{S["menu"]}</button>
    <a class="dymo jazyk" href="{protejsek}" hreflang="{S["jazyk_cil"]}" lang="{S["jazyk_cil"]}" title="{S["jazyk_popis"]}">{S["jazyk"]}</a>
    <button type="button" class="dymo prepinac-zvuku" aria-pressed="true" hidden>{S["zvuk"]}</button>
    <div class="info">{info}</div>
    <nav id="menu-panel" class="menu-panel vystrizek paska" aria-label="Menu" hidden>
      <ul>
        <li>{a("index.html", S["obalka"], "hlavni")}</li>
        <li>{a("texty.html", S["texty"], "hlavni")}
          <ul class="kategorie">{"".join(kat)}</ul>
        </li>
        <li>{a("rukopis.html", S["rukopis"], "hlavni")}</li>
        <li>{a("o-zapisniku.html", S["o"], "hlavni")}</li>
      </ul>
    </nav>
  </header>'''

for f in stranky():
    s = open(f, encoding='utf-8').read()
    m = re.search(r'<header class="horni">.*?</header>', s, re.S)
    if not m:
        continue
    info = re.search(r'<div class="info">(.*?)</div>', m.group(0), re.S)
    info = info.group(1) if info else ''
    s = s[:m.start()] + hlavicka(f, info) + s[m.end():]
    open(f, 'w', encoding='utf-8').write(s)

# seznam pro listování "předchozí / další" v zin.js
j = open('zin.js', encoding='utf-8').read()
data = 'var TEXTY = ' + json.dumps([{'s': s, 'n': cz, 'en': eng} for s, cz, eng, _ in TEXTY], ensure_ascii=False, indent=2) + ';'
j = re.sub(r'var TEXTY = \[.*?\];', lambda _: data, j, count=1, flags=re.S)
open('zin.js', 'w', encoding='utf-8').write(j)
print('hotovo')
