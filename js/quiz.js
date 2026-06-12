/* =====================================================================
   AFFICHAGE DES QUESTIONS (blocs « ? » et quiz de fin de niveau)
   ===================================================================== */

const Quiz = {
  els: {},

  init() {
    this.els = {
      overlay: document.getElementById("quiz-overlay"),
      header: document.getElementById("quiz-header"),
      progress: document.getElementById("quiz-progress"),
      question: document.getElementById("quiz-question"),
      emoji: document.getElementById("quiz-emoji"),
      choices: document.getElementById("quiz-choices"),
      feedback: document.getElementById("quiz-feedback"),
      next: document.getElementById("btn-quiz-next"),
      speak: document.getElementById("btn-speak"),
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

  _renderQuestion(item, headerText, progressText, onAnswered) {
    const els = this.els;
    els.header.textContent = headerText;
    els.progress.textContent = progressText;
    els.question.textContent = item.q;
    els.emoji.textContent = item.e || "";
    els.feedback.textContent = "";
    els.feedback.className = "quiz-feedback";
    els.next.classList.add("hidden");
    els.choices.innerHTML = "";
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
        if (correct) {
          Sfx.correct();
          els.feedback.textContent = ["Bravo ! 🎉", "Super ! ⭐", "Génial ! 🌟", "Excellent ! 👏"][Math.floor(Math.random() * 4)];
          els.feedback.classList.add("good");
        } else {
          Sfx.wrong();
          els.feedback.textContent = `Presque ! La bonne réponse était : ${item.c[item.a]}`;
          els.feedback.classList.add("bad");
        }
        setTimeout(() => onAnswered(correct), correct ? 900 : 1900);
      });
      els.choices.appendChild(btn);
    });
    delete els.choices.dataset.done;
    els.overlay.classList.remove("hidden");
  },

  _close() {
    this.els.overlay.classList.add("hidden");
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  },

  // ---- Question unique (bloc « ? ») ----
  askSingle(item, onDone) {
    this._renderQuestion(
      item,
      `${SUBJECT_LABELS[item.subject] || "Question"} — Bloc bonus !`,
      "",
      (correct) => { this._close(); onDone(correct); }
    );
  },

  // ---- Quiz de fin de niveau ----
  runQuiz(questions, threshold, onDone) {
    let index = 0, score = 0;
    const total = questions.length;

    const showNext = () => {
      if (index >= total) {
        this._close();
        const ratio = score / total;
        onDone({ score, total, ratio, passed: ratio >= threshold - 1e-9 });
        return;
      }
      const item = questions[index];
      const dots = Array.from({ length: total }, (_, i) =>
        i < index ? "🟢" : i === index ? "🔵" : "⚪"
      ).join("");
      this._renderQuestion(
        item,
        `${SUBJECT_LABELS[item.subject] || ""} — Question ${index + 1} / ${total}`,
        dots,
        (correct) => {
          if (correct) score++;
          index++;
          showNext();
        }
      );
    };
    showNext();
  },
};
