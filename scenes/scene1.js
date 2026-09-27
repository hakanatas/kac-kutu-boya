/* SAHNE 1 — BOYANACAK DUVAR (0–10 s)  A house wall to paint.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const paper = (a) => `rgba(${LI.PAPER_RGB},${a})`;

  /** a wall: width w, wall height 3, gable apex at 5, a hole [x0, y0, x1, y1] (door or window) */
  function wall(ctx, G, w, hole, a, k, seed, t) {
    const f = F();
    const outline = f.UP(G, [[0, 0], [w, 0], [w, 3], [w / 2, 5], [0, 3]], w);
    f.fill(ctx, outline, seg(k, 0.6, 1) * a, 0.16);
    f.poly(ctx, outline, k, a, seed);
    const H = f.UP(G, [[hole[0], hole[1]], [hole[2], hole[1]], [hole[2], hole[3]], [hole[0], hole[3]]], w), hk = seg(k, 0.7, 1);
    if (hk > 0) { ctx.fillStyle = paper(hk * a); ctx.beginPath(); H.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill(); f.poly(ctx, H, hk, a, seed + 10, 5); }
    // ground line
    Ink.path(ctx, [f.U(G, [-1.2, 0], w), f.U(G, [w + 1.2, 0], w)], { w: 3, p: k, alpha: a * 0.5, seed: seed + 20, taper: [0.1, 0.1] });
    void t;
  }
  /** the dimension labels of a wall */
  function dims(ctx, G, w, holeText, holeAt, a, t, t0) {
    const f = F(), k = (s) => seg(t, t0 + s, t0 + s + 0.5) * a;
    const b = f.U(G, [w / 2, 0], w); f.T(ctx, `${w} m`, b[0], b[1] + 38, { size: G.s * 0.8, alpha: k(0), halo: true });
    const l = f.U(G, [0, 1.5], w); f.T(ctx, '3 m', l[0] - 24, l[1], { size: G.s * 0.8, alpha: k(0.6), align: 'right' });
    const ap = f.U(G, [w / 2, 5], w), ft = f.U(G, [w / 2, 3], w);
    if (k(1.2) > 0) { f.height(ctx, ap, ft, k(1.2) * 0.8, seg(t, t0 + 1.2, t0 + 1.8)); f.T(ctx, '2 m', ap[0] + 16, (ap[1] + ft[1]) / 2, { size: G.s * 0.75, alpha: k(1.2), align: 'left', halo: true }); }
    const h = f.U(G, holeAt, w); f.T(ctx, holeText, h[0], h[1], Object.assign({ size: G.s * 0.62, alpha: k(1.8), align: 'left', halo: true }, f.AMB));
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Evin ön duvarı boyanacak'],
      [10.6, 27.8, 'Önce problemi anlayalım'],
      [28.4, 45.8, 'Strateji: duvarı parçalara ayır'],
      [46.4, 61.8, 'Başka bir yol: büyük dikdörtgenden çıkar'],
      [62.4, 79.8, 'Aynı stratejiyi başka bir duvarda deneyelim'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), G = L.G, f = F(), a1 = END(t) * (1 - seg(t, 61.8, 62.4));
    if (a1 > 0 && t < 62.4) {
      // estimate / second way: the big 8 × 5 rectangle
      const bb = Math.max(win(t, 22.2, 27.8), win(t, 46.8, 61.8));
      if (bb > 0) { const R = f.UP(G, [[0, 0], [8, 0], [8, 5], [0, 5]]); for (let i = 0; i < 4; i++) f.height(ctx, R[i], R[(i + 1) % 4], bb * a1 * 0.7, 0.999); }
      // corner triangles of the second way
      const ct = win(t, 49.6, 61.8) * a1;
      if (ct > 0) {
        [[[0, 3], [0, 5], [4, 5]], [[8, 3], [8, 5], [4, 5]]].forEach((T0, i) => { const P = f.UP(G, T0); f.fill(ctx, P, ct, 0.45); f.poly(ctx, P, 1, ct, 2400 + i * 4, 4, LI.AMBER_RGB); });
        [[1.2, 4.3], [6.8, 4.3]].forEach((p) => { const q = f.U(G, p); f.T(ctx, '4 m²', q[0], q[1], Object.assign({ size: G.s * 0.7, alpha: ct, halo: true }, f.AMB)); });
      }
      wall(ctx, G, 8, [1, 0, 2, 2], a1, seg(t, 4.6, 6.8), 2410, t);
      dims(ctx, G, 8, 'kapı 1 m × 2 m', [2.2, 1.2], a1 * (1 - seg(t, 28.2, 28.6)) + a1 * win(t, 46.8, 61.8) * 0, t, 11.0);
      // the first way: rectangle, triangle, door
      const r1 = win(t, 29.4, 45.8) * a1, r2 = win(t, 32.6, 45.8) * a1, r3 = win(t, 36.4, 45.8) * a1;
      if (r1 > 0) { const R = f.UP(G, [[0, 0], [8, 0], [8, 3], [0, 3]]); f.fill(ctx, R, r1, 0.22); const c = f.U(G, [5.4, 1.5]); f.T(ctx, '8 × 3 = 24', c[0], c[1], Object.assign({ size: G.s * 0.85, alpha: r1, halo: true }, f.AMB)); }
      if (r2 > 0) { const P = f.UP(G, [[0, 3], [8, 3], [4, 5]]); f.fill(ctx, P, r2, 0.4); const c = f.U(G, [4, 3.7]); f.T(ctx, '8 × 2 ÷ 2 = 8', c[0], c[1], Object.assign({ size: G.s * 0.72, alpha: r2, halo: true }, f.AMB)); }
      if (r3 > 0) { const c = f.U(G, [1.5, 1]); f.crossInk(ctx, c[0], c[1], 20, seg(t, 36.4, 37.0), r3); f.T(ctx, '− 2', c[0], c[1] - 0.72 * G.u, { size: G.s * 0.8, alpha: r3, halo: true }); }
      if (t > 46.8 && t < 61.8) { const c = f.U(G, [5.4, 1.5]); f.T(ctx, '8 × 5 = 40', c[0], c[1], Object.assign({ size: G.s * 0.85, alpha: win(t, 47.4, 61.8) * a1, halo: true }, f.AMB)); }
    }
    // the second wall
    const a2 = win(t, 62.4, 79.8) * END(t);
    if (a2 > 0) {
      wall(ctx, G, 6, [4, 1, 5, 2], a2, seg(t, 62.6, 64.2), 2450, t);
      dims(ctx, G, 6, 'pencere 1 m × 1 m', [3.9, 2.4], a2, t, 63.4);
    }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.8, 10.2, '1 kutu boya 10 m² boyar'], [11.4, 27.8, 'Duvar: dikdörtgen + üçgen · kapı boyanmayacak'],
      [29.4, 45.8, 'Dikdörtgen: 8 × 3 = 24 m² · Üçgen: 8 × 2 ÷ 2 = 8 m²'], [47.4, 61.8, 'Büyük dikdörtgen: 8 × 5 = 40 m²'],
      [64.4, 79.8, '6 × 3 + 6 × 2 ÷ 2 − 1 × 1 = 18 + 6 − 1 = 23 m²']]);
    exprs(ctx, t, at(W, 1), [[8.2, 10.2, 'Kaç kutu gerekir?', true], [15.0, 27.8, 'Verilen: uzunluklar (m) · İstenen: kutu sayısı'],
      [36.4, 45.8, 'Kapı: 1 × 2 = 2 m² · Duvar: 24 + 8 − 2 = 30 m²'], [49.8, 61.8, 'Köşelerdeki iki üçgen: 4 + 4 = 8 m²'],
      [67.6, 79.8, '23 ÷ 10 = 2,3 kutu: 2 kutu yetmez']]);
    exprs(ctx, t, at(W, 2), [[18.6, 21.8, 'Önce alanı (m²), sonra kutu sayısını bul'], [22.2, 27.8, 'Tahmin: 8 × 5 = 40 m²’den az, yani 4 kutudan az', true],
      [39.8, 45.8, '30 ÷ 10 = 3 kutu · tahminle uyumlu', true], [53.4, 61.8, '40 − 8 − 2 = 30 m² · aynı sonuç!', true],
      [70.4, 79.8, 'Kutu sayısı tam olmalı: 3 kutu alınır', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Bileşenleri belirle: şekil, uzunluk, birim', 80.6], ['Tahmin et, parçalara ayır, hesapla', 81.6], ['Başka bir yolla kontrol et', 82.6], ['Sonucu duruma göre yorumla!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A wall to paint', nameTr: 'Boyanacak duvar', concept: 'One can paints 10 m²', conceptTr: '1 kutu 10 m² boyar', render });
})(window.LI = window.LI || {});
