# Sekce Lístky: vystřihne poznámky z okrajů rukopisu (listky/NN.jpg)
# a vyrobí dlouhou stránku listky.html + en/listky.html (výstřižek vlevo/vpravo, vedle přepis).
# Spuštění: python3 listky.py  → pak python3 hlavicka.py && python3 obnov-verzi.py
# Rámeček = (levý, horní, pravý, dolní) v % fotky; otoc = o kolik stupňů otočit (90 = proti směru hodin).
import os, re
from PIL import Image, ImageOps, ImageEnhance

L = [  # (text, strana rukopisu, rámeček, otoč, česky, anglicky)
 ('celsius-233', 1, (74, 10, 98, 52), 90, '233 °C → <b>zaokrouhli!!</b>', '233 °C → <b>round it!!</b>'),
 ('celsius-233', 2, (0, 1, 24, 12), 0, 'New complain', 'New complain'),
 ('celsius-233', 2, (0, 15, 19, 33), -90, 'Spoiler alert! ⚠', 'Spoiler alert! ⚠'),
 ('celsius-233', 2, (3, 41, 16, 60), -90, 'Na co řádky za okraji?', 'What are the lines past the margin for?'),
 ('celsius-233', 2, (85, 10, 100, 52), 90, 'Volné místo.<br>Chudák strom.', 'Free space.<br>Poor tree.'),
 ('celsius-233', 2, (0, 66, 13, 93), -90, 'Mušle jsou úžasné', 'Seashells are amazing'),
 ('celsius-233', 3, (20, 0, 70, 6), 0, 'All Apologies );(', 'All Apologies );('),
 ('celsius-233', 3, (72, 5, 84, 19), 90, '* Nebo Wilde?<br>Who cares', '* Or Wilde?<br>Who cares'),
 ('celsius-233', 3, (79, 20, 98, 84), 0, '_ M Y S L<br>smyl / mysl / nemá smysl<br><br>/Hang/(Wo)/Man/', '_ M Y S L<br>washed away / mind / makes no sense<br><br>/Hang/(Wo)/Man/'),
 ('herakles', 5, (0, 71, 18, 99), 90, 'Héraklés?<br>more like <b>HER ANKLES</b>', 'Heracles?<br>more like <b>HER ANKLES</b>'),
 ('herakles', 5, (24, 71, 83, 92), 0, '→<br>je to šipka, ne debilní smajlík :)', '→<br>it’s an arrow, not a stupid smiley :)'),
 ('hudebni-nastroj', 1, (2, 1, 21, 9), 0, 'Entertain US', 'Entertain US'),
 ('hudebni-nastroj', 1, (86, 2, 100, 99), 90, 'Nekřičme! Nekřičme! Nekřičme!<br>Taky by se ti to nelíbilo!', 'Let’s not shout! Let’s not shout! Let’s not shout!<br>You wouldn’t like it either!'),
 ('hudebni-nastroj', 1, (0, 11, 11, 99), -90, 'Možná je to hlas schizofrenika / blázna / anděla', 'Maybe it’s the voice of a schizophrenic / a madman / an angel'),
 ('hudebni-nastroj', 1, (4, 90, 52, 99), 0, 'anděl? ← <b>Blbost</b>', 'angel? ← <b>Nonsense</b>'),
 ('kdo-podrzi-petu', 1, (0, 7, 15, 93), -90, 'Není to o školce! ⚠ ⚠ ⚠', 'It’s not about kindergarten! ⚠ ⚠ ⚠'),
 ('kdo-podrzi-petu', 2, (12, 0, 52, 6), 0, '[5] = Pět = Péťa', '[5] = Pět (five) = Péťa'),
 ('kdo-podrzi-petu', 3, (3, 0, 21, 7), 0, 'JARmila?<br>JÁ NE', 'JARmila?<br>NOT ME'),
 ('kdo-podrzi-petu', 1, (40, 91, 62, 98), 0, 'METAfora', 'METAphor'),
 ('sestikraska', 1, (52, 1, 72, 8), 0, '666', '666'),
 ('sestikraska', 1, (56, 5, 82, 15), 0, 'i kytka má GDPR ↙', 'even a flower has GDPR ↙'),
 ('sestikraska', 1, (77, 50, 92, 77), 90, 'Básník ✗ Malíř', 'Poet ✗ Painter'),
 ('sestikraska', 1, (84, 74, 100, 97), 90, 'Poeta ✗ Kreslíř', 'Poeta ✗ Drawer'),
]

src = open('hlavicka.py', encoding='utf-8').read()
TEXTY = eval(re.search(r'^TEXTY = (\[.*?^\])', src, re.S | re.M).group(1))
BASNE = eval(re.search(r'^BASNE = (\[.*?^\])', src, re.S | re.M).group(1))
NAZVY = {s: (cz, en) for s, cz, en, *_ in TEXTY + BASNE}

os.makedirs('listky', exist_ok=True)
for i, (s, p, (a, b, c, d), otoc, *_ ) in enumerate(L):
    im = Image.open(f'rukopis/{s}-{p}.jpg').convert('RGB')
    w, h = im.size
    v = im.crop((int(a * w / 100), int(b * h / 100), int(c * w / 100), int(d * h / 100)))
    if otoc: v = v.rotate(otoc, expand=True)
    v = ImageOps.autocontrast(v.convert('L'), cutoff=(1, 3))   # černobíle jako z kopírky
    v = ImageEnhance.Contrast(v).enhance(1.25)
    v.thumbnail((900, 900))
    v.save(f'listky/{i:02d}.jpg', quality=82, optimize=True)

def stranka(en):
    vzor = open(('en/' if en else '') + 'o-zapisniku.html', encoding='utf-8').read()
    hlava, zbytek = vzor.split('<h1 class="sekce">', 1)
    pata = zbytek[zbytek.index('</div>\n<script'):]
    up = '../' if en else ''
    nadpis = 'Lístky — Majmi' if not en else 'Notes — Majmi'
    popis = ('Všechno, co jsem čmáral po okrajích sešitu. Vlevo originál, vedle přepis.' if not en
             else 'Everything I scribbled in the margins. The original cut out, the transcription next to it.')
    hlava = re.sub(r'<title>.*?</title>', f'<title>{nadpis}</title>', hlava)
    hlava = re.sub(r'(<meta (?:name="description"|property="og:description") content=")[^"]*', lambda m: m.group(1) + popis, hlava)
    hlava = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m.group(1) + nadpis, hlava)
    hlava = re.sub(r'(<meta property="og:url" content=")[^"]*', lambda m: m.group(1) + 'https://majmi-cz.github.io/majmi/' + up.replace('../', 'en/') + 'listky.html', hlava)
    hlava = re.sub(r'(<meta property="og:image:alt" content=")[^"]*', lambda m: m.group(1) + ('Lístky vystřižené z písmen' if not en else 'Notes cut out of letters'), hlava)
    hlava = re.sub(r'(<div class="info">).*?(</div>)', r'\1' + ('zápisník č. 1<br>lístky z okrajů' if not en else 'notebook no. 1<br>notes from the margins') + r'\2', hlava, flags=re.S)
    out = [hlava, '<h1 class="sekce"><span class="vystrizky">', 'NOTES' if en else 'LÍSTKY', '</span></h1>\n\n',
           f'  <p class="listky-uvod vystrizek b paska vlevo">{popis}</p>\n\n  <div class="listky">\n']
    posledni = None
    for i, (s, p, _, _, cz, eng) in enumerate(L):
        nazev = NAZVY[s][1 if en else 0]
        if s != posledni:
            out.append(f'    <h2 class="skupina listky-text"><a class="dymo" href="texty/{s}.html">{nazev} →</a></h2>\n')
            posledni = s
        alt = re.sub(r'<[^>]+>', ' ', eng if en else cz)
        out.append(f'''    <section class="lp">
      <figure class="lp-foto vystrizek paska"><img src="{up}listky/{i:02d}.jpg" alt="{'Handwritten' if en else 'Rukopis'}: {alt}" loading="lazy"></figure>
      <div class="lp-prepis vystrizek b"><p>{eng if en else cz}</p><a class="lp-zdroj" href="texty/{s}.html#rukopis">{('page' if en else 'str.')} {p} · {nazev}</a></div>
    </section>
''')
    out.append('  </div>\n\n')
    out.append(pata)
    open(('en/' if en else '') + 'listky.html', 'w', encoding='utf-8').write(''.join(out))

stranka(False); stranka(True)
print(len(L), 'lístků')
