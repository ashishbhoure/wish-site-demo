/* Theme engine: two colours in -> a full pastel palette out.
   Pick a preset with  theme: "lavender"  or give your own:
   theme: { primary: "#7fd8b8", secondary: "#ffb3c7" }                          */
(function () {
  const PRESETS = {
    lavender: { primary: '#b9a3f7', secondary: '#ff9fcb' },
    rose:     { primary: '#f58fb0', secondary: '#b9a3f7' },
    mint:     { primary: '#7fd8b8', secondary: '#ffb3c7' },
    sky:      { primary: '#86c5f7', secondary: '#ffd28a' },
    peach:    { primary: '#ffa987', secondary: '#c3a6ff' },
    sunshine: { primary: '#ffd05a', secondary: '#ff9fb5' },
    berry:    { primary: '#d27bd6', secondary: '#ffa6c9' }
  };
  const h2r = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(x => x + x).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
  const r2h = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => { const A = h2r(a), B = h2r(b); return r2h(A.map((v, i) => v + (B[i] - v) * t)); };
  const W = '#ffffff', K = '#000000';

  window.makeTheme = function (t) {
    const base = typeof t === 'string' ? (PRESETS[t] || PRESETS.lavender) : Object.assign({}, PRESETS.lavender, t || {});
    const p = base.primary, s = base.secondary;
    const P = {
      p, s,
      pD: mix(p, K, .08), pDD: mix(p, K, .22), pL: mix(p, W, .22), pLL: mix(p, W, .5), pLLL: mix(p, W, .8),
      deep: mix(p, K, .38), ink: mix(p, K, .58),
      sD: mix(s, K, .1), sL: mix(s, W, .3), sLL: mix(s, W, .62),
      bg0: mix(p, W, .93), bg1: mix(p, W, .88), bg2: mix(p, W, .75), bg3: mix(s, W, .86), bg4: mix(p, W, .72),
      world: mix(p, K, .7), line: mix(p, K, .2),
      confetti: [p, s, '#ffd86b', '#8fd9ff', mix(p, W, .3), mix(s, W, .3), '#a8f0d0'],
      balloons: [mix(s, W, .3), mix(p, W, .3), '#a8e6ff', '#ffe08a', mix(p, W, .45), mix(s, W, .15)],
      skyTop: mix(p, K, .68), skyMid: mix(p, K, .12), skyBot: mix(s, W, .4)
    };
    const root = document.documentElement.style, rgb = h => h2r(h).join(',');
    const set = (k, v) => root.setProperty(k, v);
    Object.entries({ p: P.p, 'p-d': P.pD, 'p-dd': P.pDD, 'p-l': P.pL, 'p-ll': P.pLL, 'p-lll': P.pLLL, deep: P.deep, ink: P.ink,
      s: P.s, 's-d': P.sD, 's-l': P.sL, 's-ll': P.sLL, bg0: P.bg0, bg1: P.bg1, bg2: P.bg2, bg3: P.bg3, bg4: P.bg4, world: P.world }).forEach(([k, v]) => set('--' + k, v));
    set('--deep-rgb', rgb(P.deep)); set('--ink-rgb', rgb(P.ink)); set('--p-rgb', rgb(P.p)); set('--p-d-rgb', rgb(P.pD)); set('--s-rgb', rgb(P.s));
    const meta = document.querySelector('meta[name=theme-color]'); if (meta) meta.content = P.p;
    return P;
  };
  window.THEME_PRESETS = Object.keys(PRESETS);
})();
