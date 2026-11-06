# Majmi — zápisník

**Osobní fanzin na internetu.** Eseje, teze, dialogy, dramata a časem možná i básně. Všechno vzniká rukou v sešitě a sem se to přepisuje. U každého textu jsou i fotky původních stránek, takže je vidět, co jsem škrtal.

👉 **https://majmi-cz.github.io/majmi/**

## Uvnitř

| | | |
|---|---|---|
| I. | [Pickle Jar](https://majmi-cz.github.io/majmi/texty/pickle-jar.html) | dialog, 2026 |

## Jak je to udělané

Čisté HTML, CSS a kousek JavaScriptu. Žádný framework, žádný build, běží rovnou na GitHub Pages.

```
index.html           obálka
texty.html           seznam textů
rukopis.html         fotky ze sešitu
o-zapisniku.html     pár slov o zápisníku
texty/               jeden soubor = jeden text
texty/_sablona.html  šablona pro esej, teze, dialog i báseň
rukopis/             fotky stránek
fonts/               písma
styl.css             vzhled (xerox, výstřižky, páska, štítkovač)
zin.js               skládá vystřižená písmena a přepíná přepis/rukopis
```

### Nový text

1. Zkopíruj `texty/_sablona.html` a přejmenuj ho (`o-pratelstvi.html`).
2. Napiš název VELKÝMI písmeny do `<h1 class="vystrizky">`, z výstřižků se poskládá sám.
3. Do `texty.html` přidej odkaz (zkopíruj jeden `<a class="kus">`).
4. Fotky stránek zmenši na zhruba 1600 px a ulož do `rukopis/`.

## Licence

Texty a fotky rukopisu jsou pod **CC BY-NC-SA 4.0**: opiš a pošli dál, ale uveď autora, nevydělávej na tom a sdílej to stejně. Kód je pod licencí **MIT**. Písma mají vlastní licence. Podrobnosti najdeš v [LICENSE](LICENSE).
