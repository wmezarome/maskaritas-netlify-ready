// MASKARITAS — Shared site chrome
// ---------------------------------------------------------------
// Every page calls mountChrome() once. It renders the announcement
// bar, header, mobile menu, footer, WhatsApp button and cart drawer
// from the SAME markup and the SAME data (siteConfig.js), so a
// change here applies to the whole site at once.

import {
  announcementBar,
  navShop,
  navCollections,
  navComplete,
  whatsappUrl,
  whatsappNumber,
} from '../data/siteConfig.js';
import { cartCount, cartDetails, cartSubtotal, updateQty, removeFromCart } from './cart.js';
import { formatMXN, escapeHtml } from './format.js';

const WHATSAPP_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.37-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36h.55c.18 0 .42-.02.65.5.24.55.8 1.9.87 2.04.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.2.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.26.13.44.2.5.31.06.12.06.68-.18 1.35Z"/></svg>`;

function collectionsMenuHtml() {
  return navCollections.map((c) => `<li><a href="${c.href}" class="link-underline">${escapeHtml(c.label)}</a></li>`).join('');
}

// ------------------------------------------------------------
// Announcement bar
// ------------------------------------------------------------
function renderAnnouncement() {
  const el = document.getElementById('app-announcement');
  if (!el) return;
  el.className = 'announce';
  el.innerHTML = `${escapeHtml(announcementBar.text)} <a href="${announcementBar.linkUrl}" target="_blank" rel="noopener">${escapeHtml(announcementBar.linkLabel)}</a>`;
}

// ------------------------------------------------------------
// Header
// ------------------------------------------------------------
function renderHeader() {
  const el = document.getElementById('app-header');
  if (!el) return;
  el.className = 'site-header';
  el.innerHTML = `
    <div class="wrap site-header__row">
      <nav class="site-header__nav" aria-label="Navegación principal">
        <a href="/shop" class="link-underline">SHOP</a>
        <div class="has-dropdown">
          <a href="/colecciones/halloween" class="link-underline">COLECCIONES</a>
        </div>
        <a href="/ninos" class="link-underline">NIÑOS</a>
        <a href="/accesorios" class="link-underline">ACCESORIOS</a>
      </nav>
      <button class="site-header__menu-btn" id="menu-btn" aria-label="Abrir menú" aria-expanded="false">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" stroke-width="1.4"/></svg>
      </button>
      <a href="/" class="site-header__wordmark">
        <img src="/images/logo/icon-mark-header.png" alt="" class="site-header__logo-icon" />
        <span>Maskaritas</span>
      </a>
      <div class="site-header__actions">
        <button class="site-header__icon-btn" id="search-btn" aria-label="Buscar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M12.5 12.5 17 17" stroke="currentColor" stroke-width="1.4"/></svg>
          <span class="site-header__label">Buscar</span>
        </button>
        <a class="site-header__icon-btn" href="${whatsappUrl('Hola Maskaritas, necesito ayuda con una compra.')}" target="_blank" rel="noopener" aria-label="WhatsApp">
          ${WHATSAPP_ICON.replace('currentColor', 'currentColor')}
          <span class="site-header__label">WhatsApp</span>
        </a>
        <button class="site-header__icon-btn" id="bag-btn" aria-label="Ver bolsa">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 6h10l-.7 8.5a1 1 0 0 1-1 .9H5.7a1 1 0 0 1-1-.9L4 6Z" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" stroke-width="1.3"/></svg>
          <span class="site-header__bag-count" id="bag-count">0</span>
        </button>
      </div>
    </div>
    <div class="wrap" id="search-panel" style="display:none; padding-bottom: var(--space-sm);">
      <form id="search-form" role="search">
        <input type="search" name="q" placeholder="Buscar: vampiro, princesa, chemise…" aria-label="Buscar productos" style="width:100%; padding:0.9em 1em; border:1px solid var(--stone); background:var(--white);" />
      </form>
    </div>
  `;

  document.getElementById('search-btn').addEventListener('click', () => {
    const panel = document.getElementById('search-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') panel.querySelector('input').focus();
  });
  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = new FormData(e.target).get('q');
    if (q && q.trim()) window.location.href = `/shop?q=${encodeURIComponent(q.trim())}`;
  });
  document.getElementById('bag-btn').addEventListener('click', openCart);
  document.getElementById('menu-btn').addEventListener('click', openMobileMenu);
}

// ------------------------------------------------------------
// Mobile menu
// ------------------------------------------------------------
function renderMobileMenu() {
  const el = document.createElement('div');
  el.className = 'mobile-menu';
  el.id = 'mobile-menu';
  el.innerHTML = `
    <div class="mobile-menu__top">
      <span class="site-header__wordmark" style="font-size: var(--step-md);">
        <img src="/images/logo/icon-mark-header.png" alt="" class="site-header__logo-icon" style="width:24px; height:24px;" />
        <span>Maskaritas</span>
      </span>
      <button id="mobile-menu-close" aria-label="Cerrar menú" style="font-size: 1.6rem; line-height:1;">&times;</button>
    </div>
    <ul class="mobile-menu__list">
      <li><a href="/shop">Shop</a></li>
      <li><a href="/colecciones/halloween">Halloween</a></li>
      <li><a href="/ninos">Niños</a></li>
      <li><a href="/colecciones/heroes-princesas">Héroes + Princesas</a></li>
      <li><a href="/accesorios">Accesorios</a></li>
      <li><a href="/calzado">Calzado / Chemises</a></li>
      <li><a href="/adultos">Adultos</a></li>
    </ul>
    <div class="mobile-menu__foot">
      <a href="${whatsappUrl('Hola Maskaritas, necesito ayuda con una compra.')}" class="btn btn-secondary" target="_blank" rel="noopener">WhatsApp</a>
      <a href="/faq" class="link-underline" style="font-size: var(--step-xs);">Preguntas frecuentes</a>
    </div>
  `;
  document.body.appendChild(el);
  el.querySelector('#mobile-menu-close').addEventListener('click', closeMobileMenu);
}

function openMobileMenu() {
  document.getElementById('mobile-menu').classList.add('is-open');
  document.getElementById('menu-btn').setAttribute('aria-expanded', 'true');
}
function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('is-open');
  document.getElementById('menu-btn').setAttribute('aria-expanded', 'false');
}

// ------------------------------------------------------------
// WhatsApp floating button
// ------------------------------------------------------------
function renderWhatsappFab() {
  const el = document.createElement('a');
  el.className = 'whatsapp-fab';
  el.href = whatsappUrl('Hola Maskaritas, necesito ayuda con una compra.');
  el.target = '_blank';
  el.rel = 'noopener';
  el.innerHTML = `${WHATSAPP_ICON}<span>WhatsApp</span>`;
  document.body.appendChild(el);
}

// ------------------------------------------------------------
// Cart drawer
// ------------------------------------------------------------
function renderCartShell() {
  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cart-overlay';
  const drawer = document.createElement('aside');
  drawer.className = 'cart-drawer';
  drawer.id = 'cart-drawer';
  drawer.setAttribute('aria-label', 'Bolsa de compra');
  drawer.innerHTML = `
    <div class="cart-drawer__head">
      <span>Tu bolsa</span>
      <button id="cart-close" aria-label="Cerrar bolsa" style="font-size:1.5rem; line-height:1;">&times;</button>
    </div>
    <div class="cart-drawer__items" id="cart-items"></div>
    <div class="cart-drawer__foot" id="cart-foot"></div>
  `;
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
  overlay.addEventListener('click', closeCart);
  drawer.querySelector('#cart-close').addEventListener('click', closeCart);
  renderCartContents();
}

function renderCartContents() {
  const items = document.getElementById('cart-items');
  const foot = document.getElementById('cart-foot');
  if (!items || !foot) return;
  const lines = cartDetails();

  if (!lines.length) {
    items.innerHTML = `<div class="cart-drawer__empty">Tu bolsa está vacía.<br><a href="/shop" class="link-underline">Ver catálogo</a></div>`;
    foot.innerHTML = '';
    return;
  }

  items.innerHTML = lines
    .map(
      (l) => `
    <div class="cart-line" data-slug="${l.slug}" data-size="${escapeHtml(l.size)}">
      <img src="${l.product.images[0]}" alt="${escapeHtml(l.product.shortName)}" />
      <div>
        <div class="cart-line__name">${escapeHtml(l.product.shortName)}</div>
        <div class="cart-line__meta">Talla ${escapeHtml(l.size)}</div>
        <div class="cart-line__qty">
          <button class="cart-qty-minus" aria-label="Reducir cantidad">−</button>
          <span>${l.qty}</span>
          <button class="cart-qty-plus" aria-label="Aumentar cantidad">+</button>
        </div>
        <button class="cart-line__remove">Eliminar</button>
      </div>
      <div class="cart-line__price">${formatMXN(l.lineTotal)}</div>
    </div>`
    )
    .join('');

  foot.innerHTML = `
    <div class="cart-drawer__subtotal"><span>Subtotal</span><span>${formatMXN(cartSubtotal())}</span></div>
    <a href="/checkout" class="btn btn-primary btn-block">FINALIZAR COMPRA</a>
    <div class="cart-drawer__help">¿Necesitas ayuda con tu pedido? <a href="${whatsappUrl('Hola Maskaritas, necesito ayuda con mi pedido.')}" class="link-underline" target="_blank" rel="noopener">WhatsApp</a></div>
  `;

  items.querySelectorAll('.cart-line').forEach((line) => {
    const slug = line.dataset.slug;
    const size = line.dataset.size;
    line.querySelector('.cart-qty-plus').addEventListener('click', () => {
      const current = cartDetails().find((l) => l.slug === slug && l.size === size);
      updateQty(slug, size, (current?.qty || 0) + 1);
    });
    line.querySelector('.cart-qty-minus').addEventListener('click', () => {
      const current = cartDetails().find((l) => l.slug === slug && l.size === size);
      updateQty(slug, size, (current?.qty || 0) - 1);
    });
    line.querySelector('.cart-line__remove').addEventListener('click', () => removeFromCart(slug, size));
  });
}

export function openCart() {
  document.getElementById('cart-overlay').classList.add('is-open');
  document.getElementById('cart-drawer').classList.add('is-open');
}
export function closeCart() {
  document.getElementById('cart-overlay').classList.remove('is-open');
  document.getElementById('cart-drawer').classList.remove('is-open');
}

function updateBagCount() {
  const el = document.getElementById('bag-count');
  if (el) el.textContent = String(cartCount());
}

// ------------------------------------------------------------
// Footer
// ------------------------------------------------------------
function renderFooter() {
  const el = document.getElementById('app-footer');
  if (!el) return;
  el.className = 'site-footer';
  el.innerHTML = `
    <div class="wrap site-footer__grid">
      <div>
        <div class="site-footer__wordmark">
          <img src="/images/logo/icon-mark-light.png" alt="" style="width:32px; height:32px; vertical-align:middle; margin-right:0.3em;" />
          Maskaritas
        </div>
        <p style="margin-top: var(--space-sm); max-width: 32ch; color: var(--stone); font-size: var(--step-xs);">
          Boutique de disfraces en línea. Mérida, Yucatán.
        </p>
      </div>
      <div>
        <h3>SHOP</h3>
        <ul>
          <li><a href="/ninos" class="link-underline">Niños</a></li>
          <li><a href="/adultos" class="link-underline">Adultos</a></li>
          <li><a href="/colecciones/halloween" class="link-underline">Halloween</a></li>
          <li><a href="/colecciones/heroes-princesas" class="link-underline">Héroes + Princesas</a></li>
          <li><a href="/accesorios" class="link-underline">Accesorios</a></li>
          <li><a href="/calzado" class="link-underline">Calzado</a></li>
        </ul>
      </div>
      <div>
        <h3>CUSTOMER CARE</h3>
        <ul>
          <li><a href="/envios" class="link-underline">Envíos</a></li>
          <li><a href="/faq" class="link-underline">FAQ</a></li>
          <li><a href="/pedido-especial" class="link-underline">Pedidos especiales</a></li>
          <li><a href="${whatsappUrl('Hola Maskaritas, tengo una pregunta.')}" class="link-underline" target="_blank" rel="noopener">Contacto</a></li>
          <li><a href="/faq#cambios" class="link-underline">Cambios</a></li>
        </ul>
      </div>
      <div>
        <h3>CONTACT</h3>
        <ul>
          <li><a href="${whatsappUrl()}" class="link-underline" target="_blank" rel="noopener">WhatsApp</a></li>
          <li>${escapeHtml(whatsappNumber)}</li>
        </ul>
      </div>
    </div>
    <div class="wrap site-footer__bottom">
      <span>MASKARITAS © 2026</span>
      <span>Online Costume Boutique — Mérida, Yucatán</span>
    </div>
  `;
}

// ------------------------------------------------------------
// Mount
// ------------------------------------------------------------
export function mountChrome() {
  renderAnnouncement();
  renderHeader();
  renderMobileMenu();
  renderFooter();
  renderWhatsappFab();
  renderCartShell();
  updateBagCount();
  window.addEventListener('cart:change', () => {
    updateBagCount();
    renderCartContents();
  });
}
