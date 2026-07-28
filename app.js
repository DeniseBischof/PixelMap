// ================= Tileset (basic overworld, 12×(8×8), eingebettet) =================
const BUILTIN_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAICAYAAAAGP/oPAAACu0lEQVR4nLVWQWvUQBSelP4AkVRCWEIIS5E9SClFRIInKcWDp6UHD+JJiocexIOHHnvwICIiRURkDz146EmKlCKeFlnKEkQkLGFZQgghlGXpwZPCRt60L3mZzE6j0g9m5703Sch+875vom3srmVMgSVvqlpmU3u1lB/1fXZ9pZXnHyeu8v4Xtz3lejAckzhki027FP8KeqXrvSBhy4tmnqf6LeXzNx8/1WC+v7uejQZRXu9u93j9ojEHP1E44YlxxSjNFA3LyuMoOb0eYZrFH5bVVpZtPlTQjWI9jQsiEIbZkMb83RyH1cFN1+VDhLt1gzehc9Wq1P4FJ/6D2vfO0yQ9TvMZNgFzkXDLvFzKkySpPBhr4zhi/XNeIhUINxpW9ZoklsbQ8TAoaG7qrDaoAibxz/o3Msb8djtr7e1pQP7vhZfsxGfZpVZHq7UBll0QCmqAHMmXEY6KiKOIW44IWtOdasehGvpeWCEcNgNyUMQ4DbnVUNAcYrAb0XZAEfFodPq8sxp0/tdutxLXJV9lUUC++azJfNbmpN/Z9rNPW0cl8j8f7nNVBIMBzx9tPuHrc6L9qECVAOQjwPNnDVQBgivCC3PyReBmAPkA9HyYcdBcBiQf8e37sEQ4xFBT+b3f+aHVtSjo/HsfvvBZ9j47r56XyKe1eex+7HjMUQkUoATsfNgMqgzwfLQdGgP0hlV0veQF9bNux+6fBfB+tB+M0W5EG0IcJ0O2dK3JCYcZgTW6CRurLU7Km0O/QiTt/vMsSux+kXyAPwiKQxiASpABSMfux85XnQOyM4F2PaiAHspjCfmyg1h2DoD1wLi75uYx2hG1JUo+Jb4OqEKAeBhUIbNIR6DdAOk4Xu+85TXtbz9Dxc7vjctfJCJS5+F/fYbuH6iPcHtanFUUeC4cJNUvNIr3nXc5cSoFXBT+APy6lWq47OqIAAAAAElFTkSuQmCC";

// Standard-Legende (Reihenfolge = Bild). solid/canopy = Editor-Metadaten, pal = Palette-Index.
const BUILTIN_DEFS = [
  { ch: '.', name: 'Grass',     solid: false, canopy: false, pal: 0 },
  { ch: ',', name: 'Dirt',      solid: false, canopy: false, pal: 2 },
  { ch: '#', name: 'Stone',     solid: true,  canopy: false, pal: 3 },
  { ch: '~', name: 'Water',     solid: true,  canopy: false, pal: 1 },
  { ch: '_', name: 'Sand',      solid: false, canopy: false, pal: 2 },
  { ch: '=', name: 'Path',      solid: false, canopy: false, pal: 2 },
  { ch: 'w', name: 'Wood',      solid: false, canopy: false, pal: 4 },
  { ch: '^', name: 'Mountain',  solid: true,  canopy: false, pal: 3 },
  { ch: 'T', name: 'Tree',      solid: true,  canopy: false, pal: 5 },
  { ch: 'B', name: 'Bush',      solid: true,  canopy: false, pal: 5 },
  { ch: '*', name: 'Flowers',   solid: false, canopy: false, pal: 6 },
  { ch: 'o', name: 'Rock',      solid: true,  canopy: false, pal: 3 },
];
const LEGACY_TILE_NAMES = {
  Gras: 'Grass', Erde: 'Dirt', Stein: 'Stone', Wasser: 'Water', Sand: 'Sand',
  Weg: 'Path', Holz: 'Wood', Berg: 'Mountain', Baum: 'Tree', Busch: 'Bush',
  Blumen: 'Flowers', Fels: 'Rock'
};
const LEGACY_PALETTE_NAMES = {
  Gras: 'Grass', Wasser: 'Water', Erde: 'Dirt', Stein: 'Stone', Holz: 'Wood',
  Laub: 'Foliage', Blüten: 'Flowers', Neutral: 'Neutral'
};
// 8 Paletten-Slots nach Funktion (Tile.pal zeigt auf einen Slot 0..7), je 4 Farben hell→dunkel.
const PAL_SLOTS = ['Grass', 'Water', 'Dirt', 'Stone', 'Wood', 'Foliage', 'Flowers', 'Neutral'];
// Beliebte Farbpaletten-Presets zum Auswählen (füllen die 8 Slots).
const PALETTE_PRESETS = [
  { name: 'Warm Cartridge', pals: [
    ['#e6ffe6','#96e68c','#3ca050','#123a17'], ['#cfeaff','#79bdf0','#356fbe','#132a4e'],
    ['#f3e2b8','#d9b26a','#9c6a2e','#4a2f12'], ['#eceae0','#a9a79a','#5f5e52','#232219'],
    ['#e6c79c','#b3823f','#71441f','#2c190b'], ['#bfe39a','#5fa03f','#2f6b28','#123a12'],
    ['#ffd9e6','#ff8fb0','#d24a72','#6f1f3a'], ['#f0efe6','#b6b6a5','#6b6b5b','#242419'] ] },
  { name: 'Nature', pals: [
    ['#cde6a5','#8fbf5a','#4f8f3a','#274d20'], ['#bfe3f0','#6fb6d8','#2f74a6','#123a55'],
    ['#e4cfa0','#c39a5e','#8a5f30','#432c15'], ['#dcdcd4','#a7a79c','#6e6e63','#2c2c25'],
    ['#d9b183','#a9743c','#6f4520','#2f1d0e'], ['#a7cf7a','#5a9440','#356b28','#173a15'],
    ['#f3d6df','#e78fa6','#c14f6c','#6f2438'], ['#eeeee6','#b3b3a6','#6d6d60','#26261d'] ] },
  { name: 'Pastel (Sweetie-16)', pals: [
    ['#a7f070','#38b764','#257179','#1a1c2c'], ['#73eff7','#41a6f6','#3b5dc9','#29366f'],
    ['#ffcd75','#ef7d57','#b13e53','#5d275d'], ['#f4f4f4','#94b0c2','#566c86','#333c57'],
    ['#ffcd75','#c98a4b','#8a5a2c','#3a2416'], ['#a7f070','#38b764','#1e6b3a','#123a1e'],
    ['#ffd9e6','#ff9ec4','#b13e53','#5d275d'], ['#f4f4f4','#94b0c2','#566c86','#1a1c2c'] ] },
  { name: 'PICO-8', pals: [
    ['#00e436','#008751','#1d2b53','#000000'], ['#fff1e8','#29adff','#1d2b53','#000000'],
    ['#fff1e8','#ffccaa','#ffa300','#ab5236'], ['#fff1e8','#c2c3c7','#5f574f','#000000'],
    ['#ffccaa','#ab5236','#5f574f','#000000'], ['#00e436','#008751','#1d2b53','#000000'],
    ['#ff77a8','#ff004d','#7e2553','#1d2b53'], ['#fff1e8','#c2c3c7','#5f574f','#000000'] ] },
  // Beliebte 4-Farben-Paletten (Lospec) — je Slot dieselbe Rampe (monochrom-thematisch)
  { name: 'Game Boy (DMG)',   pals: monoVaried(['#9bbc0f','#77a112','#3b6a20','#0f380f']) },
  { name: 'Kirokaze GB',      pals: monoVaried(['#e2f3e4','#94e344','#46878f','#332c50']) },
  { name: 'Ice Cream GB',     pals: monoVaried(['#fff6d3','#f9a875','#eb6b6f','#7c3f58']) },
  { name: 'Mist GB',          pals: monoVaried(['#c4f0c2','#5ab9a8','#1e606e','#2d1b00']) },
  { name: 'Rustic GB',        pals: monoVaried(['#edb4a1','#a86868','#764462','#2c2137']) },
  { name: 'Spacehaze GB',     pals: monoVaried(['#f8e3c4','#cc3495','#6b1fb1','#0b0630']) },
  { name: 'Hollow',           pals: monoVaried(['#fafbf6','#c6b7be','#565a75','#0f0f1b']) },
  { name: '2-Bit Demichrome', pals: monoVaried(['#e9efec','#a0a08b','#555568','#211e20']) },
  { name: 'CGA',              pals: monoVaried(['#ffffff','#55ffff','#ff55ff','#000000']) },
  { name: 'Grayscale',        pals: monoVaried(['#e8e8e8','#a0a0a0','#585858','#181818']) },
];
// Mono-Palette (1 Rampe) → 8 variierte Slots: Wasser/Stein/Laub bekommen die umgekehrte
// Stufen-Reihenfolge (dunkle Basis), damit sich Tiles unterscheiden statt alle gleich zu sein.
function monoVaried(r) {
  const rev = [r[3], r[2], r[1], r[0]];
  //       Gras Wasser Erde Stein Holz Laub Blüten Neutral
  return [r,  rev,   r,   rev,  r,   rev, r,     r];
}
function presetPalettes(idx) {
  return PALETTE_PRESETS[idx].pals.map((hex, i) => ({ name: PAL_SLOTS[i], hex: hex.slice(), rgb: hex.map(hexToRgb) }));
}
let curPreset = 0;
// Zeichen-Pool für hochgeladene Tiles jenseits der Standard-12
const CHAR_POOL = '.#DOTFBCHSEPabcdefghijklmnopqrstuvwxyz0123456789+*=~^%&@$';

// Tile-Größe ist eine Projekt-Einstellung (im "Neu"-Dialog wählbar). CELL = Anzeigegröße auf der Leinwand.
let SRC = 8, CELL = 24;
function setTileSize(px) {
  SRC = px;
  CELL = px <= 8 ? 24 : px <= 16 ? 32 : 48;
  srcCanvas = null;               // Offscreen-Puffer passt nicht mehr
  const sizeSelect = document.getElementById('tilesetSize');
  if (sizeSelect && ['8', '16', '32'].includes(String(px))) sizeSelect.value = String(px);
}
const LS_KEY = 'pixelmap_rooms_v1', LS_KEY_OLD = 'smalldurs_rooms_v2';   // alter Schlüssel wird einmalig migriert
const LAYER_NAMES = ['Ground', 'Object 1', 'Object 2'];
const DEFAULT_MARKERS = ['start', 'door', 'npc', 'chest', 'goal'];
const MARKER_COLORS = { start:'#6cc46c', door:'#c4a24a', npc:'#6c9ac4', chest:'#c46c9a', goal:'#c46c6c' };
// Sprite-Größen, sortiert nach Konsole (px). Tile-Footprint = w/8 × h/8.
const SPRITE_SIZES = [
  { console: 'Game Boy',   list: [[8,8],[8,16],[16,16],[16,24],[24,24],[32,32],[32,48]] },
  { console: 'GBA',        list: [[8,8],[16,16],[16,32],[32,32],[32,64],[64,64]] },
  { console: 'SNES',       list: [[8,8],[16,16],[32,32],[64,64]] },
  { console: 'NES',        list: [[8,8],[8,16],[16,16],[16,32]] },
  { console: 'Mega Drive', list: [[8,8],[16,16],[24,24],[32,32],[32,48]] },
];

// ================= State =================
let cols = 20, rows = 18;
let layers = [];               // layers[i][r][c] = char | null   (0=Boden,1=Obj1,2=Obj2)
let layerVis = [true, true, true];
let markers = {};              // name -> {x,y}
let markerOrder = [];          // Reihenfolge der Namen
let objects = [];              // {name,x,y,tw,th,console,img,imgSrc}  — platzierte Sprites
let curObject = null;          // Index in objects | null
let activeLayer = 0;           // 0..2 | 'events'
let curTile = 0;               // Index in tiledefs, oder -1 = Radierer
let curStamp = null;           // {w,h,tiles:[[char|null]]} — Mehrfach-Tile-Pinsel aus dem Blatt
let autotileGroups = [];       // {name, mode, variants[]} using source-sheet order
let curAutoTile = null;        // active autotile group index | null
let curMarker = null;
let showGrid = true, dimOthers = true;
let recolor = true;            // GBC-Farben: Tiles auf 4 Stufen quantisieren + Palette einfärben
let invert = false;            // Hell/Dunkel-Stufen tauschen (invertierte Palette)
let undoStack = [];

let tileset = { img: new Image(), tilesPerRow: 12, count: 12, defs: BUILTIN_DEFS.map(d => ({ ...d })) };
let tilesReady = false;
let chToIdx = {};

// Paletten (rgb aus hex abgeleitet) + Tile-Cache der eingefärbten 8×8-Kacheln
let palettes = presetPalettes(0);
let tileCache = [];            // tileCache[i] = 8×8-Canvas (eingefärbt) | null
let srcCanvas = null;          // Kept for backward-compatible project state resets.
const TILE_PAGE_SIZE = 192;
const MAX_TILE_COUNT = 6400;
let tilePage = 0;
let drawPending = false;

const $ = id => document.getElementById(id);
const cv = $('grid'), ctx = cv.getContext('2d');

function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function rebuildChMap() { chToIdx = {}; tileset.defs.forEach((d, i) => { if (d.ch) chToIdx[d.ch] = i; }); }
function srcXY(idx) { return [(idx % tileset.tilesPerRow) * SRC, Math.floor(idx / tileset.tilesPerRow) * SRC]; }
function tileCharForIndex(i) {
  if (i < CHAR_POOL.length) return CHAR_POOL[i];
  const privateUse = i - CHAR_POOL.length;
  return privateUse < 6400 ? String.fromCharCode(0xE000 + privateUse) : null;
}

// ---- Tile-Atlas (wächst, nimmt Tiles aus Blättern auf) + Dubletten-Erkennung ----
let tileHashes = {};
function tileHash(d) { let h = 2166136261 >>> 0; for (let i = 0; i < d.length; i += 4) { h ^= d[i]; h = Math.imul(h, 16777619); h ^= d[i+1]; h = Math.imul(h, 16777619); h ^= d[i+2]; h = Math.imul(h, 16777619); h ^= d[i+3]; h = Math.imul(h, 16777619); } return h >>> 0; }
function ensureAtlas() {
  if (tileset.img && tileset.img.__atlas) return;
  const tpr = tileset.tilesPerRow || 16;
  const rows = Math.max(4, Math.ceil((tileset.defs.length + 1) / tpr));
  const a = document.createElement('canvas'); a.__atlas = true; a.width = tpr * SRC; a.height = rows * SRC;
  const g = a.getContext('2d'); g.imageSmoothingEnabled = false;
  if (tileset.img && (tileset.img.width || tileset.img.naturalWidth)) g.drawImage(tileset.img, 0, 0);
  tileset.img = a; tileset.tilesPerRow = tpr;
  rebuildTileHashes();
}
function growAtlas(minRows) {
  const a = tileset.img; if (a.height >= minRows * SRC) return;
  const n = document.createElement('canvas'); n.__atlas = true; n.width = a.width; n.height = minRows * SRC;
  const g = n.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(a, 0, 0);
  tileset.img = n;
}
function rebuildTileHashes() {
  tileHashes = {}; if (!tileset.img.__atlas) return;
  const g = tileset.img.getContext('2d');
  for (let i = 0; i < tileset.defs.length; i++) { const [sx, sy] = srcXY(i); try { tileHashes[tileHash(g.getImageData(sx, sy, SRC, SRC).data)] = i; } catch (_) {} }
}
function nextChar() {
  const used = new Set(tileset.defs.map(d => d.ch));
  for (let i = 0; i < MAX_TILE_COUNT; i++) {
    const ch = tileCharForIndex(i);
    if (ch && !used.has(ch)) return ch;
  }
  return null;
}
function colorClose(r, g, b, rgb, tol) { tol = tol || 24; return Math.abs(r - rgb[0]) <= tol && Math.abs(g - rgb[1]) <= tol && Math.abs(b - rgb[2]) <= tol; }
// ordnet einen Durchschnitts-RGB einem Paletten-Slot zu (Gras/Wasser/Erde/Stein/Holz/Laub/Blüten/Neutral)
function classifyPalette(r, g, b) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (d < 28) return 3;                       // grau → Stein
  let hh; if (mx === r) hh = ((g - b) / d) % 6; else if (mx === g) hh = (b - r) / d + 2; else hh = (r - g) / d + 4;
  hh *= 60; if (hh < 0) hh += 360;
  if (hh < 18 || hh >= 330) return 6;         // rot/pink → Blüten
  if (hh < 70) return (mx < 170 ? 4 : 2);     // braun(dunkel)→Holz, gelb/orange(hell)→Erde
  if (hh < 165) return (mx < 150 ? 5 : 0);    // dunkelgrün→Laub, grün→Gras
  if (hh < 255) return 1;                     // cyan/blau → Wasser
  return 6;                                   // violett → Blüten
}
function analyzeTileRegion(data, srcW, sx, sy, size) {
  const scores = palettes.map(() => 0);
  const step = Math.max(1, Math.floor(size / 12));
  let samples = 0, sr = 0, sg = 0, sb = 0;
  for (let y = 0; y < size; y += step) for (let x = 0; x < size; x += step) {
    const si = ((sy + y) * srcW + sx + x) * 4;
    const a = data[si + 3];
    if (a < 16) continue;
    const r = data[si], g = data[si + 1], b = data[si + 2];
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    const weight = .4 + chroma / 255;
    samples++; sr += r; sg += g; sb += b;
    palettes.forEach((palette, pi) => {
      let nearest = Infinity;
      palette.rgb.forEach(color => {
        const dr = r - color[0], dg = g - color[1], db = b - color[2];
        const distance = .25 * dr * dr + .55 * dg * dg + .2 * db * db;
        if (distance < nearest) nearest = distance;
      });
      scores[pi] += nearest * weight;
    });
  }
  if (!samples) return { empty: true, pal: 7 };
  let best = 0;
  for (let i = 1; i < scores.length; i++) if (scores[i] < scores[best]) best = i;
  const semantic = classifyPalette(sr / samples, sg / samples, sb / samples);
  if (scores[semantic] <= scores[best] * 1.1 + 1) best = semantic;
  return { empty: false, pal: best };
}
function analyzeTilesetImage(img, tileSize, tilesPerRow, count) {
  const width = img.naturalWidth || img.width, height = img.naturalHeight || img.height;
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const g = canvas.getContext('2d', { willReadFrequently: true }); g.imageSmoothingEnabled = false;
  try {
    g.drawImage(img, 0, 0);
    const data = g.getImageData(0, 0, width, height).data;
    return Array.from({ length: count }, (_, i) => {
      const sx = (i % tilesPerRow) * tileSize;
      const sy = Math.floor(i / tilesPerRow) * tileSize;
      return analyzeTileRegion(data, width, sx, sy, tileSize);
    });
  } catch (_) {
    return Array.from({ length: count }, () => ({ empty: false, pal: 7 }));
  }
}
function autoAssignPalettes(showMessage = true) {
  if (!tilesReady || !tileset.img) return;
  const analysis = analyzeTilesetImage(tileset.img, SRC, tileset.tilesPerRow, tileset.defs.length);
  let visible = 0;
  tileset.defs.forEach((def, i) => {
    def.pal = analysis[i].pal;
    def.empty = analysis[i].empty;
    if (!def.empty) visible++;
  });
  buildTileCache(); draw(); buildPalette();
  if (showMessage) status('<span class="ok">Matched ' + visible + ' visible tiles to the closest available palettes.</span>');
}
// extrahiert 8×8 aus Quellpixeln (mit Farbschlüssel), gibt Tile-Index zurück (dedupliziert). null wenn komplett leer.
function addTileFromRegion(data, srcW, sx, sy, transpRgb) {
  const tmp = new Uint8ClampedArray(SRC * SRC * 4);
  let anyOpaque = false, sr = 0, sg = 0, sb = 0, sn = 0;
  for (let y = 0; y < SRC; y++) for (let x = 0; x < SRC; x++) {
    const si = ((sy + y) * srcW + (sx + x)) * 4, oi = (y * SRC + x) * 4;
    let r = data[si], g = data[si+1], b = data[si+2], a = data[si+3];
    if (transpRgb && a > 0 && colorClose(r, g, b, transpRgb)) a = 0;
    tmp[oi] = r; tmp[oi+1] = g; tmp[oi+2] = b; tmp[oi+3] = a;
    if (a > 8) { anyOpaque = true; sr += r; sg += g; sb += b; sn++; }
  }
  if (!anyOpaque) return null;
  ensureAtlas();
  const h = tileHash(tmp);
  if (tileHashes[h] != null) return tileHashes[h];
  const idx = tileset.defs.length, tpr = tileset.tilesPerRow;
  growAtlas(Math.ceil((idx + 1) / tpr));
  const [dx, dy] = srcXY(idx);
  tileset.img.getContext('2d').putImageData(new ImageData(tmp, SRC, SRC), dx, dy);
  const pal = classifyPalette(sr / sn, sg / sn, sb / sn);   // passende Palette nach Farbton
  const ch = nextChar();
  if (!ch) return null;
  tileset.defs.push({ ch, name: 'Tile ' + idx, solid: false, canopy: false, pal });
  tileHashes[h] = idx; rebuildChMap();
  return idx;
}

// ---- Recolor: Quellpixel → 4 Helligkeitsstufen → Palette-Farbe ----
function buildTileCache() {
  tileCache = [];
}
function getRecoloredTile(i) {
  if (tileCache[i]) return tileCache[i];
  const d = tileset.defs[i];
  if (!tilesReady || !d) return null;
  const [sx, sy] = srcXY(i);
  const c = document.createElement('canvas'); c.width = SRC; c.height = SRC;
  const g = c.getContext('2d'); g.imageSmoothingEnabled = false;
  try {
    g.drawImage(tileset.img, sx, sy, SRC, SRC, 0, 0, SRC, SRC);
    const out = g.getImageData(0, 0, SRC, SRC);
    const pal = (palettes[d.pal] || palettes[0]).rgb;
    for (let oi = 0; oi < out.data.length; oi += 4) {
      const a = out.data[oi + 3];
      if (a < 128) { out.data[oi + 3] = 0; continue; }
      const lum = 0.299 * out.data[oi] + 0.587 * out.data[oi + 1] + 0.114 * out.data[oi + 2];
      let q = lum >= 192 ? 0 : lum >= 128 ? 1 : lum >= 64 ? 2 : 3;
      if (invert) q = 3 - q;
      out.data[oi] = pal[q][0]; out.data[oi + 1] = pal[q][1]; out.data[oi + 2] = pal[q][2]; out.data[oi + 3] = 255;
    }
    g.putImageData(out, 0, 0);
    tileCache[i] = c;
    return c;
  } catch (_) {
    return null;
  }
}
// zeichnet Tile idx in ein Ziel-Rechteck (recolored oder roh)
function drawTile(g, idx, dx, dy, dw, dh) {
  const cached = recolor ? getRecoloredTile(idx) : null;
  if (cached) g.drawImage(cached, 0, 0, SRC, SRC, dx, dy, dw, dh);
  else { const [sx, sy] = srcXY(idx); g.drawImage(tileset.img, sx, sy, SRC, SRC, dx, dy, dw, dh); }
}
function requestDraw() {
  if (drawPending) return;
  drawPending = true;
  requestAnimationFrame(() => { drawPending = false; draw(); });
}

// ================= Map lifecycle =================
function blankLayer(w, h, fill) {
  const a = [];
  for (let r = 0; r < h; r++) { const row = []; for (let c = 0; c < w; c++) row.push(fill); a.push(row); }
  return a;
}
function newMap(w, h) {
  cols = w; rows = h;
  const ground = blankLayer(w, h, '.');
  for (let r = 0; r < h; r++) for (let c = 0; c < w; c++)
    if (r === 0 || c === 0 || r === h - 1 || c === w - 1) ground[r][c] = '#';   // solider Rand
  layers = [ground, blankLayer(w, h, null), blankLayer(w, h, null)];
  markers = {}; markerOrder = [];
  objects = []; curObject = null;
  autotileGroups = []; curAutoTile = null;
  undoStack = [];
  syncSize();
}
function syncSize() {
  cv.width = cols * CELL; cv.height = rows * CELL;
  $('dims').textContent = cols + ' × ' + rows;
  draw();
}

// ================= Rendering =================
function draw() {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, cv.width, cv.height);
  if (!tilesReady) return;
  layers.forEach((lay, li) => {
    if (!layerVis[li]) return;
    const dim = dimOthers && activeLayer !== 'events' && li !== activeLayer;
    ctx.globalAlpha = dim ? 0.35 : 1;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const ch = lay[r][c];
      if (ch == null) continue;
      const idx = chToIdx[ch]; if (idx == null) continue;
      drawTile(ctx, idx, c * CELL, r * CELL, CELL, CELL);
    }
  });
  ctx.globalAlpha = 1;
  if (showGrid) {
    ctx.strokeStyle = '#ffffff20'; ctx.lineWidth = 1; ctx.beginPath();
    for (let c = 0; c <= cols; c++) { ctx.moveTo(c * CELL + .5, 0); ctx.lineTo(c * CELL + .5, cv.height); }
    for (let r = 0; r <= rows; r++) { ctx.moveTo(0, r * CELL + .5); ctx.lineTo(cv.width, r * CELL + .5); }
    ctx.stroke();
  }
  // Objekte / Sprites (Content — immer voll sichtbar), Auswahl umrandet auf Event-Ebene
  objects.forEach((o, oi) => {
    if (!o.img) return;
    const dw = o.tw * CELL, dh = o.th * CELL, dx = o.x * CELL, dy = o.y * CELL;
    ctx.drawImage(o.img, 0, 0, o.img.naturalWidth, o.img.naturalHeight, dx, dy, dw, dh);
    if (activeLayer === 'events') {
      ctx.strokeStyle = curObject === oi ? '#7cc47c' : '#ffffff55';
      ctx.lineWidth = curObject === oi ? 2 : 1;
      ctx.strokeRect(dx + 1, dy + 1, dw - 2, dh - 2);
      ctx.font = 'bold 9px system-ui'; ctx.textBaseline = 'top';
      ctx.fillStyle = '#000a'; ctx.fillRect(dx, dy, ctx.measureText(o.name).width + 6, 12);
      ctx.fillStyle = '#fff';
      ctx.fillText(o.name, dx + 2, dy + 2);
    }
  });

  // Marker (immer sichtbar, hervorgehoben wenn Event-Ebene aktiv)
  const evActive = activeLayer === 'events';
  ctx.globalAlpha = evActive ? 1 : 0.5;
  markerOrder.forEach(name => {
    const m = markers[name]; if (!m) return;
    const x = m.x * CELL, y = m.y * CELL;
    ctx.fillStyle = MARKER_COLORS[name] || '#e0c060';
    ctx.globalAlpha = evActive ? 0.6 : 0.3; ctx.fillRect(x, y, CELL, CELL); ctx.globalAlpha = evActive ? 1 : 0.5;
    ctx.strokeStyle = '#000a'; ctx.lineWidth = 2; ctx.strokeRect(x + 1, y + 1, CELL - 2, CELL - 2);
    ctx.fillStyle = '#000'; ctx.font = 'bold 9px system-ui'; ctx.textBaseline = 'top';
    ctx.fillText(name, x + 2, y + 2);
  });
  ctx.globalAlpha = 1;
}

// ================= Layer UI =================
function buildLayerList() {
  const box = $('layerList'); box.innerHTML = '';
  LAYER_NAMES.forEach((nm, i) => {
    const el = document.createElement('div');
    el.className = 'layer-row' + (activeLayer === i ? ' sel' : '');
    const badge = i === 0 ? 'base' : i === 1 ? 'solid props' : 'canopy';
    el.innerHTML = '<span class="eye' + (layerVis[i] ? '' : ' off') + '">' + (layerVis[i] ? '●' : '○') +
      '</span><span class="lname">' + nm + '</span><span class="badge">' + badge + '</span>';
    el.querySelector('.eye').onclick = e => { e.stopPropagation(); layerVis[i] = !layerVis[i]; buildLayerList(); draw(); };
    el.onclick = () => setActiveLayer(i);
    box.appendChild(el);
  });
  // Event-Ebene
  const ev = document.createElement('div');
  ev.className = 'layer-row' + (activeLayer === 'events' ? ' sel' : '');
  ev.innerHTML = '<span class="eye" style="color:var(--accent2)">◆</span><span class="lname">Events</span><span class="badge">Marker</span>';
  ev.onclick = () => setActiveLayer('events');
  box.appendChild(ev);
}
function setActiveLayer(l) {
  activeLayer = l;
  $('eventPanel').style.display = l === 'events' ? 'block' : 'none';
  $('paletteTitle').style.display = l === 'events' ? 'none' : 'block';
  $('tileInspector').style.display = l === 'events' ? 'none' : 'block';
  $('swatches').style.display = l === 'events' ? 'none' : 'grid';
  $('tilePager').style.display = l === 'events' ? 'none' : 'flex';
  $('btnUpload').style.display = l === 'events' ? 'none' : 'block';
  buildLayerList(); buildPalette(); buildMarkerList(); buildObjectList(); buildObjInspector(); draw();
}

// ================= Palette UI (Raster + Inspektor) =================
function tilePageMetrics(page = tilePage) {
  const columns = Math.max(1, tileset.tilesPerRow || 1);
  const totalRows = Math.max(1, Math.ceil(tileset.defs.length / columns));
  const rowsPerPage = Math.max(1, Math.floor(TILE_PAGE_SIZE / columns));
  const pages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const safePage = Math.max(0, Math.min(pages - 1, page));
  const startRow = safePage * rowsPerPage;
  const endRow = Math.min(totalRows, startRow + rowsPerPage);
  return {
    columns, totalRows, rowsPerPage, pages, page: safePage, startRow, endRow,
    start: startRow * columns,
    end: Math.min(tileset.defs.length, endRow * columns)
  };
}
function pageForTile(index) {
  const info = tilePageMetrics(0);
  return Math.floor(Math.floor(index / info.columns) / info.rowsPerPage);
}
function updateTilePager() {
  const info = tilePageMetrics();
  tilePage = info.page;
  const start = tileset.defs.length ? info.start + 1 : 0;
  $('tileRange').textContent = info.pages > 1
    ? 'Rows ' + (info.startRow + 1) + '–' + info.endRow + ' of ' + info.totalRows +
      ' · cells ' + start + '–' + info.end
    : tileset.defs.length + (tileset.defs.length === 1 ? ' cell' : ' cells');
  $('tilePrev').disabled = tilePage <= 0;
  $('tileNext').disabled = tilePage >= info.pages - 1;
}
function buildPalette() {
  const box = $('swatches'); box.innerHTML = '';
  if (activeLayer === 'events') { buildInspector(); return; }
  updateTilePager();
  const info = tilePageMetrics();
  box.style.gridTemplateColumns = 'repeat(' + info.columns + ', 34px)';
  $('tileErase').style.display = activeLayer === 0 ? 'none' : 'block';
  $('tileErase').classList.toggle('active', curTile === -1);
  for (let i = info.start; i < info.end; i++) {
    const d = tileset.defs[i];
    const sc = document.createElement('canvas');
    sc.className = 'swatch' + (curTile === i ? ' sel' : '') + (d.empty ? ' empty' : '');
    sc.width = 34; sc.height = 34; sc.dataset.i = i;
    sc.title = d.empty ? 'Empty source cell' : (d.ch || '?') + ' · ' + d.name;
    if (!d.empty) sc.onclick = () => { curTile = i; curStamp = null; curAutoTile = null; refreshPalSel(); buildInspector(); };
    box.appendChild(sc);
  }
  drawSwatches();
  buildInspector();
}
function drawSwatches() {
  if (!tilesReady) return;
  document.querySelectorAll('#swatches canvas[data-i]').forEach(sc => {
    const i = +sc.dataset.i;
    if (tileset.defs[i]?.empty) return;
    const g = sc.getContext('2d'); g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, 34, 34);
    drawTile(g, i, 0, 0, 34, 34);
  });
}
function refreshPalSel() {
  document.querySelectorAll('#swatches .swatch').forEach(el => {
    el.classList.toggle('sel', +el.dataset.i === curTile);
  });
  $('tileErase').classList.toggle('active', curTile === -1);
}
function autotileGroupForTile(index) {
  const ch = tileset.defs[index]?.ch;
  return autotileGroups.findIndex(group => group.variants.includes(ch));
}
function createAutotileFromSelection(mode) {
  const size = mode === 'bitmask' ? 4 : 3;
  const base = curTile;
  const baseCol = base % tileset.tilesPerRow;
  const baseRow = Math.floor(base / tileset.tilesPerRow);
  const totalRows = Math.ceil(tileset.defs.length / tileset.tilesPerRow);
  if (baseCol + size > tileset.tilesPerRow || baseRow + size > totalRows) {
    status('<span class="err">A complete ' + size + '×' + size + ' block does not fit from this tile. Select its top-left cell.</span>');
    return;
  }
  const indices = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    indices.push(base + y * tileset.tilesPerRow + x);
  }
  if (indices.some(index => !tileset.defs[index] || tileset.defs[index].empty)) {
    status('<span class="err">This block contains empty cells. Select the top-left cell of a complete ' + size + '×' + size + ' variant block.</span>');
    return;
  }
  const variants = indices.map(index => tileset.defs[index].ch);
  autotileGroups = autotileGroups.filter(group => !group.variants.some(ch => variants.includes(ch)));
  autotileGroups.push({
    name: (tileset.defs[base].name || 'Terrain') + ' ' + (mode === 'bitmask' ? 'bitmask' : 'terrain'),
    mode,
    variants
  });
  curAutoTile = autotileGroups.length - 1;
  curStamp = null;
  buildInspector();
  status('<span class="ok">' + (mode === 'bitmask' ? '4×4 bitmask' : '3×3 terrain') + ' brush created and activated.</span>');
}
function buildInspector() {
  const box = $('tileInspector');
  if (activeLayer === 'events') { box.innerHTML = ''; return; }
  if (curTile === -1) { box.innerHTML = '<div class="insp"><b>Eraser</b>&nbsp;<span class="hint">clears tiles on this layer</span></div>'; return; }
  const d = tileset.defs[curTile]; if (!d) { box.innerHTML = ''; return; }
  const groupIndex = autotileGroupForTile(curTile);
  const autoActive = groupIndex >= 0 && curAutoTile === groupIndex;
  const autoTools = groupIndex >= 0
    ? '<div class="autotile-tools"><button id="iAutoToggle" class="' + (autoActive ? 'active' : '') + '">' +
      (autoActive ? 'Auto brush: on' : 'Use auto brush') + '</button><button id="iAutoRemove">Forget auto group</button>' +
      '<span class="autotile-hint">Connected cells update their edge variant while you paint.</span></div>'
    : '<div class="autotile-tools"><button id="iAuto3">3×3 terrain from here</button><button id="iAuto4">4×4 bitmask from here</button>' +
      '<span class="autotile-hint">Select the top-left tile of an ordered variant block. 3×3 uses corners/edges/center; 4×4 uses N/E/S/W masks 0–15.</span></div>';
  box.innerHTML =
    '<div class="insp"><canvas class="ipreview" width="46" height="46"></canvas>' +
    '<div class="ifields">' +
    '<div class="irow"><label>Symbol</label><input id="iCh" maxlength="1"></div>' +
    '<div class="irow"><label>Name</label><input id="iName"></div>' +
    '<div class="flags"><span class="chip solid' + (d.solid ? ' on' : '') + '">solid</span>' +
    '<span class="chip canopy' + (d.canopy ? ' on' : '') + '">canopy</span></div>' +
    '</div></div>' +
    '<div class="palpick"><label>Palette</label><div class="palramps" id="palRamps"></div></div>' +
    autoTools;
  const pv = box.querySelector('.ipreview').getContext('2d'); pv.imageSmoothingEnabled = false;
  if (tilesReady) drawTile(pv, curTile, 0, 0, 46, 46);
  const iCh = box.querySelector('#iCh'), iName = box.querySelector('#iName');
  iCh.value = d.ch || ''; iName.value = d.name;
  iCh.onchange = () => {
    const next = iCh.value.slice(0, 1);
    const duplicate = tileset.defs.some((other, i) => i !== curTile && other.ch === next);
    if (!next || duplicate || /[\r\n"\\]/.test(next)) {
      iCh.value = d.ch || '';
      status('<span class="err">Tile symbols must be unique and cannot be quotes, slashes, or line breaks.</span>');
      return;
    }
    d.ch = next; rebuildChMap(); refreshTitles(); draw();
  };
  iName.onchange = () => { d.name = iName.value.trim(); refreshTitles(); };
  box.querySelector('.chip.solid').onclick = e => { d.solid = !d.solid; e.target.classList.toggle('on'); };
  box.querySelector('.chip.canopy').onclick = e => { d.canopy = !d.canopy; e.target.classList.toggle('on'); };
  // Palette-Picker (8 Rampen)
  const rr = box.querySelector('#palRamps');
  palettes.forEach((p, pi) => {
    const el = document.createElement('div');
    el.className = 'ramp' + (d.pal === pi ? ' sel' : '');
    el.title = pi + ' · ' + p.name;
    el.innerHTML = p.hex.map(h => '<i style="background:' + h + '"></i>').join('');
    el.onclick = () => { d.pal = pi; buildTileCache(); draw(); drawSwatches(); buildInspector(); };
    rr.appendChild(el);
  });
  if (groupIndex >= 0) {
    box.querySelector('#iAutoToggle').onclick = () => {
      curAutoTile = curAutoTile === groupIndex ? null : groupIndex;
      curStamp = null; buildInspector();
    };
    box.querySelector('#iAutoRemove').onclick = () => {
      autotileGroups.splice(groupIndex, 1); curAutoTile = null; buildInspector();
      status('Auto-tile group removed. The source tiles remain unchanged.');
    };
  } else {
    box.querySelector('#iAuto3').onclick = () => createAutotileFromSelection('nine-slice');
    box.querySelector('#iAuto4').onclick = () => createAutotileFromSelection('bitmask');
  }
}
function refreshTitles() {
  document.querySelectorAll('#swatches canvas[data-i]').forEach(sc => {
    const d = tileset.defs[+sc.dataset.i]; sc.title = (d.ch || '?') + ' · ' + d.name;
  });
}

// ================= Markers UI =================
function buildMarkerList() {
  const box = $('markerList'); if (!box) return; box.innerHTML = '';
  // stelle sicher, dass die Standard-Namen anwählbar sind
  DEFAULT_MARKERS.forEach(n => { if (!markerOrder.includes(n)) markerOrder.push(n); });
  markerOrder.forEach(name => {
    const el = document.createElement('div');
    el.className = 'marker-row' + (curMarker === name ? ' sel' : '');
    const m = markers[name];
    el.innerHTML = '<span class="dot" style="background:' + (MARKER_COLORS[name] || '#e0c060') + '"></span>' +
      '<span class="nm">' + name + '</span><span class="pos">' + (m ? m.x + ',' + m.y : '—') + '</span>';
    el.onclick = () => { curMarker = name; curObject = null; buildMarkerList(); buildObjectList(); buildObjInspector(); };
    box.appendChild(el);
  });
}

// ================= Objekte / Sprites UI =================
function buildObjectList() {
  const box = $('objectList'); if (!box) return; box.innerHTML = '';
  if (!objects.length) { box.innerHTML = '<div class="hint">No objects yet. Import a graphic below.</div>'; return; }
  objects.forEach((o, oi) => {
    const el = document.createElement('div');
    el.className = 'marker-row' + (curObject === oi ? ' sel' : '');
    el.innerHTML = '<span class="dot" style="background:#7cc47c;border-radius:2px"></span>' +
      '<span class="nm">' + o.name + '</span><span class="pos">' + o.x + ',' + o.y + ' · ' + o.tw + '×' + o.th + 't</span>';
    el.onclick = () => { curObject = oi; curMarker = null; buildObjectList(); buildObjInspector(); buildMarkerList(); draw(); };
    box.appendChild(el);
  });
}
function sizeSelectHTML(o) {
  let opts = '<option value="free"' + (o.console === 'Free' ? ' selected' : '') + '>Free (image size)</option>';
  SPRITE_SIZES.forEach(grp => {
    opts += '<optgroup label="' + grp.console + '">';
    grp.list.forEach(([w, h]) => {
      const sel = (o.console === grp.console && o.tw === w / SRC && o.th === h / SRC) ? ' selected' : '';
      opts += '<option value="' + grp.console + '|' + w + '|' + h + '"' + sel + '>' + w + '×' + h + ' (' + (w / SRC) + '×' + (h / SRC) + ' tiles)</option>';
    });
    opts += '</optgroup>';
  });
  return '<select id="objSize">' + opts + '</select>';
}
function buildObjInspector() {
  const box = $('objInspector'); if (!box) return;
  if (curObject == null || !objects[curObject]) { box.innerHTML = ''; return; }
  const o = objects[curObject];
  box.innerHTML =
    '<div class="insp" style="flex-direction:column;align-items:stretch">' +
    '<div class="irow"><label>Name</label><input id="objName"></div>' +
    '<div class="irow"><label>Size</label>' + sizeSelectHTML(o) + '</div>' +
    '<div class="irow"><label>Position</label><span class="hint">' + o.x + ',' + o.y + ' — ' + (o.tw * SRC) + '×' + (o.th * SRC) + 'px' + '</span></div>' +
    '<div style="display:flex;gap:6px;margin-top:6px">' +
    '<button id="objSave">Save PNG</button><button id="objDel">Remove</button></div>' +
    '</div>';
  const nm = box.querySelector('#objName'); nm.value = o.name;
  nm.onchange = () => { o.name = nm.value.trim() || o.name; buildObjectList(); draw(); };
  box.querySelector('#objSize').onchange = e => {
    const v = e.target.value;
    if (v === 'free') { o.console = 'Free'; if (o.img) { o.tw = Math.max(1, Math.ceil(o.img.naturalWidth / SRC)); o.th = Math.max(1, Math.ceil(o.img.naturalHeight / SRC)); } }
    else { const [cons, w, h] = v.split('|'); o.console = cons; o.tw = w / SRC; o.th = h / SRC; }
    draw(); buildObjectList(); buildObjInspector();
  };
  box.querySelector('#objSave').onclick = () => { if (o.imgSrc) download(o.name + '.png', null, o.imgSrc); };
  box.querySelector('#objDel').onclick = () => { pushUndo(); objects.splice(curObject, 1); curObject = null; buildObjectList(); buildObjInspector(); draw(); };
}

// ================= Painting =================
function cellFromEvent(e) {
  const rect = cv.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / (rect.width / cols));
  const y = Math.floor((e.clientY - rect.top) / (rect.height / rows));
  if (x < 0 || y < 0 || x >= cols || y >= rows) return null;
  return { x, y };
}
function pushUndo() {
  undoStack.push({ layers: layers.map(l => l.map(r => r.slice())), markers: JSON.parse(JSON.stringify(markers)), markerOrder: markerOrder.slice(), objects: objects.map(o => ({ ...o })), cols, rows });
  if (undoStack.length > 60) undoStack.shift();
}
function undo() {
  const s = undoStack.pop(); if (!s) { status('Nothing to undo.'); return; }
  layers = s.layers; markers = s.markers; markerOrder = s.markerOrder; objects = s.objects; cols = s.cols; rows = s.rows;
  if (curObject != null && curObject >= objects.length) curObject = null;
  syncSize(); buildMarkerList(); buildObjectList(); buildObjInspector();
}

let painting = false, lastCell = null;
function autotileVariant(group, mask) {
  if (group.mode === 'bitmask') return group.variants[mask] || group.variants[0];
  const n = !!(mask & 1), e = !!(mask & 2), s = !!(mask & 4), w = !!(mask & 8);
  const v = group.variants;
  if (!n && !e && !s && !w) return v[4];
  if (!n && !w) return v[0];
  if (!n && !e) return v[2];
  if (!s && !w) return v[6];
  if (!s && !e) return v[8];
  if (!n) return v[1];
  if (!w) return v[3];
  if (!e) return v[5];
  if (!s) return v[7];
  return v[4];
}
function refreshAutotileCell(lay, x, y, group) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return;
  if (!group.variants.includes(lay[y][x])) return;
  const connected = (nx, ny) => nx >= 0 && ny >= 0 && nx < cols && ny < rows && group.variants.includes(lay[ny][nx]);
  const mask = (connected(x, y - 1) ? 1 : 0) | (connected(x + 1, y) ? 2 : 0) |
    (connected(x, y + 1) ? 4 : 0) | (connected(x - 1, y) ? 8 : 0);
  lay[y][x] = autotileVariant(group, mask);
}
function refreshAutotileAround(lay, x, y, group) {
  [[x, y], [x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]].forEach(([tx, ty]) => {
    refreshAutotileCell(lay, tx, ty, group);
  });
}
function paintCell(cell) {
  if (activeLayer === 'events') return;
  const lay = layers[activeLayer];
  if (curStamp) {
    for (let dy = 0; dy < curStamp.h; dy++) for (let dx = 0; dx < curStamp.w; dx++) {
      const ch = curStamp.tiles[dy][dx]; if (ch == null) continue;
      const ty = cell.y + dy, tx = cell.x + dx;
      if (ty >= 0 && tx >= 0 && ty < rows && tx < cols) lay[ty][tx] = ch;
    }
    requestDraw(); return;
  }
  if (curTile < 0 || !tileset.defs[curTile]) { if (curTile !== -1) return; }
  const previous = lay[cell.y][cell.x];
  const previousGroups = autotileGroups.filter(group => group.variants.includes(previous));
  if (curAutoTile != null && autotileGroups[curAutoTile]) {
    const group = autotileGroups[curAutoTile];
    lay[cell.y][cell.x] = group.mode === 'bitmask' ? group.variants[0] : group.variants[4];
    previousGroups.filter(other => other !== group).forEach(other => refreshAutotileAround(lay, cell.x, cell.y, other));
    refreshAutotileAround(lay, cell.x, cell.y, group);
    requestDraw(); return;
  }
  const val = curTile === -1 ? (activeLayer === 0 ? '.' : null) : tileset.defs[curTile].ch;
  if (lay[cell.y][cell.x] === val) return;
  lay[cell.y][cell.x] = val;
  previousGroups.forEach(group => refreshAutotileAround(lay, cell.x, cell.y, group));
  requestDraw();
}
function placeMarker(cell) {
  if (!curMarker) { status('Select a marker in the sidebar first.'); return; }
  pushUndo();
  const cur = markers[curMarker];
  if (cur && cur.x === cell.x && cur.y === cell.y) delete markers[curMarker];
  else markers[curMarker] = { x: cell.x, y: cell.y };
  draw(); buildMarkerList();
}

cv.addEventListener('contextmenu', e => e.preventDefault());
cv.addEventListener('mousedown', e => {
  const cell = cellFromEvent(e); if (!cell) return;
  if (e.button === 2) {                     // Pipette (nur Tile-Ebenen)
    if (activeLayer !== 'events') {
      const ch = layers[activeLayer][cell.y][cell.x];
      if (ch != null && chToIdx[ch] != null) {
        curTile = chToIdx[ch]; tilePage = pageForTile(curTile); curStamp = null;
        const groupIndex = autotileGroupForTile(curTile);
        curAutoTile = groupIndex >= 0 ? groupIndex : null;
        buildPalette(); status('Eyedropper: ' + (tileset.defs[curTile].name || ch));
      }
    }
    return;
  }
  if (e.button !== 0) return;
  if (activeLayer === 'events') {
    if (curObject != null && objects[curObject]) { pushUndo(); objects[curObject].x = cell.x; objects[curObject].y = cell.y; draw(); buildObjInspector(); buildObjectList(); }
    else placeMarker(cell);
    return;
  }
  pushUndo(); painting = true; lastCell = cell; paintCell(cell);
});
cv.addEventListener('mousemove', e => {
  const cell = cellFromEvent(e);
  if (cell) status('x=' + cell.x + '  y=' + cell.y);
  if (!painting || !cell) return;
  if (lastCell && lastCell.x === cell.x && lastCell.y === cell.y) return;
  lastCell = cell; paintCell(cell);
});
window.addEventListener('mouseup', () => { painting = false; lastCell = null; });

// ================= Flatten & Export =================
function flatten() {                         // oberste nicht-leere Ebene gewinnt
  const out = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      const ch = layers[2][r][c] ?? layers[1][r][c] ?? layers[0][r][c] ?? '.';
      line += ch;
    }
    out.push(line);
  }
  return out;
}
function markerComments() {
  return markerOrder.filter(n => markers[n]).map(n => '// ' + n + ' ' + markers[n].x + ',' + markers[n].y);
}
function objectComments() {
  return objects.map(o => '// obj ' + o.name + ' ' + o.x + ',' + o.y + ' ' + o.tw + 'x' + o.th + 't (' +
    (o.console && o.console !== 'Free' ? o.console + ' ' : '') + (o.tw * SRC) + 'x' + (o.th * SRC) + 'px, sprite:' + o.name + '.png)');
}
function legendComments() {
  const used = new Set(flatten().join('').split(''));
  const usedDefs = tileset.defs.filter(d => used.has(d.ch));
  const lines = usedDefs.map(d =>
    '// tile ' + d.ch + ' = ' + d.name + (d.solid ? ' [solid]' : ' [walkable]') + (d.canopy ? ' [canopy]' : '') +
    ' pal=' + (d.pal ?? 0) + '(' + (palettes[d.pal] || palettes[0]).name + ')');
  const usedPals = [...new Set(usedDefs.map(d => d.pal ?? 0))].sort((a, b) => a - b);
  usedPals.forEach(pi => {
    const p = palettes[pi]; if (!p) return;
    lines.push('// pal ' + pi + ' ' + p.name + ' = ' + p.hex.map(h => h.slice(1).toUpperCase()).join(','));
  });
  return lines;
}
function mapToText() {
  let out = flatten().join('\n');
  const mk = markerComments(); if (mk.length) out += '\n' + mk.join('\n');
  const ob = objectComments(); if (ob.length) out += '\n' + ob.join('\n');
  if ($('chkLegend').checked) out += '\n' + legendComments().join('\n');
  return out;
}
function sanitizeName(s) {
  let n = (s || 'ROOM').toUpperCase().replace(/[^A-Z0-9_]/g, '_').replace(/^([0-9])/, '_$1');
  return n || 'ROOM';
}
function mapToCArray() {
  const name = sanitizeName($('roomName').value);
  let out = 'const char * const ' + name + '_M[' + rows + '] = {\n';
  out += flatten().map(r => '    "' + r + '"').join(',\n') + '\n};';
  const mk = markerComments(); if (mk.length) out += '\n' + mk.join('\n');
  const ob = objectComments(); if (ob.length) out += '\n' + ob.join('\n');
  if ($('chkLegend').checked) out += '\n' + legendComments().join('\n');
  return out;
}
function openExport() {
  $('exportTitle').textContent = 'Export — ' + sanitizeName($('roomName').value) + ' (' + cols + '×' + rows + ', flattened)';
  $('exportText').value = mapToText();
  $('exportDlg').showModal();
}

// ---- JSON-Export (selbst-enthalten, base64) ----
function tilesetDataURL() { return tileset.img.toDataURL ? tileset.img.toDataURL('image/png') : (tileset.img.src || null); }
function rowToStr(row) { return row.map(ch => ch == null ? ' ' : ch).join(''); }
// Compositing: 3 Tile-Ebenen pro Zelle (recolored, mit Alpha) zu neuen 8×8-Tiles verschmelzen, deduplizieren
function bakeComposited() {
  const cell = document.createElement('canvas'); cell.width = SRC; cell.height = SRC;
  const cg = cell.getContext('2d'); cg.imageSmoothingEnabled = false;
  const uniq = new Map(), list = [], map = [];
  for (let r = 0; r < rows; r++) { const row = [];
    for (let c = 0; c < cols; c++) {
      cg.clearRect(0, 0, SRC, SRC);
      for (let li = 0; li < 3; li++) {
        const ch = layers[li][r][c]; if (ch == null) continue;
        const idx = chToIdx[ch]; if (idx == null) continue;
        drawTile(cg, idx, 0, 0, SRC, SRC);
      }
      const data = cg.getImageData(0, 0, SRC, SRC);
      const h = tileHash(data.data);
      let bi = uniq.get(h);
      if (bi == null) { bi = list.length; uniq.set(h, bi); const cc = document.createElement('canvas'); cc.width = SRC; cc.height = SRC; cc.getContext('2d').putImageData(data, 0, 0); list.push(cc); }
      row.push(bi);
    }
    map.push(row);
  }
  const columns = Math.max(1, Math.min(16, list.length));
  const rowsN = Math.max(1, Math.ceil(list.length / columns));
  const atlas = document.createElement('canvas'); atlas.width = columns * SRC; atlas.height = rowsN * SRC;
  const ag = atlas.getContext('2d'); ag.imageSmoothingEnabled = false;
  list.forEach((cc, i) => ag.drawImage(cc, (i % columns) * SRC, Math.floor(i / columns) * SRC));
  return { tileWidth: SRC, tileHeight: SRC, columns, count: list.length, image: atlas.toDataURL('image/png'), map };
}
function buildJSON() {
  const baked = bakeComposited();
  return {
    format: 'pixelmap-room', version: 1,
    name: sanitizeName($('roomName').value),
    tileSize: SRC,
    size: { cols, rows },
    palettes: palettes.map(p => ({ name: p.name, colors: p.hex.slice() })),
    tiles: tileset.defs.map((d, i) => ({ index: i, char: d.ch, name: d.name, solid: !!d.solid, canopy: !!d.canopy, palette: d.pal ?? 0, empty: !!d.empty })),
    layers: { ground: layers[0].map(rowToStr), object1: layers[1].map(rowToStr), object2: layers[2].map(rowToStr), flat: flatten() },
    tileset: { columns: tileset.tilesPerRow, tileSize: SRC, image: tilesetDataURL() },
    baked,
    autotiles: autotileGroups.map(group => ({ name: group.name, mode: group.mode, variants: group.variants.slice() })),
    objects: objects.map(o => ({ name: o.name, x: o.x, y: o.y, w: o.tw * SRC, h: o.th * SRC, tilesW: o.tw, tilesH: o.th, console: o.console, image: o.imgSrc || null })),
    markers: Object.fromEntries(markerOrder.filter(n => markers[n]).map(n => [n, markers[n]]))
  };
}
function jsonString() { return JSON.stringify(buildJSON(), null, 2); }
function exportJSON(doCopy) {
  const j = buildJSON(); const s = JSON.stringify(j, null, 2);
  $('exportText').value = s.length > 40000 ? s.slice(0, 40000) + '\n… (' + (s.length - 40000) + ' more characters; the downloaded file includes everything)' : s;
  const warn = (SRC === 8 && j.baked.count > 192) ? ' <span class="warn">⚠ ' + j.baked.count + ' baked tiles exceed the 192-tile GB budget</span>' : '';
  status('<span class="ok">JSON: ' + j.baked.count + ' baked tiles, ' + j.objects.length + ' objects.</span>' + warn);
  if (doCopy) copy(s, 'JSON copied.');
  else download(sanitizeName($('roomName').value).toLowerCase() + '.json', s);
}
// Engine-Rohdaten: gebackenes Tileset als PNG + Karte als CSV (Tile-Indizes) —
// das Format, das gfx4snes (PVSnesLib), Unity, Tiled & Co. direkt einlesen/umwandeln können.
function exportAssets() {
  const baked = bakeComposited();
  const nm = sanitizeName($('roomName').value).toLowerCase();
  download(nm + '_tiles.png', null, baked.image);
  download(nm + '_map.csv', baked.map.map(r => r.join(',')).join('\n'));
  status('<span class="ok">Saved ' + nm + '_tiles.png (' + baked.count + ' tiles at ' + SRC + 'px, ' + baked.columns + ' per row) and ' + nm + '_map.csv.</span>');
}
function download(fn, text, href) {
  const a = document.createElement('a');
  const blobUrl = href || URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.href = blobUrl; a.download = fn; a.click();
  if (!href) URL.revokeObjectURL(blobUrl);
}
async function copy(text, okMsg) {
  try { await navigator.clipboard.writeText(text); status('<span class="ok">' + okMsg + '</span>'); }
  catch { const t = $('exportText'); t.value = text; t.select(); document.execCommand('copy'); status('<span class="ok">' + okMsg + ' (Fallback)</span>'); }
}

// ================= Rand-Check (auf geflachter Karte) =================
function checkBorder() {
  const flat = flatten();
  const solidCh = new Set(tileset.defs.filter(d => d.solid).map(d => d.ch));
  const ok = ch => solidCh.has(ch) || ch === 'D';
  const bad = [];
  for (let c = 0; c < cols; c++) { if (!ok(flat[0][c])) bad.push([c, 0]); if (!ok(flat[rows - 1][c])) bad.push([c, rows - 1]); }
  for (let r = 1; r < rows - 1; r++) { if (!ok(flat[r][0])) bad.push([0, r]); if (!ok(flat[r][cols - 1])) bad.push([cols - 1, r]); }
  draw();
  if (bad.length) {
    ctx.strokeStyle = '#e06666'; ctx.lineWidth = 3;
    bad.forEach(([x, y]) => ctx.strokeRect(x * CELL + 1.5, y * CELL + 1.5, CELL - 3, CELL - 3));
    status('<span class="err">Open border: ' + bad.length + ' cell(s) are not solid/doors.</span> Marked in red.');
  } else status('<span class="ok">✓ Border is closed.</span>');
}

// ================= Tileset-Upload =================
function loadTilesetFromImage(img, tileSize) {
  if (img.naturalWidth % tileSize || img.naturalHeight % tileSize) {
    status('<span class="err">This image is ' + img.naturalWidth + '×' + img.naturalHeight +
      'px and cannot be sliced into exact ' + tileSize + '×' + tileSize + ' tiles.</span>');
    return;
  }
  const tpr = Math.max(1, Math.floor(img.naturalWidth / tileSize));
  const tRows = Math.max(1, Math.floor(img.naturalHeight / tileSize));
  const count = tpr * tRows;
  if (count > MAX_TILE_COUNT) {
    status('<span class="err">This tileset contains ' + count + ' tiles. PixelMap currently supports up to ' + MAX_TILE_COUNT + ' tiles per project.</span>');
    return;
  }
  setTileSize(tileSize);
  const analysis = analyzeTilesetImage(img, tileSize, tpr, count);
  const defs = [];
  const usedChars = new Set();
  let charCursor = 0;
  const allocateChar = () => {
    while (charCursor < MAX_TILE_COUNT) {
      const ch = tileCharForIndex(charCursor++);
      if (ch && !usedChars.has(ch)) { usedChars.add(ch); return ch; }
    }
    return null;
  };
  for (let i = 0; i < count; i++) {
    const old = tileset.defs[i];
    const tileInfo = analysis[i];
    if (old && old.ch && !usedChars.has(old.ch)) {
      usedChars.add(old.ch);
      defs.push({ ...old, pal: tileInfo.pal, empty: tileInfo.empty });
    } else {
      defs.push({
        ch: allocateChar(), name: tileInfo.empty ? 'Empty cell' : 'Tile ' + i,
        solid: false, canopy: false, pal: tileInfo.pal, empty: tileInfo.empty
      });
    }
  }
  tileset = { img, tilesPerRow: tpr, count, defs };
  autotileGroups = []; curAutoTile = null;
  const visible = analysis.filter(tile => !tile.empty).length;
  tilesReady = true; tilePage = 0; rebuildChMap(); buildTileCache(); syncSize();
  status('<span class="ok">Imported ' + visible + ' visible tiles at ' + tileSize + '×' + tileSize +
    'px in their original ' + tpr + '×' + tRows + ' sheet layout. Palettes were matched automatically.</span>');
  buildPalette();
}
$('fileInput').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  const tileSize = +$('tilesetSize').value || SRC;
  const img = new Image();
  const objectUrl = URL.createObjectURL(f);
  img.onload = () => { loadTilesetFromImage(img, tileSize); URL.revokeObjectURL(objectUrl); };
  img.onerror = () => { URL.revokeObjectURL(objectUrl); status('<span class="err">The image could not be loaded.</span>'); };
  img.src = objectUrl;
  e.target.value = '';
};
$('objFile').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  const img = new Image();
  img.onload = () => {
    const tw = Math.max(1, Math.ceil(img.naturalWidth / SRC)), th = Math.max(1, Math.ceil(img.naturalHeight / SRC));
    let imgSrc = null;
    try { const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight; c.getContext('2d').drawImage(img, 0, 0); imgSrc = c.toDataURL('image/png'); } catch (_) {}
    pushUndo();
    objects.push({ name: 'obj' + (objects.length + 1), x: 1, y: 1, tw, th, console: 'Free', img, imgSrc });
    curObject = objects.length - 1; curMarker = null;
    buildObjectList(); buildObjInspector(); buildMarkerList(); draw();
    status('Imported object: ' + img.naturalWidth + '×' + img.naturalHeight + 'px (' + tw + '×' + th + ' tiles). Click the map to place it.');
  };
  img.onerror = () => status('<span class="err">The object image could not be loaded.</span>');
  img.src = URL.createObjectURL(f);
  e.target.value = '';
};

// ================= Save / Load =================
function loadStore() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_KEY)); if (s) return s;
    const old = JSON.parse(localStorage.getItem(LS_KEY_OLD));
    if (old) { localStorage.setItem(LS_KEY, JSON.stringify(old)); return old; }
    return {};
  } catch { return {}; }
}
function saveStore(s) { localStorage.setItem(LS_KEY, JSON.stringify(s)); }
function saveRoom() {
  const name = prompt('Save room as:', sanitizeName($('roomName').value)); if (!name) return;
  const store = loadStore();
  store[name] = {
    cols, rows, tileSize: SRC,
    layers: layers.map(l => l.map(r => r.map(ch => ch == null ? ' ' : ch).join(''))),
    markers, markerOrder,
    defs: tileset.defs, tilesPerRow: tileset.tilesPerRow,
    autotileGroups: autotileGroups.map(group => ({ ...group, variants: group.variants.slice() })),
    palettes: palettes.map(p => ({ name: p.name, hex: p.hex })),
    curPreset, invert,
    objects: objects.map(o => ({ name: o.name, x: o.x, y: o.y, tw: o.tw, th: o.th, console: o.console, imgSrc: o.imgSrc })),
    tilesSrc: tileset.img.toDataURL ? tileset.img.toDataURL('image/png') : (tileset.img.src && tileset.img.src.startsWith('data:') ? tileset.img.src : null),
    ts: Date.now()
  };
  saveStore(store); status('<span class="ok">Saved: ' + name + '</span>');
}
function openLoad() {
  const store = loadStore(); const names = Object.keys(store).sort(); const box = $('loadList'); box.innerHTML = '';
  if (!names.length) box.innerHTML = '<div class="hint">No rooms have been saved in this browser yet.</div>';
  names.forEach(name => {
    const d = store[name];
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;align-items:center;padding:6px 4px;border-bottom:1px solid var(--line)';
    row.innerHTML = '<b style="font-family:ui-monospace,monospace">' + name + '</b><span class="hint">' + d.cols + '×' + d.rows + '</span><span class="hint">' + new Date(d.ts || 0).toLocaleString() + '</span>';
    const sp = document.createElement('span'); sp.style.flex = '1'; row.appendChild(sp);
    const bL = document.createElement('button'); bL.textContent = 'Load'; bL.className = 'primary';
    bL.onclick = () => { loadRoom(name, d); $('loadDlg').close(); };
    const bD = document.createElement('button'); bD.textContent = 'Delete';
    bD.onclick = () => { if (confirm('Delete “' + name + '”?')) { const s = loadStore(); delete s[name]; saveStore(s); openLoad(); } };
    row.appendChild(bL); row.appendChild(bD); box.appendChild(row);
  });
  $('loadDlg').showModal();
}
function loadRoom(name, d) {
  setTileSize(d.tileSize || 8);        // ältere Speicher waren immer 8×8
  cols = d.cols; rows = d.rows;
  layers = d.layers.map(l => l.map(s => s.split('').map(ch => ch === ' ' ? null : ch)));
  if (layers.length < 3) while (layers.length < 3) layers.push(blankLayer(cols, rows, null));
  const legacyMarkerNames = { tuer: 'door', truhe: 'chest', ziel: 'goal' };
  markers = {};
  Object.entries(d.markers || {}).forEach(([markerName, value]) => {
    markers[legacyMarkerNames[markerName] || markerName] = value;
  });
  markerOrder = [...new Set((d.markerOrder || Object.keys(markers)).map(markerName => legacyMarkerNames[markerName] || markerName))];
  if (d.defs) {
    tileset.defs = d.defs.map(x => ({ ...x, name: LEGACY_TILE_NAMES[x.name] || x.name }));
    tileset.tilesPerRow = d.tilesPerRow || 12;
  }
  const validChars = new Set(tileset.defs.map(def => def.ch));
  autotileGroups = (d.autotileGroups || []).filter(group =>
    Array.isArray(group.variants) && group.variants.length && group.variants.every(ch => validChars.has(ch))
  ).map(group => ({ ...group, variants: group.variants.slice() }));
  curAutoTile = null;
  if (d.palettes) palettes = d.palettes.map(p => ({
    name: LEGACY_PALETTE_NAMES[p.name] || p.name,
    hex: p.hex.slice(),
    rgb: p.hex.map(hexToRgb)
  }));
  if (d.curPreset != null) { curPreset = d.curPreset; $('palPreset').value = curPreset; }   // nur Anzeige — Farben kommen aus d.palettes
  if (d.invert != null) { invert = !!d.invert; $('chkInvert').checked = invert; }
  objects = (d.objects || []).map(o => ({ ...o, console: o.console === 'Frei' ? 'Free' : o.console, img: null }));
  curObject = null;
  objects.forEach(o => { if (o.imgSrc) { const im = new Image(); im.onload = () => { o.img = im; draw(); }; im.src = o.imgSrc; } });
  const finish = () => { tilePage = 0; rebuildChMap(); buildTileCache(); $('roomName').value = name; undoStack = []; syncSize(); buildPalette(); buildMarkerList(); buildObjectList(); buildObjInspector(); status('<span class="ok">Loaded: ' + name + '</span>'); };
  if (d.tilesSrc) { const img = new Image(); img.onload = () => { tileset.img = img; tileset.count = tileset.defs.length; finish(); }; img.src = d.tilesSrc; }
  else finish();
}

// ---- Projektdatei: kompletter Editor-Zustand inkl. aller Grafiken (base64), portabel ----
function buildProject() {
  return {
    format: 'pixelmap-project', version: 1,
    name: sanitizeName($('roomName').value), curPreset, invert,
    cols, rows, tileSize: SRC,
    layers: layers.map(l => l.map(r => r.map(ch => ch == null ? ' ' : ch).join(''))),
    markers, markerOrder,
    defs: tileset.defs, tilesPerRow: tileset.tilesPerRow,
    autotileGroups: autotileGroups.map(group => ({ ...group, variants: group.variants.slice() })),
    palettes: palettes.map(p => ({ name: p.name, hex: p.hex })),
    objects: objects.map(o => ({ name: o.name, x: o.x, y: o.y, tw: o.tw, th: o.th, console: o.console, imgSrc: o.imgSrc })),
    tilesSrc: tileset.img.toDataURL ? tileset.img.toDataURL('image/png') : (tileset.img.src && tileset.img.src.startsWith('data:') ? tileset.img.src : null),
    ts: Date.now()
  };
}
function exportProject() {
  const p = buildProject();
  download(p.name.toLowerCase() + '.pixelmap.json', JSON.stringify(p));
  status('<span class="ok">Project downloaded with all graphics. Reopen it later with Project ↑.</span>');
}
function importProjectFile(file) {
  const rd = new FileReader();
  rd.onload = () => {
    let d; try { d = JSON.parse(rd.result); } catch (_) { status('<span class="err">This is not a valid JSON project file.</span>'); return; }
    if (!d.layers || !d.cols) { status('<span class="err">This is not a PixelMap project file.</span>'); return; }
    loadRoom(d.name || 'Project', d);   // stellt auch curPreset/invert wieder her
  };
  rd.onerror = () => status('<span class="err">The file could not be read.</span>');
  rd.readAsText(file);
}

// ================= Paletten-Editor =================
function openPalDlg() {
  const box = $('palEdit'); box.innerHTML = '';
  palettes.forEach((p, pi) => {
    const row = document.createElement('div'); row.className = 'pe';
    row.innerHTML = '<span class="idx">' + pi + '</span><input class="pn">' +
      p.hex.map((h, ci) => '<input type="color" data-ci="' + ci + '" value="' + h + '">').join('');
    const pn = row.querySelector('.pn'); pn.value = p.name; pn.onchange = () => { p.name = pn.value; refreshTitles(); };
    row.querySelectorAll('input[type=color]').forEach(ci => {
      ci.oninput = () => { const k = +ci.dataset.ci; p.hex[k] = ci.value; p.rgb[k] = hexToRgb(ci.value); buildTileCache(); draw(); drawSwatches(); buildInspector(); };
    });
    box.appendChild(row);
  });
  $('palDlg').showModal();
}
function resetPalettes() {
  applyPreset(curPreset); openPalDlg();
}
// ---- Paletten-Presets (Dropdown) ----
function fillPresetDropdown() {
  const sel = $('palPreset'); sel.innerHTML = '';
  PALETTE_PRESETS.forEach((p, i) => { const o = document.createElement('option'); o.value = i; o.textContent = p.name; sel.appendChild(o); });
  sel.value = curPreset;
}
function applyPreset(idx) {
  curPreset = +idx; $('palPreset').value = curPreset;
  palettes = presetPalettes(curPreset);
  buildTileCache(); draw(); drawSwatches(); buildInspector();
  if ($('palDlg').open) openPalDlg();
  status('<span class="ok">Palette: ' + PALETTE_PRESETS[curPreset].name + '</span>');
}

// ---- Größe ändern (Inhalt bleibt erhalten) ----
function resizeMap(nw, nh) {
  const ng = blankLayer(nw, nh, '.'), n1 = blankLayer(nw, nh, null), n2 = blankLayer(nw, nh, null);
  for (let r = 0; r < Math.min(rows, nh); r++) for (let c = 0; c < Math.min(cols, nw); c++) {
    ng[r][c] = layers[0][r][c]; n1[r][c] = layers[1][r][c]; n2[r][c] = layers[2][r][c];
  }
  layers = [ng, n1, n2]; cols = nw; rows = nh; undoStack = []; syncSize();
}
function changeSize() {
  const w = parseInt(prompt('Width (tiles, 1–64):', String(cols)) || '', 10); if (!w) return;
  const h = parseInt(prompt('Height (tiles, 1–64):', String(rows)) || '', 10); if (!h) return;
  const cw = Math.max(1, Math.min(64, w)), ch = Math.max(1, Math.min(64, h));
  resizeMap(cw, ch); status('Map resized to ' + cw + '×' + ch + ' tiles. Existing content was preserved.');
}

// ---- Karte als fertiges PNG rendern (Tiles + Objekte, kein Gitter) ----
function renderMapPNG(scale) {
  const c = document.createElement('canvas'); c.width = cols * SRC * scale; c.height = rows * SRC * scale;
  const g = c.getContext('2d'); g.imageSmoothingEnabled = false;
  for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) {
    for (let li = 0; li < 3; li++) {
      const ch = layers[li][r][cc]; if (ch == null) continue;
      const idx = chToIdx[ch]; if (idx == null) continue;
      const dx = cc * SRC * scale, dy = r * SRC * scale, ds = SRC * scale;
      drawTile(g, idx, dx, dy, ds, ds);
    }
  }
  objects.forEach(o => { if (o.img) g.drawImage(o.img, 0, 0, o.img.naturalWidth, o.img.naturalHeight, o.x * SRC * scale, o.y * SRC * scale, o.tw * SRC * scale, o.th * SRC * scale); });
  return c.toDataURL('image/png');
}
function exportPNG() {
  const s = Math.max(1, Math.min(16, parseInt(prompt('Scale (1–16×; 1 = ' + SRC + 'px per tile):', '4') || '', 10) || 4));
  download(sanitizeName($('roomName').value).toLowerCase() + '.png', null, renderMapPNG(s));
  status('<span class="ok">Rendered PNG at ' + (cols * SRC * s) + '×' + (rows * SRC * s) + 'px.</span>');
}

// ================= Blatt-Import (RPG-Maker-Stil) =================
let sheetImg = null, sheetData = null, sheetW = 0, sheetH = 0, sheetZoom = 2;
let sheetSel = null, sheetDrag = false, sheetPending = null;
let sheetDrawPending = false;

function transpRgbOrNull() { return $('sheetTranspOn').checked ? hexToRgb($('sheetTransp').value) : null; }
function openSheetDlg() { $('sheetRegionBar').style.display = 'none'; sheetPending = null; $('sheetDlg').showModal(); if (sheetImg) drawSheet(); }
function loadSheet(file) {
  const img = new Image();
  img.onload = () => {
    sheetImg = img; sheetW = img.naturalWidth; sheetH = img.naturalHeight;
    const oc = document.createElement('canvas'); oc.width = sheetW; oc.height = sheetH;
    const g = oc.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(img, 0, 0);
    try { sheetData = g.getImageData(0, 0, sheetW, sheetH).data; } catch (_) { sheetData = null; }
    sheetSel = null; drawSheet();
    status('Loaded sheet: ' + sheetW + '×' + sheetH + 'px. Right-click to sample the transparency color.');
  };
  img.onerror = () => status('<span class="err">The sheet could not be loaded.</span>');
  img.src = URL.createObjectURL(file);
}
function drawSheet() {
  const c = $('sheetCv'); if (!sheetImg) return;
  sheetZoom = +$('sheetZoom').value || 2;
  c.width = sheetW * sheetZoom; c.height = sheetH * sheetZoom;
  const g = c.getContext('2d'); g.imageSmoothingEnabled = false;
  g.clearRect(0, 0, c.width, c.height); g.drawImage(sheetImg, 0, 0, c.width, c.height);
  const z = SRC * sheetZoom;
  g.strokeStyle = '#00000040'; g.lineWidth = 1; g.beginPath();
  for (let x = 0; x <= sheetW; x += SRC) { g.moveTo(x * sheetZoom + .5, 0); g.lineTo(x * sheetZoom + .5, c.height); }
  for (let y = 0; y <= sheetH; y += SRC) { g.moveTo(0, y * sheetZoom + .5); g.lineTo(c.width, y * sheetZoom + .5); }
  g.stroke();
  if (sheetSel) {
    const x0 = Math.min(sheetSel.x0, sheetSel.x1), y0 = Math.min(sheetSel.y0, sheetSel.y1);
    const w = Math.abs(sheetSel.x1 - sheetSel.x0) + 1, h = Math.abs(sheetSel.y1 - sheetSel.y0) + 1;
    g.fillStyle = '#7cc47c22'; g.fillRect(x0 * z, y0 * z, w * z, h * z);
    g.strokeStyle = '#7cc47c'; g.lineWidth = 2; g.strokeRect(x0 * z + 1, y0 * z + 1, w * z - 2, h * z - 2);
  }
}
function requestSheetDraw() {
  if (sheetDrawPending) return;
  sheetDrawPending = true;
  requestAnimationFrame(() => { sheetDrawPending = false; drawSheet(); });
}
function sheetCell(e) {
  const r = $('sheetCv').getBoundingClientRect(), z = SRC * sheetZoom;
  const x = Math.floor((e.clientX - r.left) / z), y = Math.floor((e.clientY - r.top) / z);
  const mx = Math.ceil(sheetW / SRC) - 1, my = Math.ceil(sheetH / SRC) - 1;
  return { x: Math.max(0, Math.min(mx, x)), y: Math.max(0, Math.min(my, y)) };
}
function commitSingleTile(cell) {
  const idx = addTileFromRegion(sheetData, sheetW, cell.x * SRC, cell.y * SRC, transpRgbOrNull());
  if (idx == null) { status('This cell is empty or transparent.'); return; }
  tilesReady = true; buildTileCache(); curTile = idx; tilePage = pageForTile(idx); curStamp = null; curAutoTile = null;
  buildPalette(); refreshPalSel(); draw();
  status('<span class="ok">Added tile #' + idx + '.</span>');
}
function makeStamp(x0, y0, w, h) {
  const tiles = [];
  for (let dy = 0; dy < h; dy++) { const row = [];
    for (let dx = 0; dx < w; dx++) {
      const idx = addTileFromRegion(sheetData, sheetW, (x0 + dx) * SRC, (y0 + dy) * SRC, transpRgbOrNull());
      row.push(idx == null ? null : tileset.defs[idx].ch);
    }
    tiles.push(row);
  }
  tilesReady = true; buildTileCache();
  curStamp = { w, h, tiles }; curTile = -2; curObject = null;
  buildPalette(); draw();
  status('<span class="ok">' + w + '×' + h + ' stamp ready. Click the map on an active tile layer.</span>');
  $('sheetDlg').close();
}
function makeObjectFromRegion(x0, y0, w, h) {
  const pw = w * SRC, ph = h * SRC;
  const oc = document.createElement('canvas'); oc.width = pw; oc.height = ph;
  const g = oc.getContext('2d'); const id = g.createImageData(pw, ph); const transp = transpRgbOrNull();
  for (let y = 0; y < ph; y++) for (let x = 0; x < pw; x++) {
    const si = ((y0 * SRC + y) * sheetW + (x0 * SRC + x)) * 4, oi = (y * pw + x) * 4;
    let r = sheetData[si], gg = sheetData[si+1], b = sheetData[si+2], a = sheetData[si+3];
    if (transp && a > 0 && colorClose(r, gg, b, transp)) a = 0;
    id.data[oi] = r; id.data[oi+1] = gg; id.data[oi+2] = b; id.data[oi+3] = a;
  }
  g.putImageData(id, 0, 0);
  const src = oc.toDataURL('image/png'); const im = new Image();
  im.onload = () => {
    pushUndo();
    objects.push({ name: 'obj' + (objects.length + 1), x: 1, y: 1, tw: w, th: h, console: 'Free', img: im, imgSrc: src });
    curObject = objects.length - 1; curMarker = null; curStamp = null;
    if (activeLayer !== 'events') setActiveLayer('events'); else { buildObjectList(); buildObjInspector(); draw(); }
    status('<span class="ok">Created an object from the ' + pw + '×' + ph + 'px region. Click the map to place it.</span>');
  };
  im.src = src;
  $('sheetDlg').close();
}
// Region-Pixel (mit Farbschlüssel) → PNG-DataURL
function regionDataURL(tx0, ty0, tw, th, transp) {
  const pw = tw * SRC, ph = th * SRC;
  const oc = document.createElement('canvas'); oc.width = pw; oc.height = ph;
  const g = oc.getContext('2d'); const id = g.createImageData(pw, ph);
  for (let y = 0; y < ph; y++) for (let x = 0; x < pw; x++) {
    const si = ((ty0 * SRC + y) * sheetW + (tx0 * SRC + x)) * 4, oi = (y * pw + x) * 4;
    let r = sheetData[si], gg = sheetData[si+1], b = sheetData[si+2], a = sheetData[si+3];
    if (transp && a > 0 && colorClose(r, gg, b, transp)) a = 0;
    id.data[oi] = r; id.data[oi+1] = gg; id.data[oi+2] = b; id.data[oi+3] = a;
  }
  g.putImageData(id, 0, 0); return oc.toDataURL('image/png');
}
// Zusammenhängende Formen (durch Transparenzfarbe getrennt) finden → je ein Objekt
function autoDetectObjects() {
  if (!sheetData) { status('Load a sheet first.'); return; }
  const transp = transpRgbOrNull();
  const W = sheetW, H = sheetH, solid = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    let s = sheetData[i * 4 + 3] > 16;
    if (s && transp) s = !colorClose(sheetData[i*4], sheetData[i*4+1], sheetData[i*4+2], transp);
    solid[i] = s ? 1 : 0;
  }
  const seen = new Uint8Array(W * H), stack = [], comps = [];
  for (let p = 0; p < W * H; p++) {
    if (!solid[p] || seen[p]) continue;
    let minx = W, miny = H, maxx = 0, maxy = 0, cnt = 0;
    stack.length = 0; stack.push(p); seen[p] = 1;
    while (stack.length) {
      const q = stack.pop(), qx = q % W, qy = (q / W) | 0;
      if (qx < minx) minx = qx; if (qx > maxx) maxx = qx; if (qy < miny) miny = qy; if (qy > maxy) maxy = qy; cnt++;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue; const nx = qx + dx, ny = qy + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const np = ny * W + nx; if (solid[np] && !seen[np]) { seen[np] = 1; stack.push(np); }
      }
    }
    comps.push({ minx, miny, maxx, maxy, cnt });
  }
  const found = [];
  comps.forEach(c => {
    const tx0 = Math.floor(c.minx / SRC), ty0 = Math.floor(c.miny / SRC);
    const tw = Math.floor(c.maxx / SRC) - tx0 + 1, th = Math.floor(c.maxy / SRC) - ty0 + 1;
    if (c.cnt < 6) return;                 // Streupixel
    if (tw * th > 64 || tw > 12 || th > 12) return;   // zu groß → vermutlich Terrain
    found.push({ tx0, ty0, tw, th });
  });
  if (!found.length) { status('<span class="warn">No separate objects found. Try sampling the transparency color with a right-click.</span>'); return; }
  pushUndo();
  let px = 0, py = 0, rowH = 0;
  found.forEach((o, k) => {
    if (px + o.tw > cols) { px = 0; py += rowH + 1; rowH = 0; }
    const ox = px, oy = py; rowH = Math.max(rowH, o.th); px += o.tw + 1;
    const src = regionDataURL(o.tx0, o.ty0, o.tw, o.th, transp);
    const im = new Image(); im.onload = () => draw(); im.src = src;
    objects.push({ name: 'obj' + (objects.length + 1), x: ox, y: oy, tw: o.tw, th: o.th, console: 'Free', img: im, imgSrc: src });
  });
  curObject = objects.length - 1; curMarker = null; curStamp = null;
  setActiveLayer('events');
  status('<span class="ok">Detected and placed ' + found.length + ' movable object(s).</span>');
  $('sheetDlg').close();
}

// ================= misc =================
function status(html) { $('status').innerHTML = html; }
function newRoom() {
  $('newW').value = cols; $('newH').value = rows;
  document.querySelectorAll('#sizeOpts input[name=tsz]').forEach(r => r.checked = +r.value === SRC);
  $('newDlg').showModal();
}
function createRoom() {
  const px = +([...document.querySelectorAll('#sizeOpts input[name=tsz]')].find(r => r.checked)?.value || 8);
  const w = Math.max(1, Math.min(64, parseInt($('newW').value, 10) || 20));
  const h = Math.max(1, Math.min(64, parseInt($('newH').value, 10) || 18));
  setTileSize(px);
  tilePage = 0;
  rebuildBuiltinAtlas();
  tilesReady = true; buildTileCache();
  newMap(w, h);
  buildPalette();
  $('newDlg').close();
  status('New project: ' + w + '×' + h + ' tiles at ' + px + '×' + px + 'px.');
}

// ================= Wire up =================
$('btnUndo').onclick = undo;
$('chkGrid').onchange = e => { showGrid = e.target.checked; draw(); };
$('chkDim').onchange = e => { dimOthers = e.target.checked; draw(); };
$('chkRecolor').onchange = e => { recolor = e.target.checked; draw(); drawSwatches(); buildInspector(); };
$('chkInvert').onchange = e => { invert = e.target.checked; buildTileCache(); draw(); drawSwatches(); buildInspector(); };
$('btnPalettes').onclick = openPalDlg;
$('palPreset').onchange = e => applyPreset(e.target.value);
$('btnResize').onclick = changeSize;
$('btnPng').onclick = exportPNG;
$('btnClosePal').onclick = () => $('palDlg').close();
$('btnPalReset').onclick = resetPalettes;
$('btnNew').onclick = newRoom;
$('newCreate').onclick = createRoom;
$('newCancel').onclick = () => $('newDlg').close();
$('btnSave').onclick = saveRoom;
$('btnLoad').onclick = openLoad;
$('btnProjSave').onclick = exportProject;
$('btnProjOpen').onclick = () => $('projFile').click();
$('projFile').onchange = e => { const f = e.target.files[0]; if (f) importProjectFile(f); e.target.value = ''; };
$('btnCheck').onclick = checkBorder;
$('btnExport').onclick = openExport;
$('btnUpload').onclick = () => $('fileInput').click();
$('btnAutoPalette').onclick = () => autoAssignPalettes(true);
$('tileErase').onclick = () => {
  if (activeLayer === 0) return;
  curTile = -1; curStamp = null; curAutoTile = null; refreshPalSel(); buildInspector();
};
$('tilePrev').onclick = () => { if (tilePage > 0) { tilePage--; buildPalette(); } };
$('tileNext').onclick = () => {
  const info = tilePageMetrics();
  if (tilePage < info.pages - 1) { tilePage++; buildPalette(); }
};
$('btnAddObject').onclick = () => $('objFile').click();
$('btnSheet').onclick = openSheetDlg;
$('sheetClose').onclick = () => $('sheetDlg').close();
$('sheetPick').onclick = () => $('sheetFile').click();
$('sheetAuto').onclick = autoDetectObjects;
$('sheetFile').onchange = e => { const f = e.target.files[0]; if (f) loadSheet(f); e.target.value = ''; };
$('sheetZoom').onchange = drawSheet;
$('sheetStamp').onclick = () => { if (sheetPending) makeStamp(sheetPending.x0, sheetPending.y0, sheetPending.w, sheetPending.h); };
$('sheetObject').onclick = () => { if (sheetPending) makeObjectFromRegion(sheetPending.x0, sheetPending.y0, sheetPending.w, sheetPending.h); };
(() => {
  const scv = $('sheetCv');
  scv.addEventListener('contextmenu', e => {
    e.preventDefault(); if (!sheetData) return;
    const r = scv.getBoundingClientRect();
    const px = Math.floor((e.clientX - r.left) / sheetZoom), py = Math.floor((e.clientY - r.top) / sheetZoom);
    if (px < 0 || py < 0 || px >= sheetW || py >= sheetH) return;
    const si = (py * sheetW + px) * 4;
    const hex = '#' + [sheetData[si], sheetData[si+1], sheetData[si+2]].map(v => v.toString(16).padStart(2, '0')).join('');
    $('sheetTransp').value = hex; $('sheetTranspOn').checked = true;
    status('Transparency color: ' + hex);
  });
  scv.addEventListener('mousedown', e => { if (e.button !== 0 || !sheetData) return; const c = sheetCell(e); sheetDrag = true; sheetSel = { x0: c.x, y0: c.y, x1: c.x, y1: c.y }; $('sheetRegionBar').style.display = 'none'; drawSheet(); });
  scv.addEventListener('mousemove', e => { if (!sheetDrag) return; const c = sheetCell(e); sheetSel.x1 = c.x; sheetSel.y1 = c.y; requestSheetDraw(); });
  window.addEventListener('mouseup', () => {
    if (!sheetDrag) return; sheetDrag = false; if (!sheetSel) return;
    const x0 = Math.min(sheetSel.x0, sheetSel.x1), y0 = Math.min(sheetSel.y0, sheetSel.y1);
    const w = Math.abs(sheetSel.x1 - sheetSel.x0) + 1, h = Math.abs(sheetSel.y1 - sheetSel.y0) + 1;
    if (w === 1 && h === 1) { commitSingleTile({ x: x0, y: y0 }); sheetSel = null; drawSheet(); }
    else { sheetPending = { x0, y0, w, h }; $('sheetRegionInfo').textContent = 'Region: ' + w + '×' + h + ' tiles (' + (w * SRC) + '×' + (h * SRC) + 'px)'; $('sheetRegionBar').style.display = 'flex'; }
  });
})();
$('btnCloseExport').onclick = () => $('exportDlg').close();
$('btnCloseLoad').onclick = () => $('loadDlg').close();
$('chkLegend').onchange = () => { $('exportText').value = mapToText(); };
$('btnCopyTxt').onclick = () => copy(mapToText(), 'Text copied.');
$('btnDownloadTxt').onclick = () => download(sanitizeName($('roomName').value).toLowerCase() + '.txt', mapToText());
$('btnCArray').onclick = () => { const c = mapToCArray(); $('exportText').value = c; copy(c, 'C array copied.'); };
$('btnJsonSave').onclick = () => exportJSON(false);
$('btnJsonCopy').onclick = () => exportJSON(true);
$('btnAssets').onclick = exportAssets;
$('btnAddMarker').onclick = () => {
  const n = $('newMarker').value.trim().replace(/\s+/g, '_'); if (!n) return;
  if (!markerOrder.includes(n)) markerOrder.push(n);
  curMarker = n; $('newMarker').value = ''; buildMarkerList();
};
window.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); } });

// Resizable sidebar. The width is kept as a local UI preference.
(() => {
  const panel = $('panel'), handle = $('panelResize');
  const widthKey = 'pixelmap_sidebar_width';
  try {
    const saved = parseInt(localStorage.getItem(widthKey), 10);
    if (saved) panel.style.width = Math.max(210, Math.min(window.innerWidth * .6, saved)) + 'px';
  } catch (_) {}
  const setWidth = width => {
    const max = Math.min(window.innerWidth * .6, 720);
    panel.style.width = Math.max(210, Math.min(max, width)) + 'px';
  };
  handle.addEventListener('pointerdown', e => {
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);
    handle.classList.add('dragging');
    document.body.classList.add('resizing-sidebar');
  });
  handle.addEventListener('pointermove', e => {
    if (!handle.hasPointerCapture(e.pointerId)) return;
    setWidth(e.clientX);
  });
  const finishResize = e => {
    if (handle.hasPointerCapture(e.pointerId)) handle.releasePointerCapture(e.pointerId);
    handle.classList.remove('dragging');
    document.body.classList.remove('resizing-sidebar');
    try { localStorage.setItem(widthKey, String(Math.round(panel.getBoundingClientRect().width))); } catch (_) {}
  };
  handle.addEventListener('pointerup', finishResize);
  handle.addEventListener('pointercancel', finishResize);
  handle.addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    setWidth(panel.getBoundingClientRect().width + (e.key === 'ArrowRight' ? 16 : -16));
    try { localStorage.setItem(widthKey, String(Math.round(panel.getBoundingClientRect().width))); } catch (_) {}
  });
})();

// Basis-Tiles laden und auf die aktuelle Tile-Größe skaliert in einen Atlas legen
const builtinImg = new Image();
function rebuildBuiltinAtlas() {
  const a = document.createElement('canvas'); a.__atlas = true;
  a.width = 12 * SRC; a.height = SRC;
  const g = a.getContext('2d'); g.imageSmoothingEnabled = false;
  g.drawImage(builtinImg, 0, 0, 96, 8, 0, 0, 12 * SRC, SRC);   // 8×8-Quelle → SRC×SRC, pixelig skaliert
  tileset = { img: a, tilesPerRow: 12, count: 12, defs: BUILTIN_DEFS.map(d => ({ ...d })) };
  rebuildChMap(); rebuildTileHashes();
}
builtinImg.onload = () => { rebuildBuiltinAtlas(); tilesReady = true; buildTileCache(); buildPalette(); draw(); };
builtinImg.onerror = () => status('<span class="err">The built-in tileset could not be loaded.</span>');
builtinImg.src = BUILTIN_PNG;

// ================= Init =================
newMap(20, 18);
fillPresetDropdown();
buildLayerList(); buildPalette(); buildMarkerList();
setActiveLayer(0);
