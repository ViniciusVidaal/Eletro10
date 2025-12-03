const animatedItems = document.querySelectorAll('.fade-in-up, .slide-left, .slide-right');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedItems.forEach(el => observer.observe(el));
