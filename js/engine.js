/* =====================================================================
   MOTEUR DE PLATEFORME (canvas)
   Physique, collisions, ennemis, pièces, blocs « ? », drapeau d'arrivée
   ===================================================================== */

const TILE = 48;
const GRAVITY = 2200;
const MOVE_SPEED = 300;
const JUMP_VELOCITY = -880;
const SOLID = "#B=T?X";

const Engine = {
  canvas: null, ctx: null,
  grid: null, cols: 0, theme: null,
  player: null, enemies: [], decos: [], clouds: [],
  spawn: { x: 0, y: 0 },
  camX: 0,
  coins: 0, hearts: 3,
  running: false, paused: false, finished: false,
  lastTime: 0,
  time: 0,
  input: { left: false, right: false, jump: false },
  _jumpHeld: false, _jumpBuffer: 0, _coyote: 0,
  cb: {},

  init(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    window.addEventListener("resize", resize);
    this._resize = resize;
  },

  isSolid(ch) { return SOLID.includes(ch); },
  tileAt(c, r) {
    if (c < 0 || c >= this.cols) return "#";   // murs invisibles aux bords
    if (r < 0) return " ";
    if (r >= ROWS) return " ";
    return this.grid[r][c];
  },
  setTile(c, r, ch) {
    if (r < 0 || r >= ROWS || c < 0 || c >= this.cols) return;
    const row = this.grid[r];
    this.grid[r] = row.slice(0, c) + ch + row.slice(c + 1);
  },

  loadLevel(index) {
    const data = LEVELS[index];
    this.levelIndex = index;
    this.grid = data.grid.slice();
    this.theme = data.theme;
    this.cols = this.grid[0].length;
    this.enemies = [];
    this.coins = 0;
    this.hearts = CONFIG.startHearts;
    this.finished = false;
    this.camX = 0;
    this.time = 0;

    // Extraire le joueur et les ennemis de la grille
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < this.cols; c++) {
        const ch = this.grid[r][c];
        if (ch === "P") {
          this.spawn = { x: c * TILE + 6, y: r * TILE };
          this.setTile(c, r, " ");
        } else if (ch === "E") {
          this.enemies.push({
            x: c * TILE + 4, y: r * TILE + 8,
            w: TILE - 8, h: TILE - 8,
            vx: Math.random() < 0.5 ? -60 : 60, vy: 0,
            alive: true, squashT: 0,
          });
          this.setTile(c, r, " ");
        }
      }
    }

    this.player = {
      x: this.spawn.x, y: this.spawn.y,
      w: 34, h: 42,
      vx: 0, vy: 0,
      onGround: false, facing: 1,
      invuln: 0,
    };

    // Décorations : un emoji du thème posé régulièrement sur le sol
    this.decos = [];
    for (let c = 2; c < this.cols - 2; c += 5 + (c % 3)) {
      if (this.tileAt(c, 13) === "#" && this.tileAt(c, 12) === " ") {
        this.decos.push({
          c, r: 12,
          e: this.theme.deco[c % this.theme.deco.length],
          s: 0.8 + (c % 4) * 0.15,
        });
      }
    }
    // Nuages
    this.clouds = [];
    for (let i = 0; i < Math.ceil(this.cols / 8); i++) {
      this.clouds.push({
        x: i * 8 * TILE + Math.random() * 200,
        y: 40 + Math.random() * 160,
        s: 0.7 + Math.random() * 0.9,
      });
    }
  },

  start(callbacks) {
    this.cb = callbacks || {};
    this.running = true;
    this.paused = false;
    this._resize();
    this.lastTime = performance.now();
    this._emitHud();
    const loop = (t) => {
      if (!this.running) return;
      const dt = Math.min((t - this.lastTime) / 1000, 1 / 30);
      this.lastTime = t;
      if (!this.paused) {
        this.time += dt;
        this.update(dt);
      }
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  },

  stop() { this.running = false; },
  setPaused(p) {
    this.paused = p;
    if (!p) this.lastTime = performance.now();
  },

  _emitHud() {
    if (this.cb.onHud) this.cb.onHud(this.hearts, this.coins);
  },

  /* ---------------- LOGIQUE ---------------- */
  update(dt) {
    const p = this.player;

    // Déplacements horizontaux
    const dir = (this.input.right ? 1 : 0) - (this.input.left ? 1 : 0);
    p.vx = dir * MOVE_SPEED;
    if (dir !== 0) p.facing = dir;

    // Saut : mémoire tampon + temps de coyote (tolérance enfant-friendly)
    if (this.input.jump && !this._jumpHeld) this._jumpBuffer = 0.15;
    this._jumpHeld = this.input.jump;
    this._jumpBuffer = Math.max(0, this._jumpBuffer - dt);
    this._coyote = p.onGround ? 0.12 : Math.max(0, this._coyote - dt);

    if (this._jumpBuffer > 0 && this._coyote > 0) {
      p.vy = JUMP_VELOCITY;
      p.onGround = false;
      this._coyote = 0;
      this._jumpBuffer = 0;
      Sfx.jump();
    }
    // Saut plus court si on relâche le bouton
    if (!this.input.jump && p.vy < -300) p.vy = -300;

    p.vy = Math.min(p.vy + GRAVITY * dt, 1300);
    p.invuln = Math.max(0, p.invuln - dt);

    this._moveAndCollide(p, dt, true);
    this._checkTileInteractions(p);

    // Ennemis
    for (const e of this.enemies) {
      if (!e.alive) { e.squashT -= dt; continue; }
      e.vy = Math.min(e.vy + GRAVITY * dt, 1200);
      // Demi-tour au bord du vide ou contre un mur
      const footC = Math.floor((e.x + (e.vx > 0 ? e.w + 2 : -2)) / TILE);
      const footR = Math.floor((e.y + e.h + 2) / TILE);
      const frontR = Math.floor((e.y + e.h / 2) / TILE);
      const grounded = Math.abs(e.vy) < 1;
      if (grounded && (!this.isSolid(this.tileAt(footC, footR)) || this.isSolid(this.tileAt(footC, frontR)))) {
        e.vx = -e.vx;
      }
      this._moveAndCollide(e, dt, false);

      // Contact avec le joueur
      if (p.invuln <= 0 && this._overlap(p, e)) {
        if (p.vy > 120 && p.y + p.h - e.y < e.h * 0.7) {
          // Écrasé !
          e.alive = false;
          e.squashT = 0.4;
          p.vy = -450;
          this.coins += 2;
          Sfx.stomp();
          this._emitHud();
        } else {
          this._takeDamage();
        }
      }
    }

    // Tombé dans un trou ?
    if (p.y > ROWS * TILE + 60) this._takeDamage(true);

    // Caméra
    const viewW = this.canvas.width / this._scale();
    this.camX = Math.max(0, Math.min(p.x + p.w / 2 - viewW / 2, this.cols * TILE - viewW));
  },

  _scale() { return this.canvas.height / (ROWS * TILE); },

  _overlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  },

  _moveAndCollide(o, dt, isPlayer) {
    // Axe X
    o.x += o.vx * dt;
    let r0 = Math.floor(o.y / TILE), r1 = Math.floor((o.y + o.h - 1) / TILE);
    if (o.vx > 0) {
      const c = Math.floor((o.x + o.w) / TILE);
      for (let r = r0; r <= r1; r++) {
        if (this.isSolid(this.tileAt(c, r))) { o.x = c * TILE - o.w - 0.01; if (!isPlayer) o.vx = -o.vx; break; }
      }
    } else if (o.vx < 0) {
      const c = Math.floor(o.x / TILE);
      for (let r = r0; r <= r1; r++) {
        if (this.isSolid(this.tileAt(c, r))) { o.x = (c + 1) * TILE + 0.01; if (!isPlayer) o.vx = -o.vx; break; }
      }
    }

    // Axe Y
    o.y += o.vy * dt;
    const c0 = Math.floor(o.x / TILE), c1 = Math.floor((o.x + o.w - 1) / TILE);
    if (o.vy > 0) {
      const r = Math.floor((o.y + o.h) / TILE);
      for (let c = c0; c <= c1; c++) {
        if (this.isSolid(this.tileAt(c, r))) {
          o.y = r * TILE - o.h - 0.01;
          o.vy = 0;
          if (isPlayer) o.onGround = true;
          break;
        }
      }
    } else if (o.vy < 0) {
      const r = Math.floor(o.y / TILE);
      for (let c = c0; c <= c1; c++) {
        const t = this.tileAt(c, r);
        if (this.isSolid(t)) {
          o.y = (r + 1) * TILE + 0.01;
          o.vy = 0;
          // Bloc question frappé par en dessous !
          if (isPlayer && t === "?") {
            this.setTile(c, r, "X");
            Sfx.block();
            if (this.cb.onQuestionBlock) this.cb.onQuestionBlock();
          }
          break;
        }
      }
    }
    if (isPlayer && o.vy > 1) o.onGround = false;
  },

  _checkTileInteractions(p) {
    const c0 = Math.floor(p.x / TILE), c1 = Math.floor((p.x + p.w) / TILE);
    const r0 = Math.floor(p.y / TILE), r1 = Math.floor((p.y + p.h) / TILE);
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const t = this.tileAt(c, r);
        if (t === "C") {
          this.setTile(c, r, " ");
          this.coins++;
          Sfx.coin();
          this._emitHud();
        } else if (t === "S") {
          // Piques : zone dangereuse réduite
          const spike = { x: c * TILE + 6, y: r * TILE + TILE * 0.45, w: TILE - 12, h: TILE * 0.55 };
          if (p.invuln <= 0 && this._overlap(p, spike)) this._takeDamage();
        } else if (t === "F" && !this.finished) {
          this.finished = true;
          Sfx.win();
          if (this.cb.onComplete) this.cb.onComplete(this.coins);
        }
      }
    }
  },

  _takeDamage(fell = false) {
    const p = this.player;
    if (!fell && p.invuln > 0) return;
    this.hearts--;
    Sfx.hurt();
    this._emitHud();
    if (this.hearts <= 0) {
      // Recommence le niveau en douceur
      const idx = this.levelIndex;
      this.loadLevel(idx);
      this._emitHud();
      if (this.cb.onRestart) this.cb.onRestart();
      return;
    }
    // Retour au point de départ avec invincibilité temporaire
    p.x = this.spawn.x; p.y = this.spawn.y;
    p.vx = 0; p.vy = 0;
    p.invuln = 2;
  },

  /* ---------------- RENDU ---------------- */
  render() {
    const ctx = this.ctx, canvas = this.canvas;
    if (!this.grid) return;
    const s = this._scale();

    // Ciel
    const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, this.theme.sky[0]);
    sky.addColorStop(1, this.theme.sky[1]);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(s, s);

    // Nuages (parallaxe)
    ctx.fillStyle = this.theme.cloud;
    ctx.globalAlpha = 0.8;
    for (const cl of this.clouds) {
      const x = cl.x - this.camX * 0.4;
      ctx.beginPath();
      ctx.ellipse(x, cl.y, 46 * cl.s, 18 * cl.s, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 30 * cl.s, cl.y - 12 * cl.s, 30 * cl.s, 15 * cl.s, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.translate(-this.camX, 0);

    // Décorations
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const d of this.decos) {
      ctx.font = `${Math.round(36 * d.s)}px sans-serif`;
      ctx.fillText(d.e, d.c * TILE + TILE / 2, d.r * TILE + TILE / 2 + 6);
    }

    // Tuiles visibles
    const cMin = Math.max(0, Math.floor(this.camX / TILE) - 1);
    const cMax = Math.min(this.cols - 1, Math.ceil((this.camX + canvas.width / s) / TILE) + 1);
    for (let r = 0; r < ROWS; r++) {
      for (let c = cMin; c <= cMax; c++) {
        this._drawTile(ctx, this.grid[r][c], c * TILE, r * TILE, c, r);
      }
    }

    // Ennemis
    for (const e of this.enemies) {
      if (!e.alive && e.squashT <= 0) continue;
      ctx.save();
      ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
      if (!e.alive) { ctx.scale(1.2, 0.4); ctx.globalAlpha = Math.max(0, e.squashT / 0.4); }
      ctx.font = "38px sans-serif";
      ctx.fillText(this.theme.enemy, 0, 4);
      ctx.restore();
    }

    // Joueur (l'avatar choisi par l'enfant)
    const p = this.player;
    ctx.save();
    if (p.invuln > 0 && Math.floor(this.time * 10) % 2 === 0) ctx.globalAlpha = 0.35;
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    const bounce = p.onGround && Math.abs(p.vx) > 10 ? Math.sin(this.time * 14) * 2 : 0;
    if (p.facing < 0) ctx.scale(-1, 1);
    ctx.font = "44px sans-serif";
    ctx.fillText(this.avatar || "🦊", 0, 4 + bounce);
    ctx.restore();

    ctx.restore();
  },

  _drawTile(ctx, t, x, y, c, r) {
    if (t === " " || t === "P" || t === "E") return;
    switch (t) {
      case "#": {
        ctx.fillStyle = this.theme.dirt;
        ctx.fillRect(x, y, TILE, TILE);
        if (this.tileAt(c, r - 1) !== "#") {
          ctx.fillStyle = this.theme.ground;
          ctx.fillRect(x, y, TILE, 14);
        }
        ctx.strokeStyle = "rgba(0,0,0,.12)";
        ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
        break;
      }
      case "B":
        ctx.fillStyle = "#c1694f";
        ctx.fillRect(x, y, TILE, TILE);
        ctx.strokeStyle = "rgba(0,0,0,.25)";
        ctx.strokeRect(x + 1, y + 1, TILE - 2, TILE - 2);
        ctx.beginPath();
        ctx.moveTo(x, y + TILE / 2); ctx.lineTo(x + TILE, y + TILE / 2);
        ctx.moveTo(x + TILE / 2, y); ctx.lineTo(x + TILE / 2, y + TILE / 2);
        ctx.stroke();
        break;
      case "=":
        ctx.fillStyle = "#a87b4f";
        ctx.fillRect(x, y + 6, TILE, TILE - 18);
        ctx.fillStyle = "#c89b6a";
        ctx.fillRect(x, y + 6, TILE, 8);
        break;
      case "?": {
        const bob = Math.sin(this.time * 4 + c) * 2;
        ctx.fillStyle = "#ffc93c";
        ctx.fillRect(x + 2, y + 2 + bob, TILE - 4, TILE - 4);
        ctx.strokeStyle = "#e09f00";
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 4, y + 4 + bob, TILE - 8, TILE - 8);
        ctx.lineWidth = 1;
        ctx.fillStyle = "#7a4d00";
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("?", x + TILE / 2, y + TILE / 2 + 2 + bob);
        break;
      }
      case "X":
        ctx.fillStyle = "#b0a18f";
        ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);
        ctx.strokeStyle = "rgba(0,0,0,.2)";
        ctx.strokeRect(x + 4, y + 4, TILE - 8, TILE - 8);
        break;
      case "T":
        ctx.fillStyle = "#2e9e4f";
        ctx.fillRect(x, y, TILE, TILE);
        ctx.fillStyle = "rgba(255,255,255,.25)";
        ctx.fillRect(x + 6, y, 8, TILE);
        ctx.strokeStyle = "rgba(0,0,0,.3)";
        ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
        break;
      case "C": {
        const bob = Math.sin(this.time * 5 + c * 1.3) * 4;
        const squeeze = Math.abs(Math.sin(this.time * 3 + c)) * 0.5 + 0.5;
        ctx.fillStyle = "#ffd93d";
        ctx.beginPath();
        ctx.ellipse(x + TILE / 2, y + TILE / 2 + bob, 12 * squeeze, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#c79100";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.lineWidth = 1;
        break;
      }
      case "S":
        ctx.fillStyle = "#aab4bd";
        ctx.beginPath();
        ctx.moveTo(x, y + TILE);
        ctx.lineTo(x + TILE * 0.25, y + TILE * 0.35);
        ctx.lineTo(x + TILE * 0.5, y + TILE);
        ctx.lineTo(x + TILE * 0.75, y + TILE * 0.35);
        ctx.lineTo(x + TILE, y + TILE);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#7d8a96";
        ctx.stroke();
        break;
      case "F": {
        // Mât planté au sol + drapeau qui flotte
        ctx.fillStyle = "#888";
        ctx.fillRect(x + TILE / 2 - 3, y - TILE * 2, 6, TILE * 3);
        const wave = Math.sin(this.time * 5) * 4;
        ctx.fillStyle = "#e05252";
        ctx.beginPath();
        ctx.moveTo(x + TILE / 2 + 3, y - TILE * 2);
        ctx.lineTo(x + TILE / 2 + 3 + 40, y - TILE * 2 + 14 + wave);
        ctx.lineTo(x + TILE / 2 + 3, y - TILE * 2 + 28);
        ctx.closePath();
        ctx.fill();
        ctx.font = "30px sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("🏁", x + TILE / 2, y + TILE / 2);
        break;
      }
    }
  },
};
