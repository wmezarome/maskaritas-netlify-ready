// MASKARITAS — Product card rendering
// ---------------------------------------------------------------
// One function renders a product card everywhere it appears (home,
// shop, collections, search, related products) so a design change
// only has to happen here.

import { isSoldOut, totalStock } from '../data/products.js';
import { formatMXN, escapeHtml } from './format.js';

function badgeHtml(product) {
  if (isSoldOut(product)) return `<span class="badge badge--out">AGOTADO</span>`;
  if (product.newArrival) return `<span class="badge">NUEVO</span>`;
  if (product.bestSeller) return `<span class="badge badge--accent">BESTSELLER</span>`;
  if (totalStock(product) > 0 && totalStock(product) <= 4) return `<span class="badge">ÚLTIMAS PIEZAS</span>`;
  return '';
}

export function productCardHtml(product) {
  const soldOut = isSoldOut(product);
  return `
    <a class="product-card" href="/producto/${product.slug}" data-product-card>
      <div class="product-card__frame">
        <img src="${product.images[0]}" alt="${escapeHtml(product.shortName)}" loading="lazy" />
        ${badgeHtml(product)}
      </div>
      <div class="product-card__body">
        <div class="product-card__name">${escapeHtml(product.shortName)}</div>
        <div class="product-card__meta">Tallas ${product.sizes.join(', ')}</div>
        <div class="product-card__price">
          ${product.compareAtPrice ? `<span class="product-card__compare">${formatMXN(product.compareAtPrice)}</span>` : ''}
          ${soldOut ? 'AGOTADO' : formatMXN(product.price)}
        </div>
      </div>
    </a>
  `;
}

export function productGridHtml(productList) {
  if (!productList.length) {
    return `
      <div style="grid-column: 1 / -1; text-align:center; padding: var(--space-2xl) 0;">
        <img src="/images/brand/rabbit-hey.png" alt="" style="width:96px; height:auto; margin:0 auto var(--space-sm);" />
        <p class="display" style="font-size: var(--step-lg);">NO LO ENCONTRAMOS.</p>
        <p style="margin-top: var(--space-xs); color: var(--ink-70);">¿Buscas algo en especial?</p>
        <div style="margin-top: var(--space-md); display:flex; gap: var(--space-sm); justify-content:center; flex-wrap:wrap;">
          <a href="/pedido-especial" class="btn btn-primary">SOLICITAR DISFRAZ</a>
          <a href="https://wa.me/529993900333" class="btn btn-secondary" target="_blank" rel="noopener">WHATSAPP</a>
        </div>
      </div>`;
  }
  return productList.map(productCardHtml).join('');
}
