/* Wish Site engine — you normally never need to edit this file. Edit config.js. */
(() => {
'use strict';
addEventListener('scroll', () => { if (window.scrollX) scrollTo(0, window.scrollY); }, { passive: true });

/* =================== CONFIG + DEFAULTS =================== */
const U = window.CFG || {};
const D_TEXT = { /* fallbacks if a key is missing in config.js */
  eyebrow: "🎀 it's a very special day 🎀", heroLine: 'Today the whole universe is celebrating you ✨', gateSmall: 'psst… someone has a surprise for you', gateTitle: 'Tap to open your gift 🎁',
  candlesTitle: 'Make a wish', candlesSub: 'then blow out the candles', blowBtn: '💨 Blow the candles', relightBtn: '🔥 Light them again', micBtn: '🎤 blow for real', candlesHint: 'tap the cake or the button!',
  wishDone: '🎉 Wish made, {name}! It’s totally coming true 💫', galleryTitle: 'Memory lane', gallerySub: 'swipe through ✨', cardsTitle: 'Polaroid pile', cardsSub: 'drag me around · tap to flip 💌',
  wishesTitle: 'Tiny wishes', wishesSub: 'tap the hearts 💗', wishesCount: '{n} / {total} opened', wishesAll: 'all {total} wishes found! 🎉', secret: '{name}, you found every wish! 💜',
  scrapTitle: 'Scrapbook', scrapSub: 'a little page of you', scrapNoteTitle: '✎ things I love about you', scrapNotes: ['your smile', 'your kindness', 'your cute chaos', 'that you’re always YOU'],
  ticket1: 'ADMIT ONE', ticket2: 'forever friendship', ticket3: 'valid for life ♾️', scrapQuote: 'you are my favourite kind of sunshine ☀️',
  scrapCaptions: ['cutie ✿', 'sunday vibes', 'soft & sweet', 'queen 👑', 'study mode 📚', 'pretty', 'giggles', 'cozy', 'outdoors'],
  worldTitle: '{name}’s 3D world', worldSub: 'drag to look around · pinch to zoom 🌌', worldHint: 'tap a photo to zoom', worldLoading: 'building your world…',
  letterGreeting: 'Dear {name},', letterSign: 'with lots of love,', confettiBtn: '🎉 More confetti!', noteClose: 'aww 🥹', footer: 'made with 💜 & a little bit of glitter',
  catLines: ['meow! 🐾', 'Happy Birthday {name}!', 'purr purr 💜', 'make a wish! ✨'],
  cardCaptions: ['main character ✨', 'soft era 🌸', 'pure sunshine ☀️', 'cutie alert 🎀', 'glow up 💫', 'giggles on 😆', 'dreamy 🌙', 'pretty smile 🥹'],
  cardMessages: ['You make every room better.', 'Kind heart, gentle soul.', 'Keep that smile forever.', 'Thank you for being you.', 'You shine brightest as yourself.', 'You are loved more than you know.', 'May all your wishes come true.', 'Stay amazing.']
};
const C = {
  name: U.name || 'Friend', from: U.from || 'Me', occasion: U.occasion || ['Happy', 'Birthday'], number: U.number === undefined ? '' : String(U.number),
  theme: U.theme || 'lavender', character: U.character || 'cat', music: U.music !== false,
  sections: Object.assign({ candles: 1, gallery: 1, cards: 1, wishes: 1, scrapbook: 1, world: 1, letter: 1 }, U.sections || {}),
  photos: U.photos || [], heroPhoto: U.heroPhoto || '', cards: U.cards || [],
  wishes: (U.wishes && U.wishes.length ? U.wishes : ['You are amazing! 💜', 'Happy Birthday! 🎂']).slice(0, 8),
  letter: U.letter || 'Wishing you the happiest day. 💜',
  text: Object.assign({}, D_TEXT, U.text || {})
};
/* Optional URL overrides, handy for demos:  ?theme=mint&character=bunny&number=30  (validated, name/text can't be injected) */
(function urlOverrides() {
  const q = new URLSearchParams(location.search);
  if (window.THEME_PRESETS.includes(q.get('theme'))) C.theme = q.get('theme');
  if (['cat', 'bunny', 'bear', 'none'].includes(q.get('character'))) C.character = q.get('character');
  if (/^\d{1,3}$/.test(q.get('number') || '')) C.number = q.get('number');
})();
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[(Math.random() * a.length) | 0];
const fmt = (s, v = {}) => String(s).replace(/\{(\w+)\}/g, (_, k) => (k in v ? v[k] : k === 'name' ? C.name : '{' + k + '}'));
const T = (k, v) => fmt(C.text[k], v);
const on = k => C.sections[k] !== false && C.sections[k] !== 0;

/* =================== THEME =================== */
const P = window.makeTheme(C.theme);
const PAL = P.confetti;

/* =================== PHOTOS (with placeholders) =================== */
const POOL = C.photos.length ? C.photos : (window.PHOTOS || []);
const HAS = POOL.length > 0;
const EMO = ['🌸', '🦋', '✨', '💜', '🎀', '🌷', '🧸', '⭐'];
function placeholder(i) {
  const e = EMO[i % EMO.length], a = [P.pLL, P.sL, P.pL, P.sLL][i % 4], b = [P.sLL, P.pLL, P.sL, P.pLLL][i % 4];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='600' height='800' fill='url(#g)'/><text x='300' y='430' font-size='220' text-anchor='middle'>${e}</text><text x='300' y='560' font-size='34' text-anchor='middle' fill='${P.deep}' font-family='sans-serif'>your photo here</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}
const photo = id => String(id).startsWith('ph:') ? placeholder(+id.slice(3)) : /^(data:|https?:|\/|photos\/)/.test(id) ? id : /\.[a-z0-9]+$/i.test(id) ? 'photos/' + id : 'photos/' + id + '.jpg';
const pool = (n, off = 0) => Array.from({ length: n }, (_, i) => HAS ? POOL[(i + off) % POOL.length] : 'ph:' + ((i + off) % 8));
const LISTS = {
  hero: C.heroPhoto || pool(1)[0],
  carousel: pool(Math.min(10, Math.max(POOL.length, 6))),
  scrap: pool(9, 1),
  world: pool(Math.min(20, Math.max(POOL.length, 12)))
};
const CARDS = (C.cards.length ? C.cards : pool(8).map((img, i) => ({ img, cap: C.text.cardCaptions[i % C.text.cardCaptions.length], msg: C.text.cardMessages[i % C.text.cardMessages.length] })));

/* =================== CHARACTERS (inline SVG) =================== */
const KIND = ['cat', 'bunny', 'bear', 'none'].includes(C.character) ? C.character : 'cat';
const CW = '#ffffff', CL = P.pLLL, CP = P.sLL;
const bearTint = { [CW]: '#f8e8d4', [CL]: '#ecd5bc' };
function cat(fill = CW, o = {}) {
  if (KIND === 'none') return '';
  if (KIND === 'bear' && bearTint[fill]) fill = bearTint[fill];
  const line = KIND === 'bear' ? '#a9805f' : P.line, pinkc = P.sL, bow = o.bow || P.sD;
  const ears = KIND === 'cat' ? `
    <polygon class="ear" points="20,48 24,10 54,32" fill="${fill}" stroke="${line}" stroke-width="3" stroke-linejoin="round"/>
    <polygon class="ear" points="100,48 96,10 66,32" fill="${fill}" stroke="${line}" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="28,40 30,20 46,32" fill="${pinkc}"/><polygon points="92,40 90,20 74,32" fill="${pinkc}"/>`
    : KIND === 'bunny' ? `
    <g class="ear" transform="rotate(-9 40 44)"><ellipse cx="40" cy="20" rx="12" ry="30" fill="${fill}" stroke="${line}" stroke-width="3"/><ellipse cx="40" cy="22" rx="5.5" ry="21" fill="${pinkc}"/></g>
    <g class="ear" transform="rotate(9 80 44)"><ellipse cx="80" cy="20" rx="12" ry="30" fill="${fill}" stroke="${line}" stroke-width="3"/><ellipse cx="80" cy="22" rx="5.5" ry="21" fill="${pinkc}"/></g>`
    : `
    <circle class="ear" cx="27" cy="34" r="15" fill="${fill}" stroke="${line}" stroke-width="3"/><circle cx="27" cy="34" r="7.5" fill="${pinkc}"/>
    <circle class="ear" cx="93" cy="34" r="15" fill="${fill}" stroke="${line}" stroke-width="3"/><circle cx="93" cy="34" r="7.5" fill="${pinkc}"/>`;
  const head = `<g>${ears}
    <ellipse cx="60" cy="62" rx="41" ry="35" fill="${fill}" stroke="${line}" stroke-width="3"/>
    <ellipse class="eye" cx="43" cy="62" rx="5" ry="7" fill="#3b2a66"/><ellipse class="eye" cx="77" cy="62" rx="5" ry="7" fill="#3b2a66"/>
    <circle cx="45" cy="59" r="2" fill="#fff"/><circle cx="79" cy="59" r="2" fill="#fff"/>
    <ellipse cx="30" cy="74" rx="8" ry="5" fill="${pinkc}" opacity=".75"/><ellipse cx="90" cy="74" rx="8" ry="5" fill="${pinkc}" opacity=".75"/>
    <path d="M56 72 L64 72 L60 77 Z" fill="${P.sD}"/>
    <path d="M60 77 Q56 83 51 80 M60 77 Q64 83 69 80" fill="none" stroke="${line}" stroke-width="2.4" stroke-linecap="round"/>
    ${KIND === 'cat' ? `<path d="M14 66 L30 69 M14 76 L30 74 M106 66 L90 69 M106 76 L90 74" stroke="${line}" stroke-width="2" stroke-linecap="round"/>` : ''}
    <path d="M88 24 q10 -14 20 -2 q-8 12 -20 2z M88 24 q-6 -12 -16 -4 q6 12 16 4z" fill="${bow}" transform="translate(0 ${KIND === 'bunny' ? 24 : 4})"/><circle cx="88" cy="${KIND === 'bunny' ? 52 : 32}" r="4" fill="#fff" opacity=".9"/>
  </g>`;
  const top = KIND === 'bunny' ? -30 : 6;
  if (o.peek) return `<svg class="cat" viewBox="0 ${top} 120 ${102 - top}" xmlns="http://www.w3.org/2000/svg">${head}
    <ellipse cx="38" cy="98" rx="12" ry="8" fill="${fill}" stroke="${line}" stroke-width="3"/><ellipse cx="82" cy="98" rx="12" ry="8" fill="${fill}" stroke="${line}" stroke-width="3"/></svg>`;
  const vt = KIND === 'bunny' ? -44 : -10;
  return `<svg class="cat" viewBox="-10 ${vt} 150 ${154 - vt}" xmlns="http://www.w3.org/2000/svg">
    <path class="tail" d="M28 130 C0 134 -6 98 14 92" fill="none" stroke="${line}" stroke-width="14" stroke-linecap="round"/>
    <path class="tail" d="M28 130 C0 134 -6 98 14 92" fill="none" stroke="${fill}" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="62" cy="112" rx="33" ry="30" fill="${fill}" stroke="${line}" stroke-width="3"/>
    <ellipse cx="62" cy="116" rx="18" ry="18" fill="#fff" opacity=".6"/>
    <ellipse cx="46" cy="140" rx="12" ry="8" fill="${fill}" stroke="${line}" stroke-width="3"/><ellipse cx="78" cy="140" rx="12" ry="8" fill="${fill}" stroke="${line}" stroke-width="3"/>
    <g transform="translate(2 -14)">${head}</g></svg>`;
}
const BOW2 = P.pD;

/* =================== REMOVE DISABLED SECTIONS =================== */
const SEC = { candles: '#candles', gallery: '#gallery', cards: '#cards', wishes: '#wishesSec', scrapbook: '#scrap', world: '#world', letter: '#final' };
Object.entries(SEC).forEach(([k, sel]) => { if (!on(k)) $(sel)?.remove(); });
if (!C.music) $('#musicBtn')?.remove();
if (KIND === 'none') { $('#catBuddy')?.remove(); $('.gate-cats')?.remove(); }

/* =================== TEXT =================== */
(function applyText() {
  const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  set('.eyebrow', T('eyebrow')); set('#heroLine', T('heroLine')); set('.gate-small', T('gateSmall')); set('.gate-title', T('gateTitle'));
  const st = (sel, a, b) => set(sel, `${T(a)}<small>${T(b)}</small>`);
  st('#candles .sec-title', 'candlesTitle', 'candlesSub'); st('#gallery .sec-title', 'galleryTitle', 'gallerySub'); st('#cards .sec-title', 'cardsTitle', 'cardsSub');
  st('#wishesSec .sec-title', 'wishesTitle', 'wishesSub'); st('#scrap .sec-title', 'scrapTitle', 'scrapSub'); st('#world .sec-title', 'worldTitle', 'worldSub');
  set('#blowBtn', T('blowBtn')); set('#micBtn', T('micBtn')); set('#wishMsg', T('candlesHint'));
  set('.world-hint', T('worldHint')); set('#worldLoading', T('worldLoading')); set('#again', T('confettiBtn')); set('#noteClose', T('noteClose')); set('footer', T('footer'));
  set('#wishCount', fmt(C.text.wishesCount, { n: 0, total: C.wishes.length }));
  document.title = `${C.occasion.join(' ')} ${C.name} 💜`;
})();

/* =================== AUDIO =================== */
let AC = null, master = null, musicOn = C.music, musicTimer = null;
function initAudio() {
  if (AC) return;
  try { AC = new (window.AudioContext || window.webkitAudioContext)(); master = AC.createGain(); master.gain.value = 1; master.connect(AC.destination); } catch (e) { AC = null; }
}
function tone(f, t, d, v = .08, type = 'triangle') {
  if (!AC) return;
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .015); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + d + .05);
}
const N = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
const TUNE = [['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2], ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
  ['G4', .75], ['G4', .25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 1], ['F5', .75], ['F5', .25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2]];
function playTune(beat = .42, vol = .07) {
  if (!AC) return 0;
  if (AC.state === 'suspended') AC.resume();
  let t = AC.currentTime + .05;
  TUNE.forEach(([n, b]) => { tone(N[n], t, b * beat * 1.4, vol); tone(N[n] * 2, t, b * beat, vol * .35, 'sine'); t += b * beat; });
  return (t - AC.currentTime);
}
function musicLoop() {
  clearTimeout(musicTimer);
  if (!musicOn) return;
  const len = playTune(.5, .045);
  musicTimer = setTimeout(musicLoop, (len + 14) * 1000);
}
function meow() {
  if (!AC) return;
  const t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain();
  o.type = 'sawtooth'; o.frequency.setValueAtTime(620, t); o.frequency.exponentialRampToValueAtTime(900, t + .12); o.frequency.exponentialRampToValueAtTime(420, t + .38);
  const f = AC.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 2;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .05); g.gain.exponentialRampToValueAtTime(.001, t + .42);
  o.connect(f); f.connect(g); g.connect(master); o.start(t); o.stop(t + .45);
}
function pop() { if (!AC) return; const t = AC.currentTime; tone(rnd(500, 900), t, .12, .09, 'sine'); tone(rnd(1000, 1600), t + .03, .1, .05, 'sine'); }
$('#musicBtn')?.addEventListener('click', () => {
  initAudio(); musicOn = !musicOn;
  $('#musicBtn').classList.toggle('off', !musicOn);
  if (musicOn) musicLoop(); else clearTimeout(musicTimer);
});

/* =================== FX CANVAS (confetti, sparkles, trails) =================== */
const fx = $('#fx'), fctx = fx.getContext('2d');
let parts = [], fxRun = false, DPR = Math.min(devicePixelRatio || 1, 2);
function fxResize() { fx.width = innerWidth * DPR; fx.height = innerHeight * DPR; }
addEventListener('resize', fxResize); fxResize();
function addP(p) { parts.push(p); if (!fxRun) { fxRun = true; requestAnimationFrame(fxLoop); } }
function burst(x, y, n = 24, o = {}) {
  for (let i = 0; i < n; i++) {
    const a = rnd(0, 6.283), s = rnd(2, o.speed || 7);
    addP({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2, g: .16, life: rnd(50, 90), max: 90, size: rnd(7, 15), rot: rnd(0, 6), vr: rnd(-.2, .2),
      txt: o.txt ? pick(o.txt) : null, col: pick(PAL), shape: pick(['r', 'c', 'r']) });
  }
}
function confetti(n = 130) {
  for (let i = 0; i < n; i++) addP({ x: rnd(0, innerWidth), y: rnd(-40, -10), vx: rnd(-1.5, 1.5), vy: rnd(2, 6), g: .05, life: rnd(150, 260), max: 260,
    size: rnd(7, 13), rot: rnd(0, 6), vr: rnd(-.25, .25), col: pick(PAL), shape: pick(['r', 'r', 'c']), sway: rnd(0, 6) });
}
function trail(x, y) { addP({ x, y, vx: rnd(-.6, .6), vy: rnd(-1.2, -.2), g: -.01, life: 40, max: 40, size: rnd(10, 16), rot: 0, vr: 0, txt: [pick(['✦', '♡', '✧', '💜', '🌸'])], col: pick(PAL) }); }
function fxLoop() {
  fctx.setTransform(DPR, 0, 0, DPR, 0, 0); fctx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 40);
  for (const p of parts) {
    p.life--; p.vy += p.g; p.x += p.vx + (p.sway !== undefined ? Math.sin(p.life * .08 + p.sway) * .9 : 0); p.y += p.vy; p.rot += p.vr; p.vx *= .99;
    fctx.globalAlpha = Math.min(1, p.life / 30);
    fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.rot);
    if (p.txt) { fctx.font = p.size + 'px serif'; fctx.fillStyle = p.col; fctx.textAlign = 'center'; fctx.fillText(p.txt[0], 0, 0); }
    else { fctx.fillStyle = p.col; if (p.shape === 'c') { fctx.beginPath(); fctx.arc(0, 0, p.size / 2.4, 0, 6.3); fctx.fill(); } else fctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); }
    fctx.restore();
  }
  fctx.globalAlpha = 1;
  if (parts.length) requestAnimationFrame(fxLoop); else { fxRun = false; fctx.clearRect(0, 0, innerWidth, innerHeight); }
}
let lastTrail = 0;
addEventListener('pointermove', e => { const n = performance.now(); if (n - lastTrail > 70 && !(e.target.closest && e.target.closest('#worldWrap'))) { lastTrail = n; trail(e.clientX, e.clientY); } }, { passive: true });
addEventListener('pointerdown', e => { if (e.target.closest('#gate')) return; burst(e.clientX, e.clientY, 8, { txt: ['✦', '♡', '✧', '💜'], speed: 4 }); }, { passive: true });

/* =================== BACKGROUND =================== */
(function bg() {
  const el = $('#bg'), cols = P.balloons, small = innerWidth < 600;
  for (let i = 0; i < (small ? 7 : 12); i++) {
    const b = document.createElement('div'); b.className = 'balloon';
    const c = pick(cols); b.style.background = `radial-gradient(circle at 30% 28%,#fff9,${c} 45%)`; b.style.borderBottomColor = c; b.style.color = c;
    b.style.left = rnd(2, 94) + '%'; b.style.animationDuration = rnd(16, 30) + 's'; b.style.animationDelay = -rnd(0, 30) + 's';
    b.style.transform = `scale(${rnd(.7, 1.2)})`;
    b.addEventListener('pointerdown', e => { e.stopPropagation(); initAudio(); pop(); const r = b.getBoundingClientRect(); burst(r.x + 23, r.y + 29, 22, { txt: ['✦', '💜', '🎈', '♡'] }); b.style.visibility = 'hidden'; setTimeout(() => b.style.visibility = '', 9000); });
    el.appendChild(b);
  }
  for (let i = 0; i < 22; i++) { const t = document.createElement('div'); t.className = 'twinkle'; t.textContent = pick(['✦', '✧', '✨', '⋆']); t.style.left = rnd(0, 98) + '%'; t.style.top = rnd(0, 98) + '%'; t.style.fontSize = rnd(10, 22) + 'px'; t.style.animationDelay = -rnd(0, 3) + 's'; el.appendChild(t); }
  for (let i = 0; i < 4; i++) { const c = document.createElement('div'); c.className = 'cloud'; c.style.top = rnd(4, 70) + '%'; c.style.animationDuration = rnd(60, 110) + 's'; c.style.animationDelay = -rnd(0, 100) + 's'; c.style.transform = `scale(${rnd(.7, 1.4)})`; el.appendChild(c); }
})();

/* =================== GATE =================== */
if ($('#gateCats')) $('#gateCats').innerHTML = cat(CW) + cat(CL, { bow: BOW2 });
$('#gift').addEventListener('click', () => {
  initAudio();
  if (AC && AC.state === 'suspended') AC.resume();
  $('#gift').classList.add('open');
  const r = $('#gift').getBoundingClientRect();
  burst(r.x + r.width / 2, r.y + 40, 60, { txt: ['🎉', '✨', '💜', '🎀', '🌸'], speed: 10 });
  confetti(160);
  setTimeout(() => { $('#gate').classList.add('gone'); document.body.classList.remove('locked'); scrollTo(0, 0); }, 900);
  if (C.music) setTimeout(() => { playTune(.38, .08); setTimeout(musicLoop, 11000); }, 700);
});
if (location.hash === '#open') setTimeout(() => $('#gift').click(), 300); // handy for previews/screenshots

/* =================== HERO =================== */
(function hero() {
  const letters = C.occasion.join('').toUpperCase().replace(/[^\p{L}]/gu, '').split('').slice(0, 16);
  $('#bunting').innerHTML = letters.map((ch, i) => `<div class="flag" style="--c:${PAL[i % PAL.length]};animation-delay:${-i * .25}s">${ch}</div>`).join('');
  let d = 0;
  $('#hbTitle').setAttribute('aria-label', C.occasion.join(' '));
  $('#hbTitle').innerHTML = C.occasion.map(w => `<span class="w">${[...w].map(ch => `<span class="l" style="animation-delay:${(d++ * .09).toFixed(2)}s">${ch}</span>`).join('')}</span>`).join('');
  $('#heroImg').src = photo(LISTS.hero);
  $('#nameTitle').textContent = C.name;
  if ($('#heroCat')) $('#heroCat').innerHTML = cat(CW);
})();

/* =================== CAT BUDDY =================== */
(function buddy() {
  if (!$('#catBuddy')) return;
  $('#catBuddySvg').innerHTML = cat(CP, { bow: BOW2 });
  const lines = (C.text.catLines || []).map(l => fmt(l));
  let to;
  $('#catBuddy').addEventListener('click', e => {
    e.stopPropagation(); initAudio(); meow();
    const s = $('#catSay'); s.textContent = pick(lines); s.classList.add('show'); clearTimeout(to); to = setTimeout(() => s.classList.remove('show'), 2200);
    const r = $('#catBuddy').getBoundingClientRect(); burst(r.x + 40, r.y + 20, 14, { txt: ['💜', '🐾', '✦'], speed: 5 });
  });
})();

/* =================== CANDLES =================== */
if (on('candles')) (function candles() {
  $('#cakeName').textContent = C.name;
  if ($('#cakeCat')) $('#cakeCat').innerHTML = cat(CL, { bow: P.sD });
  const digits = C.number ? C.number.split('') : ['♥'];
  $('#candleRow').innerHTML = digits.map(d => `<div class="ncandle"><span class="flame"></span><span class="wick"></span><span class="digit">${d}</span></div>`).join('');
  let out = false, micStream = null;
  const row = $('#candleRow'), msg = $('#wishMsg'), btn = $('#blowBtn');
  function blow() {
    if (out) return; out = true; initAudio();
    $$('.ncandle', row).forEach((c, i) => setTimeout(() => {
      c.classList.add('out');
      const s = document.createElement('i'); s.className = 'smoke'; c.appendChild(s); setTimeout(() => s.remove(), 2000);
    }, i * 220));
    setTimeout(() => {
      confetti(180); const r = $('#cake').getBoundingClientRect(); burst(r.x + r.width / 2, r.y, 50, { txt: ['🎉', '✨', '💜', '🎂', '🎈'], speed: 11 });
      playTune(.3, .09);
      msg.textContent = T('wishDone');
    }, 420);
    btn.textContent = T('relightBtn');
    stopMic();
  }
  function relight() { out = false; $$('.ncandle', row).forEach(c => c.classList.remove('out')); btn.textContent = T('blowBtn'); msg.textContent = '🤫'; }
  btn.addEventListener('click', () => out ? relight() : blow());
  $('#cake').addEventListener('click', () => { if (!out) blow(); });
  row.addEventListener('click', () => { if (!out) blow(); });
  function stopMic() { if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; } }
  $('#micBtn').addEventListener('click', async () => {
    if (out) relight();
    try {
      initAudio(); micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const src = AC.createMediaStreamSource(micStream), an = AC.createAnalyser(); an.fftSize = 512; src.connect(an);
      const buf = new Uint8Array(an.fftSize); let hot = 0; msg.textContent = '🎤 …';
      (function chk() {
        if (!micStream) return;
        an.getByteTimeDomainData(buf); let s = 0; for (const v of buf) s += (v - 128) ** 2; const rms = Math.sqrt(s / buf.length) / 128;
        hot = rms > .22 ? hot + 1 : 0; if (hot > 6) { blow(); return; } requestAnimationFrame(chk);
      })();
    } catch (e) { msg.textContent = '🍰 (mic not available — just tap the cake)'; }
  });
})();

/* =================== CAROUSEL =================== */
if (on('gallery')) (function carousel() {
  const stage = $('#stage'), ids = LISTS.carousel, n = ids.length;
  stage.innerHTML = ids.map(id => `<div class="slide"><img src="${photo(id)}" alt="" loading="lazy" draggable="false"></div>`).join('');
  $('#dots').innerHTML = ids.map(() => '<i></i>').join('');
  $('#peek1').innerHTML = cat(CW, { peek: true });
  const slides = $$('.slide', stage), dots = $$('#dots i');
  let cur = 0, timer;
  function layout() {
    const w = slides[0].offsetWidth, gap = w * .56;
    slides.forEach((s, i) => {
      let o = i - cur; if (o > n / 2) o -= n; if (o < -n / 2) o += n;
      const a = Math.abs(o), vis = a <= 2;
      s.style.transform = `translateX(${o * gap}px) translateZ(${-a * 140}px) rotateY(${-o * 34}deg) scale(${a === 0 ? 1.04 : 1})`;
      s.style.opacity = vis ? 1 - a * .22 : 0; s.style.zIndex = 10 - a; s.style.pointerEvents = vis ? 'auto' : 'none';
      s.style.filter = a ? 'brightness(.88) saturate(.9)' : 'none';
    });
    dots.forEach((d, i) => d.classList.toggle('on', i === cur));
  }
  const go = i => { cur = (i + n) % n; layout(); };
  const auto = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 3600); };
  $('#next').onclick = () => { go(cur + 1); auto(); }; $('#prev').onclick = () => { go(cur - 1); auto(); };
  slides.forEach((s, i) => s.addEventListener('click', () => { if (moved) return; if (i === cur) openLB(photo(ids[i])); else { go(i); auto(); } }));
  let sx = 0, moved = false, down = false;
  stage.addEventListener('pointerdown', e => { sx = e.clientX; down = true; moved = false; });
  addEventListener('pointerup', e => { if (!down) return; down = false; const dx = e.clientX - sx; if (Math.abs(dx) > 40) { moved = true; go(cur + (dx < 0 ? 1 : -1)); auto(); setTimeout(() => moved = false, 50); } });
  addEventListener('resize', layout); layout(); auto();
})();

/* =================== LIGHTBOX =================== */
function openLB(src) { $('#lightbox img').src = src; $('#lightbox').hidden = false; }
$('#lightbox').addEventListener('click', () => $('#lightbox').hidden = true);

/* =================== DRAG CARDS =================== */
if (on('cards')) (function cards() {
  const board = $('#board'); let z = 10;
  const spots = [[3, 2], [36, 1], [66, 3], [8, 34], [42, 31], [68, 35], [4, 66], [46, 64]];
  const spotsW = [[2, 6], [26, 3], [50, 8], [74, 4], [8, 48], [32, 52], [56, 46], [78, 50]];
  const wide = innerWidth >= 700;
  CARDS.slice(0, 8).forEach((c, i) => {
    const [x, y] = (wide ? spotsW : spots)[i % 8];
    const el = document.createElement('div'); el.className = 'pcard';
    el.style.left = x + '%'; el.style.top = y + '%'; el.style.zIndex = i + 1; el.style.transform = `rotate(${rnd(-9, 9)}deg)`;
    el.innerHTML = `<div class="pin"><div class="face"><span class="tape"></span><img src="${photo(c.img)}" alt="" draggable="false" loading="lazy"><div class="cap">${c.cap}</div></div><div class="face back">${c.msg}</div></div>`;
    board.appendChild(el);
    let sx, sy, ox, oy, mv = false;
    el.addEventListener('pointerdown', e => {
      el.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; mv = false;
      ox = el.offsetLeft; oy = el.offsetTop; el.style.zIndex = ++z; el.classList.add('drag');
    });
    el.addEventListener('pointermove', e => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 6) mv = true;
      if (!mv) return;
      const bw = board.clientWidth, bh = board.clientHeight;
      const nx = Math.max(0, Math.min(bw - el.offsetWidth, ox + dx)), ny = Math.max(0, Math.min(bh - el.offsetHeight, oy + dy));
      el.style.left = nx / bw * 100 + '%'; el.style.top = ny / bh * 100 + '%';
    });
    const end = e => { el.classList.remove('drag'); if (!mv && e.type === 'pointerup') { el.classList.toggle('flip'); initAudio(); pop(); } };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  });
})();

/* =================== TAP THE HEARTS =================== */
if (on('wishes')) (function wishes() {
  const field = $('#heartsField'), emojis = ['💗', '💜', '🩷', '💖', '💝', '💘', '🩵', '💕'];
  const spots = [[8, 6], [40, 0], [72, 8], [20, 38], [56, 36], [80, 44], [6, 70], [44, 68]];
  let opened = 0; const total = C.wishes.length;
  C.wishes.forEach((m, i) => {
    const b = document.createElement('button'); b.className = 'heart'; b.textContent = emojis[i % emojis.length];
    b.style.left = spots[i][0] + '%'; b.style.top = spots[i][1] + '%'; b.style.setProperty('--r', rnd(-12, 12) + 'deg'); b.style.animationDelay = -rnd(0, 1.5) + 's';
    b.setAttribute('aria-label', 'Open wish ' + (i + 1));
    b.addEventListener('click', () => {
      initAudio(); pop(); const r = b.getBoundingClientRect(); burst(r.x + 32, r.y + 32, 20, { txt: ['💗', '✦', '💜', '✨'] });
      $('#noteText').textContent = fmt(m); $('#noteCat').innerHTML = cat(pick([CW, CL, CP]), { peek: true }); $('#note').hidden = false;
      if (!b.classList.contains('done')) { b.classList.add('done'); opened++; $('#wishCount').textContent = fmt(C.text.wishesCount, { n: opened, total }); if (opened === total) setTimeout(allOpen, 700); }
    });
    field.appendChild(b);
  });
  function allOpen() {
    $('#note').hidden = true; $('#wishCount').textContent = fmt(C.text.wishesAll, { total });
    $('#secretCat').innerHTML = cat(CP, { bow: BOW2 });
    $('#secret p').textContent = T('secret');
    $('#secret').hidden = false; confetti(160); meow();
  }
  $('#noteClose').onclick = () => $('#note').hidden = true;
  $('#note').addEventListener('click', e => { if (e.target.id === 'note') $('#note').hidden = true; });
})();

/* =================== SCRAPBOOK =================== */
if (on('scrapbook')) (function scrap() {
  const P9 = LISTS.scrap, cap = C.text.scrapCaptions, r = () => rnd(-5, 5).toFixed(1) + 'deg';
  const tp = [`rgba(${hexRgb(P.p)},.75)`, `rgba(${hexRgb(P.s)},.7)`, 'rgba(255,216,107,.75)', 'rgba(143,217,255,.7)'];
  const ph = (i, c) => `<figure class="sc ph" style="--r:${r()};--tape:${tp[i % 4]};--tr:${rnd(-6, 6).toFixed(0)}deg;margin:0" data-src="${photo(P9[i % P9.length])}"><img src="${photo(P9[i % P9.length])}" alt="" loading="lazy"><span>${c || cap[i % cap.length]}</span></figure>`;
  const stk = t => `<div class="sc sticker" style="--r:${r()}">${t}</div>`;
  const notes = (C.text.scrapNotes || []).map(n => `<li>${n}</li>`).join('');
  const items = [
    ph(0), ph(1),
    `<div class="sc note-s" style="--r:-2deg">${T('scrapNoteTitle')}<ul>${notes}</ul></div>`,
    stk('🦋'), ph(2),
    `<div class="sc ticket" style="--r:2deg">${T('ticket1')}<b>${T('ticket2')}</b>${T('ticket3')}</div>`,
    ph(3), stk(KIND === 'none' ? '🧸' : cat(CW, { bow: BOW2 })),
    `<div class="sc quote" style="--r:-1deg">${T('scrapQuote')}</div>`,
    ph(4), stk('🌸🎀'), ph(5), ph(6), stk('🧸'), ph(7), ph(8), stk('⭐')
  ];
  $('#paper').innerHTML = items.join('');
  $$('#paper .ph').forEach(f => f.addEventListener('click', () => openLB(f.dataset.src)));
  function hexRgb(h) { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)).join(','); }
})();

/* =================== FINAL =================== */
if (on('letter')) (function fin() {
  $('#finalCats').innerHTML = cat(CL, { bow: P.sD }) + cat(CW, { bow: BOW2 }) + cat(CP);
  $('#fGreet').textContent = T('letterGreeting');
  $('#fMsg').textContent = C.letter;
  $('.sign').innerHTML = `${T('letterSign')}<br><b id="fFrom">${C.from}</b> 💜`;
  $('#again').onclick = () => { initAudio(); confetti(220); playTune(.3, .09); };
})();

/* =================== REVEAL ON SCROLL =================== */
(function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
  $$('.reveal').forEach(el => io.observe(el));
})();

/* =================== 3D WORLD (three.js) =================== */
if (on('world')) (function world() {
  const wrap = $('#worldWrap'), canvas = $('#worldCanvas');
  let started = false, visible = false;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !started) { started = true; init(); } }, { threshold: .05 }).observe(wrap);
  $('#worldFull').addEventListener('click', () => {
    const full = wrap.classList.toggle('full'); document.body.classList.toggle('locked', full); $('#worldFull').textContent = full ? '✕' : '⛶'; setTimeout(() => dispatchEvent(new Event('resize')), 30);
  });
  function init() {
    if (!window.THREE) { $('#worldLoading').textContent = '3D not available on this device'; return; }
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false }); } catch (e) { $('#worldLoading').textContent = '3D not supported here 😿'; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(65, 1, .1, 200); cam.rotation.order = 'YXZ'; cam.fov = innerWidth < 700 ? 78 : 65;
    const g = document.createElement('canvas'); g.width = 4; g.height = 256; const gx = g.getContext('2d'), gr = gx.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0, P.skyTop); gr.addColorStop(.5, P.skyMid); gr.addColorStop(1, P.skyBot); gx.fillStyle = gr; gx.fillRect(0, 0, 4, 256);
    scene.background = new THREE.CanvasTexture(g);

    function sprTex(draw) { const c = document.createElement('canvas'); c.width = c.height = 128; draw(c.getContext('2d')); return new THREE.CanvasTexture(c); }
    const heartTex = col => sprTex(x => { x.fillStyle = col; x.font = '100px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥', 64, 70); });
    const starTex = sprTex(x => { const gg = x.createRadialGradient(64, 64, 0, 64, 64, 64); gg.addColorStop(0, '#fff'); gg.addColorStop(.25, 'rgba(255,255,255,.8)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gg; x.fillRect(0, 0, 128, 128); });

    const sp = []; for (let i = 0; i < 700; i++) { const v = new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)).normalize().multiplyScalar(rnd(30, 90)); sp.push(v.x, v.y, v.z); }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
    const stars = new THREE.Points(sg, new THREE.PointsMaterial({ size: 1.6, map: starTex, transparent: true, depthWrite: false, color: 0xffffff })); scene.add(stars);

    const floaters = [], tex = [P.sD, '#ffffff', P.pL, '#ffd86b', P.s].map(heartTex);
    for (let i = 0; i < 46; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: pick(tex), transparent: true, opacity: .9, depthWrite: false }));
      const a = rnd(0, 6.28), rad = rnd(11, 20), sc = rnd(.5, 1.4); s.scale.set(sc, sc, 1);
      s.position.set(Math.cos(a) * rad, rnd(-8, 9), Math.sin(a) * rad); s.userData = { y: s.position.y, sp: rnd(.4, 1.2), ph: rnd(0, 6) }; floaters.push(s); scene.add(s);
    }

    const hits = [], R = 8.5, ids = LISTS.world, loader = new THREE.TextureLoader();
    const rows = [[0, 10], [.52, 6], [-.52, 6]]; let k = 0, loaded = 0;
    rows.forEach(([lat, count], ri) => {
      for (let j = 0; j < count && k < ids.length; j++, k++) {
        const id = ids[k], yaw = j / count * Math.PI * 2 + ri * .35;
        const grp = new THREE.Group();
        grp.position.set(Math.sin(yaw) * Math.cos(lat) * R, Math.sin(lat) * R, -Math.cos(yaw) * Math.cos(lat) * R);
        const frame = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
        const pm = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const pic = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), pm); pic.position.z = .02;
        const H = 4.4; frame.scale.set(H * .75 + .3, H + .3, 1); pic.scale.set(H * .75, H, 1);
        grp.add(frame, pic); grp.lookAt(0, 0, 0); scene.add(grp); pic.userData.src = photo(id); hits.push(pic);
        loader.load(photo(id), t => {
          const asp = t.image.width / t.image.height, w = Math.min(H * asp, 5.4), h = w / asp;
          pm.map = t; pm.needsUpdate = true; pic.scale.set(w, h, 1); frame.scale.set(w + .3, h + .42, 1); frame.position.y = -.06;
          if (++loaded >= Math.min(6, ids.length)) $('#worldLoading').classList.add('done');
        });
        grp.userData = { bob: rnd(0, 6), by: grp.position.y };
        pic.userData.grp = grp;
      }
    });
    setTimeout(() => $('#worldLoading').classList.add('done'), 4000);

    let yaw = 0, pitch = 0, vy = 0, vp = 0, idle = 0, drag = false, lx = 0, ly = 0, dist = 0;
    const touches = new Map(); let pd0 = 0;
    function resize() { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    addEventListener('resize', resize); new ResizeObserver(resize).observe(wrap); resize();
    canvas.addEventListener('pointerdown', e => {
      touches.set(e.pointerId, [e.clientX, e.clientY]); canvas.setPointerCapture(e.pointerId); drag = true; lx = e.clientX; ly = e.clientY; dist = 0; idle = 0;
      if (touches.size === 2) { const [a, b] = [...touches.values()]; pd0 = Math.hypot(a[0] - b[0], a[1] - b[1]); }
    });
    canvas.addEventListener('pointermove', e => {
      if (!touches.has(e.pointerId)) return; touches.set(e.pointerId, [e.clientX, e.clientY]);
      if (touches.size === 2) { const [a, b] = [...touches.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); cam.fov = Math.max(40, Math.min(100, cam.fov - (d - pd0) * .15)); pd0 = d; cam.updateProjectionMatrix(); dist = 99; return; }
      const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; dist += Math.abs(dx) + Math.abs(dy);
      const kk = cam.fov / 65 * .0045; vy = dx * kk; vp = dy * kk; yaw += vy; pitch = Math.max(-.9, Math.min(.9, pitch + vp)); idle = 0;
    });
    const up = e => {
      touches.delete(e.pointerId); if (touches.size) return; drag = false;
      if (dist < 8 && e.type === 'pointerup') {
        const r = canvas.getBoundingClientRect(), v = new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        const rc = new THREE.Raycaster(); rc.setFromCamera(v, cam); const h = rc.intersectObjects(hits)[0];
        if (h) { initAudio(); pop(); openLB(h.object.userData.src); }
      }
    };
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('wheel', e => { if (!wrap.classList.contains('full') && !e.ctrlKey) return; e.preventDefault(); cam.fov = Math.max(40, Math.min(100, cam.fov + e.deltaY * .04)); cam.updateProjectionMatrix(); }, { passive: false });

    const clock = new THREE.Clock();
    (function loop() {
      requestAnimationFrame(loop); if (!visible) return;
      const t = clock.getElapsedTime();
      if (!drag) { idle++; if (idle > 60) { yaw += .0016; } yaw += vy; pitch = Math.max(-.9, Math.min(.9, pitch + vp)); vy *= .93; vp *= .93; pitch *= .995; }
      cam.rotation.set(-pitch, -yaw, 0);
      stars.rotation.y = t * .01;
      floaters.forEach(s => { s.position.y = s.userData.y + Math.sin(t * s.userData.sp + s.userData.ph) * .8; });
      hits.forEach(p => { const gp = p.userData.grp; gp.position.y = gp.userData.by + Math.sin(t * .8 + gp.userData.bob) * .12; });
      renderer.render(scene, cam);
    })();
  }
})();

})();
