const nav = document.querySelector('nav');
const sections = [...document.querySelectorAll('main section')];
const links = [...nav.querySelectorAll('a[href^="#"]')];

// scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
function reveal(sec) {
  [...sec.querySelectorAll('.card,blockquote,h2,.pyr div,tr,ol.tl li')].filter(el => !el.closest('details')).forEach((el, i) => {
    el.classList.remove('in'); el.classList.add('rv'); el.style.transitionDelay = (i % 6) * 50 + 'ms'; io.observe(el);
  });
}

function show() {
  const id = (location.hash || '#accueil').slice(1);
  const target = sections.find(s => s.id === id) || sections[0];
  sections.forEach(s => s.classList.toggle('show', s === target));
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + target.id));
  document.title = (target.querySelector('h1')?.textContent || 'Spade') + ' — Royaume de Spade';
  window.scrollTo(0, 0);
  nav.classList.remove('open');
  reveal(target);
  if (target.id.startsWith('pole')) nav.querySelector('.navd').open = true;
}
// pages de pôle : tout ouvrir / tout fermer
document.querySelectorAll('.acc-all').forEach(btn => btn.addEventListener('click', () => {
  const list = [...btn.closest('section').querySelectorAll('details.acc')];
  const open = !list.every(d => d.open);
  list.forEach(d => d.open = open);
  btn.textContent = open ? 'Tout fermer' : 'Tout ouvrir';
}));
addEventListener('hashchange', show);
document.querySelector('.menu').addEventListener('click', () => nav.classList.toggle('open'));
show();

// embers / ash canvas
(() => {
  const c = document.getElementById('fx'), x = c.getContext('2d');
  let w, h, ps = [];
  const rs = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  rs(); addEventListener('resize', rs);
  const mk = () => ({ x: Math.random() * w, y: h + 10, r: Math.random() * 2.2 + .4, v: Math.random() * .8 + .25, d: Math.random() * 2 * Math.PI, red: Math.random() < .7 });
  for (let i = 0; i < 70; i++) { const p = mk(); p.y = Math.random() * h; ps.push(p); }
  (function loop() {
    x.clearRect(0, 0, w, h);
    for (const p of ps) {
      p.y -= p.v; p.d += .01; p.x += Math.sin(p.d) * .5;
      const a = Math.min(1, p.y / h * 1.4);
      x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7);
      x.fillStyle = p.red ? `rgba(255,${60 + p.r * 30 | 0},80,${a * .8})` : `rgba(230,200,140,${a * .6})`;
      x.shadowBlur = 10; x.shadowColor = p.red ? '#ff3d5a' : '#d4af6a';
      x.fill();
      if (p.y < -10) Object.assign(p, mk());
    }
    requestAnimationFrame(loop);
  })();
})();
