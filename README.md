# PixelMap

A deliberately focused tile map editor for pixel and retro games: tile palette
on the left, map canvas on the right. It runs offline in the browser with no
dependencies or build step.

## Use it

Double-click `index.html`, or host the three files on any static web server.

## Files

- `index.html` — page structure, panels, and dialogs
- `styles.css` — the complete visual design
- `app.js` — editor logic: tilesets, palettes, rendering, layers, sheet import,
  saving, and export

## Features

- 8×8, 16×16, and 32×32 tileset imports
- Three tile layers (Ground, Object 1, Object 2) and an Events layer
- Responsive RPG Maker-style tile grid with pagination for large tilesets
- Resizable left sidebar; its width is remembered in the browser
- Eight editable four-color palette slots with live console-style recoloring
- Importable objects and sprites with common GB/GBA/SNES/NES/Mega Drive sizes
- RPG Maker-style sheet import: click a cell for one tile or drag a region to
  create a stamp or object
- Color-key transparency, tile deduplication, border checks, undo, and local saves

## Export

- Self-contained JSON with base64 graphics for Unity, GBDK, and other engines
- Baked tileset PNG plus tile-index map CSV
- Character map as `.txt`
- Copyable C array (`ROOM_M[]`)
- Rendered map PNG

The JSON export uses `{"format":"pixelmap-room","version":1, …}` and contains
`size`, `palettes`, `tiles`, `layers`, `tileset`, `baked`, `objects`, and
`markers`.
