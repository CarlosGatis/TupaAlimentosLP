// Header hide on scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const current = window.pageYOffset;
  if (Math.abs(current - lastScroll) < 10) return;
  if (current > lastScroll && current > 100) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScroll = current;
});

// ---- MINI CARROSSEL DO HERO (auto) ----
(function () {
  const INTERVAL = 3800;
  const heroTrack = document.getElementById('heroTrack');
  const heroDotsEl = document.getElementById('heroDots');
  const progressBar = document.getElementById('heroProgressBar');

  if (!heroTrack) return;

  const heroSlides = heroTrack.querySelectorAll('.hero-slide');
  const heroDotsList = heroDotsEl.querySelectorAll('.hero-dot');
  let heroIndex = 0;
  let timer = null;
  let progressAnim = null;

  function heroGoTo(index) {
    heroSlides[heroIndex].classList.remove('active');
    heroDotsList[heroIndex].classList.remove('active');

    heroIndex = (index + heroSlides.length) % heroSlides.length;

    heroSlides[heroIndex].classList.add('active');
    heroDotsList[heroIndex].classList.add('active');
    heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;

    startProgress();
  }

  function startProgress() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressBar.style.transition = `width ${INTERVAL}ms linear`;
        progressBar.style.width = '100%';
      });
    });
  }

  function startAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => heroGoTo(heroIndex + 1), INTERVAL);
  }

  heroDotsList.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      heroGoTo(i);
      startAuto();
    });
  });

  heroSlides[0].classList.add('active');
  startProgress();
  startAuto();
})();

// Carousel
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const infos = document.querySelectorAll('.produto-info');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let activeIndex = 0;
const total = slides.length;

function goTo(index) {
  slides[activeIndex].classList.remove('active');
  dots[activeIndex].classList.remove('active');
  infos[activeIndex].classList.remove('active');

  activeIndex = (index + total) % total;

  slides[activeIndex].classList.add('active');
  dots[activeIndex].classList.add('active');
  infos[activeIndex].classList.add('active');

  track.style.transform = `translateX(-${activeIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

dots.forEach(dot => {
  dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
});

// Swipe support mobile
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? activeIndex + 1 : activeIndex - 1);
});
