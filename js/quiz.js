/* =====================================================================
   AFFICHAGE DES QUESTIONS (blocs « ? », quiz de fin, dictées et boss)
   ===================================================================== */

const Quiz = {
  els: {},

  // Hook appelé à chaque réponse (item, correct) — branché par main.js
  // pour les statistiques et la révision intelligente
  onAnswer: null,

  init() {
    this.els = {
      overlay: document.getElementById("quiz-overlay"),
      boss: document.getElementById("quiz-boss"),
      header: document.getElementById("quiz-header"),
      progress: document.getElementById("quiz-progress"),
      question: document.getElementById("quiz-question"),
      emoji: document.getElementById("quiz-emoji"),
      choices: document.getElementById("quiz-choices"),
      feedback: document.getElementById("quiz-feedback"),
      next: document.getElementById("btn-quiz-next"),
      speak: document.getElementById("btn-speak"),
      card: document.querySelector("#quiz-overlay .quiz-card"),
    };
    this.els.speak.addEventListener("click", () => this.speakCurrent());
  },

  currentText: "",

  speakCurrent() {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(this.currentText);
    u.lang = "fr-FR";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  },

  _emit(item, correct) {
    if (this.onAnswer) this.onAnswer(item, correct);
  },

  _renderQuestion(item, headerText, progressText, onAnswered) {
    const els = this.els;
    els.header.textContent = headerText + (item.fromReview ? " · 🔁 Révision" : "");
    els.progress.textContent = progressText;
    els.question.textContent = item.q;
    els.feedback.textContent = "";
    els.feedback.className = "quiz-feedback";
    els.next.classList.add("hidden");
    els.choices.innerHTML = "";
    delete els.choices.dataset.done;

    if (item.type === "dictee") this._renderDictee(item, onAnswered);
    else this._renderChoices(item, onAnswered);

    els.overlay.classList.remove("hidden");
  },

  /* ---- Question à choix multiples ---- */
  _renderChoices(item, onAnswered) {
    const els = this.els;
    els.emoji.textContent = item.e || "";
    this.currentText = item.q + ". " + item.c.map((c, i) => `Réponse ${i + 1} : ${c}`).join(". ");

    item.c.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;
      btn.addEventListener("click", () => {
        if (els.choices.dataset.done) return;
        els.choices.dataset.done = "1";
        const correct = idx === item.a;
        [...els.choices.children].forEach((b, i) => {
          b.disabled = true;
          if (i === item.a) b.classList.add("correct");
          else if (i === idx && !correct) b.classList.add("wrong");
        });
        this._feedback(correct, `La bonne réponse était : ${item.c[item.a]}`);
        this._emit(item, correct);
        setTimeout(() => onAnswered(correct), correct ? 900 : 1900);
      });
      els.choices.appendChild(btn);
    });
  },

  /* ---- Dictée : on écoute (ou on lit) puis on écrit ---- */
  _renderDictee(item, onAnswered) {
    const els = this.els;
    const isCopy = item.q.startsWith("Recopie");
    // En recopie (maternelle) le mot est affiché ; en dictée on ne montre que l'indice
    els.emoji.textContent = isCopy ? item.word : (item.e || "");
    this.currentText = (isCopy ? "Recopie le mot : " : "Écris le mot : ") + item.word;

    const wrap = document.createElement("div");
    wrap.className = "dictee-wrap";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "dictee-input";
    input.placeholder = "Écris ici…";
    input.autocomplete = "off";
    input.autocapitalize = "off";
    input.spellcheck = false;
    const btn = document.createElement("button");
    btn.className = "big-btn green";
    btn.textContent = "Valider ✔";

    const validate = () => {
      if (els.choices.dataset.done || !input.value.trim()) return;
      els.choices.dataset.done = "1";
      input.disabled = true;
      btn.disabled = true;
      const correct = dicteeMatch(input.value, item.word);
      input.classList.add(correct ? "good" : "bad");
      this._feedback(correct, `Le mot s'écrit : ${item.word}`);
      if (correct) els.feedback.textContent += ` (${item.word})`;
      this._emit(item, correct);
      setTimeout(() => onAnswered(correct), correct ? 1100 : 2300);
    };
    btn.addEventListener("click", validate);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") validate(); });

    wrap.appendChild(input);
    wrap.appendChild(btn);
    els.choices.appendChild(wrap);

    // La voix lit le mot automatiquement (sauf en mode recopie)
    if (!isCopy) setTimeout(() => this.speakCurrent(), 350);
    setTimeout(() => input.focus(), 400);
  },

  _feedback(correct, correction) {
    const els = this.els;
    if (correct) {
      Sfx.correct();
      els.feedback.textContent = ["Bravo ! 🎉", "Super ! ⭐", "Génial ! 🌟", "Excellent ! 👏"][Math.floor(Math.random() * 4)];
      els.feedback.classList.add("good");
    } else {
      Sfx.wrong();
      els.feedback.textContent = `Presque ! ${correction}`;
      els.feedback.classList.add("bad");
    }
  },

  _close() {
    this.els.overlay.classList.add("hidden");
    this.els.boss.classList.add("hidden");
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  },

  /* ---- Question unique (bloc « ? ») ---- */
  askSingle(item, onDone) {
    this.els.boss.classList.add("hidden");
    this._renderQuestion(
      item,
      `${SUBJECT_LABELS[item.subject] || "Question"} — Bloc bonus !`,
      "",
      (correct) => { this._close(); onDone(correct); }
    );
  },

  /* ---- Quiz de fin de niveau (mode normal ou combat de boss) ---- */
  runQuiz(questions, threshold, onDone, opts) {
    const boss = opts && opts.boss;
    let index = 0, score = 0, wrongs = 0;
    const total = questions.length;
    // Boss : il faut « needed » bonnes réponses pour le vaincre ;
    // au-delà de « wrongAllowed » erreurs, le combat est perdu
    const needed = Math.max(1, Math.ceil(threshold * total - 1e-9));
    const wrongAllowed = total - needed;

    const renderBoss = () => {
      if (!boss) { this.els.boss.classList.add("hidden"); return; }
      const hp = needed - score;
      const shields = wrongAllowed - wrongs;
      this.els.boss.innerHTML =
        `<span class="boss-emoji">${boss}</span>` +
        `<span class="boss-hp">${"❤️".repeat(Math.max(0, hp))}</span>` +
        `<span class="boss-shields">Toi : ${"🛡️".repeat(Math.max(0, shields + 1))}</span>`;
      this.els.boss.classList.remove("hidden");
    };

    const finish = (passed) => {
      this._close();
      const answered = Math.max(1, index);
      onDone({
        score, total: answered, wrongs, boss: !!boss,
        ratio: score / answered,
        passed,
      });
    };

    const showNext = () => {
      if (boss && score >= needed) { finish(true); return; }
      if (boss && wrongs > wrongAllowed) { finish(false); return; }
      if (index >= total) {
        finish(boss ? score >= needed : score / total >= threshold - 1e-9);
        return;
      }
      const item = questions[index];
      const dots = Array.from({ length: total }, (_, i) =>
        i < index ? "🟢" : i === index ? "🔵" : "⚪"
      ).join("");
      renderBoss();
      this._renderQuestion(
        item,
        boss
          ? `⚔️ Combat de boss — Question ${index + 1}`
          : `${SUBJECT_LABELS[item.subject] || ""} — Question ${index + 1} / ${total}`,
        dots,
        (correct) => {
          index++;
          if (correct) {
            score++;
            if (boss) {
              renderBoss();
              this.els.boss.classList.add("boss-hit");
              setTimeout(() => this.els.boss.classList.remove("boss-hit"), 500);
            }
          } else {
            wrongs++;
            if (boss) {
              renderBoss();
              this.els.card.classList.add("shake");
              setTimeout(() => this.els.card.classList.remove("shake"), 500);
            }
          }
          showNext();
        }
      );
    };
    showNext();
  },
};
