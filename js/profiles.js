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
    return this.data;
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
    this.data.profiles.push(p);
    this.persist();
    return p;
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
