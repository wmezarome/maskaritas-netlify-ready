// MASKARITAS — Shopping bag
// ---------------------------------------------------------------
// The bag is stored in the browser's localStorage so it survives a
// page refresh. It only ever holds product id / size / quantity —
// never payment information. See README.md → "Carrito" for details.

import { getProductBySlug, sizeStatus } from '../data/products.js';

const STORAGE_KEY = 'maskaritas_cart_v1';

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(lines) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent('cart:change', { detail: lines }));
}

export function getCartLines() {
  return readCart();
}

export function addToCart(slug, size, qty = 1) {
  const product = getProductBySlug(slug);
  if (!product) return { ok: false, reason: 'not-found' };
  if (sizeStatus(product, size) === 'agotado') {
    return { ok: false, reason: 'agotado' };
  }
  const lines = readCart();
  const existing = lines.find((l) => l.slug === slug && l.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    lines.push({ slug, size, qty });
  }
  writeCart(lines);
  return { ok: true };
}

export function updateQty(slug, size, qty) {
  let lines = readCart();
  if (qty <= 0) {
    lines = lines.filter((l) => !(l.slug === slug && l.size === size));
  } else {
    const line = lines.find((l) => l.slug === slug && l.size === size);
    if (line) line.qty = qty;
  }
  writeCart(lines);
}

export function removeFromCart(slug, size) {
  const lines = readCart().filter((l) => !(l.slug === slug && l.size === size));
  writeCart(lines);
}

export function clearCart() {
  writeCart([]);
}

export function cartCount() {
  return readCart().reduce((sum, l) => sum + l.qty, 0);
}

export function cartDetails() {
  return readCart()
    .map((line) => {
      const product = getProductBySlug(line.slug);
      if (!product) return null;
      return {
        ...line,
        product,
        lineTotal: product.price * line.qty,
      };
    })
    .filter(Boolean);
}

export function cartSubtotal() {
  return cartDetails().reduce((sum, l) => sum + l.lineTotal, 0);
}
