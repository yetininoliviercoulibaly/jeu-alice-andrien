# 🍄 Les Aventures d'Alice & Andrien

Un jeu de plateforme éducatif (type Mario) pour apprendre en s'amusant :
**Maths, Français, Sciences et Culture générale**, de la maternelle au CM2.

## 🚀 Comment jouer

**🌐 En ligne (PC, tablette, téléphone) :**
**https://yetininoliviercoulibaly.github.io/jeu-alice-andrien/**
Ajoutez cette adresse à l'écran d'accueil du téléphone pour la retrouver comme
une application. (La progression est sauvegardée sur chaque appareil.)

**Sur ordinateur sans internet :** double-cliquez simplement sur le fichier
`index.html` (il s'ouvre dans le navigateur, aucune installation nécessaire).

**Commandes clavier :**
- ⬅️ ➡️ Flèches (ou Q/D) pour se déplacer
- ⬆️ Flèche haut, Espace, Z ou W pour sauter

**Sur mobile / tablette :** des boutons tactiles apparaissent automatiquement
(tournez l'écran en mode paysage pour mieux jouer).

## 🎮 Principe du jeu

- **10 niveaux** de plateforme (prairie, forêt, plage, volcan, château,
  nuages, espace…) de plus en plus difficiles, avec pièces, ennemis à écraser,
  piques et trous.
- Les **blocs « ? »** posent une question bonus : bonne réponse = 5 pièces !
- Au **drapeau d'arrivée 🏁**, un quiz de 6 questions (toutes matières) décide
  du passage au niveau suivant : il faut dépasser le **seuil de réussite**.
- Plus on avance dans le jeu, plus les questions deviennent difficiles.
- Chaque enfant a **son profil** (prénom, avatar, classe) avec sa progression,
  ses étoiles ⭐ et ses pièces, sauvegardés sur l'appareil.
- Le bouton 🔊 **lit les questions à voix haute** (lecture automatique pour les
  profils maternelle) — pratique pour les enfants qui ne lisent pas encore.
- **Combats de boss** ⚔️ aux niveaux 4 (🦀), 7 (🐉) et 10 (👾) : chaque bonne
  réponse enlève un cœur au boss, chaque erreur coûte un bouclier !
- **Dictées vocales** ✍️ : la voix lit un mot et l'enfant l'écrit (en
  maternelle, on recopie le mot affiché). Accents et majuscules tolérés.
- **Boutique** 🛍️ : les pièces gagnées débloquent 12 nouveaux héros.
- **Révision intelligente** 🔁 : les questions ratées reviennent dans les
  prochains quiz jusqu'à être maîtrisées.
- **Difficulté adaptative** : si l'enfant enchaîne les bonnes réponses, les
  questions montent d'un cran ; s'il peine, elles redescendent.
- **Application installable (PWA)** 📱 : depuis le navigateur du téléphone,
  « Ajouter à l'écran d'accueil » installe le jeu avec son icône 🍄 — il
  fonctionne ensuite même sans internet.

## ⚙️ Espace Parents (dans le jeu)

Accessible depuis l'écran d'accueil (protégé par une petite multiplication 😉) :
- **Tableau de bord par enfant** : taux de réussite par matière et liste des
  questions à revoir — pour repérer les points à travailler
- **Seuil de réussite par niveau** (en % de bonnes réponses au quiz)
- **Nombre de questions par quiz** (3 à 12)
- **Changer la classe** d'un enfant ou supprimer un profil

Les valeurs par défaut sont aussi modifiables dans `js/config.js`.

## ✏️ Ajouter ou modifier des questions

Toutes les questions sont dans `js/questions.js`, classées par classe, matière
et difficulté. Le format est simple :

```js
{ q: "Quelle est la capitale de la France ?", c: ["Lyon", "Paris", "Marseille"], a: 1, e: "🇫🇷" }
```

- `q` : la question — `c` : les choix — `a` : la position de la bonne réponse
  (0 = premier choix) — `e` : un emoji d'illustration (optionnel).

Les questions de calcul sont en partie **générées aléatoirement** (variété
infinie), adaptées à la classe et à la difficulté du niveau.

## 📁 Structure du projet

```
index.html        Page principale
css/style.css     Styles (écrans, quiz, contrôles tactiles)
js/config.js      ⚙️ Réglages : niveaux, seuils, difficultés
js/questions.js   📚 Banque de questions + générateur de maths
js/levels.js      🗺️ Construction des 8 niveaux et thèmes visuels
js/engine.js      🎮 Moteur de plateforme (physique, rendu canvas)
js/quiz.js        ❓ Affichage des questions et quiz
js/profiles.js    👤 Profils et sauvegarde (localStorage)
js/audio.js       🔊 Effets sonores
js/main.js        🧩 Orchestration générale
```
