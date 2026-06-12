/* =====================================================================
   NIVEAUX PARENTS 🎒🎓🧠 — Collège, Lycée, Université
   Deux matières : Mathématiques et Algorithmique.
   Même format que les autres banques de questions.
   ===================================================================== */

// Matières jouées par chaque classe « adulte »
const TIER_SUBJECTS = {
  college: ["math", "algo"],
  lycee: ["math", "algo"],
  superieur: ["math", "algo"],
};
SUBJECT_LABELS.algo = "💻 Algorithmique";

QUESTION_BANK.college = {
  math: {
    1: [
      { q: "Combien font (−7) + 12 ?", c: ["−5", "5", "19"], a: 1, e: "➕" },
      { q: "Combien font 1/2 + 1/4 ?", c: ["2/6", "3/4", "1/8"], a: 1, e: "🍕" },
      { q: "Combien font 2³ ?", c: ["6", "8", "9"], a: 1, e: "🔢" },
      { q: "Si x + 5 = 12, que vaut x ?", c: ["7", "17", "−7"], a: 0, e: "❔" },
      { q: "Combien font (−3) × (−4) ?", c: ["−12", "12", "−7"], a: 1, e: "✖️" },
    ],
    2: [
      { q: "Un triangle rectangle a des côtés de 3 et 4. Quelle est l'hypoténuse ?", c: ["5", "6", "7"], a: 0, e: "📐" },
      { q: "Combien font 25 % de 80 ?", c: ["15", "20", "25"], a: 1, e: "💯" },
      { q: "Que vaut 10⁻² ?", c: ["0,01", "0,1", "−100"], a: 0, e: "🔢" },
      { q: "Si 3x = 21, que vaut x ?", c: ["6", "7", "63"], a: 1, e: "❔" },
      { q: "Développer (a + b)² donne…", c: ["a² + b²", "a² + 2ab + b²", "a² − b²"], a: 1, e: "📝" },
    ],
    3: [
      { q: "Si 2x + 3 = 11, que vaut x ?", c: ["4", "7", "5,5"], a: 0, e: "❔" },
      { q: "Probabilité d'obtenir un 6 avec un dé équilibré ?", c: ["1/2", "1/6", "1/36"], a: 1, e: "🎲" },
      { q: "Que vaut √144 ?", c: ["11", "12", "14"], a: 1, e: "🔢" },
      { q: "Que vaut 5⁰ ?", c: ["0", "1", "5"], a: 1, e: "🔢" },
      { q: "Si f(x) = 3x − 2, que vaut f(−1) ?", c: ["−5", "1", "−1"], a: 0, e: "📈" },
    ],
  },
  algo: {
    1: [
      { q: "Qu'est-ce qu'un algorithme ?", c: ["Une suite d'instructions ordonnées", "Un langage de programmation", "Un ordinateur"], a: 0, e: "🤖" },
      { q: "x ← 5 puis x ← x + 3. Que vaut x ?", c: ["5", "8", "3"], a: 1, e: "💻" },
      { q: "Dans Scratch : « répéter 4 fois : avancer de 10 ». De combien avance le lutin ?", c: ["10", "14", "40"], a: 2, e: "🐱" },
      { q: "À quoi sert une variable ?", c: ["À mémoriser une valeur", "À dessiner", "À imprimer"], a: 0, e: "📦" },
    ],
    2: [
      { q: "x ← 2 ; x ← x × x ; x ← x + 1. Que vaut x ?", c: ["4", "5", "6"], a: 1, e: "💻" },
      { q: "SI 7 > 3 ALORS afficher « A » SINON afficher « B ». Qu'affiche-t-on ?", c: ["A", "B", "Rien"], a: 0, e: "🔀" },
      { q: "Combien de fois s'exécute « pour i allant de 1 à 5 » ?", c: ["4", "5", "6"], a: 1, e: "🔁" },
      { q: "Que fait une boucle ?", c: ["Elle répète des instructions", "Elle arrête le programme", "Elle supprime une variable"], a: 0, e: "🔁" },
    ],
    3: [
      { q: "x ← 1 ; répéter 3 fois : x ← x × 2. Que vaut x ?", c: ["6", "8", "16"], a: 1, e: "💻" },
      { q: "a ← 4 ; b ← 7 ; a ← b ; b ← a. Que vaut b ?", c: ["4", "7", "11"], a: 1, e: "🔄" },
      { q: "Quel symbole teste l'égalité en Python ?", c: ["=", "==", "≈"], a: 1, e: "🐍" },
      { q: "Qu'affiche print(3 * 'ab') en Python ?", c: ["ababab", "3ab", "Erreur"], a: 0, e: "🐍" },
    ],
  },
};

QUESTION_BANK.lycee = {
  math: {
    1: [
      { q: "Quelle est la dérivée de x² ?", c: ["x", "2x", "x²/2"], a: 1, e: "📈" },
      { q: "Si f(x) = 2x + 3, que vaut f(4) ?", c: ["11", "14", "8"], a: 0, e: "📈" },
      { q: "Que vaut ln(1) ?", c: ["0", "1", "e"], a: 0, e: "🔢" },
      { q: "Quel est le coefficient directeur de la droite y = 5x − 2 ?", c: ["−2", "5", "3"], a: 1, e: "📉" },
    ],
    2: [
      { q: "Quelle est la dérivée de 3x² ?", c: ["3x", "6x", "6x²"], a: 1, e: "📈" },
      { q: "Probabilité d'obtenir « pile » avec une pièce équilibrée ?", c: ["1/2", "1/4", "1"], a: 0, e: "🪙" },
      { q: "Que vaut e⁰ ?", c: ["0", "1", "e"], a: 1, e: "🔢" },
      { q: "Suite arithmétique : u₀ = 2, raison 3. Que vaut u₃ ?", c: ["9", "11", "54"], a: 1, e: "🔗" },
    ],
    3: [
      { q: "Que vaut ∫₀¹ 2x dx ?", c: ["1", "2", "1/2"], a: 0, e: "∫" },
      { q: "Limite de 1/x quand x tend vers +∞ ?", c: ["0", "1", "+∞"], a: 0, e: "♾️" },
      { q: "Quelle est la dérivée de eˣ ?", c: ["eˣ", "xeˣ⁻¹", "1/x"], a: 0, e: "📈" },
      { q: "Combien de combinaisons de 2 éléments parmi 4 ?", c: ["6", "8", "12"], a: 0, e: "🎰" },
    ],
  },
  algo: {
    1: [
      { q: "En Python, que vaut len('python') ?", c: ["5", "6", "7"], a: 1, e: "🐍" },
      { q: "En Python, que vaut 7 // 2 ?", c: ["3", "3,5", "4"], a: 0, e: "➗" },
      { q: "Quel est le type de 3.14 en Python ?", c: ["int", "float", "str"], a: 1, e: "🐍" },
      { q: "liste = [1, 2, 3]. Que vaut liste[0] ?", c: ["1", "2", "Erreur"], a: 0, e: "📋" },
    ],
    2: [
      { q: "En Python, que vaut 7 % 3 ?", c: ["1", "2", "2,33"], a: 0, e: "➗" },
      { q: "range(4) parcourt les valeurs…", c: ["1, 2, 3, 4", "0, 1, 2, 3", "0, 1, 2, 3, 4"], a: 1, e: "🔁" },
      { q: "s = 0 ; pour i de 1 à 4 : s ← s + i. Que vaut s ?", c: ["4", "10", "24"], a: 1, e: "🧮" },
      { q: "En Python, que vaut 'a' + 'b' ?", c: ["'ab'", "Erreur", "'a+b'"], a: 0, e: "🐍" },
    ],
    3: [
      { q: "f(0) = 1 et f(n) = n × f(n−1). Que vaut f(3) ?", c: ["3", "6", "9"], a: 1, e: "🔄" },
      { q: "Complexité de la recherche dichotomique ?", c: ["O(n)", "O(log n)", "O(n²)"], a: 1, e: "🔍" },
      { q: "x = 10 ; tant que x > 2 : x ← x // 2. Que vaut x à la fin ?", c: ["1", "2", "2,5"], a: 1, e: "🔁" },
      { q: "Que vaut [i*i for i in range(3)] en Python ?", c: ["[1, 4, 9]", "[0, 1, 4]", "[0, 1, 2]"], a: 1, e: "🐍" },
    ],
  },
};

QUESTION_BANK.superieur = {
  math: {
    1: [
      { q: "Que vaut i² (nombre complexe) ?", c: ["1", "−1", "i"], a: 1, e: "🔢" },
      { q: "Quelle est la dérivée de e²ˣ ?", c: ["e²ˣ", "2e²ˣ", "2xe²ˣ"], a: 1, e: "📈" },
      { q: "Que vaut log₂(8) ?", c: ["2", "3", "4"], a: 1, e: "🔢" },
      { q: "Multiplier une matrice A par la matrice identité donne…", c: ["A", "0", "A²"], a: 0, e: "🧮" },
    ],
    2: [
      { q: "Déterminant de la matrice [[1, 2], [3, 4]] ?", c: ["−2", "2", "10"], a: 0, e: "🧮" },
      { q: "La série harmonique ∑ 1/n…", c: ["converge", "diverge", "vaut 2"], a: 1, e: "♾️" },
      { q: "Rang maximal d'une matrice 3 × 4 ?", c: ["3", "4", "12"], a: 0, e: "🧮" },
      { q: "Que vaut cos²x + sin²x ?", c: ["0", "1", "2"], a: 1, e: "📐" },
    ],
    3: [
      { q: "Quelle est la dérivée de ln(x) ?", c: ["1/x", "x", "ln(x)/x"], a: 0, e: "📈" },
      { q: "Que vaut ∫ eˣ dx ?", c: ["eˣ + C", "xeˣ + C", "eˣ⁺¹/(x+1) + C"], a: 0, e: "∫" },
      { q: "Limite de (1 + 1/n)ⁿ quand n tend vers +∞ ?", c: ["1", "e", "+∞"], a: 1, e: "♾️" },
      { q: "Une fonction continue sur [a, b] atteint…", c: ["ses bornes", "zéro", "l'infini"], a: 0, e: "📊" },
    ],
  },
  algo: {
    1: [
      { q: "1011 en binaire vaut, en décimal…", c: ["9", "11", "13"], a: 1, e: "💾" },
      { q: "Une pile (stack) fonctionne en…", c: ["LIFO", "FIFO", "accès aléatoire"], a: 0, e: "🥞" },
      { q: "Complexité moyenne du tri rapide (quicksort) ?", c: ["O(n)", "O(n log n)", "O(n²)"], a: 1, e: "⚡" },
      { q: "Que vaut 17 mod 5 ?", c: ["2", "3", "3,4"], a: 0, e: "➗" },
    ],
    2: [
      { q: "Une file (queue) fonctionne en…", c: ["LIFO", "FIFO", "par priorité"], a: 1, e: "🚶🚶" },
      { q: "Complexité de la recherche dans un tableau non trié ?", c: ["O(1)", "O(log n)", "O(n)"], a: 2, e: "🔍" },
      { q: "25 en décimal s'écrit en binaire…", c: ["11001", "10101", "11010"], a: 0, e: "💾" },
      { q: "Quelle structure utilise un parcours en largeur (BFS) ?", c: ["Une pile", "Une file", "Un tas"], a: 1, e: "🕸️" },
    ],
    3: [
      { q: "Hauteur minimale d'un arbre binaire équilibré à n nœuds ?", c: ["O(log n)", "O(n)", "O(√n)"], a: 0, e: "🌳" },
      { q: "Complexité du tri à bulles dans le pire cas ?", c: ["O(n)", "O(n log n)", "O(n²)"], a: 2, e: "🫧" },
      { q: "Accès moyen dans une table de hachage ?", c: ["O(1)", "O(log n)", "O(n)"], a: 0, e: "#️⃣" },
      { q: "0x1F en hexadécimal vaut, en décimal…", c: ["15", "31", "47"], a: 1, e: "💾" },
    ],
  },
};

/* ---- Générateur de maths pour les classes adultes ---- */
const _genMathEnfants = genMath;
genMath = function (tier, diff) {
  if (!TIER_SUBJECTS[tier]) return _genMathEnfants(tier, diff);

  if (tier === "college") {
    if (diff === 1) {
      const a = _ri(-12, 12), b = _ri(-12, 12);
      const mc = _makeChoicesSigned(a + b, 4);
      return { q: `Combien font (${a}) + (${b}) ?`, c: mc.c, a: mc.a, e: "➕", subject: "math" };
    }
    if (diff === 2) {
      const a = _ri(-9, 9) || 3, b = _ri(-9, 9) || -4;
      const mc = _makeChoicesSigned(a * b, Math.max(3, Math.abs(a)));
      return { q: `Combien font (${a}) × (${b}) ?`, c: mc.c, a: mc.a, e: "✖️", subject: "math" };
    }
    const x = _ri(-9, 9), k = _ri(2, 6), b = _ri(-10, 10);
    const mc = _makeChoicesSigned(x, 3);
    return { q: `Si ${k}x ${b >= 0 ? "+ " + b : "− " + (-b)} = ${k * x + b}, que vaut x ?`, c: mc.c, a: mc.a, e: "❔", subject: "math" };
  }

  if (tier === "lycee") {
    if (diff === 1) {
      const a = _ri(2, 7), b = _ri(-9, 9), x = _ri(-5, 5);
      const mc = _makeChoicesSigned(a * x + b, 5);
      return { q: `f(x) = ${a}x ${b >= 0 ? "+ " + b : "− " + (-b)}. Que vaut f(${x}) ?`, c: mc.c, a: mc.a, e: "📈", subject: "math" };
    }
    if (diff === 2) {
      const a = _ri(2, 9);
      const good = `${2 * a}x`;
      const set = [good, `${a}x`, `${2 * a}x²`].sort(() => Math.random() - 0.5);
      return { q: `Quelle est la dérivée de ${a}x² ?`, c: set, a: set.indexOf(good), e: "📈", subject: "math" };
    }
    const u0 = _ri(-5, 8), r = _ri(2, 7), n = _ri(3, 8);
    const mc = _makeChoicesSigned(u0 + n * r, r);
    return { q: `Suite arithmétique : u₀ = ${u0}, raison ${r}. Que vaut u${"₀₁₂₃₄₅₆₇₈₉"[n]} ?`, c: mc.c, a: mc.a, e: "🔗", subject: "math" };
  }

  // superieur → algorithmique numérique
  if (diff === 1) {
    const n = _ri(5, 31);
    const mc = _makeChoicesSigned(n, 4);
    return { q: `${n.toString(2)} en binaire vaut, en décimal…`, c: mc.c, a: mc.a, e: "💾", subject: "math" };
  }
  if (diff === 2) {
    const a = _ri(10, 99), b = _ri(3, 9);
    const mc = _makeChoicesSigned(a % b, 3);
    return { q: `Que vaut ${a} mod ${b} ?`, c: mc.c, a: mc.a, e: "➗", subject: "math" };
  }
  const n = _ri(5, 31);
  const good = n.toString(2);
  const set = [...new Set([good, (n + 1).toString(2), (n + 2).toString(2), (n - 1).toString(2)])].slice(0, 3).sort(() => Math.random() - 0.5);
  return { q: `${n} en décimal s'écrit en binaire…`, c: set, a: set.indexOf(good), e: "💾", subject: "math" };
};

// Comme _makeChoices mais accepte les résultats négatifs
function _makeChoicesSigned(correct, spread) {
  const set = new Set([correct]);
  let guard = 0;
  while (set.size < 3 && guard++ < 60) {
    const d = correct + _ri(-spread, spread);
    if (d !== correct) set.add(d);
  }
  let k = 1;
  while (set.size < 3) { set.add(correct + k); k++; }
  const arr = [...set].sort(() => Math.random() - 0.5);
  return { c: arr.map(String), a: arr.indexOf(correct) };
}
