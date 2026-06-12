# 🍄 Les Aventures d'Alice & Andrien

Un jeu de plateforme éducatif (type Mario) pour apprendre en s'amusant :
**Maths, Français, Sciences et Culture générale**, de la maternelle au CM2.

## 🚀 Comment jouer

**Sur ordinateur :** double-cliquez simplement sur le fichier `index.html`
(il s'ouvre dans le navigateur, aucune installation nécessaire).

**Commandes clavier :**
- ⬅️ ➡️ Flèches (ou Q/D) pour se déplacer
- ⬆️ Flèche haut, Espace, Z ou W pour sauter

**Sur mobile / tablette :** des boutons tactiles apparaissent automatiquement
(tournez l'écran en mode paysage pour mieux jouer). Pour y accéder depuis un
téléphone, deux options simples :

1. **Mettre le jeu en ligne gratuitement** : créez un compte sur
   [Netlify Drop](https://app.netlify.com/drop) et glissez-déposez ce dossier —
   vous obtenez une adresse web utilisable partout. (GitHub Pages fonctionne aussi.)
2. **Copier le dossier sur le téléphone** et ouvrir `index.html` avec un
   navigateur de fichiers local.

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

## ⚙️ Espace Parents (dans le jeu)

Accessible depuis l'écran d'accueil (protégé par une petite multiplication 😉) :
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
