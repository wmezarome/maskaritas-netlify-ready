// MASKARITAS — Hero slider
// ---------------------------------------------------------------
// A restrained, editorial crossfade slider for the homepage hero.
// Deliberately simple: no libraries, no bounce/zoom gimmicks — just
// a slow, elegant fade between campaign images, with arrows, dots,
// autoplay (paused on hover/focus), and touch swipe on mobile.

export function initHeroSlider(container, slides, { interval = 6000 } = {}) {
  if (!slides || slides.length <= 1) return;

  let current = 0;
  let timer = null;

  const imgs = Array.from(container.querySelectorAll('.hero__slide'));
  const dotsWrap = container.querySelector('.hero__dots');
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('button')) : [];

  function show(index) {
    current = (index + slides.length) % slides.length;
    imgs.forEach((img, i) => img.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function start() {
    stop();
    timer = window.setInterval(next, interval);
  }
  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  container.querySelector('.hero__arrow--prev')?.addEventListener('click', () => { prev(); start(); });
  container.querySelector('.hero__arrow--next')?.addEventListener('click', () => { next(); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));

  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);
  container.addEventListener('focusin', stop);
  container.addEventListener('focusout', start);

  // Touch swipe
  let touchStartX = null;
  container.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; stop(); }, { passive: true });
  container.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    touchStartX = null;
    start();
  }, { passive: true });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    start();
  }
}

export function heroSlidesHtml(slides, escapeHtml, { flat = false } = {}) {
  return `
    ${slides
      .map((s, i) => {
        const img = `<img class="hero__slide ${i === 0 ? 'is-active' : ''}" src="${s.image}" alt="${escapeHtml(s.alt)}" ${i === 0 ? '' : 'loading="lazy"'} />`;
        // Flat slides are pre-designed graphics (headline/CTA already
        // baked into the image) — the whole slide becomes one link,
        // and the site adds no text of its own on top.
        return flat && s.href ? `<a class="hero__slide-link" href="${s.href}" aria-label="${escapeHtml(s.alt)}">${img}</a>` : img;
      })
      .join('')}
      .join('')}
    ${
      slides.length > 1
        ? `<button class="hero__arrow hero__arrow--prev" aria-label="Imagen anterior">&#8249;</button>
           <button class="hero__arrow hero__arrow--next" aria-label="Imagen siguiente">&#8250;</button>
           <div class="hero__dots" role="tablist" aria-label="Seleccionar imagen">
             ${slides.map((_, i) => `<button class="${i === 0 ? 'is-active' : ''}" aria-label="Imagen ${i + 1}"></button>`).join('')}
           </div>`
        : ''
    }
  `;
}
