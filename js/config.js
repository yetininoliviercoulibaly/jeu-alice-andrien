/* =====================================================================
   CONFIGURATION DU JEU — modifiable par les parents
   (ces valeurs peuvent aussi être ajustées dans l'Espace Parents du jeu,
    qui les enregistre sur l'appareil sans toucher à ce fichier)
   ===================================================================== */

const CONFIG = {
  // Nombre de questions posées au quiz de fin de niveau
  quizQuestionCount: 6,

  // Les 8 niveaux du jeu.
  //  - threshold  : part de bonnes réponses requise au quiz pour passer (0.6 = 60 %)
  //  - difficulty : difficulté des questions (1 = facile, 2 = moyen, 3 = difficile)
  levels: [
    { name: "La Prairie",          emoji: "🌼", threshold: 0.50, difficulty: 1 },
    { name: "La Forêt",            emoji: "🌳", threshold: 0.60, difficulty: 1 },
    { name: "Les Collines",        emoji: "⛰️", threshold: 0.60, difficulty: 1 },
    { name: "La Plage",            emoji: "🏖️", threshold: 0.65, difficulty: 2 },
    { name: "Les Grottes",         emoji: "🦇", threshold: 0.70, difficulty: 2 },
    { name: "La Montagne glacée",  emoji: "❄️", threshold: 0.70, difficulty: 2 },
    { name: "Le Volcan",           emoji: "🌋", threshold: 0.75, difficulty: 3 },
    { name: "Le Château",          emoji: "🏰", threshold: 0.80, difficulty: 3 },
    { name: "Les Nuages",          emoji: "☁️", threshold: 0.80, difficulty: 3 },
    { name: "L'Espace",            emoji: "🚀", threshold: 0.85, difficulty: 3 },
  ],

  // Récompenses des blocs « ? » pendant le niveau
  blockRewardCoins: 5,      // pièces gagnées pour une bonne réponse
  blockConsolationCoins: 1, // pièces de consolation pour une mauvaise réponse

  // Nombre de cœurs au début de chaque niveau
  startHearts: 3,
};

// Classes scolaires disponibles pour les profils
const TIERS = [
  { id: "maternelle", label: "🧸 Maternelle (MS/GS)" },
  { id: "cp_ce1",     label: "✏️ CP – CE1" },
  { id: "ce2_cm1",    label: "📖 CE2 – CM1" },
  { id: "cm2",        label: "🎓 CM2" },
];

const AVATARS = ["🦊", "🐰", "🐱", "🐸", "🦄", "🐼", "🦖", "🐙"];
