// ============================================
// Page détail des automatisations
// Bascule entre les 4 automatisations via le hash (#relances, etc.)
// sans recharger la page.
// ============================================

(function () {
  var panes = document.querySelectorAll('.case[data-pane]');
  var tabs = document.querySelectorAll('.subnav__tab');
  var titles = {
    'relances': 'Relances de paiement',
    'rendez-vous': 'Rendez-vous découverte',
    'onboarding': 'Onboarding client',
    'personnalisee': 'Automatisation sur mesure'
  };
  var DEFAULT = 'relances';

  function currentId() {
    var id = (location.hash || '').replace('#', '');
    return titles[id] ? id : DEFAULT;
  }

  function show(id, doScroll) {
    // Panneaux
    panes.forEach(function (p) {
      var match = p.getAttribute('data-pane') === id;
      p.hidden = !match;
      if (!match) {
        // Mettre en pause la vidéo des panneaux cachés
        var v = p.querySelector('video');
        if (v) v.pause();
      }
    });
    // Onglets actifs
    tabs.forEach(function (t) {
      t.classList.toggle('is-active', t.getAttribute('data-id') === id);
    });
    // Titre de l'onglet du navigateur
    document.title = titles[id] + ' — auto-mate';

    if (doScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Au chargement
  show(currentId(), false);

  // Au changement de hash (clic sur un onglet ou bouton retour navigateur)
  window.addEventListener('hashchange', function () {
    show(currentId(), true);
  });
})();

// ============================================
// Barre de progression du scroll + ombre de la nav (repris de main.js)
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
