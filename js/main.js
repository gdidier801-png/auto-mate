// ============================================
// Auto-mate — animations au scroll
// Fade-in + slide-up via Intersection Observer (pas de librairie)
// ============================================

(function () {
  var reveals = document.querySelectorAll('.reveal');

  // Fallback : si le navigateur ne supporte pas IntersectionObserver, tout afficher
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animer une seule fois
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(function (el) { observer.observe(el); });
})();

// ============================================
// Barre de progression du scroll (haut de page)
// ============================================

(function () {
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ============================================
// Effet tilt 3D léger sur les cartes (desktop, souris uniquement)
// ============================================

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduceMotion || !hasPointer) return;

  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 → 0.5
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        'perspective(900px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 4) + 'deg) translateY(-2px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();
