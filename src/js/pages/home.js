import { mountChrome } from '../chrome.js';
import { productGridHtml } from '../product-card.js';
import { escapeHtml } from '../format.js';
import { initHeroSlider, heroSlidesHtml } from '../hero-slider.js';
import {
  getActiveSeason,
  categoryStrip,
  trustStrip,
  whatsappUrl,
} from '../../data/siteConfig.js';
import { getFeaturedProducts, getProductsByCollection } from '../../data/products.js';

mountChrome();

const season = getActiveSeason();
const heroSlides = season.heroSlides && season.heroSlides.length ? season.heroSlides : [{ image: season.heroImage, alt: season.heroImageAlt }];

// ---- 03 Hero ------------------------------------------------
document.getElementById('hero').innerHTML = `
  ${heroSlidesHtml(heroSlides, escapeHtml)}
  <div class="hero__typo display" aria-hidden="true">MASKARITAS</div>
  <div class="hero__content">
    <div>
      <p class="eyebrow hero__eyebrow">${escapeHtml(season.eyebrow)}</p>
      <h1 class="display" style="font-size: var(--step-3xl); margin-top: 0.2em;">
        ${season.headlineLines.map((l) => escapeHtml(l)).join('<br>')}
      </h1>
      <p class="hero__subtitle">${escapeHtml(season.subtitle)}</p>
      <div class="hero__ctas">
        <a class="btn btn-primary" href="${season.primaryCta.href}">${escapeHtml(season.primaryCta.label)}</a>
        <a class="btn btn-ghost" href="${season.secondaryCta.href}">${escapeHtml(season.secondaryCta.label)}</a>
      </div>
    </div>
    <div class="hero__side-label">
      ${season.sideLabel.map((l) => escapeHtml(l)).join('<br>')}
    </div>
  </div>
`;
initHeroSlider(document.getElementById('hero'), heroSlides);

// ---- 04 Category strip ---------------------------------------
document.getElementById('category-strip').innerHTML = `
  <div class="wrap">
    <p class="section-label">EXPLORA</p>
    <div class="category-strip__grid">
      ${categoryStrip
        .map(
          (c) => `
        <a class="category-strip__item" href="${c.href}">
          <img src="${c.image}" alt="" />
          <span class="label display">${escapeHtml(c.label)}</span>
          <span class="copy">${escapeHtml(c.copy)}</span>
        </a>`
        )
        .join('')}
    </div>
  </div>
`;

// ---- 05 Editorial spread --------------------------------------
document.getElementById('editorial-spread').innerHTML = `
  <div class="wrap editorial-spread__grid">
    <div class="editorial-spread__image">
      <img src="${season.editorial.image}" alt="${escapeHtml(season.editorial.imageAlt)}" />
    </div>
    <div>
      <p class="section-label">${escapeHtml(season.editorial.eyebrow)}</p>
      <h2 class="display editorial-spread__headline">${season.editorial.headlineLines.map((l) => escapeHtml(l)).join('<br>')}</h2>
      <p class="editorial-spread__body">${escapeHtml(season.editorial.body)}</p>
      <a class="btn btn-secondary" style="margin-top: var(--space-md);" href="${season.editorial.cta.href}">${escapeHtml(season.editorial.cta.label)}</a>
    </div>
  </div>
`;

// ---- 06 Trust strip --------------------------------------------
document.getElementById('trust-strip').innerHTML = `
  <div class="wrap trust-strip__grid">
    ${trustStrip
      .map(
        (t) => `
      <div class="trust-strip__item">
        <h3>${escapeHtml(t.title)}</h3>
        <p>${escapeHtml(t.copy)}</p>
      </div>`
      )
      .join('')}
  </div>
`;

// ---- 07 Featured products ---------------------------------------
const featured = getFeaturedProducts(season.featuredProductSlugs);
document.getElementById('featured-products').innerHTML = `
  <div class="wrap">
    <div class="strip-head">
      <h2 class="display">THE MASKARITAS EDIT</h2>
      <a href="/shop" class="link-underline" style="font-size: var(--step-xs); font-weight:600;">VER TODO</a>
    </div>
    <div class="product-grid">${productGridHtml(featured)}</div>
  </div>
`;

// ---- 08 Kids editorial feature ------------------------------------
document.getElementById('kids-feature').innerHTML = `
  <div class="wrap kids-feature__grid">
    <div>
      <p class="section-label">NIÑOS</p>
      <h2 class="display kids-feature__headline">SMALL COSTUMES.<br>BIG STORIES.</h2>
      <p class="kids-feature__body">Nuestra categoría más fuerte: disfraces infantiles en tallas 4 a 12, pensados para que cada niño cuente su propio personaje.</p>
      <a class="btn btn-primary" style="margin-top: var(--space-md);" href="/ninos">VER NIÑOS</a>
    </div>
    <div class="kids-feature__image">
      <img src="/images/products/demo-001-a.svg" alt="Disfraces infantiles Maskaritas" />
    </div>
  </div>
`;

// ---- 09 Héroes + Princesas -----------------------------------------
const heroesProducts = getProductsByCollection('heroes-princesas');
document.getElementById('heroes-strip').innerHTML = `
  <div class="wrap">
    <div class="strip-head">
      <h2 class="display">HÉROES + PRINCESAS</h2>
      <a href="/colecciones/heroes-princesas" class="link-underline" style="font-size: var(--step-xs); font-weight:600;">VER COLECCIÓN</a>
    </div>
    <div class="product-grid">${productGridHtml(heroesProducts)}</div>
  </div>
`;

// ---- 10 Accessories -----------------------------------------------
const accessoryProducts = getProductsByCollection('heroes-princesas').filter((p) => p.category === 'accesorios');
document.getElementById('accessories-strip').innerHTML = `
  <div class="wrap">
    <div class="strip-head">
      <h2 class="display">COMPLETA EL LOOK</h2>
      <a href="/accesorios" class="link-underline" style="font-size: var(--step-xs); font-weight:600;">VER ACCESORIOS</a>
    </div>
    <div class="product-grid">${productGridHtml(accessoryProducts)}</div>
  </div>
`;

// ---- 11 Calzado ------------------------------------------------------
const calzadoProducts = getProductsByCollection('').filter((p) => p.category === 'calzado');
document.getElementById('calzado-strip').innerHTML = `
  <div class="wrap">
    <div class="strip-head">
      <h2 class="display">CALZADO / CHEMISES</h2>
      <a href="/calzado" class="link-underline" style="font-size: var(--step-xs); font-weight:600;">VER CALZADO</a>
    </div>
    <div class="product-grid">${productGridHtml(calzadoProducts)}</div>
  </div>
`;

// ---- 12 Special request ---------------------------------------------
document.getElementById('special-request').innerHTML = `
  <div class="wrap">
    <div class="special-request__inner">
      <p class="section-label" style="color: var(--stone);">¿NO LO ENCONTRASTE?</p>
      <h2 class="display">CUÉNTANOS QUÉ ESTÁS BUSCANDO.</h2>
      <p>¿Buscas un personaje, talla o disfraz que no aparece en nuestro catálogo? Trataremos de conseguirlo especialmente para ti.</p>
      <div class="special-request__ctas">
        <a class="btn btn-ghost" href="/pedido-especial">SOLICITAR DISFRAZ</a>
        <a class="btn btn-ghost" href="${whatsappUrl('Hola Maskaritas, necesito ayuda con una compra.')}" target="_blank" rel="noopener">WHATSAPP</a>
      </div>
    </div>
  </div>
`;

// ---- 13 Customer care -------------------------------------------------
document.getElementById('care-strip').innerHTML = `
  <div class="wrap care-strip__grid">
    <div class="care-strip__item">
      <h3>Envíos en Mérida</h3>
      <p>Compra en línea y recibe en casa. <a class="link-underline" href="/envios">Ver detalles</a></p>
    </div>
    <div class="care-strip__item">
      <h3>Pedidos especiales</h3>
      <p>¿No encontraste tu talla o personaje? <a class="link-underline" href="/pedido-especial">Solicítalo aquí</a></p>
    </div>
    <div class="care-strip__item">
      <h3>Ayuda personal</h3>
      <p>Estamos en WhatsApp para resolver tus dudas. <a class="link-underline" href="${whatsappUrl()}" target="_blank" rel="noopener">Escríbenos</a></p>
    </div>
  </div>
`;
