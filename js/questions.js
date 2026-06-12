/* =====================================================================
   BANQUE DE QUESTIONS
   4 classes (maternelle, cp_ce1, ce2_cm1, cm2)
   × 4 matières (math, francais, sciences, culture)
   × 3 difficultés (1, 2, 3)
   Format : { q: question, c: [choix...], a: index de la bonne réponse,
              e: emoji d'illustration (optionnel) }
   Les questions de math sont complétées par des questions générées
   aléatoirement (voir genMath plus bas) pour une variété infinie.
   ===================================================================== */

const QUESTION_BANK = {

  /* ==================== MATERNELLE (MS/GS) ==================== */
  maternelle: {
    math: {
      1: [
        { q: "Quelle forme a 3 côtés ?", c: ["Le rond", "Le triangle", "Le carré"], a: 1, e: "🔺" },
        { q: "Combien as-tu de mains ?", c: ["1", "2", "3"], a: 1, e: "🙌" },
        { q: "Lequel est le plus grand ?", c: ["La souris", "Le chat", "L'éléphant"], a: 2, e: "🐭🐱🐘" },
        { q: "Quelle forme est ronde ?", c: ["Le ballon", "Le livre", "La porte"], a: 0, e: "⚽" },
      ],
      2: [
        { q: "Quel nombre vient juste après 4 ?", c: ["3", "5", "6"], a: 1, e: "🔢" },
        { q: "Combien de doigts y a-t-il sur une main ?", c: ["4", "5", "10"], a: 1, e: "✋" },
        { q: "Quel est le plus petit nombre ?", c: ["5", "3", "1"], a: 2, e: "🔢" },
        { q: "Quelle forme a 4 côtés pareils ?", c: ["Le carré", "Le rond", "Le triangle"], a: 0, e: "🟦" },
      ],
      3: [
        { q: "Tu as 2 bonbons et on t'en donne 1. Combien en as-tu ?", c: ["2", "3", "4"], a: 1, e: "🍬🍬➕🍬" },
        { q: "Quel nombre vient juste avant 7 ?", c: ["6", "8", "5"], a: 0, e: "🔢" },
        { q: "Tu as 3 ballons et 1 s'envole. Combien en reste-t-il ?", c: ["1", "2", "3"], a: 1, e: "🎈🎈🎈" },
        { q: "Combien font 1 + 1 ?", c: ["1", "2", "3"], a: 1, e: "➕" },
      ],
    },
    francais: {
      1: [
        { q: "Quelle est la première lettre de l'alphabet ?", c: ["A", "B", "Z"], a: 0, e: "🔤" },
        { q: "Trouve la lettre O !", c: ["Q", "O", "C"], a: 1, e: "👀" },
        { q: "Par quelle lettre commence le mot MAMAN ?", c: ["N", "A", "M"], a: 2, e: "👩" },
        { q: "Quelle est la dernière lettre de l'alphabet ?", c: ["Y", "Z", "W"], a: 1, e: "🔤" },
        { q: "Quelle lettre fait le son SSSSS comme le serpent ?", c: ["S", "T", "B"], a: 0, e: "🐍" },
      ],
      2: [
        { q: "Quel mot rime avec CHAT ?", c: ["Chien", "Rat", "Lion"], a: 1, e: "🐱" },
        { q: "Quel mot rime avec BATEAU ?", c: ["Gâteau", "Voiture", "Avion"], a: 0, e: "⛵" },
        { q: "Par quelle lettre commence le mot PAPA ?", c: ["B", "P", "D"], a: 1, e: "👨" },
        { q: "Combien y a-t-il de lettres dans le mot BÉBÉ ?", c: ["3", "4", "5"], a: 1, e: "👶" },
        { q: "Quel mot commence comme SOLEIL ?", c: ["Serpent", "Maison", "Tortue"], a: 0, e: "☀️" },
      ],
      3: [
        { q: "CHA et TON, ensemble ça fait...", c: ["CHATON", "TONCHA", "CHACHA"], a: 0, e: "🐱" },
        { q: "MOU et TON, ensemble ça fait...", c: ["TONMOU", "MOUMOU", "MOUTON"], a: 2, e: "🐑" },
        { q: "Combien de syllabes dans PA-PI-LLON ?", c: ["2", "3", "4"], a: 1, e: "🦋" },
        { q: "Trouve le mot CHAT !", c: ["CHIEN", "CHAT", "CHOU"], a: 1, e: "🐱" },
        { q: "Combien de syllabes dans LA-PIN ?", c: ["1", "2", "3"], a: 1, e: "🐰" },
      ],
    },
    sciences: {
      1: [
        { q: "Que mange le lapin ?", c: ["Une carotte", "Un gâteau", "Du poisson"], a: 0, e: "🐰🥕" },
        { q: "Quel animal dit « Meuh » ?", c: ["Le mouton", "La vache", "Le cochon"], a: 1, e: "🐮" },
        { q: "Où vit le poisson ?", c: ["Dans l'eau", "Dans un arbre", "Sous la terre"], a: 0, e: "🐟" },
        { q: "De quoi a besoin une plante pour pousser ?", c: ["De bonbons", "D'eau et de soleil", "De jouets"], a: 1, e: "🌱" },
        { q: "Quel animal a une trompe ?", c: ["L'éléphant", "Le chat", "Le canard"], a: 0, e: "🐘" },
      ],
      2: [
        { q: "Combien de pattes a un chien ?", c: ["2", "4", "6"], a: 1, e: "🐶" },
        { q: "Comment s'appelle le bébé de la poule ?", c: ["Le poussin", "Le chaton", "Le chiot"], a: 0, e: "🐣" },
        { q: "Avec quoi sens-tu les odeurs ?", c: ["Les oreilles", "Le nez", "Les pieds"], a: 1, e: "👃" },
        { q: "En quelle saison les feuilles tombent-elles ?", c: ["En été", "En automne", "Au printemps"], a: 1, e: "🍂" },
        { q: "Quel animal pond des œufs ?", c: ["La poule", "Le chien", "La vache"], a: 0, e: "🥚" },
      ],
      3: [
        { q: "Comment s'appelle le bébé de la vache ?", c: ["Le poulain", "Le veau", "L'agneau"], a: 1, e: "🐄" },
        { q: "Que devient la chenille ?", c: ["Un papillon", "Une abeille", "Un escargot"], a: 0, e: "🐛🦋" },
        { q: "Combien de pattes a une araignée ?", c: ["6", "8", "10"], a: 1, e: "🕷️" },
        { q: "Quel animal dort presque tout l'hiver ?", c: ["L'ours", "Le chien", "La poule"], a: 0, e: "🐻" },
        { q: "D'où vient le lait ?", c: ["De la vache", "Du robinet", "Des arbres"], a: 0, e: "🥛" },
      ],
    },
    culture: {
      1: [
        { q: "De quelle couleur est le soleil ?", c: ["Bleu", "Jaune", "Vert"], a: 1, e: "☀️" },
        { q: "De quelle couleur est l'herbe ?", c: ["Verte", "Rouge", "Noire"], a: 0, e: "🌿" },
        { q: "De quelle couleur est le ciel quand il fait beau ?", c: ["Gris", "Rose", "Bleu"], a: 2, e: "🌤️" },
        { q: "De quelle couleur est une fraise ?", c: ["Rouge", "Bleue", "Jaune"], a: 0, e: "🍓" },
        { q: "Si on mélange du bleu et du jaune, ça fait...", c: ["Du rouge", "Du vert", "Du noir"], a: 1, e: "🎨" },
      ],
      2: [
        { q: "Qui souffle sur la maison des trois petits cochons ?", c: ["Le loup", "L'ours", "Le renard"], a: 0, e: "🐺🐷" },
        { q: "Qui a perdu sa pantoufle au bal ?", c: ["Blanche-Neige", "Cendrillon", "La Belle au bois dormant"], a: 1, e: "👠" },
        { q: "Combien y a-t-il de jours dans une semaine ?", c: ["5", "7", "10"], a: 1, e: "📅" },
        { q: "Quel jour vient après lundi ?", c: ["Mercredi", "Mardi", "Dimanche"], a: 1, e: "📅" },
        { q: "Que porte le Petit Chaperon rouge ?", c: ["Une cape rouge", "Un chapeau bleu", "Des bottes vertes"], a: 0, e: "🧺" },
      ],
      3: [
        { q: "Qui éteint les incendies ?", c: ["Le boulanger", "Le pompier", "Le facteur"], a: 1, e: "🚒" },
        { q: "Qui soigne les malades ?", c: ["Le docteur", "Le jardinier", "Le pilote"], a: 0, e: "🩺" },
        { q: "Où achète-t-on le pain ?", c: ["À la piscine", "À la boulangerie", "À l'école"], a: 1, e: "🥖" },
        { q: "Qui t'apprend à lire à l'école ?", c: ["Le maître ou la maîtresse", "Le dentiste", "Le pompier"], a: 0, e: "🏫" },
        { q: "Quelle est la saison la plus chaude ?", c: ["L'hiver", "L'été", "L'automne"], a: 1, e: "🌞" },
      ],
    },
  },

  /* ==================== CP – CE1 ==================== */
  cp_ce1: {
    math: {
      1: [
        { q: "Léa a 4 billes et elle en gagne 3. Combien en a-t-elle ?", c: ["6", "7", "8"], a: 1, e: "🔵" },
        { q: "Quel est le double de 4 ?", c: ["6", "8", "10"], a: 1, e: "✖️2" },
        { q: "Quel nombre vient juste après 19 ?", c: ["18", "20", "21"], a: 1, e: "🔢" },
        { q: "Combien de côtés a un carré ?", c: ["3", "4", "5"], a: 1, e: "🟦" },
      ],
      2: [
        { q: "Quel est le double de 6 ?", c: ["10", "12", "14"], a: 1, e: "✖️2" },
        { q: "Quelle est la moitié de 10 ?", c: ["4", "5", "6"], a: 1, e: "➗" },
        { q: "Tom a 12 bonbons, il en mange 4. Combien en reste-t-il ?", c: ["6", "8", "9"], a: 1, e: "🍬" },
        { q: "Quelle heure est-il quand la grande aiguille est sur le 12 et la petite sur le 3 ?", c: ["3 heures", "12 heures", "6 heures"], a: 0, e: "🕒" },
      ],
      3: [
        { q: "Combien font 5 + 5 + 5 ?", c: ["10", "15", "20"], a: 1, e: "➕" },
        { q: "Quelle est la moitié de 20 ?", c: ["5", "10", "15"], a: 1, e: "➗" },
        { q: "Combien y a-t-il de centimes dans 1 euro ?", c: ["10", "50", "100"], a: 2, e: "💶" },
        { q: "Un sac contient 10 billes. Combien de billes dans 3 sacs ?", c: ["13", "30", "33"], a: 1, e: "🎒" },
      ],
    },
    francais: {
      1: [
        { q: "Quelle lettre est une voyelle ?", c: ["B", "A", "T"], a: 1, e: "🔤" },
        { q: "Quel mot désigne un animal ?", c: ["Le lapin", "La table", "Le livre"], a: 0, e: "🐰" },
        { q: "Quelle lettre vient juste après B ?", c: ["A", "C", "D"], a: 1, e: "🔤" },
        { q: "Dit-on UN ou UNE maison ?", c: ["Un maison", "Une maison"], a: 1, e: "🏠" },
        { q: "Comment dit-on ? ", c: ["Le chat", "La chat"], a: 0, e: "🐱" },
      ],
      2: [
        { q: "Quel est le contraire de GRAND ?", c: ["Énorme", "Petit", "Long"], a: 1, e: "↕️" },
        { q: "Un chat, des... ?", c: ["chat", "chats", "chates"], a: 1, e: "🐱🐱" },
        { q: "Quel mot rime avec MAISON ?", c: ["Chanson", "Jardin", "École"], a: 0, e: "🏠" },
        { q: "Quel est le contraire de JOUR ?", c: ["Matin", "Soir", "Nuit"], a: 2, e: "🌙" },
        { q: "Quelle phrase est bien écrite ?", c: ["je mange une pomme", "Je mange une pomme.", "Je mange une pomme"], a: 1, e: "✍️" },
      ],
      3: [
        { q: "Un cheval, des... ?", c: ["chevals", "chevaux", "chevales"], a: 1, e: "🐴🐴" },
        { q: "Quel est le contraire de MONTER ?", c: ["Descendre", "Grimper", "Sauter"], a: 0, e: "⬇️" },
        { q: "Quel mot est un verbe ?", c: ["Manger", "Pomme", "Rouge"], a: 0, e: "🍽️" },
        { q: "Complète : Hier, j'ai ___ au parc.", c: ["joué", "jouer", "joue"], a: 0, e: "🛝" },
        { q: "Quel mot est bien écrit ?", c: ["oizo", "oiseau", "oisau"], a: 1, e: "🐦" },
      ],
    },
    sciences: {
      1: [
        { q: "Qu'est-ce qui est vivant ?", c: ["Un caillou", "Une fleur", "Une voiture"], a: 1, e: "🌸" },
        { q: "Combien de sens avons-nous (vue, ouïe...) ?", c: ["3", "5", "7"], a: 1, e: "👁️👂👃" },
        { q: "Avec quoi entend-on ?", c: ["Les yeux", "Les oreilles", "Le nez"], a: 1, e: "👂" },
        { q: "Quel petit animal est un insecte ?", c: ["La coccinelle", "La souris", "Le lézard"], a: 0, e: "🐞" },
        { q: "L'eau de la mer est...", c: ["Sucrée", "Salée", "Sans goût"], a: 1, e: "🌊" },
      ],
      2: [
        { q: "Combien y a-t-il de saisons dans l'année ?", c: ["2", "4", "6"], a: 1, e: "🍂❄️🌸☀️" },
        { q: "Quel animal est un mammifère ?", c: ["Le chien", "Le poisson rouge", "La mouche"], a: 0, e: "🐶" },
        { q: "Que mange un animal herbivore ?", c: ["De la viande", "Des plantes", "De tout"], a: 1, e: "🌿" },
        { q: "Qui fabrique le miel ?", c: ["Les fourmis", "Les abeilles", "Les papillons"], a: 1, e: "🍯" },
        { q: "Quel astre nous éclaire le jour ?", c: ["La Lune", "Le Soleil", "Les étoiles"], a: 1, e: "☀️" },
      ],
      3: [
        { q: "Que devient l'eau quand elle gèle ?", c: ["De la glace", "De la vapeur", "Du sable"], a: 0, e: "🧊" },
        { q: "Combien de pattes a un insecte ?", c: ["4", "6", "8"], a: 1, e: "🐜" },
        { q: "Quel animal pond des œufs ?", c: ["La tortue", "Le chat", "La vache"], a: 0, e: "🐢" },
        { q: "Quel organe bat dans ta poitrine ?", c: ["Le cerveau", "Le cœur", "L'estomac"], a: 1, e: "❤️" },
        { q: "La Terre tourne autour...", c: ["De la Lune", "Du Soleil", "De Mars"], a: 1, e: "🌍" },
      ],
    },
    culture: {
      1: [
        { q: "Quelle est la capitale de la France ?", c: ["Lyon", "Paris", "Marseille"], a: 1, e: "🇫🇷" },
        { q: "Quel jour vient après mercredi ?", c: ["Mardi", "Jeudi", "Samedi"], a: 1, e: "📅" },
        { q: "Combien y a-t-il de mois dans une année ?", c: ["10", "12", "14"], a: 1, e: "🗓️" },
        { q: "Quelles sont les couleurs du drapeau français ?", c: ["Bleu, blanc, rouge", "Vert, blanc, rouge", "Bleu, jaune, rouge"], a: 0, e: "🇫🇷" },
        { q: "Quel mois vient après janvier ?", c: ["Mars", "Février", "Décembre"], a: 1, e: "🗓️" },
      ],
      2: [
        { q: "Sur quel continent se trouve la France ?", c: ["L'Afrique", "L'Europe", "L'Asie"], a: 1, e: "🌍" },
        { q: "Quel animal est le symbole de la France ?", c: ["Le coq", "L'aigle", "Le lion"], a: 0, e: "🐓" },
        { q: "Quelle fête a lieu le 25 décembre ?", c: ["Pâques", "Noël", "Le 14 Juillet"], a: 1, e: "🎄" },
        { q: "Comment s'appelle notre planète ?", c: ["Mars", "La Lune", "La Terre"], a: 2, e: "🌍" },
        { q: "Quel est le premier mois de l'année ?", c: ["Janvier", "Mars", "Septembre"], a: 0, e: "🎆" },
      ],
      3: [
        { q: "Quelle est la monnaie utilisée en France ?", c: ["Le dollar", "L'euro", "La livre"], a: 1, e: "💶" },
        { q: "Quelle tour célèbre se trouve à Paris ?", c: ["La tour de Pise", "La tour Eiffel", "Big Ben"], a: 1, e: "🗼" },
        { q: "Quel instrument a des touches noires et blanches ?", c: ["La guitare", "Le piano", "Le tambour"], a: 1, e: "🎹" },
        { q: "Dans quel pays se trouve Londres ?", c: ["En Espagne", "En Angleterre", "En Italie"], a: 1, e: "🇬🇧" },
        { q: "Quelle saison commence en décembre ?", c: ["L'été", "L'hiver", "Le printemps"], a: 1, e: "⛄" },
      ],
    },
  },

  /* ==================== CE2 – CM1 ==================== */
  ce2_cm1: {
    math: {
      1: [
        { q: "Un livre coûte 8 €. Combien coûtent 3 livres ?", c: ["21 €", "24 €", "27 €"], a: 1, e: "📚" },
        { q: "Quel est le périmètre d'un carré de 5 cm de côté ?", c: ["15 cm", "20 cm", "25 cm"], a: 1, e: "🟦" },
        { q: "Combien font 100 + 250 ?", c: ["300", "350", "450"], a: 1, e: "➕" },
        { q: "Combien font 9 × 3 ?", c: ["24", "27", "30"], a: 1, e: "✖️" },
      ],
      2: [
        { q: "Combien y a-t-il de minutes dans une heure ?", c: ["30", "60", "100"], a: 1, e: "⏰" },
        { q: "Combien y a-t-il de centimètres dans 1 mètre ?", c: ["10", "100", "1000"], a: 1, e: "📏" },
        { q: "Quelle est la moitié de 50 ?", c: ["20", "25", "30"], a: 1, e: "➗" },
        { q: "Un car a 4 rangées de 6 enfants. Combien d'enfants en tout ?", c: ["10", "24", "46"], a: 1, e: "🚌" },
      ],
      3: [
        { q: "Combien de minutes dans une heure et demie ?", c: ["75", "90", "120"], a: 1, e: "⏰" },
        { q: "Quel est le quart de 100 ?", c: ["20", "25", "50"], a: 1, e: "➗" },
        { q: "Combien y a-t-il de mètres dans 1 kilomètre ?", c: ["100", "500", "1000"], a: 2, e: "📏" },
        { q: "Je pars à 8h00 et je marche 30 minutes. J'arrive à...", c: ["8h30", "9h00", "8h15"], a: 0, e: "🚶" },
      ],
    },
    francais: {
      1: [
        { q: "Quel mot est un verbe ?", c: ["Courir", "Vélo", "Bleu"], a: 0, e: "🏃" },
        { q: "Quel est le féminin de LION ?", c: ["Lione", "Lionne", "Lionnesse"], a: 1, e: "🦁" },
        { q: "Dans « Le chien aboie », qui est le sujet ?", c: ["aboie", "Le chien", "Le"], a: 1, e: "🐶" },
        { q: "Complète : Le chat ___ noir. (et / est)", c: ["et", "est"], a: 1, e: "🐱" },
        { q: "Quel est le pluriel de JOURNAL ?", c: ["Journals", "Journaux", "Journales"], a: 1, e: "📰" },
      ],
      2: [
        { q: "Conjugue : nous (chanter) → nous...", c: ["chantons", "chantez", "chantent"], a: 0, e: "🎤" },
        { q: "Quel est le synonyme de JOLI ?", c: ["Laid", "Beau", "Grand"], a: 1, e: "✨" },
        { q: "Quel est le contraire de RAPIDE ?", c: ["Vite", "Lent", "Pressé"], a: 1, e: "🐢" },
        { q: "Complète : Il ___ un vélo rouge. (a / à)", c: ["a", "à"], a: 0, e: "🚲" },
        { q: "Quel mot est un adjectif ?", c: ["Rouge", "Manger", "Maison"], a: 0, e: "🔴" },
      ],
      3: [
        { q: "Au futur : demain, je (manger) → je...", c: ["mange", "mangeais", "mangerai"], a: 2, e: "🍽️" },
        { q: "Quel est l'infinitif de « nous prenons » ?", c: ["Prener", "Prendre", "Prenir"], a: 1, e: "📖" },
        { q: "Complète : Ils ___ très faim. (on / ont)", c: ["on", "ont"], a: 1, e: "😋" },
        { q: "À quel temps est « je jouais » ?", c: ["Le présent", "L'imparfait", "Le futur"], a: 1, e: "⏳" },
        { q: "Combien de syllabes dans OR-DI-NA-TEUR ?", c: ["3", "4", "5"], a: 1, e: "💻" },
      ],
    },
    sciences: {
      1: [
        { q: "Quels sont les 3 états de l'eau ?", c: ["Solide, liquide, gazeux", "Chaud, froid, tiède", "Mer, lac, rivière"], a: 0, e: "💧🧊💨" },
        { q: "Comment s'appelle l'eau à l'état solide ?", c: ["La vapeur", "La glace", "La pluie"], a: 1, e: "🧊" },
        { q: "Quel organe nous permet de respirer ?", c: ["Les poumons", "L'estomac", "Le foie"], a: 0, e: "🫁" },
        { q: "Sur quelle planète habitons-nous ?", c: ["Mars", "La Terre", "Vénus"], a: 1, e: "🌍" },
        { q: "Que produit un panneau solaire ?", c: ["De l'eau", "De l'électricité", "Du vent"], a: 1, e: "☀️🔋" },
      ],
      2: [
        { q: "Combien de planètes compte le système solaire ?", c: ["7", "8", "9"], a: 1, e: "🪐" },
        { q: "Quelle est l'étoile la plus proche de la Terre ?", c: ["La Lune", "Le Soleil", "Mars"], a: 1, e: "☀️" },
        { q: "Que mange un animal carnivore ?", c: ["Des plantes", "De la viande", "Des fruits"], a: 1, e: "🦁" },
        { q: "À quelle température l'eau bout-elle ?", c: ["50 °C", "100 °C", "200 °C"], a: 1, e: "♨️" },
        { q: "Quel animal est un reptile ?", c: ["Le lézard", "La grenouille", "Le pigeon"], a: 0, e: "🦎" },
      ],
      3: [
        { q: "Combien d'os y a-t-il environ dans le corps humain ?", c: ["106", "206", "306"], a: 1, e: "🦴" },
        { q: "Quelle planète est la plus proche du Soleil ?", c: ["Mercure", "Vénus", "Mars"], a: 0, e: "☀️" },
        { q: "Quelle force nous attire vers le sol ?", c: ["Le magnétisme", "La gravité", "L'électricité"], a: 1, e: "🍎⬇️" },
        { q: "En combien de temps la Terre fait-elle le tour du Soleil ?", c: ["Un jour", "Un mois", "Un an"], a: 2, e: "🌍" },
        { q: "Comment s'appelle la transformation de l'eau en vapeur ?", c: ["La fusion", "L'évaporation", "La congélation"], a: 1, e: "💨" },
      ],
    },
    culture: {
      1: [
        { q: "Quelle est la capitale de l'Italie ?", c: ["Milan", "Rome", "Venise"], a: 1, e: "🇮🇹" },
        { q: "Quel fleuve traverse Paris ?", c: ["La Loire", "La Seine", "Le Rhône"], a: 1, e: "🌉" },
        { q: "Quelle mer borde le sud de la France ?", c: ["La Méditerranée", "La mer du Nord", "La Manche"], a: 0, e: "🏖️" },
        { q: "Dans quel pays se trouvent les grandes pyramides ?", c: ["Le Maroc", "L'Égypte", "La Grèce"], a: 1, e: "🔺" },
        { q: "Quelle est la capitale de l'Espagne ?", c: ["Barcelone", "Madrid", "Séville"], a: 1, e: "🇪🇸" },
      ],
      2: [
        { q: "Qui a peint la Joconde ?", c: ["Picasso", "Léonard de Vinci", "Van Gogh"], a: 1, e: "🖼️" },
        { q: "Quelle est la plus haute montagne de France ?", c: ["Le mont Blanc", "Le puy de Dôme", "Le Ventoux"], a: 0, e: "🏔️" },
        { q: "Quel roi a fait construire le château de Versailles ?", c: ["Louis XIV", "Napoléon", "François Ier"], a: 0, e: "👑" },
        { q: "Quel pays a la forme d'une botte ?", c: ["L'Espagne", "L'Italie", "La Grèce"], a: 1, e: "🥾" },
        { q: "Dans quelle grotte célèbre trouve-t-on des peintures préhistoriques ?", c: ["Lascaux", "Versailles", "Chambord"], a: 0, e: "🦬" },
      ],
      3: [
        { q: "En quelle année a eu lieu la Révolution française ?", c: ["1689", "1789", "1889"], a: 1, e: "🇫🇷" },
        { q: "Qui était Napoléon Bonaparte ?", c: ["Un empereur", "Un peintre", "Un chanteur"], a: 0, e: "👑" },
        { q: "Quel est le plus long fleuve de France ?", c: ["La Seine", "La Loire", "La Garonne"], a: 1, e: "🏞️" },
        { q: "Quelle est la capitale du Japon ?", c: ["Pékin", "Séoul", "Tokyo"], a: 2, e: "🇯🇵" },
        { q: "Qui a écrit la fable « Le Corbeau et le Renard » ?", c: ["Jean de La Fontaine", "Victor Hugo", "Charles Perrault"], a: 0, e: "🦊" },
      ],
    },
  },

  /* ==================== CM2 ==================== */
  cm2: {
    math: {
      1: [
        { q: "Combien font 12 × 10 ?", c: ["112", "120", "1200"], a: 1, e: "✖️" },
        { q: "Quelle fraction représente la moitié ?", c: ["1/4", "1/2", "1/3"], a: 1, e: "🍕" },
        { q: "Périmètre d'un rectangle de 6 cm sur 4 cm ?", c: ["10 cm", "20 cm", "24 cm"], a: 1, e: "▭" },
        { q: "3/4 d'heure, c'est combien de minutes ?", c: ["30", "45", "60"], a: 1, e: "⏰" },
      ],
      2: [
        { q: "Aire d'un rectangle de 7 cm sur 5 cm ?", c: ["24 cm²", "35 cm²", "12 cm²"], a: 1, e: "▭" },
        { q: "Combien font 1/4 de 80 ?", c: ["20", "25", "40"], a: 0, e: "➗" },
        { q: "Combien font 2,5 + 2,5 ?", c: ["4,5", "5", "5,5"], a: 1, e: "➕" },
        { q: "Combien font 15 % de 100 ?", c: ["1,5", "15", "150"], a: 1, e: "💯" },
      ],
      3: [
        { q: "Si 3 stylos coûtent 6 €, combien coûtent 5 stylos ?", c: ["8 €", "10 €", "12 €"], a: 1, e: "🖊️" },
        { q: "Quelle est la moyenne de 10, 20 et 30 ?", c: ["15", "20", "25"], a: 1, e: "📊" },
        { q: "Comment lit-on 1 000 000 ?", c: ["Cent mille", "Un million", "Un milliard"], a: 1, e: "🔢" },
        { q: "Comment s'appelle un triangle qui a un angle droit ?", c: ["Triangle isocèle", "Triangle rectangle", "Triangle équilatéral"], a: 1, e: "📐" },
      ],
    },
    francais: {
      1: [
        { q: "Complète : ___ vas-tu ? (ou / où)", c: ["Ou", "Où"], a: 1, e: "🧭" },
        { q: "Dans « Je mange une pomme », quel est le COD ?", c: ["Je", "mange", "une pomme"], a: 2, e: "🍎" },
        { q: "Au passé composé : j'ai (finir) → j'ai...", c: ["fini", "finit", "finis"], a: 0, e: "✅" },
        { q: "Quel est le pluriel de UN BIJOU ?", c: ["Des bijous", "Des bijoux", "Des bijoues"], a: 1, e: "💎" },
        { q: "Quelle est la nature du mot RAPIDEMENT ?", c: ["Un adjectif", "Un adverbe", "Un verbe"], a: 1, e: "🏃" },
      ],
      2: [
        { q: "À l'imparfait : nous (être) → nous...", c: ["étions", "étaient", "serons"], a: 0, e: "⏳" },
        { q: "Complète : Il range ___ affaires (les siennes). (ses / ces)", c: ["ses", "ces"], a: 0, e: "🎒" },
        { q: "Dans « Demain, les enfants iront à la piscine », quel est le sujet ?", c: ["Demain", "Les enfants", "La piscine"], a: 1, e: "🏊" },
        { q: "Quel est le contraire de GÉNÉREUX ?", c: ["Gentil", "Égoïste", "Poli"], a: 1, e: "🎁" },
        { q: "Quelle phrase est interrogative ?", c: ["Viens ici !", "Viens-tu ?", "Je viens."], a: 1, e: "❓" },
      ],
      3: [
        { q: "Au futur : ils (aller) → ils...", c: ["allaient", "iront", "vont"], a: 1, e: "🔮" },
        { q: "De quel groupe est le verbe FINIR ?", c: ["1er groupe", "2e groupe", "3e groupe"], a: 1, e: "📚" },
        { q: "Au conditionnel : je (vouloir) → je...", c: ["voudrai", "voudrais", "voulais"], a: 1, e: "🙏" },
        { q: "« Il est fort comme un lion » est...", c: ["Une comparaison", "Une question", "Un proverbe"], a: 0, e: "🦁" },
        { q: "Accord : elles sont (partir) → elles sont...", c: ["parti", "partis", "parties"], a: 2, e: "👭" },
      ],
    },
    sciences: {
      1: [
        { q: "Quel organe digère les aliments ?", c: ["L'estomac", "Le cœur", "Les poumons"], a: 0, e: "🍽️" },
        { q: "Quelle planète est surnommée « la planète rouge » ?", c: ["Vénus", "Mars", "Jupiter"], a: 1, e: "🔴" },
        { q: "Que mesure un thermomètre ?", c: ["Le vent", "La température", "La pluie"], a: 1, e: "🌡️" },
        { q: "Quel est le plus grand organe du corps humain ?", c: ["Le foie", "La peau", "Le cerveau"], a: 1, e: "🧴" },
        { q: "Quel gaz les plantes rejettent-elles le jour ?", c: ["L'oxygène", "Le dioxyde de carbone", "L'hélium"], a: 0, e: "🌿" },
      ],
      2: [
        { q: "Comment s'appelle le voyage de l'eau dans la nature ?", c: ["Le cycle de l'eau", "La marée", "Le courant"], a: 0, e: "🌧️" },
        { q: "Quel est le satellite naturel de la Terre ?", c: ["Le Soleil", "La Lune", "Mars"], a: 1, e: "🌕" },
        { q: "Comment s'appellent les animaux sans squelette interne ?", c: ["Les vertébrés", "Les invertébrés", "Les mammifères"], a: 1, e: "🐌" },
        { q: "Quelle énergie une éolienne utilise-t-elle ?", c: ["Le vent", "Le soleil", "L'eau"], a: 0, e: "💨" },
        { q: "Quel savant a expliqué la gravitation ?", c: ["Newton", "Mozart", "Picasso"], a: 0, e: "🍎" },
      ],
      3: [
        { q: "Quelle est la plus grande planète du système solaire ?", c: ["Saturne", "Jupiter", "Neptune"], a: 1, e: "🪐" },
        { q: "Quelle est la formule chimique de l'eau ?", c: ["CO2", "H2O", "O2"], a: 1, e: "💧" },
        { q: "Quels organes filtrent le sang ?", c: ["Les poumons", "Les reins", "Les muscles"], a: 1, e: "🩸" },
        { q: "Qui a inventé le vaccin contre la rage ?", c: ["Pasteur", "Curie", "Einstein"], a: 0, e: "💉" },
        { q: "Comment appelle-t-on un animal qui mange plantes ET viande ?", c: ["Herbivore", "Carnivore", "Omnivore"], a: 2, e: "🐻" },
      ],
    },
    culture: {
      1: [
        { q: "Comment surnommait-on Louis XIV ?", c: ["Le Roi-Soleil", "Le Roi-Lune", "Le Petit Roi"], a: 0, e: "👑" },
        { q: "Quelle est la capitale de l'Allemagne ?", c: ["Munich", "Berlin", "Hambourg"], a: 1, e: "🇩🇪" },
        { q: "Quel est le plus grand désert chaud du monde ?", c: ["Le Gobi", "Le Sahara", "L'Atacama"], a: 1, e: "🏜️" },
        { q: "Combien d'étoiles y a-t-il sur le drapeau européen ?", c: ["10", "12", "27"], a: 1, e: "🇪🇺" },
        { q: "Sur quel continent se trouve l'Égypte ?", c: ["L'Asie", "L'Afrique", "L'Europe"], a: 1, e: "🐪" },
      ],
      2: [
        { q: "En quelle année a commencé la Première Guerre mondiale ?", c: ["1904", "1914", "1924"], a: 1, e: "🕊️" },
        { q: "Qui a écrit « Les Misérables » ?", c: ["Victor Hugo", "Jules Verne", "Molière"], a: 0, e: "📖" },
        { q: "Quelle est la capitale des États-Unis ?", c: ["New York", "Washington", "Los Angeles"], a: 1, e: "🇺🇸" },
        { q: "Qui a été le premier homme à marcher sur la Lune ?", c: ["Neil Armstrong", "Thomas Pesquet", "Youri Gagarine"], a: 0, e: "🌕" },
        { q: "Quelle est la devise de la France ?", c: ["Liberté, Égalité, Fraternité", "Paix, Amour, Joie", "Force, Honneur, Patrie"], a: 0, e: "🇫🇷" },
      ],
      3: [
        { q: "En quelle année s'est terminée la Seconde Guerre mondiale ?", c: ["1935", "1945", "1955"], a: 1, e: "🕊️" },
        { q: "Qui a été couronné empereur en l'an 800 ?", c: ["Charlemagne", "Jules César", "Louis XVI"], a: 0, e: "👑" },
        { q: "Quelle est la plus haute montagne du monde ?", c: ["Le mont Blanc", "L'Everest", "Le Kilimandjaro"], a: 1, e: "🏔️" },
        { q: "Quel compositeur célèbre est devenu sourd ?", c: ["Mozart", "Beethoven", "Vivaldi"], a: 1, e: "🎼" },
        { q: "Combien de pays compte l'Union européenne ?", c: ["12", "27", "50"], a: 1, e: "🇪🇺" },
      ],
    },
  },
};

/* =====================================================================
   GÉNÉRATEUR DE QUESTIONS DE MATHS (variété infinie)
   ===================================================================== */
const COUNT_EMOJIS = ["🍎", "⭐", "🐟", "🎈", "🌸", "🚗", "🐞", "🍪"];

function _ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function _makeChoices(correct, spread) {
  // Crée 3 choix : la bonne réponse + 2 distracteurs proches, mélangés
  const set = new Set([correct]);
  let guard = 0;
  while (set.size < 3 && guard++ < 60) {
    let d = correct + _ri(-spread, spread);
    if (d !== correct && d >= 0) set.add(d);
  }
  // au cas où (correct = 0 et spread petit)
  let k = 1;
  while (set.size < 3) { set.add(correct + k); k++; }
  const arr = [...set].sort(() => Math.random() - 0.5);
  return { c: arr.map(String), a: arr.indexOf(correct) };
}

function genMath(tier, diff) {
  let q, e = "", correct, spread = 2;

  if (tier === "maternelle") {
    const emo = COUNT_EMOJIS[_ri(0, COUNT_EMOJIS.length - 1)];
    if (diff === 1) {
      correct = _ri(1, 5);
      q = "Compte bien : combien y en a-t-il ?";
      e = emo.repeat(correct);
    } else if (diff === 2) {
      correct = _ri(4, 10);
      q = "Compte bien : combien y en a-t-il ?";
      e = emo.repeat(correct);
      spread = 2;
    } else {
      const a = _ri(1, 3), b = _ri(1, 3);
      correct = a + b;
      q = `Combien font ${a} + ${b} ?`;
      e = emo.repeat(a) + " ➕ " + emo.repeat(b);
    }
  }

  else if (tier === "cp_ce1") {
    if (diff === 1) {
      const a = _ri(1, 5), b = _ri(1, 5);
      correct = a + b;
      q = `Combien font ${a} + ${b} ?`;
      e = "➕";
    } else if (diff === 2) {
      if (Math.random() < 0.5) {
        const a = _ri(5, 15), b = _ri(1, 5);
        correct = a + b; q = `Combien font ${a} + ${b} ?`; e = "➕";
      } else {
        const a = _ri(5, 10), b = _ri(1, a - 1);
        correct = a - b; q = `Combien font ${a} − ${b} ?`; e = "➖";
      }
    } else {
      if (Math.random() < 0.5) {
        const a = _ri(10, 60), b = _ri(10, 39);
        correct = a + b; q = `Combien font ${a} + ${b} ?`; e = "➕"; spread = 5;
      } else {
        const a = _ri(10, 20), b = _ri(2, 9);
        correct = a - b; q = `Combien font ${a} − ${b} ?`; e = "➖"; spread = 3;
      }
    }
  }

  else if (tier === "ce2_cm1") {
    if (diff === 1) {
      const a = _ri(2, 5), b = _ri(2, 9);
      correct = a * b; q = `Combien font ${a} × ${b} ?`; e = "✖️"; spread = Math.max(2, a);
    } else if (diff === 2) {
      const a = _ri(3, 9), b = _ri(3, 9);
      correct = a * b; q = `Combien font ${a} × ${b} ?`; e = "✖️"; spread = Math.max(3, a);
    } else {
      if (Math.random() < 0.5) {
        const a = _ri(100, 600), b = _ri(100, 390);
        correct = a + b; q = `Combien font ${a} + ${b} ?`; e = "➕"; spread = 50;
      } else {
        const a = _ri(12, 25), b = _ri(3, 9);
        correct = a * b; q = `Combien font ${a} × ${b} ?`; e = "✖️"; spread = 10;
      }
    }
  }

  else { // cm2
    if (diff === 1) {
      const b = _ri(3, 9), r = _ri(3, 9);
      correct = r;
      q = `Combien font ${b * r} ÷ ${b} ?`;
      e = "➗"; spread = 2;
    } else if (diff === 2) {
      if (Math.random() < 0.5) {
        const base = _ri(2, 12) * 10, frac = [2, 4][_ri(0, 1)];
        correct = base / frac;
        q = frac === 2 ? `Quelle est la moitié de ${base} ?` : `Quel est le quart de ${base * 2} ?`;
        if (frac === 4) correct = (base * 2) / 4;
        e = "➗"; spread = 5;
      } else {
        const a = _ri(12, 40), b = _ri(3, 9);
        correct = a * b; q = `Combien font ${a} × ${b} ?`; e = "✖️"; spread = 12;
      }
    } else {
      if (Math.random() < 0.5) {
        const pct = [10, 25, 50][_ri(0, 2)], base = _ri(2, 8) * 100;
        correct = (base * pct) / 100;
        q = `Combien font ${pct} % de ${base} ?`;
        e = "💯"; spread = Math.max(5, correct / 4 | 0);
      } else {
        const a = _ri(15, 60), b = _ri(11, 19);
        correct = a * b; q = `Combien font ${a} × ${b} ?`; e = "✖️"; spread = 30;
      }
    }
  }

  const mc = _makeChoices(correct, spread);
  return { q, c: mc.c, a: mc.a, e, subject: "math" };
}

/* =====================================================================
   SÉLECTEUR DE QUESTIONS (évite les répétitions dans une session)
   ===================================================================== */
const SUBJECTS = ["math", "francais", "sciences", "culture"];
const SUBJECT_LABELS = { math: "🔢 Maths", francais: "📚 Français", sciences: "🔬 Sciences", culture: "🌍 Culture" };

const Questions = {
  used: new Set(),

  _shuffleQuestion(src, subject) {
    // Copie la question en mélangeant l'ordre des choix
    const order = src.c.map((_, i) => i).sort(() => Math.random() - 0.5);
    return {
      q: src.q,
      c: order.map(i => src.c[i]),
      a: order.indexOf(src.a),
      e: src.e || "",
      subject,
    };
  },

  _fromBank(tier, subject, diff) {
    const pools = QUESTION_BANK[tier][subject];
    // Difficulté demandée d'abord, sinon on pioche dans les voisines
    const order = diff === 1 ? [1, 2, 3] : diff === 2 ? [2, 1, 3] : [3, 2, 1];
    for (const d of order) {
      const pool = (pools[d] || []).filter(item => !this.used.has(item.q));
      if (pool.length) {
        const src = pool[_ri(0, pool.length - 1)];
        this.used.add(src.q);
        return this._shuffleQuestion(src, subject);
      }
    }
    // Tout a été utilisé : on réinitialise la mémoire pour cette matière
    Object.values(pools).flat().forEach(item => this.used.delete(item.q));
    const pool = pools[diff] && pools[diff].length ? pools[diff] : Object.values(pools).flat();
    const src = pool[_ri(0, pool.length - 1)];
    this.used.add(src.q);
    return this._shuffleQuestion(src, subject);
  },

  // Matières jouées par une classe (les classes « parents » n'ont que
  // maths et algorithmique — voir questions-adultes.js)
  _subjects(tier) {
    return (typeof TIER_SUBJECTS !== "undefined" && TIER_SUBJECTS[tier]) || SUBJECTS;
  },

  // Une question pour un bloc « ? » pendant le niveau
  getOne(tier, diff) {
    const subs = this._subjects(tier);
    const subject = subs[_ri(0, subs.length - 1)];
    if (subject === "math" && Math.random() < 0.6) return genMath(tier, diff);
    return this._fromBank(tier, subject, diff);
  },

  // Une série de questions pour le quiz de fin de niveau (matières variées)
  getQuiz(tier, diff, count) {
    const list = [];
    const subjects = [];
    const subs = this._subjects(tier);
    while (subjects.length < count) {
      subjects.push(...subs.slice().sort(() => Math.random() - 0.5));
    }
    for (let i = 0; i < count; i++) {
      const subject = subjects[i];
      if (subject === "math" && Math.random() < 0.6) list.push(genMath(tier, diff));
      else list.push(this._fromBank(tier, subject, diff));
    }
    // Une question de français sur deux environ devient une dictée 🔊
    if (typeof makeDictee === "function" && Math.random() < 0.5) {
      const idx = list.findIndex(it => it.subject === "francais");
      const dictee = idx >= 0 ? makeDictee(tier, diff) : null;
      if (dictee) list[idx] = dictee;
    }
    return list;
  },
};
