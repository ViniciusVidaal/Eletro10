class Carousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector('.carousel__track');
    this.slides = Array.from(this.track.children);
    this.btnPrev = root.querySelector('.prev');
    this.btnNext = root.querySelector('.next');
    this.dotsContainer = root.querySelector('.carousel__dots');
    this.current = 0;

    this.setup();
    this.bindEvents();
    this.update();
  }

  setup() {
    this.slides.forEach((slide, index) => {
      slide.style.width = `${this.root.clientWidth - 60}px`;
      const dot = document.createElement('button');
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
      dot.addEventListener('click', () => {
        this.current = index;
        this.update(true);
      });
      this.dotsContainer.appendChild(dot);
    });
    window.addEventListener('resize', () => this.update());
  }

  bindEvents() {
    this.btnPrev.addEventListener('click', () => this.prev());
    this.btnNext.addEventListener('click', () => this.next());
  }

  prev() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
    this.update(true);
  }

  next() {
    this.current = (this.current + 1) % this.slides.length;
    this.update(true);
  }

  update(fromControl = false) {
    const slideWidth = this.slides[0].getBoundingClientRect().width + 16;
    this.track.style.transform = `translateX(-${this.current * slideWidth}px)`;
    const dots = this.dotsContainer.querySelectorAll('.carousel__dot');
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === this.current));

    if (!fromControl) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.next(), 5000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const carouselEl = document.getElementById('testimonialCarousel');
  if (carouselEl) {
    const carousel = new Carousel(carouselEl);
    carousel.timer = setTimeout(() => carousel.next(), 5000);
  }
});
