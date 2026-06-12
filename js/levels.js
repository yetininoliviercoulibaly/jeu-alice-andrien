/* =====================================================================
   NIVEAUX DU JEU
   Chaque niveau est assemblé à partir de « tronçons » de 8 colonnes,
   ce qui garantit que tous les sauts sont réalisables.

   Légende des tuiles :
   '#' sol      'B' brique    '=' plateforme  '?' bloc question
   'C' pièce    'E' ennemi    'S' piques      'T' tuyau
   'P' départ   'F' drapeau d'arrivée         ' ' vide
   ===================================================================== */

const ROWS = 15;          // hauteur des niveaux en tuiles
const CHUNK_W = 8;        // largeur d'un tronçon

// --- Petits outils de construction ---
function _blank(w) {
  return Array.from({ length: ROWS }, () => " ".repeat(w));
}
function _set(g, r, c, ch) {
  if (r < 0 || r >= ROWS || c < 0 || c >= g[0].length) return;
  g[r] = g[r].slice(0, c) + ch + g[r].slice(c + 1);
}
function _ground(g, c0, c1) {
  for (let c = c0; c <= c1; c++) { _set(g, 13, c, "#"); _set(g, 14, c, "#"); }
}

// --- Tronçons disponibles ---
const CHUNKS = {
  // Départ du joueur
  start() { const g = _blank(CHUNK_W); _ground(g, 0, 7); _set(g, 11, 1, "P"); return g; },

  // Sol plat
  flat() { const g = _blank(CHUNK_W); _ground(g, 0, 7); return g; },

  // Pièces à ramasser
  coins() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    for (let c = 2; c <= 5; c++) _set(g, 12, c, "C");
    return g;
  },

  // Arc de pièces en hauteur
  coinArc() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 11, 1, "C"); _set(g, 10, 2, "C"); _set(g, 9, 3, "C");
    _set(g, 9, 4, "C"); _set(g, 10, 5, "C"); _set(g, 11, 6, "C");
    return g;
  },

  // Un bloc question
  q() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 9, 3, "?"); _set(g, 11, 5, "C");
    return g;
  },

  // Deux blocs question encadrés de briques
  q2() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 9, 2, "B"); _set(g, 9, 3, "?"); _set(g, 9, 4, "?"); _set(g, 9, 5, "B");
    return g;
  },

  // Bloc question en hauteur, accessible par une plateforme
  qHigh() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    for (let c = 1; c <= 3; c++) _set(g, 10, c, "=");
    _set(g, 6, 2, "?");
    _set(g, 9, 6, "C");
    return g;
  },

  // Ennemi qui patrouille
  enemy() { const g = _blank(CHUNK_W); _ground(g, 0, 7); _set(g, 12, 4, "E"); return g; },

  // Deux ennemis
  enemy2() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 12, 2, "E"); _set(g, 12, 6, "E");
    return g;
  },

  // Trou de 2 cases
  gap2() {
    const g = _blank(CHUNK_W);
    _ground(g, 0, 2); _ground(g, 5, 7);
    _set(g, 10, 3, "C"); _set(g, 10, 4, "C");
    return g;
  },

  // Trou de 3 cases
  gap3() {
    const g = _blank(CHUNK_W);
    _ground(g, 0, 2); _ground(g, 6, 7);
    _set(g, 9, 4, "C");
    return g;
  },

  // Grand trou avec plateforme au milieu
  gapPlat() {
    const g = _blank(CHUNK_W);
    _ground(g, 0, 1); _ground(g, 6, 7);
    _set(g, 11, 3, "="); _set(g, 11, 4, "=");
    _set(g, 9, 3, "C"); _set(g, 9, 4, "C");
    return g;
  },

  // Plateformes étagées avec pièces
  plats() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 10, 1, "="); _set(g, 10, 2, "=");
    _set(g, 8, 4, "="); _set(g, 8, 5, "=");
    _set(g, 7, 4, "C"); _set(g, 7, 5, "C");
    return g;
  },

  // Piques à sauter
  spikes() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 12, 3, "S"); _set(g, 12, 4, "S");
    return g;
  },

  // Piques + ennemi (difficile)
  spikesHard() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 12, 2, "S"); _set(g, 12, 3, "S");
    _set(g, 12, 6, "E");
    return g;
  },

  // Petite colline à escalader
  hill() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    for (let c = 2; c <= 5; c++) _set(g, 12, c, "#");
    for (let c = 3; c <= 4; c++) _set(g, 11, c, "#");
    _set(g, 9, 3, "C"); _set(g, 9, 4, "C");
    return g;
  },

  // Tuyau à la Mario
  pipe() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 11, 3, "T"); _set(g, 11, 4, "T");
    _set(g, 12, 3, "T"); _set(g, 12, 4, "T");
    _set(g, 9, 1, "C");
    return g;
  },

  // Escalier de briques
  stairs() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 12, 2, "B");
    _set(g, 12, 3, "B"); _set(g, 11, 3, "B");
    _set(g, 12, 4, "B"); _set(g, 11, 4, "B"); _set(g, 10, 4, "B");
    _set(g, 8, 6, "C");
    return g;
  },

  // Arrivée : le drapeau
  end() {
    const g = _blank(CHUNK_W); _ground(g, 0, 7);
    _set(g, 12, 4, "F");
    return g;
  },
};

// Assemble une liste de tronçons en une grille complète
function buildLevel(chunkNames) {
  const grids = chunkNames.map(n => CHUNKS[n]());
  const rows = [];
  for (let r = 0; r < ROWS; r++) {
    rows.push(grids.map(g => g[r]).join(""));
  }
  return rows;
}

/* --- Thèmes visuels (un par niveau) --- */
const THEMES = [
  { sky: ["#4ec0f0", "#bfeaf7"], ground: "#7ec850", dirt: "#9b6a43", enemy: "🐌", deco: ["🌼", "🌷", "🌳"], cloud: "#ffffff" },
  { sky: ["#3aa05c", "#a8d8a8"], ground: "#4e9b3d", dirt: "#6b4a2e", enemy: "🐗", deco: ["🌲", "🍄", "🌳"], cloud: "#e8f5e9" },
  { sky: ["#74b9ff", "#dfe6e9"], ground: "#a4b86a", dirt: "#8d6e63", enemy: "🐐", deco: ["⛰️", "🌾", "🦅"], cloud: "#ffffff" },
  { sky: ["#48cae4", "#ffe8b0"], ground: "#f5d76e", dirt: "#e0b354", enemy: "🦀", deco: ["🌴", "⛱️", "🐚"], cloud: "#ffffff" },
  { sky: ["#2d3436", "#636e72"], ground: "#7f8c8d", dirt: "#57606f", enemy: "🦇", deco: ["💎", "🕯️", "🪨"], cloud: "#95a5a6" },
  { sky: ["#a8d8ea", "#ffffff"], ground: "#d6ecf5", dirt: "#9bbfd4", enemy: "🐧", deco: ["⛄", "🎿", "❄️"], cloud: "#ffffff" },
  { sky: ["#641f1f", "#e17055"], ground: "#6d4c41", dirt: "#4e342e", enemy: "🔥", deco: ["🌋", "🪨", "💀"], cloud: "#b86b5c" },
  { sky: ["#2c2c54", "#706fd3"], ground: "#84817a", dirt: "#57606f", enemy: "👻", deco: ["🏰", "🦉", "⭐"], cloud: "#9a9adf" },
  { sky: ["#5fa8e8", "#dff3ff"], ground: "#ffffff", dirt: "#cfe6f5", enemy: "🦅", deco: ["🪁", "🌈", "🎈"], cloud: "#ffffff" },
  { sky: ["#0b0c2a", "#2d2a6e"], ground: "#8d86c9", dirt: "#5c568f", enemy: "👾", deco: ["🌟", "🪐", "🛸"], cloud: "#454379" },
];

/* --- Composition des 8 niveaux (de plus en plus longs et difficiles) --- */
const LEVEL_LAYOUTS = [
  // 1. La Prairie — tout doux
  ["start", "flat", "coins", "q", "flat", "enemy", "coinArc", "gap2", "q", "flat", "pipe", "coins", "q2", "flat", "end"],
  // 2. La Forêt
  ["start", "flat", "q", "enemy", "gap2", "coins", "plats", "q2", "enemy", "coinArc", "gap2", "hill", "q", "flat", "end"],
  // 3. Les Collines
  ["start", "flat", "hill", "q", "enemy", "gap3", "coinArc", "stairs", "q2", "enemy2", "gap2", "plats", "qHigh", "coins", "end"],
  // 4. La Plage
  ["start", "flat", "coins", "q", "enemy", "gap3", "pipe", "spikes", "q2", "coinArc", "gapPlat", "enemy2", "qHigh", "hill", "q", "end"],
  // 5. Les Grottes
  ["start", "flat", "q", "spikes", "enemy", "gap3", "plats", "q2", "spikesHard", "coinArc", "gapPlat", "stairs", "qHigh", "enemy2", "q", "end"],
  // 6. La Montagne glacée
  ["start", "flat", "coins", "q", "gap3", "spikes", "plats", "enemy2", "q2", "gapPlat", "hill", "spikesHard", "qHigh", "coinArc", "gap2", "q", "end"],
  // 7. Le Volcan
  ["start", "flat", "q", "spikesHard", "gap3", "enemy2", "gapPlat", "q2", "spikes", "stairs", "enemy2", "gap3", "qHigh", "spikesHard", "coinArc", "q", "gap2", "end"],
  // 8. Le Château
  ["start", "flat", "q", "enemy2", "spikesHard", "gap3", "plats", "q2", "gapPlat", "spikes", "stairs", "enemy2", "qHigh", "gap3", "spikesHard", "coinArc", "q2", "enemy2", "gap2", "q", "end"],
  // 9. Les Nuages — beaucoup de plateformes et de vide
  ["start", "flat", "q", "gapPlat", "plats", "gap3", "qHigh", "coinArc", "gapPlat", "enemy2", "gap2", "q2", "gapPlat", "spikes", "plats", "gap3", "qHigh", "coinArc", "gap2", "q", "end"],
  // 10. L'Espace — le défi ultime
  ["start", "flat", "q", "spikesHard", "gapPlat", "enemy2", "gap3", "q2", "plats", "spikes", "gapPlat", "stairs", "enemy2", "qHigh", "gap3", "spikesHard", "coinArc", "q2", "gapPlat", "enemy2", "gap2", "q", "end"],
];

const LEVELS = LEVEL_LAYOUTS.map((layout, i) => ({
  grid: buildLevel(layout),
  theme: THEMES[i],
}));
