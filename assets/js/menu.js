const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });

  if (closeMenu) {
    closeMenu.addEventListener('click', () => {
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}
