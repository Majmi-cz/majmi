# Zveřejněné recenze

Každá recenze je jeden soubor `recenze/<text>/<číslo>.json`, např. `recenze/herakles/1762800000000.json`:

```json
{ "text": "Myšlenkoberoucí.", "kdo": "Kubas", "datum": "2026-11-10" }
```

Nejjednodušší cesta: v mailu s recenzí (když ji čtenář dovolil zveřejnit) klikni na odkaz
**ZVEŘEJNIT** → otevře se GitHub s předvyplněným souborem → dole klikni **Commit changes**. Hotovo.

Text můžeš před commitem i upravit.

**Smazání:**
- v mailu je u každé zveřejnitelné recenze i odkaz **SMAZAT** → klik → Commit changes, nebo
- otevři web s `#majmi` na konci adresy (např. `majmi-cz.github.io/majmi/#majmi`). Prohlížeč si to zapamatuje
  a u každé zveřejněné recenze uvidíš červené **✕ smazat** → klik → Commit changes.
  Vypnutí: `#nemajmi`. Ostatní tlačítko nevidí (a smazat stejně může jen ten, kdo má přístup do repa).

Složky: `pickle-jar`, `herakles`, `celsius-233`, `hudebni-nastroj`, `kdo-podrzi-petu`, `basne`.
