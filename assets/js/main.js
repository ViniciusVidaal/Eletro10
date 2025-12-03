// Smooth scroll control with header offset and future utilities.
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', evt => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      evt.preventDefault();
      const offset = header ? header.offsetHeight + 8 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
