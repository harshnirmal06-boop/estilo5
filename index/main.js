// ESTILO: small interactions. Content is visible by default; if this script ever fails, nothing is hidden.
(function () {
  var nav = document.querySelector('.nav'), menu = document.querySelector('.menu'), list = document.querySelector('.nav ul');
  var prog = document.querySelector('.prog');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.setProperty('--p', h > 0 ? Math.min(window.scrollY / h, 1) : 0);
  }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  function close() { menu.setAttribute('aria-expanded', 'false'); list.classList.remove('open'); }
  menu.addEventListener('click', function () {
    var open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open)); list.classList.toggle('open', !open);
  });
  list.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // Scroll reveal: only elements currently below the screen get hidden, then fade in when reached.
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove('hide'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('hide'); io.observe(el); }
    });
  }
  // Hero photos drift gently with the mouse (desktop only, skipped when reduced motion is on)
  var hero = document.querySelector('.hero'), col = document.querySelector('.collage');
  if (hero && col && window.matchMedia('(hover:hover)').matches && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      col.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      col.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  }
  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
