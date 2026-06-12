/* =====================================================================
   PROFILS & SAUVEGARDE (localStorage de l'appareil)
   ===================================================================== */

const SAVE_KEY = "gfaa_save_v1";

const Save = {
  data: null,

  load() {
    try {
      this.data = JSON.parse(localStorage.getItem(SAVE_KEY)) || null;
    } catch (e) { this.data = null; }
    if (!this.data) {
      this.data = { profiles: [], settings: { thresholds: null, quizCount: null } };
    }
    if (!this.data.settings) this.data.settings = { thresholds: null, quizCount: null };
    this.data.profiles.forEach(p => this._migrate(p));
    return this.data;
  },

  // Ajoute les nouveaux champs aux anciennes sauvegardes
  _migrate(p) {
    if (!p.stats) p.stats = {};
    for (const s of ["math", "francais", "sciences", "culture", "algo"]) {
      if (!p.stats[s]) p.stats[s] = { ok: 0, total: 0 };
    }
    if (!p.review) p.review = [];   // questions ratées à revoir
    if (!p.recent) p.recent = [];   // dernières réponses (1/0) pour la difficulté adaptative
    if (!p.owned) p.owned = [];     // avatars achetés à la boutique
  },

  persist() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.data)); } catch (e) {}
  },

  addProfile(name, avatar, tier) {
    const p = {
      id: "p" + Math.random().toString(36).slice(2, 9),
      name, avatar, tier,
      unlocked: 1,          // nombre de niveaux débloqués
      stars: {},            // { indexNiveau: 1..3 }
      totalCoins: 0,
    };
    this._migrate(p);
    this.data.profiles.push(p);
    this.persist();
    return p;
  },

  /* ---- Statistiques & révision intelligente ---- */

  _reviewKey(item) {
    return item.type === "dictee" ? "dictee:" + item.word : item.q;
  },

  // Enregistre chaque réponse : stats par matière, historique récent,
  // et file de révision des questions ratées
  recordAnswer(profile, item, correct) {
    const subj = profile.stats[item.subject] ? item.subject : "culture";
    profile.stats[subj].total++;
    if (correct) profile.stats[subj].ok++;

    profile.recent.push(correct ? 1 : 0);
    if (profile.recent.length > 12) profile.recent.shift();

    const key = this._reviewKey(item);
    if (correct) {
      if (item.fromReview) profile.review = profile.review.filter(r => r.key !== key);
    } else {
      const existing = profile.review.find(r => r.key === key);
      if (existing) existing.fails++;
      else {
        profile.review.push({
          key, fails: 1,
          item: {
            q: item.q, c: item.c, a: item.a, e: item.e,
            subject: item.subject, type: item.type, word: item.word,
          },
        });
        if (profile.review.length > 30) profile.review.shift();
      }
    }
    this.persist();
  },

  // Renvoie jusqu'à n questions ratées à reposer (les plus ratées d'abord).
  // Elles ne sortent de la file que lorsqu'on y répond juste.
  takeReviewItems(profile, n) {
    return profile.review
      .slice()
      .sort((a, b) => b.fails - a.fails)
      .slice(0, n)
      .map(r => Object.assign({}, r.item, { fromReview: true }));
  },

  // Difficulté adaptative : on monte d'un cran si l'enfant réussit presque
  // tout, on descend d'un cran s'il est en difficulté
  adaptiveDifficulty(profile, base) {
    const r = profile.recent;
    if (r.length >= 8) {
      const rate = r.reduce((a, b) => a + b, 0) / r.length;
      if (rate >= 0.85) base++;
      else if (rate <= 0.4) base--;
    }
    return Math.max(1, Math.min(3, base));
  },

  /* ---- Boutique ---- */
  buyAvatar(profile, emoji, price) {
    if (profile.owned.includes(emoji) || (profile.totalCoins || 0) < price) return false;
    profile.totalCoins -= price;
    profile.owned.push(emoji);
    this.persist();
    return true;
  },

  equipAvatar(profile, emoji) {
    profile.avatar = emoji;
    this.persist();
  },

  deleteProfile(id) {
    this.data.profiles = this.data.profiles.filter(p => p.id !== id);
    this.persist();
  },

  getProfile(id) { return this.data.profiles.find(p => p.id === id); },

  recordResult(profile, levelIndex, stars, coins) {
    profile.totalCoins = (profile.totalCoins || 0) + coins;
    const prev = profile.stars[levelIndex] || 0;
    if (stars > prev) profile.stars[levelIndex] = stars;
    if (stars > 0 && levelIndex + 1 >= profile.unlocked && levelIndex + 1 < CONFIG.levels.length) {
      profile.unlocked = levelIndex + 2; // débloque le niveau suivant
    }
    this.persist();
  },

  // Seuil effectif d'un niveau (réglage parent prioritaire sur config.js)
  getThreshold(levelIndex) {
    const t = this.data.settings.thresholds;
    if (t && typeof t[levelIndex] === "number") return t[levelIndex];
    return CONFIG.levels[levelIndex].threshold;
  },

  getQuizCount() {
    return this.data.settings.quizCount || CONFIG.quizQuestionCount;
  },

  setSettings(thresholds, quizCount) {
    this.data.settings.thresholds = thresholds;
    this.data.settings.quizCount = quizCount;
    this.persist();
  },
};
