/* =====================================================================
   QUESTIONS SUPPLÉMENTAIRES (série 2)
   Même format que js/questions.js — fusionnées dans la banque au chargement.
   Pour ajouter vos propres questions, le plus simple est de les mettre ici !
   ===================================================================== */

const QUESTION_BANK_EXTRA = {

  maternelle: {
    math: {
      1: [
        { q: "Combien de roues a une voiture ?", c: ["2", "3", "4"], a: 2, e: "🚗" },
        { q: "Combien d'yeux as-tu ?", c: ["1", "2", "3"], a: 1, e: "👀" },
        { q: "Quelle forme a une part de pizza ?", c: ["Un rond", "Un triangle", "Un carré"], a: 1, e: "🍕" },
      ],
      2: [
        { q: "Quel nombre vient juste après 9 ?", c: ["8", "10", "11"], a: 1, e: "🔟" },
        { q: "Combien de doigts y a-t-il sur deux mains ?", c: ["5", "10", "20"], a: 1, e: "🙌" },
        { q: "Combien de pattes ont deux chiens ensemble ?", c: ["4", "6", "8"], a: 2, e: "🐶🐶" },
      ],
      3: [
        { q: "Combien font 2 + 2 ?", c: ["3", "4", "5"], a: 1, e: "➕" },
        { q: "Tu as 5 fraises et tu en manges 2. Combien en reste-t-il ?", c: ["2", "3", "4"], a: 1, e: "🍓🍓🍓🍓🍓" },
        { q: "Combien font 1 + 2 + 1 ?", c: ["3", "4", "5"], a: 1, e: "➕" },
      ],
    },
    francais: {
      1: [
        { q: "Par quelle lettre commence le mot BÉBÉ ?", c: ["B", "D", "P"], a: 0, e: "👶" },
        { q: "Trouve la lettre E !", c: ["F", "E", "L"], a: 1, e: "👀" },
        { q: "Quelle lettre fait le son « aaa » ?", c: ["A", "O", "U"], a: 0, e: "🔤" },
      ],
      2: [
        { q: "Quel mot rime avec SOURIS ?", c: ["Tapis", "Chat", "Lion"], a: 0, e: "🐭" },
        { q: "Par quelle lettre commence le mot TORTUE ?", c: ["D", "T", "F"], a: 1, e: "🐢" },
        { q: "Combien y a-t-il de lettres dans le mot CHAT ?", c: ["3", "4", "5"], a: 1, e: "🐱" },
      ],
      3: [
        { q: "LA et PIN, ensemble ça fait...", c: ["PINLA", "LAPIN", "LALA"], a: 1, e: "🐰" },
        { q: "Combien de syllabes dans TO-MA-TE ?", c: ["2", "3", "4"], a: 1, e: "🍅" },
        { q: "Trouve le mot ÉCOLE !", c: ["ÉTOILE", "ÉCOLE", "ÉPÉE"], a: 1, e: "🏫" },
      ],
    },
    sciences: {
      1: [
        { q: "Quel animal miaule ?", c: ["Le chat", "Le chien", "La vache"], a: 0, e: "🐱" },
        { q: "Que boit le bébé ?", c: ["Du café", "Du lait", "Du jus de citron"], a: 1, e: "🍼" },
        { q: "Quel animal sait voler ?", c: ["Le poisson", "L'oiseau", "Le lapin"], a: 1, e: "🐦" },
      ],
      2: [
        { q: "Quel animal porte sa maison sur son dos ?", c: ["L'escargot", "Le chat", "La fourmi"], a: 0, e: "🐌" },
        { q: "Quel fruit est jaune et tout courbé ?", c: ["La pomme", "La banane", "La cerise"], a: 1, e: "🍌" },
        { q: "Où poussent les pommes ?", c: ["Sous la terre", "Sur un arbre", "Dans l'eau"], a: 1, e: "🍎" },
      ],
      3: [
        { q: "Comment s'appelle le bébé du chien ?", c: ["Le chaton", "Le chiot", "Le poussin"], a: 1, e: "🐶" },
        { q: "Que fabrique l'abeille ?", c: ["Du miel", "Du lait", "Du pain"], a: 0, e: "🐝" },
        { q: "Quel animal peut changer de couleur ?", c: ["Le caméléon", "La poule", "Le mouton"], a: 0, e: "🦎" },
      ],
    },
    culture: {
      1: [
        { q: "De quelle couleur est la banane ?", c: ["Jaune", "Rouge", "Bleue"], a: 0, e: "🍌" },
        { q: "De quelle couleur est le chocolat ?", c: ["Vert", "Marron", "Rose"], a: 1, e: "🍫" },
        { q: "Si on mélange du rouge et du jaune, ça fait...", c: ["Du vert", "De l'orange", "Du violet"], a: 1, e: "🎨" },
      ],
      2: [
        { q: "Qui croque la pomme empoisonnée ?", c: ["Blanche-Neige", "Cendrillon", "Le Chaperon rouge"], a: 0, e: "🍎" },
        { q: "Quel animal tire le traîneau du Père Noël ?", c: ["Le cheval", "Le renne", "Le chien"], a: 1, e: "🦌" },
        { q: "Quel jour vient juste avant dimanche ?", c: ["Samedi", "Lundi", "Vendredi"], a: 0, e: "📅" },
      ],
      3: [
        { q: "Qui conduit l'avion ?", c: ["Le pilote", "Le capitaine de bateau", "Le chauffeur de bus"], a: 0, e: "✈️" },
        { q: "Qui prépare les croissants ?", c: ["Le boulanger", "Le facteur", "Le dentiste"], a: 0, e: "🥐" },
        { q: "Où vont les enfants pour apprendre à lire et compter ?", c: ["À la piscine", "À l'école", "Au cinéma"], a: 1, e: "🏫" },
      ],
    },
  },

  cp_ce1: {
    math: {
      1: [
        { q: "5 doigts + 5 doigts, ça fait...", c: ["8", "10", "12"], a: 1, e: "🙌" },
        { q: "Combien de côtés a un triangle ?", c: ["3", "4", "5"], a: 0, e: "🔺" },
        { q: "Paul a 6 images et il en donne 2. Combien lui en reste-t-il ?", c: ["3", "4", "5"], a: 1, e: "🖼️" },
      ],
      2: [
        { q: "Quel est le double de 7 ?", c: ["12", "14", "16"], a: 1, e: "✖️2" },
        { q: "Combien font 9 + 9 ?", c: ["16", "18", "20"], a: 1, e: "➕" },
        { q: "Combien de pattes ont 3 poules ?", c: ["3", "6", "9"], a: 1, e: "🐔🐔🐔" },
      ],
      3: [
        { q: "Combien font 25 + 25 ?", c: ["40", "50", "55"], a: 1, e: "➕" },
        { q: "Quel est le triple de 3 ?", c: ["6", "9", "12"], a: 1, e: "✖️3" },
        { q: "Deux semaines, c'est combien de jours ?", c: ["10", "14", "20"], a: 1, e: "📅" },
      ],
    },
    francais: {
      1: [
        { q: "Quel mot commence par une voyelle ?", c: ["Avion", "Bateau", "Camion"], a: 0, e: "✈️" },
        { q: "Dit-on UN ou UNE école ?", c: ["Un école", "Une école"], a: 1, e: "🏫" },
        { q: "Quelle est la première lettre de ZÈBRE ?", c: ["S", "Z", "J"], a: 1, e: "🦓" },
      ],
      2: [
        { q: "Quel est le contraire de OUVERT ?", c: ["Fermé", "Grand", "Cassé"], a: 0, e: "🚪" },
        { q: "Un oiseau, des...", c: ["oiseaus", "oiseaux", "oiseauls"], a: 1, e: "🐦🐦" },
        { q: "Quel groupe de mots est au pluriel ?", c: ["Le chat", "Les chats", "Un chat"], a: 1, e: "🐱🐱" },
      ],
      3: [
        { q: "Quel mot est bien écrit ?", c: ["élefan", "éléphant", "élephan"], a: 1, e: "🐘" },
        { q: "Quel est le contraire de PREMIER ?", c: ["Dernier", "Deuxième", "Suivant"], a: 0, e: "🏁" },
        { q: "Complète : Nous ___ à l'école.", c: ["allez", "allons", "vont"], a: 1, e: "🚶" },
      ],
    },
    sciences: {
      1: [
        { q: "Quel animal a 8 bras ?", c: ["La pieuvre", "Le crabe", "L'étoile de mer"], a: 0, e: "🐙" },
        { q: "Que faut-il pour faire pousser une graine ?", c: ["De l'eau", "Du sucre", "Du sel"], a: 0, e: "🌱" },
        { q: "Avec quoi goûte-t-on les aliments ?", c: ["Le nez", "La langue", "Les oreilles"], a: 1, e: "👅" },
      ],
      2: [
        { q: "Que voit-on dans le ciel quand il pleut et qu'il y a du soleil ?", c: ["Un arc-en-ciel", "Une étoile filante", "La Lune"], a: 0, e: "🌈" },
        { q: "Quel animal vit la nuit ?", c: ["La poule", "La chouette", "L'abeille"], a: 1, e: "🦉" },
        { q: "Que nous donne le mouton ?", c: ["De la laine", "Des plumes", "Du miel"], a: 0, e: "🐑" },
      ],
      3: [
        { q: "Qu'est-ce que l'aimant attire ?", c: ["Le bois", "Le fer", "Le plastique"], a: 1, e: "🧲" },
        { q: "Quel astre voit-on briller la nuit ?", c: ["Le Soleil", "La Lune", "L'arc-en-ciel"], a: 1, e: "🌙" },
        { q: "Avant de devenir grenouille, elle est d'abord un...", c: ["Têtard", "Poussin", "Asticot"], a: 0, e: "🐸" },
      ],
    },
    culture: {
      1: [
        { q: "Combien de couleurs y a-t-il dans un arc-en-ciel ?", c: ["5", "7", "9"], a: 1, e: "🌈" },
        { q: "Quel est le dernier mois de l'année ?", c: ["Novembre", "Décembre", "Janvier"], a: 1, e: "🗓️" },
        { q: "Quel jour la plupart des enfants ne vont-ils pas à l'école ?", c: ["Le mardi", "Le dimanche", "Le jeudi"], a: 1, e: "🏠" },
      ],
      2: [
        { q: "Quel sport se joue avec un ballon rond et les pieds ?", c: ["Le tennis", "Le football", "Le basket"], a: 1, e: "⚽" },
        { q: "Quel véhicule roule sur des rails ?", c: ["Le train", "Le bus", "Le vélo"], a: 0, e: "🚂" },
        { q: "Où vivent les manchots ?", c: ["Dans le désert", "Sur la banquise", "Dans la jungle"], a: 1, e: "🐧" },
      ],
      3: [
        { q: "Quelle fête nationale a lieu le 14 juillet en France ?", c: ["Noël", "La fête nationale", "Pâques"], a: 1, e: "🎆" },
        { q: "Quel instrument de musique a 6 cordes ?", c: ["Le piano", "La guitare", "La flûte"], a: 1, e: "🎸" },
        { q: "Comment s'appellent les habitants de la France ?", c: ["Les Franciens", "Les Français", "Les Francs"], a: 1, e: "🇫🇷" },
      ],
    },
  },

  ce2_cm1: {
    math: {
      1: [
        { q: "Lucie achète 2 croissants à 1 € chacun et paie avec 5 €. Combien lui rend-on ?", c: ["2 €", "3 €", "4 €"], a: 1, e: "🥐" },
        { q: "Combien y a-t-il de quarts d'heure dans une heure ?", c: ["2", "4", "6"], a: 1, e: "⏰" },
        { q: "Quel est le triple de 30 ?", c: ["60", "90", "120"], a: 1, e: "✖️3" },
      ],
      2: [
        { q: "Combien y a-t-il de grammes dans 1 kilogramme ?", c: ["100", "500", "1000"], a: 2, e: "⚖️" },
        { q: "Combien font 48 ÷ 6 ?", c: ["6", "8", "9"], a: 1, e: "➗" },
        { q: "Un rectangle a 2 côtés de 8 cm et 2 côtés de 3 cm. Quel est son périmètre ?", c: ["11 cm", "22 cm", "24 cm"], a: 1, e: "▭" },
      ],
      3: [
        { q: "Combien font 250 × 4 ?", c: ["750", "1000", "1250"], a: 1, e: "✖️" },
        { q: "Combien y a-t-il de secondes dans 2 minutes ?", c: ["60", "120", "200"], a: 1, e: "⏱️" },
        { q: "Combien font 7 × 8 − 6 ?", c: ["48", "50", "56"], a: 1, e: "🧮" },
      ],
    },
    francais: {
      1: [
        { q: "Quel est le féminin de DIRECTEUR ?", c: ["Directrice", "Directeure", "Directeuse"], a: 0, e: "🏫" },
        { q: "Quel mot est un déterminant ?", c: ["Les", "Manger", "Joli"], a: 0, e: "📖" },
        { q: "Quel est le pluriel de UN HIBOU ?", c: ["Des hibous", "Des hiboux", "Des hibouts"], a: 1, e: "🦉" },
      ],
      2: [
        { q: "Au présent : ils (finir) → ils...", c: ["finient", "finissent", "finissont"], a: 1, e: "✅" },
        { q: "Quel est le synonyme de CONTENT ?", c: ["Triste", "Joyeux", "Fatigué"], a: 1, e: "😄" },
        { q: "Complète : Ils ___ partis en vacances. (son / sont)", c: ["son", "sont"], a: 1, e: "🧳" },
      ],
      3: [
        { q: "À l'imparfait : je (faire) → je...", c: ["faisais", "ferai", "fais"], a: 0, e: "⏳" },
        { q: "Quel mot est invariable ?", c: ["Toujours", "Cheval", "Grande"], a: 0, e: "📌" },
        { q: "Quel est le contraire de COURAGEUX ?", c: ["Peureux", "Fort", "Rapide"], a: 0, e: "🦁" },
      ],
    },
    sciences: {
      1: [
        { q: "Quel sens utilise-t-on avec les oreilles ?", c: ["La vue", "L'ouïe", "L'odorat"], a: 1, e: "👂" },
        { q: "Les dents de lait tombent pour laisser la place aux dents...", c: ["définitives", "provisoires", "en bois"], a: 0, e: "🦷" },
        { q: "Quelle matière nous vient des arbres ?", c: ["Le verre", "Le bois", "Le métal"], a: 1, e: "🌳" },
      ],
      2: [
        { q: "Quel animal est un amphibien ?", c: ["La grenouille", "Le serpent", "La souris"], a: 0, e: "🐸" },
        { q: "Quel gaz rejetons-nous quand nous expirons ?", c: ["De l'oxygène", "Du dioxyde de carbone", "De l'hélium"], a: 1, e: "💨" },
        { q: "Avec quel instrument observe-t-on les étoiles ?", c: ["Un microscope", "Un télescope", "Une loupe"], a: 1, e: "🔭" },
      ],
      3: [
        { q: "Quelle est la source d'énergie d'un barrage hydraulique ?", c: ["Le vent", "L'eau", "Le charbon"], a: 1, e: "💧" },
        { q: "Quel organe contrôle tout le corps ?", c: ["Le cœur", "Le cerveau", "Les poumons"], a: 1, e: "🧠" },
        { q: "Grâce à quoi les plantes fabriquent-elles leur nourriture ?", c: ["La photosynthèse", "La digestion", "La respiration"], a: 0, e: "🌿☀️" },
      ],
    },
    culture: {
      1: [
        { q: "Quelle est la capitale de l'Angleterre ?", c: ["Manchester", "Londres", "Liverpool"], a: 1, e: "🇬🇧" },
        { q: "Quel océan sépare l'Europe de l'Amérique ?", c: ["Le Pacifique", "L'Atlantique", "L'océan Indien"], a: 1, e: "🌊" },
        { q: "Quel monument romain célèbre se trouve à Rome ?", c: ["Le Colisée", "La tour Eiffel", "Big Ben"], a: 0, e: "🏛️" },
      ],
      2: [
        { q: "Quel célèbre musée parisien abrite la Joconde ?", c: ["Le musée d'Orsay", "Le Louvre", "Le château de Versailles"], a: 1, e: "🖼️" },
        { q: "Quel pays a offert la statue de la Liberté aux États-Unis ?", c: ["L'Angleterre", "La France", "L'Italie"], a: 1, e: "🗽" },
        { q: "Dans quel pays mange-t-on traditionnellement des sushis ?", c: ["La Chine", "Le Japon", "La Thaïlande"], a: 1, e: "🍣" },
      ],
      3: [
        { q: "Qui a inventé l'imprimerie ?", c: ["Gutenberg", "Pasteur", "Edison"], a: 0, e: "📚" },
        { q: "Quelle période de l'histoire vient après le Moyen Âge ?", c: ["La Préhistoire", "La Renaissance", "L'Antiquité"], a: 1, e: "🏰" },
        { q: "Quel navigateur a traversé l'Atlantique en 1492 ?", c: ["Christophe Colomb", "Marco Polo", "Vasco de Gama"], a: 0, e: "⛵" },
      ],
    },
  },

  cm2: {
    math: {
      1: [
        { q: "Simplifie la fraction 2/4 :", c: ["1/2", "1/3", "2/2"], a: 0, e: "🍰" },
        { q: "Quel est le périmètre d'un carré de 9 cm de côté ?", c: ["18 cm", "36 cm", "81 cm"], a: 1, e: "🟦" },
        { q: "Combien font 1,5 + 1,5 ?", c: ["2,5", "3", "3,5"], a: 1, e: "➕" },
      ],
      2: [
        { q: "Combien font 10 % de 250 ?", c: ["25", "50", "10"], a: 0, e: "💯" },
        { q: "Combien font 3/4 de 40 ?", c: ["20", "30", "35"], a: 1, e: "➗" },
        { q: "Quelle est l'aire d'un carré de 6 cm de côté ?", c: ["24 cm²", "36 cm²", "12 cm²"], a: 1, e: "📐" },
      ],
      3: [
        { q: "Un robinet remplit 5 litres par minute. Combien de litres en 12 minutes ?", c: ["50 L", "60 L", "70 L"], a: 1, e: "🚰" },
        { q: "Un gâteau pour 4 personnes demande 200 g de farine. Pour 8 personnes ?", c: ["300 g", "400 g", "600 g"], a: 1, e: "🎂" },
        { q: "Combien font 180 ÷ 12 ?", c: ["12", "15", "18"], a: 1, e: "➗" },
      ],
    },
    francais: {
      1: [
        { q: "Complète : Ils rangent ___ jouets (il y en a plusieurs). (leur / leurs)", c: ["leur", "leurs"], a: 1, e: "🧸" },
        { q: "Quel est le radical du mot CHANTEUR ?", c: ["chant", "teur", "eur"], a: 0, e: "🎤" },
        { q: "Quelle phrase est exclamative ?", c: ["Quelle belle journée !", "Il fait beau.", "Fait-il beau ?"], a: 0, e: "❗" },
      ],
      2: [
        { q: "Au passé simple : il (voir) → il...", c: ["voyait", "vit", "verra"], a: 1, e: "👁️" },
        { q: "Quel mot est un pronom ?", c: ["Elle", "Table", "Rouge"], a: 0, e: "👩" },
        { q: "Quel est le synonyme de COMMENCER ?", c: ["Finir", "Débuter", "Arrêter"], a: 1, e: "🚦" },
      ],
      3: [
        { q: "Que signifie l'expression « avoir un chat dans la gorge » ?", c: ["Être enroué", "Avoir faim", "Avoir peur"], a: 0, e: "🐱" },
        { q: "Accord : les fleurs que j'ai (cueillir) → ...", c: ["cueilli", "cueillis", "cueillies"], a: 2, e: "💐" },
        { q: "Quel est le contraire d'AUGMENTER ?", c: ["Diminuer", "Monter", "Grandir"], a: 0, e: "📉" },
      ],
    },
    sciences: {
      1: [
        { q: "Combien de poumons avons-nous ?", c: ["1", "2", "4"], a: 1, e: "🫁" },
        { q: "Quel astre est au centre du système solaire ?", c: ["La Terre", "Le Soleil", "La Lune"], a: 1, e: "☀️" },
        { q: "À quelle température l'eau gèle-t-elle ?", c: ["0 °C", "10 °C", "100 °C"], a: 0, e: "🧊" },
      ],
      2: [
        { q: "Comment s'appelle le passage de l'état solide à l'état liquide ?", c: ["La fusion", "L'évaporation", "La congélation"], a: 0, e: "🫠" },
        { q: "Quelle planète est célèbre pour ses grands anneaux ?", c: ["Mars", "Saturne", "Mercure"], a: 1, e: "🪐" },
        { q: "Combien de temps met la Terre pour tourner sur elle-même ?", c: ["24 heures", "7 jours", "1 an"], a: 0, e: "🌍" },
      ],
      3: [
        { q: "Quelle scientifique a reçu deux prix Nobel ?", c: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace"], a: 0, e: "🔬" },
        { q: "Quel phénomène fait monter le niveau des mers ?", c: ["Le réchauffement climatique", "Les marées", "Le vent"], a: 0, e: "🌡️" },
        { q: "Quel est le plus grand mammifère du monde ?", c: ["L'éléphant", "La baleine bleue", "La girafe"], a: 1, e: "🐋" },
      ],
    },
    culture: {
      1: [
        { q: "Quelle est la capitale de la Russie ?", c: ["Saint-Pétersbourg", "Moscou", "Kiev"], a: 1, e: "🇷🇺" },
        { q: "Quel grand fleuve traverse l'Égypte ?", c: ["Le Nil", "L'Amazone", "Le Danube"], a: 0, e: "🐊" },
        { q: "Dans quel pays est née la démocratie dans l'Antiquité ?", c: ["L'Italie", "La Grèce", "L'Égypte"], a: 1, e: "🏛️" },
      ],
      2: [
        { q: "Quel mur célèbre est tombé en 1989 ?", c: ["Le mur de Berlin", "La muraille de Chine", "Le mur d'Hadrien"], a: 0, e: "🧱" },
        { q: "Qui a peint le plafond de la chapelle Sixtine ?", c: ["Michel-Ange", "Picasso", "Monet"], a: 0, e: "🎨" },
        { q: "Dans quel pays ont eu lieu les premiers Jeux olympiques modernes en 1896 ?", c: ["La France", "La Grèce", "L'Italie"], a: 1, e: "🏅" },
      ],
      3: [
        { q: "Qui était Gandhi ?", c: ["Un défenseur de la paix", "Un roi", "Un explorateur"], a: 0, e: "🕊️" },
        { q: "En quelle année l'être humain a-t-il marché sur la Lune pour la première fois ?", c: ["1959", "1969", "1979"], a: 1, e: "🌕" },
        { q: "Quelle organisation réunit presque tous les pays pour maintenir la paix ?", c: ["L'ONU", "La NASA", "L'UEFA"], a: 0, e: "🌐" },
      ],
    },
  },
};

// Fusionne la série 2 dans la banque principale
(function mergeExtraQuestions() {
  for (const tier in QUESTION_BANK_EXTRA) {
    for (const subject in QUESTION_BANK_EXTRA[tier]) {
      for (const diff in QUESTION_BANK_EXTRA[tier][subject]) {
        QUESTION_BANK[tier][subject][diff].push(...QUESTION_BANK_EXTRA[tier][subject][diff]);
      }
    }
  }
})();
