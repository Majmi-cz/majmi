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
BASNE = [  # (soubor v texty/, česky, anglicky)
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
                dila.append(f'<li>{a("texty/" + kotva + ".html", eng if en else cz)}</li>')
        else:
            for s, cz, eng, kk in TEXTY:
                if kk == k:
                    dila.append(f'<li>{a("texty/" + s + ".html", eng if en else cz)}</li>')
        otevreno = ' open' if any(f'texty/{s}.html' == zde for s, _, _, kk in TEXTY if kk == k) or (k == 'básně' and any(f'texty/{b[0]}.html' == zde for b in BASNE)) else ''
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

WEB = 'https://majmi-cz.github.io/majmi/'

def do_hlavy(f, s):
    """RSS odkaz + GoatCounter (počítadlo) do <head>. CZ a EN verze se počítají dohromady."""
    up = '../' * f.count('/')
    blok = (f'<!--hlava-->\n  <link rel="alternate" type="application/rss+xml" title="Majmi — zápisník" href="{up}feed.xml">\n'
            '  <script>window.goatcounter = { path: function (p) { return p.replace(/^\\/majmi\\/en\\//, \'/majmi/\').replace(/index\\.html$/, \'\'); } };</script>\n'
            '  <script data-goatcounter="https://majmi.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>\n  <!--/hlava-->')
    s = re.sub(r'\s*<!--hlava-->.*?<!--/hlava-->', '', s, flags=re.S)
    return s.replace('</head>', '  ' + blok + '\n</head>', 1)

def datum(slug):
    import subprocess
    d = subprocess.run(['git', 'log', '--diff-filter=A', '--format=%aI', '--', f'texty/{slug}.html'], capture_output=True, text=True).stdout.split()
    return d[-1] if d else '2026-11-11T12:00:00+01:00'

for f in stranky():
    s = open(f, encoding='utf-8').read()
    m = re.search(r'<header class="horni">.*?</header>', s, re.S)
    if not m:
        continue
    info = re.search(r'<div class="info">(.*?)</div>', m.group(0), re.S)
    info = info.group(1) if info else ''
    s = s[:m.start()] + hlavicka(f, info) + s[m.end():]
    s = do_hlavy(f, s)
    open(f, 'w', encoding='utf-8').write(s)

# seznam pro listování "předchozí / další" v zin.js
j = open('zin.js', encoding='utf-8').read()
data = 'var TEXTY = ' + json.dumps([{'s': s, 'n': cz, 'en': eng, 'k': 'texty', 'd': datum(s)[:10]} for s, cz, eng, _ in TEXTY] + [{'s': s, 'n': cz, 'en': eng, 'k': 'basne', 'd': datum(s)[:10]} for s, cz, eng in BASNE], ensure_ascii=False, indent=2) + ';'
j = re.sub(r'var TEXTY = \[.*?\];', lambda _: data, j, count=1, flags=re.S)
open('zin.js', 'w', encoding='utf-8').write(j)

# RSS feed (feed.xml) — nejnovější nahoře
from email.utils import format_datetime
from datetime import datetime
from html import escape
polozky = []
for slug, cz, _, kat in [(a, b, c, d) for a, b, c, d in TEXTY] + [(a, b, c, 'básně') for a, b, c in BASNE]:
    html = open(f'texty/{slug}.html', encoding='utf-8').read()
    popis = re.search(r'<meta name="description" content="([^"]*)"', html) or re.search(r'<meta property="og:description" content="([^"]*)"', html)
    d = datetime.fromisoformat(datum(slug))
    polozky.append((d, f"""  <item>
    <title>{escape(cz)}</title>
    <link>{WEB}texty/{slug}.html</link>
    <guid>{WEB}texty/{slug}.html</guid>
    <category>{kat}</category>
    <pubDate>{format_datetime(d)}</pubDate>
    <description>{popis.group(1) if popis else ''}</description>
  </item>"""))
polozky.sort(key=lambda x: x[0], reverse=True)
open('feed.xml', 'w', encoding='utf-8').write(f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Majmi — zápisník</title>
  <link>{WEB}</link>
  <atom:link href="{WEB}feed.xml" rel="self" type="application/rss+xml"/>
  <description>Dialogy, úvahy a básně ze sešitu.</description>
  <language>cs</language>
  <lastBuildDate>{format_datetime(polozky[0][0])}</lastBuildDate>
{chr(10).join(p for _, p in polozky)}
</channel>
</rss>
""")
# Vyhledávání (hledani.json), sitemap.xml, robots.txt
from html import unescape
def holy_text(soubor):
    try: h = open(soubor, encoding='utf-8').read()
    except FileNotFoundError: return ''
    m = re.search(r'<article[^>]*id="prepis".*?</article>', h, re.S)
    t = m.group(0) if m else ''
    t = re.sub(r'<aside.*?</aside>', ' ', t, flags=re.S)
    t = re.sub(r'<br\s*/?>|</p>|</div>', '\n', t)
    t = unescape(re.sub(r'<[^>]+>', ' ', t))
    return re.sub(r'[ \t]+', ' ', re.sub(r'\n\s*', '\n', t)).strip()
hledani = []
for slug, cz, eng, kat in [(a, b, c, d) for a, b, c, d in TEXTY] + [(a, b, c, 'básně') for a, b, c in BASNE]:
    hledani.append({'s': slug, 'n': cz, 'en': eng, 'k': kat, 'k_en': KAT[kat],
                    't': holy_text(f'texty/{slug}.html'), 't_en': holy_text(f'en/texty/{slug}.html')})
open('hledani.json', 'w', encoding='utf-8').write(json.dumps(hledani, ensure_ascii=False))
mapa = [f for f in stranky() if not os.path.basename(f).startswith('_') and f not in ('basne.html', 'en/basne.html', '404.html')]
open('sitemap.xml', 'w', encoding='utf-8').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + ''.join(f'  <url><loc>{WEB}{"" if f == "index.html" else f}</loc></url>\n' for f in mapa) + '</urlset>\n')
open('robots.txt', 'w', encoding='utf-8').write(f'User-agent: *\nAllow: /\nSitemap: {WEB}sitemap.xml\n')
print('hotovo')
