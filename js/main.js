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
// Barre de progression du scroll + ombre de la nav
// ============================================

(function () {
  var bar = document.querySelector('.scroll-progress');
  var nav = document.querySelector('.nav');

  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (bar) bar.style.width = pct + '%';
    if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 10);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Le curseur personnalisé est désormais un simple curseur natif SVG (voir CSS) :
// flèche bleue, pas de JS, pas de latence.

// ============================================
// Lightbox vidéo : agrandir une démo en plein écran pour la lire en grand
// ============================================

(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lbVideo = lightbox.querySelector('.lightbox__video');
  var closeBtn = lightbox.querySelector('.lightbox__close');
  var lastFocused = null;

  function open(src) {
    lastFocused = document.activeElement;
    // Mettre en pause les vidéos des cartes
    document.querySelectorAll('.card__video').forEach(function (v) { v.pause(); });
    lbVideo.src = src;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbVideo.load();
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.card__expand').forEach(function (btn) {
    btn.addEventListener('click', function () {
      open(btn.getAttribute('data-video'));
    });
  });

  closeBtn.addEventListener('click', close);

  // Clic sur le fond (hors vidéo) ferme
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox__inner')) close();
  });

  // Touche Échap ferme
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
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
