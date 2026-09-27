/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '1 kutu 10 m² boyar. Kaç kutu gerekir?', en: 'One can paints 10 m². How many cans?',
      note: 'Evin ön duvarı boyanacak. Bir kutu boya 10 metrekarelik yeri boyuyor. Kaç kutu boya almalıyız?' },
    { scene: 2, start: 10.8, end: 18.4, tr: 'Duvar: dikdörtgen + üçgen, kapı hariç', en: 'The wall: a rectangle plus a triangle, minus the door',
      note: 'Önce problemi anlayalım. Duvar, 8 metreye 3 metrelik bir dikdörtgen ile tepede yüksekliği 2 metre olan bir üçgenden oluşuyor. 1 metreye 2 metrelik kapı boyanmayacak.' },
    { scene: 2, start: 18.8, end: 27.8, tr: 'Tahmin: 40 m²’den az, 4 kutudan az', en: 'Estimate: under 40 m², under 4 cans',
      note: 'Önce alanı metrekare olarak, sonra kutu sayısını bulacağız. Bir tahmin yapalım: duvar 8’e 5’lik dikdörtgenin içine sığıyor, yani 40 metrekareden az. 4 kutudan az boya yeter.' },
    { scene: 3, start: 28.6, end: 38.4, tr: 'Dikdörtgen 24, üçgen 8, kapı 2', en: 'Rectangle 24, triangle 8, door 2',
      note: 'Duvarı parçalara ayıralım. Dikdörtgen 8 çarpı 3, 24 metrekare. Üçgen 8 çarpı 2 bölü 2, 8 metrekare. Kapı 1 çarpı 2, 2 metrekare; onu çıkaracağız.' },
    { scene: 3, start: 38.8, end: 45.8, tr: '30 m² → 3 kutu', en: '30 m² means 3 cans',
      note: '24 artı 8 eksi 2, 30 metrekare. 30 bölü 10, 3 kutu. Tahminimizle de uyumlu: 4’ten az.' },
    { scene: 4, start: 46.6, end: 53.2, tr: 'Büyük dikdörtgen 40, köşeler 8', en: 'Big rectangle 40, corners 8',
      note: 'Başka bir yolla kontrol edelim. Duvarı 8’e 5’lik büyük bir dikdörtgenin içine koyalım: 40 metrekare. Üst köşelerde boş kalan iki üçgen 4’er metrekare, toplam 8.' },
    { scene: 4, start: 53.6, end: 61.8, tr: '40 − 8 − 2 = 30 m²: aynı sonuç', en: '40 − 8 − 2 = 30 m²: the same answer',
      note: '40 eksi 8 eksi kapının 2 metrekaresi: yine 30 metrekare. İki yol aynı sonuca vardı.' },
    { scene: 5, start: 62.6, end: 69.8, tr: 'Başka bir duvar: 23 m²', en: 'Another wall: 23 m²',
      note: 'Aynı stratejiyi başka bir duvarda deneyelim: 6 metre genişlik, pencere 1’e 1. Dikdörtgen 18, üçgen 6, pencere 1: 23 metrekare.' },
    { scene: 5, start: 70.2, end: 79.8, tr: '2,3 kutu olmaz: 3 kutu alınır', en: '2.3 cans is not possible: buy 3',
      note: '23 bölü 10, 2,3 kutu. Ama 2,3 kutu satın alamayız ve 2 kutu yetmez. Kutu sayısını yukarı yuvarlarız: 3 kutu.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Belirle, tahmin et, ayır, kontrol et', en: 'Identify, estimate, split, check',
      note: 'Aklında kalsın: bileşenleri belirle, tahmin et, şekli parçalara ayırıp hesapla, başka bir yolla kontrol et.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Sonucu duruma göre yorumla!', en: 'Make the answer fit the situation!',
      note: 'Ve sonucu duruma göre yorumla: yarım kutu boya satılmaz!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
