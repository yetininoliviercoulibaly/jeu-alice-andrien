/* =====================================================================
   ORCHESTRATION DU JEU : écrans, profils, contrôles, espace parents
   ===================================================================== */

(function () {
  "use strict";

  let currentProfile = null;
  let currentLevel = 0;
  const $ = (id) => document.getElementById(id);

  /* ---------------- Navigation entre écrans ---------------- */
  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    $(id).classList.add("active");
  }

  /* ---------------- Écran : profils ---------------- */
  function renderProfiles() {
    const list = $("profile-list");
    list.innerHTML = "";
    for (const p of Save.data.profiles) {
      const tier = TIERS.find(t => t.id === p.tier);
      const card = document.createElement("div");
      card.className = "profile-card";
      card.innerHTML = `<div class="avatar">${p.avatar}</div>
        <div class="pname">${escapeHtml(p.name)}</div>
        <div class="pinfo">${tier ? tier.label : ""}</div>
        <div class="pinfo">⭐ ${Object.values(p.stars).reduce((a, b) => a + b, 0)} · 🪙 ${p.totalCoins || 0}</div>`;
      card.addEventListener("click", () => {
        currentProfile = p;
        Sfx.coin();
        renderLevelMap();
        showScreen("screen-levelmap");
      });
      list.appendChild(card);
    }
    if (!Save.data.profiles.length) {
      list.innerHTML = `<p style="color:#2a5d8f;font-size:1.1rem">Crée ton premier joueur pour commencer ! 👇</p>`;
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  /* ---------------- Écran : nouveau profil ---------------- */
  let pickedAvatar = AVATARS[0];
  let pickedTier = TIERS[0].id;

  function renderNewProfileForm() {
    const av = $("avatar-picker");
    av.innerHTML = "";
    AVATARS.forEach(a => {
      const el = document.createElement("div");
      el.className = "avatar-opt" + (a === pickedAvatar ? " selected" : "");
      el.textContent = a;
      el.addEventListener("click", () => { pickedAvatar = a; renderNewProfileForm(); });
      av.appendChild(el);
    });
    const tp = $("tier-picker");
    tp.innerHTML = "";
    TIERS.forEach(t => {
      const el = document.createElement("button");
      el.className = "tier-opt" + (t.id === pickedTier ? " selected" : "");
      el.textContent = t.label;
      el.addEventListener("click", () => { pickedTier = t.id; renderNewProfileForm(); });
      tp.appendChild(el);
    });
  }

  $("btn-new-profile").addEventListener("click", () => {
    $("input-name").value = "";
    renderNewProfileForm();
    showScreen("screen-new-profile");
  });
  $("btn-cancel-profile").addEventListener("click", () => showScreen("screen-profiles"));
  $("btn-create-profile").addEventListener("click", () => {
    const name = $("input-name").value.trim();
    if (!name) { $("input-name").placeholder = "Écris ton prénom ici !"; $("input-name").focus(); return; }
    currentProfile = Save.addProfile(name, pickedAvatar, pickedTier);
    Sfx.win();
    renderLevelMap();
    showScreen("screen-levelmap");
  });

  /* ---------------- Écran : carte des niveaux ---------------- */
  function renderLevelMap() {
    const p = currentProfile;
    $("player-banner").innerHTML = `${p.avatar} <b>${escapeHtml(p.name)}</b> · 🪙 ${p.totalCoins || 0}`;
    const grid = $("level-grid");
    grid.innerHTML = "";
    CONFIG.levels.forEach((lvl, i) => {
      const unlocked = i < p.unlocked;
      const stars = p.stars[i] || 0;
      const card = document.createElement("div");
      card.className = "level-card" + (unlocked ? "" : " locked");
      card.innerHTML = `<div class="lvl-num">${unlocked ? lvl.emoji : "🔒"} ${i + 1}</div>
        <div class="lvl-name">${lvl.name}</div>
        <div class="lvl-stars">${"⭐".repeat(stars)}${"☆".repeat(Math.max(0, 3 - stars))}</div>`;
      if (unlocked) {
        card.addEventListener("click", () => startLevel(i));
      }
      grid.appendChild(card);
    });
  }

  $("btn-back-profiles").addEventListener("click", () => {
    renderProfiles();
    showScreen("screen-profiles");
  });

  /* ---------------- Jeu ---------------- */
  function startLevel(index) {
    currentLevel = index;
    showScreen("screen-game");
    const lvl = CONFIG.levels[index];
    $("hud-level").textContent = `${lvl.emoji} ${index + 1}. ${lvl.name}`;
    Engine.avatar = currentProfile.avatar;
    Engine.loadLevel(index);
    Engine.start({
      onHud: updateHud,
      onQuestionBlock: handleQuestionBlock,
      onComplete: handleLevelComplete,
      onRestart: () => {},
    });
    updateTouchControls();
  }

  function updateHud(hearts, coins) {
    $("hud-hearts").textContent = "❤️".repeat(Math.max(0, hearts)) + "🖤".repeat(Math.max(0, CONFIG.startHearts - hearts));
    $("hud-coins").textContent = `🪙 ${coins}`;
  }

  $("btn-quit-level").addEventListener("click", () => {
    Engine.stop();
    renderLevelMap();
    showScreen("screen-levelmap");
  });

  function questionDifficulty() {
    return CONFIG.levels[currentLevel].difficulty;
  }

  /* ---- Bloc « ? » frappé pendant le niveau ---- */
  function handleQuestionBlock() {
    Engine.setPaused(true);
    const item = Questions.getOne(currentProfile.tier, questionDifficulty());
    Quiz.askSingle(item, (correct) => {
      Engine.coins += correct ? CONFIG.blockRewardCoins : CONFIG.blockConsolationCoins;
      updateHud(Engine.hearts, Engine.coins);
      Engine.setPaused(false);
    });
  }

  /* ---- Quiz de fin de niveau ---- */
  function handleLevelComplete(coins) {
    Engine.setPaused(true);
    runEndQuiz(coins);
  }

  function runEndQuiz(coins) {
    const tier = currentProfile.tier;
    const threshold = Save.getThreshold(currentLevel);
    const questions = Questions.getQuiz(tier, questionDifficulty(), Save.getQuizCount());
    Quiz.runQuiz(questions, threshold, (result) => showResults(result, coins, threshold));
  }

  function showResults(result, coins, threshold) {
    const overlay = $("results-overlay");
    const pct = Math.round(result.ratio * 100);
    let stars = 0;
    if (result.passed) {
      stars = 1;
      if (result.ratio >= threshold + (1 - threshold) / 2) stars = 2;
      if (result.ratio >= 0.999) stars = 3;
    }

    if (result.passed) {
      Sfx.win();
      Save.recordResult(currentProfile, currentLevel, stars, coins);
      $("results-title").textContent = "🎉 Niveau réussi !";
      $("results-message").textContent = stars === 3
        ? "Sans faute, champion·ne ! 🏆"
        : `Bravo ${currentProfile.name} ! Continue comme ça !`;
    } else {
      Sfx.lose();
      $("results-title").textContent = "Presque !";
      $("results-message").textContent =
        `Il faut au moins ${Math.round(threshold * 100)} % de bonnes réponses. Tu peux réessayer le quiz, tu vas y arriver ! 💪`;
    }

    $("results-stars").textContent = result.passed ? "⭐".repeat(stars) + "☆".repeat(3 - stars) : "😺";
    $("results-score").textContent = `${result.score} / ${result.total} bonnes réponses (${pct} %)`;

    const hasNext = currentLevel + 1 < CONFIG.levels.length;
    $("btn-results-next").classList.toggle("hidden", !(result.passed && hasNext));
    $("btn-results-retry").classList.toggle("hidden", result.passed);
    overlay.classList.remove("hidden");
  }

  $("btn-results-next").addEventListener("click", () => {
    $("results-overlay").classList.add("hidden");
    Engine.stop();
    startLevel(currentLevel + 1);
  });
  $("btn-results-retry").addEventListener("click", () => {
    $("results-overlay").classList.add("hidden");
    runEndQuiz(Engine.coins);
  });
  $("btn-results-map").addEventListener("click", () => {
    $("results-overlay").classList.add("hidden");
    Engine.stop();
    renderLevelMap();
    showScreen("screen-levelmap");
  });

  /* ---------------- Contrôles clavier ---------------- */
  const KEYMAP = {
    ArrowLeft: "left", KeyA: "left", KeyQ: "left",
    ArrowRight: "right", KeyD: "right",
    ArrowUp: "jump", Space: "jump", KeyW: "jump", KeyZ: "jump",
  };
  // Le clavier ne pilote le jeu que pendant une partie, jamais quand on
  // écrit dans un champ de texte (sinon Q, D, Z, espace… sont avalés)
  function isTyping(e) {
    const el = e.target;
    return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT");
  }
  window.addEventListener("keydown", (e) => {
    if (isTyping(e) || !$("screen-game").classList.contains("active")) return;
    const action = KEYMAP[e.code];
    if (action) { Engine.input[action] = true; e.preventDefault(); }
  });
  window.addEventListener("keyup", (e) => {
    const action = KEYMAP[e.code];
    if (action) Engine.input[action] = false;
  });

  /* ---------------- Contrôles tactiles ---------------- */
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  function bindTouch(id, action) {
    const el = $(id);
    const on = (e) => { e.preventDefault(); Engine.input[action] = true; };
    const off = (e) => { e.preventDefault(); Engine.input[action] = false; };
    el.addEventListener("pointerdown", on);
    el.addEventListener("pointerup", off);
    el.addEventListener("pointercancel", off);
    el.addEventListener("pointerleave", off);
  }
  bindTouch("touch-leftbtn", "left");
  bindTouch("touch-rightbtn", "right");
  bindTouch("touch-jumpbtn", "jump");

  function updateTouchControls() {
    $("touch-controls").classList.toggle("hidden", !isTouch);
  }

  /* ---- Suggestion de rotation sur mobile ---- */
  function checkOrientation() {
    const gameActive = $("screen-game").classList.contains("active");
    const portrait = window.innerHeight > window.innerWidth;
    $("rotate-hint").classList.toggle("hidden", !(isTouch && gameActive && portrait));
  }
  window.addEventListener("resize", checkOrientation);
  setInterval(checkOrientation, 1500);

  /* ---------------- Espace Parents ---------------- */
  let gateAnswer = 0;

  $("btn-parents").addEventListener("click", () => {
    const a = 6 + Math.floor(Math.random() * 4);
    const b = 6 + Math.floor(Math.random() * 4);
    gateAnswer = a * b;
    $("gate-question").textContent = `${a} × ${b} = ?`;
    $("gate-answer").value = "";
    $("parent-gate").classList.remove("hidden");
    $("parent-panel").classList.add("hidden");
    showScreen("screen-parents");
  });
  $("btn-gate-cancel").addEventListener("click", () => showScreen("screen-profiles"));
  $("btn-gate-ok").addEventListener("click", () => {
    if (parseInt($("gate-answer").value, 10) === gateAnswer) {
      renderParentPanel();
      $("parent-gate").classList.add("hidden");
      $("parent-panel").classList.remove("hidden");
    } else {
      $("gate-answer").value = "";
      $("gate-answer").placeholder = "Essaie encore !";
    }
  });

  function renderParentPanel() {
    const list = $("threshold-list");
    list.innerHTML = "";
    CONFIG.levels.forEach((lvl, i) => {
      const val = Math.round(Save.getThreshold(i) * 100);
      const row = document.createElement("div");
      row.className = "threshold-row";
      row.innerHTML = `<label>${lvl.emoji} ${i + 1}. ${lvl.name}</label>
        <input type="range" min="0" max="100" step="5" value="${val}" data-level="${i}">
        <span class="tval">${val} %</span>`;
      const range = row.querySelector("input");
      range.addEventListener("input", () => {
        row.querySelector(".tval").textContent = `${range.value} %`;
      });
      list.appendChild(row);
    });

    $("input-quizcount").value = Save.getQuizCount();

    const pp = $("parent-profiles");
    pp.innerHTML = "";
    if (!Save.data.profiles.length) pp.innerHTML = "<p>Aucun profil pour le moment.</p>";
    Save.data.profiles.forEach(p => {
      const row = document.createElement("div");
      row.className = "parent-profile-row";
      const tierOptions = TIERS.map(t =>
        `<option value="${t.id}" ${t.id === p.tier ? "selected" : ""}>${t.label}</option>`).join("");
      row.innerHTML = `<span>${p.avatar} <b>${escapeHtml(p.name)}</b> — niveaux débloqués : ${p.unlocked}</span>
        <select data-pid="${p.id}">${tierOptions}</select>
        <button class="danger-btn" data-del="${p.id}">🗑️ Supprimer</button>`;
      row.querySelector("select").addEventListener("change", (e) => {
        p.tier = e.target.value;
        Save.persist();
      });
      row.querySelector("[data-del]").addEventListener("click", () => {
        if (confirm(`Supprimer le profil de ${p.name} ? Sa progression sera perdue.`)) {
          Save.deleteProfile(p.id);
          renderParentPanel();
        }
      });
      pp.appendChild(row);
    });
  }

  $("btn-parents-save").addEventListener("click", () => {
    const thresholds = [];
    document.querySelectorAll("#threshold-list input[type=range]").forEach(r => {
      thresholds[parseInt(r.dataset.level, 10)] = parseInt(r.value, 10) / 100;
    });
    let qc = parseInt($("input-quizcount").value, 10);
    if (isNaN(qc)) qc = CONFIG.quizQuestionCount;
    qc = Math.max(3, Math.min(12, qc));
    Save.setSettings(thresholds, qc);
    Sfx.correct();
    showScreen("screen-profiles");
    renderProfiles();
  });
  $("btn-parents-back").addEventListener("click", () => {
    showScreen("screen-profiles");
    renderProfiles();
  });

  /* ---------------- Lecture vocale automatique (maternelle) ---------------- */
  const overlayObserver = new MutationObserver(() => {
    if (currentProfile && currentProfile.tier === "maternelle" &&
        !$("quiz-overlay").classList.contains("hidden")) {
      setTimeout(() => Quiz.speakCurrent(), 350);
    }
  });

  /* ---------------- Démarrage ---------------- */
  Save.load();
  Quiz.init();
  Engine.init($("game-canvas"));
  renderProfiles();
  overlayObserver.observe($("quiz-overlay"), { attributes: true, attributeFilter: ["class"] });

  // Débloque l'audio au premier geste (exigence des navigateurs)
  window.addEventListener("pointerdown", () => Sfx._ensure(), { once: true });
})();
