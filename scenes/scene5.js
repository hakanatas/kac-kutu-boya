/* SAHNE 5 — BAŞKA BİR DUVAR (62–80 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 62, end: 80, name: 'Another wall', nameTr: 'Başka bir duvar', concept: '2.3 cans means 3', conceptTr: '2,3 kutu → 3 kutu', render });
})(window.LI = window.LI || {});
