# PixelMap

Ein bewusst simpler Tile-Map-Editor für Pixel-/Retro-Spiele — Tile-Palette links,
Klick-Leinwand rechts, sonst nichts. Läuft offline im Browser, kein Build,
keine Abhängigkeiten.

## Benutzen

`index.html` doppelklicken — fertig. (Oder über GitHub Pages öffnen.)

## Dateien

- `index.html` — Struktur (Header, Panels, Dialoge)
- `styles.css` — das gesamte Aussehen
- `app.js` — die komplette Logik (mit `// ===` Abschnitts-Bannern: Tileset, Paletten,
  Rendering, Ebenen, Blatt-Import, Export …)

Drei Dateien, kein Build-Schritt — einfach die drei zusammen ausliefern/pushen.

## Was es kann

- **3 Tile-Ebenen** (Boden / Objekt 1 / Objekt 2) + **Events-Ebene** (benannte Marker/Spawns)
- **Raster-Palette** wie im RPG Maker, transparentes Compositing in der Vorschau
- **Paletten**: 8 wählbare 4-Farben-Sets, Vorschau wird auf Konsolen-Optik umgefärbt
- **Objekte/Sprites**: eigene Grafiken laden, platzieren, Größe nach Konsole (GB/GBA/SNES/…)
- **Blatt-Import** (RPG-Maker-Stil): großes Grafik-Blatt laden, Zelle klicken = Palette-Tile,
  Region ziehen = Stempel oder Objekt; Farbschlüssel-Transparenz, Dubletten-Erkennung
- **Rand-Check**, Undo, Speichern/Laden (im Browser)

## Export

- **JSON** (selbst-enthalten, Grafiken als base64) — für Unity, GBDK & Co.
  Enthält Zeichen-Raster *und* ein pixel-gebackenes Tileset + Index-Karte.
- Zeichen-Raster als `.txt`
- C-Array (`ROOM_M[]`) zum Kopieren

## Format

Der JSON-Export folgt `{"format":"pixelmap-room","version":1, …}` mit `size`, `palettes`,
`tiles`, `layers`, `tileset`, `baked` (Compositing) und `objects`. Engines lesen die JSON
direkt (Unity) oder über ein kleines Build-Skript (GBDK: JSON → `tiles.h` + Arrays).
