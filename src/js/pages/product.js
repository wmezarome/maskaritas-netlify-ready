import { mountChrome, openCart } from '../chrome.js';
import { addToCart } from '../cart.js';
import { getProductBySlug, sizeStatus, isSoldOut, products } from '../../data/products.js';
import { productGridHtml } from '../product-card.js';
import { formatMXN, escapeHtml } from '../format.js';
import { whatsappUrl, shippingConfig } from '../../data/siteConfig.js';

mountChrome();

// Netlify rewrites /producto/<slug> to this file while keeping the
// pretty URL, so read the slug from the real path (fallback to
// ?slug= for local testing without Netlify's redirect engine).
function getSlug() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const fromPath = pathParts[0] === 'producto' ? pathParts[1] : null;
  return fromPath || new URLSearchParams(window.location.search).get('slug') || '';
}

const slug = getSlug();
const product = getProductBySlug(slug);
const root = document.getElementById('product-root');
const relatedRoot = document.getElementById('related-root');

if (!product) {
  root.innerHTML = `
    <div class="wrap" style="padding-block: var(--space-2xl); text-align:center;">
      <p class="display" style="font-size: var(--step-lg);">PRODUCTO NO ENCONTRADO.</p>
      <p style="margin-top:var(--space-sm); color:var(--ink-70);">Es posible que este producto ya no esté disponible.</p>
      <a href="/shop" class="btn btn-primary" style="margin-top:var(--space-md);">VER CATÁLOGO</a>
    </div>`;
  relatedRoot.style.display = 'none';
} else {
  renderProduct(product);
  renderRelated(product);
}

function renderProduct(p) {
  document.title = `${p.seoTitle || p.shortName}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', p.seoDescription || p.description);

  let selectedSize = p.sizes.find((s) => sizeStatus(p, s) !== 'agotado') || p.sizes[0];
  let qty = 1;
  let activeImage = 0;

  function statusLabel(status) {
    if (status === 'agotado') return 'AGOTADO';
    if (status === 'ultimas') return 'ÚLTIMAS';
    return '';
  }

  function sizePillsHtml() {
    return p.sizes
      .map((s) => {
        const status = sizeStatus(p, s);
        const disabled = status === 'agotado';
        const selected = s === selectedSize;
        return `<button type="button" class="size-pill ${selected ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}" data-size="${escapeHtml(s)}" ${disabled ? 'disabled' : ''}>
          ${escapeHtml(s)}${statusLabel(status) ? `<small>${statusLabel(status)}</small>` : ''}
        </button>`;
      })
      .join('');
  }

  function currentStatus() {
    return sizeStatus(p, selectedSize);
  }

  root.innerHTML = `
    <div class="wrap product-detail">
      <div class="product-gallery">
        <div class="product-gallery__main">
          <img id="gallery-main-img" src="${p.images[activeImage]}" alt="${escapeHtml(p.shortName)}" />
        </div>
        ${
          p.images.length > 1
            ? `<div class="product-gallery__thumbs">
                ${p.images.map((img, i) => `<button data-index="${i}" class="${i === 0 ? 'is-active' : ''}"><img src="${img}" alt="" /></button>`).join('')}
              </div>`
            : ''
        }
      </div>

      <div class="product-info">
        <p class="eyebrow product-info__eyebrow">${escapeHtml(p.sku)}${p.collection ? ` · ${escapeHtml(p.collection)}` : ''}</p>
        <h1 class="display product-info__name">${escapeHtml(p.shortName)}</h1>
        <div class="product-info__price">
          ${p.compareAtPrice ? `<span class="product-info__compare">${formatMXN(p.compareAtPrice)}</span>` : ''}
          ${isSoldOut(p) ? 'AGOTADO' : formatMXN(p.price)}
        </div>
        <p class="product-info__desc">${escapeHtml(p.description)}</p>

        <div class="size-select">
          <div class="size-select__label">
            <span>TALLA</span>
            <span id="size-status" style="color:var(--brown);">${statusLabel(currentStatus())}</span>
          </div>
          <div class="size-select__grid" id="size-grid">${sizePillsHtml()}</div>
        </div>

        <div class="qty-select">
          <button type="button" id="qty-minus" aria-label="Reducir cantidad">−</button>
          <span id="qty-value">1</span>
          <button type="button" id="qty-plus" aria-label="Aumentar cantidad">+</button>
        </div>

        <div class="product-info__ctas">
          <button type="button" id="add-to-bag" class="btn btn-primary" ${isSoldOut(p) ? 'disabled' : ''}>${isSoldOut(p) ? 'AGOTADO' : 'ADD TO BAG'}</button>
          <button type="button" id="buy-now" class="btn btn-secondary" ${isSoldOut(p) ? 'disabled' : ''}>BUY NOW</button>
        </div>
        <p class="product-info__note">Envíos en ${escapeHtml(shippingConfig.zoneLabel)}. ${escapeHtml(shippingConfig.estimatedDays)}.</p>
        <p class="product-info__note"><a href="${whatsappUrl(`Hola Maskaritas, necesito ayuda con ${p.shortName}.`)}" class="link-underline" target="_blank" rel="noopener">¿Dudas sobre este producto? Escríbenos por WhatsApp</a></p>

        <div class="product-accordion">
          <details open>
            <summary>Qué incluye</summary>
            <ul>${(p.contents || []).map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul>
          </details>
          <details>
            <summary>Tallas disponibles</summary>
            <p>${p.sizes.map((s) => `${escapeHtml(s)} (${statusLabel(sizeStatus(p, s)) || 'disponible'})`).join(' · ')}</p>
          </details>
          <details>
            <summary>Entrega</summary>
            <p>${escapeHtml(shippingConfig.notes)}</p>
          </details>
        </div>
      </div>
    </div>
  `;

  const grid = root.querySelector('#size-grid');
  grid.querySelectorAll('.size-pill:not(.is-disabled)').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedSize = btn.dataset.size;
      grid.querySelectorAll('.size-pill').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      root.querySelector('#size-status').textContent = statusLabel(currentStatus());
    });
  });

  root.querySelector('#qty-plus').addEventListener('click', () => {
    qty += 1;
    root.querySelector('#qty-value').textContent = String(qty);
  });
  root.querySelector('#qty-minus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    root.querySelector('#qty-value').textContent = String(qty);
  });

  if (p.images.length > 1) {
    root.querySelectorAll('.product-gallery__thumbs button').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeImage = Number(btn.dataset.index);
        root.querySelector('#gallery-main-img').src = p.images[activeImage];
        root.querySelectorAll('.product-gallery__thumbs button').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  }

  root.querySelector('#add-to-bag').addEventListener('click', () => {
    const result = addToCart(p.slug, selectedSize, qty);
    if (result.ok) openCart();
  });
  root.querySelector('#buy-now').addEventListener('click', () => {
    const result = addToCart(p.slug, selectedSize, qty);
    if (result.ok) window.location.href = '/checkout';
  });
}

function renderRelated(p) {
  const related = products.filter((item) => item.slug !== p.slug && (item.collection === p.collection || item.category === p.category)).slice(0, 4);
  if (!related.length) {
    relatedRoot.style.display = 'none';
    return;
  }
  relatedRoot.innerHTML = `
    <div class="wrap">
      <div class="strip-head">
        <h2 class="display">TAMBIÉN TE PUEDE GUSTAR</h2>
      </div>
      <div class="product-grid">${productGridHtml(related)}</div>
    </div>
  `;
}
