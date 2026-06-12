/* =====================================================================
   DICTÉE VOCALE 🔊✍️
   La voix lit un mot, l'enfant l'écrit. Pour la maternelle, le mot est
   affiché et il faut le recopier (reconnaissance des lettres + clavier).
   ===================================================================== */

const DICTEE_WORDS = {
  maternelle: { // mode « recopie le mot »
    1: [
      { w: "PAPA", e: "👨" }, { w: "MAMAN", e: "👩" }, { w: "CHAT", e: "🐱" }, { w: "OUI", e: "✅" },
    ],
    2: [
      { w: "LAPIN", e: "🐰" }, { w: "VELO", e: "🚲" }, { w: "LUNE", e: "🌙" }, { w: "BEBE", e: "👶" },
    ],
    3: [
      { w: "MOUTON", e: "🐑" }, { w: "BALLON", e: "🎈" }, { w: "TOMATE", e: "🍅" }, { w: "SOURIS", e: "🐭" },
    ],
  },
  cp_ce1: {
    1: [
      { w: "ami", e: "🤝" }, { w: "lune", e: "🌙" }, { w: "vélo", e: "🚲" }, { w: "moto", e: "🏍️" }, { w: "papa", e: "👨" },
    ],
    2: [
      { w: "maison", e: "🏠" }, { w: "lapin", e: "🐰" }, { w: "jardin", e: "🌷" }, { w: "cheval", e: "🐴" }, { w: "samedi", e: "📅" },
    ],
    3: [
      { w: "oiseau", e: "🐦" }, { w: "gâteau", e: "🎂" }, { w: "chapeau", e: "🎩" }, { w: "fenêtre", e: "🪟" }, { w: "montagne", e: "🏔️" },
    ],
  },
  ce2_cm1: {
    1: [
      { w: "toujours", e: "♾️" }, { w: "chocolat", e: "🍫" }, { w: "dimanche", e: "📅" }, { w: "histoire", e: "📖" },
    ],
    2: [
      { w: "monsieur", e: "🎩" }, { w: "beaucoup", e: "➕" }, { w: "attention", e: "⚠️" }, { w: "escalier", e: "🪜" },
    ],
    3: [
      { w: "aujourd'hui", e: "📅" }, { w: "grenouille", e: "🐸" }, { w: "bibliothèque", e: "📚" }, { w: "papillon", e: "🦋" },
    ],
  },
  cm2: {
    1: [
      { w: "difficile", e: "🧗" }, { w: "nourriture", e: "🍽️" }, { w: "température", e: "🌡️" }, { w: "magnifique", e: "✨" },
    ],
    2: [
      { w: "professeur", e: "🏫" }, { w: "appartement", e: "🏢" }, { w: "courageux", e: "🦁" }, { w: "longtemps", e: "⏳" },
    ],
    3: [
      { w: "accueillir", e: "🤗" }, { w: "orthographe", e: "✍️" }, { w: "merveilleux", e: "🌟" }, { w: "atterrir", e: "🛬" },
    ],
  },
};

// Crée une question de dictée (ou null si la synthèse vocale est absente)
function makeDictee(tier, diff) {
  if (!DICTEE_WORDS[tier]) return null; // pas de dictée pour les classes parents
  const isCopy = tier === "maternelle";
  if (!isCopy && !("speechSynthesis" in window)) return null;
  const pool = DICTEE_WORDS[tier][diff] || DICTEE_WORDS[tier][1];
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return {
    type: "dictee",
    subject: "francais",
    q: isCopy ? "Recopie le mot :" : "Écoute bien et écris le mot 🔊",
    word: pick.w,
    e: pick.e,
    c: [], a: -1, // pas de QCM
  };
}

// Comparaison gentille : majuscules et accents tolérés
const DIACRITICS_RE = new RegExp("[\\u0300-\\u036f]", "g");
function dicteeMatch(answer, word) {
  const norm = (s) => s.trim().toLowerCase()
    .normalize("NFD").replace(DIACRITICS_RE, "")
    .replace(/’/g, "'");
  return norm(answer) === norm(word);
}
