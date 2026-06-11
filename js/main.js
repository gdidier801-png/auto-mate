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

// ============================================
// Curseur personnalisé : point + anneau + traînée qui s'efface
// Desktop uniquement (souris précise), désactivé si reduced-motion
// ============================================

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduceMotion || !hasPointer) return;

  document.body.classList.add('custom-cursor');

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mouseX = -100, mouseY = -100; // hors écran au départ
  var ringX = -100, ringY = -100;
  var lastTrail = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) translate(-50%,-50%)';

    // Traînée : un point max toutes les 28 ms, qui s'efface tout seul
    var now = performance.now();
    if (now - lastTrail > 28) {
      lastTrail = now;
      var t = document.createElement('div');
      t.className = 'cursor-trail';
      t.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) translate(-50%,-50%)';
      document.body.appendChild(t);
      t.addEventListener('animationend', function () { t.remove(); });
    }
  }, { passive: true });

  // L'anneau suit avec un léger retard (interpolation)
  (function follow() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)';
    requestAnimationFrame(follow);
  })();

  // Anneau agrandi sur les éléments cliquables, curseur natif sur les vidéos
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a, button, .btn')) ring.classList.add('is-hovering');
    if (e.target.closest('video')) document.body.classList.add('cursor-hidden');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest('a, button, .btn')) ring.classList.remove('is-hovering');
    if (e.target.closest('video')) document.body.classList.remove('cursor-hidden');
  });

  // Masquer quand la souris quitte la fenêtre
  document.addEventListener('mouseleave', function () {
    document.body.classList.add('cursor-hidden');
  });
  document.addEventListener('mouseenter', function () {
    document.body.classList.remove('cursor-hidden');
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
