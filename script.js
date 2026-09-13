(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav: sombra al hacer scroll y enlace activo por sección */
  var nav = document.querySelector('.nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* Revelado por scroll, escalonado entre hermanos */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    items.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.hasAttribute('data-reveal'); });
      var i = sibs.indexOf(el);
      el.style.transitionDelay = (Math.min(i, 6) * 90) + 'ms';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Desplegables con altura animada */
  document.querySelectorAll('details').forEach(function (d) {
    var s = d.querySelector('summary');
    var body = document.createElement('div');
    body.className = 'faq-body';
    while (s.nextSibling) body.appendChild(s.nextSibling);
    d.appendChild(body);
    if (d.open) d.classList.add('is-open');
    var busy = false;
    s.addEventListener('click', function (e) {
      e.preventDefault();
      if (busy) return;
      if (reduce) { d.open = !d.open; d.classList.toggle('is-open', d.open); return; }
      busy = true;
      var ease = 'height .5s cubic-bezier(.4,0,.2,1), opacity .4s ease';
      if (d.open) {
        d.classList.remove('is-open');
        body.style.height = body.offsetHeight + 'px';
        body.style.overflow = 'hidden';
        requestAnimationFrame(function () {
          body.style.transition = ease; body.style.height = '0px'; body.style.opacity = '0';
        });
        body.addEventListener('transitionend', function end() {
          body.removeEventListener('transitionend', end);
          d.open = false; body.style.cssText = ''; busy = false;
        });
      } else {
        d.open = true; d.classList.add('is-open');
        var h = body.offsetHeight;
        body.style.height = '0px'; body.style.opacity = '0'; body.style.overflow = 'hidden';
        requestAnimationFrame(function () {
          body.style.transition = ease; body.style.height = h + 'px'; body.style.opacity = '1';
        });
        body.addEventListener('transitionend', function end() {
          body.removeEventListener('transitionend', end);
          body.style.cssText = ''; busy = false;
        });
      }
    });
  });

  /* Hero: frases de manual que rotan */
  var sp = document.querySelector('.specimen');
  if (sp && !reduce) {
    var lines = [
      ['"I\'m only telling you this because I care about you."', 'Tactic 07 · Concern as leverage'],
      ['"After everything I\'ve done for you."', 'Tactic 12 · The invoice'],
      ['"You\'re too smart to fall for something like that."', 'Tactic 19 · Flattery as a blindfold'],
      ['"I never said that. You\'re remembering it wrong."', 'Tactic 03 · Rewriting the record'],
      ['"It\'s fine. Do whatever you want."', 'Tactic 24 · The withdrawn permission']
    ];
    var q = sp.querySelector('.specimen-q'), t = sp.querySelector('.specimen-t'), k = 0;
    setInterval(function () {
      sp.classList.add('fade');
      setTimeout(function () {
        k = (k + 1) % lines.length; q.textContent = lines[k][0]; t.textContent = lines[k][1];
        sp.classList.remove('fade');
      }, 650);
    }, 5200);
  }

  /* Tarjetas: el brillo sigue al ratón */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
    var hero = document.querySelector('.hero');
    if (hero) hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--hx', ((e.clientX - r.left) / r.width * 100) + '%');
      hero.style.setProperty('--hy', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }
})();
