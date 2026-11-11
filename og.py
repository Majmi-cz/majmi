# Vyrobí náhledy pro sdílení (og-<slug>.jpg a en/og-<slug>.jpg), 1200×630.
# Název z vystřižených písmen, štítek s druhem textu, lístek s popisem / prvními verši
# a kus rukopisu přilepený páskou (když existuje rukopis/<slug>-1.jpg).
# Spuštění: python3 og.py   (potřebuje Pillow a fontTools[woff])
import io, os, random, re
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

import importlib.util
spec = importlib.util.spec_from_file_location('h', 'hlavicka.py')
src = open('hlavicka.py', encoding='utf-8').read()
TEXTY = eval(re.search(r'^TEXTY = (\[.*?^\])', src, re.S | re.M).group(1))
BASNE = eval(re.search(r'^BASNE = (\[.*?^\])', src, re.S | re.M).group(1))

W, H = 1200, 630
_cache = {}
def font(soubor, vel):
    if soubor not in _cache:
        f = TTFont('fonts/' + soubor)
        f.flavor = None
        b = io.BytesIO(); f.save(b)
        _cache[soubor] = (b.getvalue(), set(f.getBestCmap()))
    return ImageFont.truetype(io.BytesIO(_cache[soubor][0]), vel)
def ma(soubor, ch):
    font(soubor, 10)
    return ord(ch) in _cache[soubor][1]

PISMA = ['anton-latin-ext-400-normal.woff2', 'archivo-black-latin-ext-400-normal.woff2',
         'bodoni-moda-latin-ext-900-italic.woff2', 'morris-roman-cz.woff2']
LATIN = {'anton-latin-ext-400-normal.woff2': 'anton-latin-400-normal.woff2',
         'archivo-black-latin-ext-400-normal.woff2': 'archivo-black-latin-400-normal.woff2',
         'bodoni-moda-latin-ext-900-italic.woff2': 'bodoni-moda-latin-900-italic.woff2'}
PAPIRY = [(250, 250, 246), (244, 226, 58), (222, 219, 210), (250, 250, 246), (18, 18, 18)]
TONER = (18, 18, 18)

def pozadi(rnd):
    img = Image.new('RGB', (W, H), (205, 203, 197))
    sum_ = Image.effect_noise((W, H), 28).convert('RGB')
    img = Image.blend(img, sum_, .22)
    return img

def pismeno(ch, vel, rnd):
    # vybere písmo, které znak má (latin / latin-ext / azbuka)
    kandidati = PISMA[:]
    rnd.shuffle(kandidati)
    soubor = None
    for k in kandidati:
        for s in (k, LATIN.get(k)):
            if s and ma(s, ch): soubor = s; break
        if soubor: break
    if not soubor: soubor = 'oswald-cyrillic-600-normal.woff2'
    f = font(soubor, vel)
    papir = rnd.choice(PAPIRY)
    barva = (250, 250, 246) if papir == (18, 18, 18) else TONER
    l, t, r, b = f.getbbox(ch)
    pad = int(vel * .14)
    w, h = r - l + 2 * pad, int(vel * 1.05) + 2 * pad
    tile = Image.new('RGBA', (w, h), papir + (255,))
    d = ImageDraw.Draw(tile)
    d.text((pad - l, pad + (int(vel * 1.05) - (b - t)) // 2 - t), ch, font=f, fill=barva)
    tile = tile.rotate(rnd.uniform(-7, 7), resample=Image.BICUBIC, expand=True)
    return tile

def nazev(img, text, x0, y0, sirka, rnd):
    slova = text.upper().split()
    for vel in (150, 130, 112, 96, 84, 72, 62):
        rnd2 = random.Random(rnd.random())
        radky, radek, sir = [], [], 0
        dlazdice = []
        for sl in slova:
            tiles = [pismeno(ch, vel, rnd2) for ch in sl]
            sw = sum(t.width - int(vel * .1) for t in tiles)
            if radek and sir + sw + vel * .35 > sirka:
                radky.append(radek); radek, sir = [], 0
            radek.append(tiles); sir += sw + vel * .35
        if radek: radky.append(radek)
        vyska = len(radky) * vel * 1.32
        if len(radky) <= 3 and vyska < 360 and all(sum(sum(t.width - int(vel * .1) for t in s) for s in r) + vel * .35 * (len(r) - 1) <= sirka for r in radky):
            break
    y = y0
    for r in radky:
        x = x0
        for s in r:
            for t in s:
                img.paste(t, (int(x), int(y + rnd.uniform(-8, 8))), t)
                x += t.width - int(vel * .1)
            x += vel * .35
        y += vel * 1.32
    return int(y)

def stin(t, posun=(6, 8)):
    s = Image.new('RGBA', (t.width + 30, t.height + 30), (0, 0, 0, 0))
    a = t.split()[3].point(lambda v: 60 if v else 0)
    s.paste((0, 0, 0, 255), (15 + posun[0], 15 + posun[1]), a)
    return s.filter(ImageFilter.GaussianBlur(4))

def paska(img, cx, cy, rnd, w=110):
    p = Image.new('RGBA', (w, 30), (232, 229, 214, 205))
    p = p.rotate(rnd.uniform(-8, 8), expand=True, resample=Image.BICUBIC)
    img.paste(p, (int(cx - p.width / 2), int(cy - p.height / 2)), p)

def listek(text, sirka, rnd):
    f = font('another-typewriter-cz.woff2', 30)
    radky = []
    for odst in text.split('\n'):
        r = ''
        for sl in odst.split():
            if f.getlength(r + ' ' + sl) > sirka - 56 and r: radky.append(r); r = sl
            else: r = (r + ' ' + sl).strip()
        radky.append(r)
    radky = [r for r in radky if r]
    if len(radky) > 3:
        radky = radky[:3]
        radky[2] = radky[2].rstrip(' ,.;–-') + '...'
    radky = [r.replace('’', "'").replace('‘', "'").replace('“', '"').replace('„', '"') for r in radky]
    h = 44 + 42 * len(radky)
    t = Image.new('RGBA', (sirka, h), (250, 250, 246, 255))
    d = ImageDraw.Draw(t)
    for i, r in enumerate(radky):
        d.text((28, 24 + i * 42), r, font=f, fill=TONER)
    return t.rotate(rnd.uniform(-1.8, 1.8), expand=True, resample=Image.BICUBIC)

ARCHIVO = ('archivo-black-latin-400-normal.woff2', 'archivo-black-latin-ext-400-normal.woff2')
def smiseny(d, xy, text, vel, fill, soubory=ARCHIVO, kresli=True):
    """Píše znak po znaku a bere písmo, které ten znak má. Vrátí šířku."""
    x, y = xy
    for ch in text:
        s = next((f for f in soubory if ma(f, ch)), soubory[0])
        f = font(s, vel)
        if kresli: d.text((x, y), ch, font=f, fill=fill)
        x += f.getlength(ch)
    return x - xy[0]

def dymo(text):
    text = ' '.join(text.upper())
    w = int(smiseny(None, (0, 0), text, 22, None, kresli=False)) + 36
    t = Image.new('RGBA', (w, 46), TONER + (255,))
    smiseny(ImageDraw.Draw(t), (18, 9), text, 22, (240, 240, 240))
    return t

def rukopis(slug, rnd):
    cesta = f'rukopis/{slug}-1.jpg'
    if not os.path.exists(cesta): return None
    r = Image.open(cesta).convert('L')
    r = ImageOps.autocontrast(r, cutoff=2)
    w = r.width
    vyrez = r.crop((int(w * .06), int(r.height * .05), int(w * .94), int(r.height * .05) + int(w * .88 * 1.25)))
    vyrez = vyrez.resize((330, 412)).convert('RGB')
    vyrez = Image.blend(vyrez, Image.new('RGB', vyrez.size, (250, 250, 246)), .08)
    t = vyrez.convert('RGBA')
    return t.rotate(rnd.uniform(3, 6), expand=True, resample=Image.BICUBIC, fillcolor=(0, 0, 0, 0))

def udelej(slug, titul, druh, popis, ven, en):
    rnd = random.Random(slug + ('en' if en else ''))
    img = pozadi(rnd).convert('RGBA')
    ruk = rukopis(slug, rnd)
    sirka = 720 if ruk else 1060
    if ruk:
        x, y = 820, 92
        img.alpha_composite(stin(ruk), (x - 15, y - 15))
        img.paste(ruk, (x, y), ruk)
        paska(img, x + ruk.width / 2, y + 12, rnd)
    konec = nazev(img, titul, 70, 60, sirka, rnd)
    dy = dymo(druh)
    yl = min(max(konec + 10, 330), 440)
    img.paste(dy, (70, yl), dy)
    if popis:
        l = listek(popis, min(sirka - dy.width - 40, 640), rnd)
        lx = 70 + dy.width + 30
        img.alpha_composite(stin(l, (4, 6)), (lx - 15, yl - 30))
        img.paste(l, (lx, yl - 15), l)
        paska(img, lx + l.width / 2, yl - 15, rnd, 90)
    pata = ('written: in my head' if en else 'vzniklo: v mojí hlavě') + '   ·   majmi-cz.github.io/majmi'
    sw = smiseny(None, (0, 0), pata, 20, None, kresli=False)
    smiseny(ImageDraw.Draw(img), (W - 60 - sw, H - 52), pata, 20, (60, 60, 60))
    img.convert('RGB').save(ven, quality=86, optimize=True)

def popis_stranky(soubor, basen):
    h = open(soubor, encoding='utf-8').read()
    if basen:
        m = re.search(r'<p class="basen"[^>]*>(.*?)</p>', h, re.S)
        if m:
            t = re.sub(r'<[^>]+>', '', m.group(1))
            v = [l.strip() for l in t.split('\n') if l.strip()][:2]
            return '\n'.join(v)
    m = re.search(r'<meta name="description" content="([^"]*)"', h)
    return m.group(1).replace('&amp;', '&') if m else ''

DRUH = {'dialogy': ('dialog', 'dialogue'), 'úvahy': ('úvaha', 'essay'), 'básně': ('báseň', 'poem')}
vse = [(s, cz, en, k) for s, cz, en, k in TEXTY] + [(s, cz, en, 'básně') for s, cz, en in BASNE]
os.makedirs('en', exist_ok=True)
for s, cz, en, k in vse:
    b = k == 'básně'
    udelej(s, cz, DRUH[k][0], popis_stranky(f'texty/{s}.html', b), f'og-{s}.jpg', False)
    udelej(s, en, DRUH[k][1], popis_stranky(f'en/texty/{s}.html', b), f'en/og-{s}.jpg', True)
    for soubor, cesta, alt in ((f'texty/{s}.html', f'og-{s}.jpg', f'{cz} vystřižený z písmen jako ve fanzinu'),
                               (f'en/texty/{s}.html', f'en/og-{s}.jpg', f'{en} cut out of letters like a fanzine')):
        h = open(soubor, encoding='utf-8').read()
        h = re.sub(r'(<meta property="og:image" content=")[^"]*(")', r'\g<1>https://majmi-cz.github.io/majmi/' + cesta + r'\2', h)
        h = re.sub(r'(<meta property="og:image:alt" content=")[^"]*(")', lambda m: m.group(1) + alt + m.group(2), h)
        if 'twitter:image' not in h:
            h = h.replace('<meta name="twitter:card" content="summary_large_image">',
                          '<meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:image" content="">')
        h = re.sub(r'(<meta name="twitter:image" content=")[^"]*(")', r'\g<1>https://majmi-cz.github.io/majmi/' + cesta + r'\2', h)
        open(soubor, 'w', encoding='utf-8').write(h)
    print('✓', s)
