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
