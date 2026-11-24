const nav = document.querySelector('nav');
const sections = [...document.querySelectorAll('main section')];
const links = [...nav.querySelectorAll('a[href^="#"]')];

function show() {
  const id = (location.hash || '#accueil').slice(1);
  const target = sections.find(s => s.id === id) || sections[0];
  sections.forEach(s => s.classList.toggle('show', s === target));
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + target.id));
  document.title = (target.querySelector('h1')?.textContent || 'Spade') + ' — Royaume de Spade';
  window.scrollTo(0, 0);
  nav.classList.remove('open');
}
addEventListener('hashchange', show);
document.querySelector('.menu').addEventListener('click', () => nav.classList.toggle('open'));
show();
