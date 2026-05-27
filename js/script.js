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
