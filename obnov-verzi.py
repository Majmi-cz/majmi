# Spusť po každé změně styl.css nebo zin.js: python3 obnov-verzi.py
# Přidá k odkazům ?v=<čas>, aby prohlížeče nenačítaly starou verzi z mezipaměti.
import re, glob, time
v = time.strftime('%Y%m%d%H%M')
for f in glob.glob('*.html') + glob.glob('texty/*.html'):
    s = open(f, encoding='utf-8').read()
    s2 = re.sub(r'(styl\.css|zin\.js)(\?v=\d+)?"', r'\1?v=' + v + '"', s)
    if s2 != s:
        open(f, 'w', encoding='utf-8').write(s2)
print('verze', v)
