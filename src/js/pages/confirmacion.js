import { mountChrome } from '../chrome.js';
import { formatMXN, escapeHtml } from '../format.js';
import { whatsappUrl, whatsappNumber } from '../../data/siteConfig.js';

mountChrome();

const root = document.getElementById('confirmation-root');
const raw = sessionStorage.getItem('maskaritas_last_order');

if (!raw) {
  root.innerHTML = `
    <div style="padding-block: var(--space-2xl); text-align:center;">
      <p class="display" style="font-size: var(--step-lg);">NO ENCONTRAMOS UN PEDIDO RECIENTE.</p>
      <a href="/shop" class="btn btn-primary" style="margin-top: var(--space-md);">VER CATÁLOGO</a>
    </div>`;
} else {
  const order = JSON.parse(raw);
  root.innerHTML = `
    <div style="padding-block: var(--space-lg) var(--space-2xl); max-width: 640px; margin-inline: auto; text-align: center;">
      <p class="section-label">GRACIAS POR COMPRAR EN MASKARITAS</p>
      <h1 class="display" style="font-size: var(--step-2xl);">PEDIDO CONFIRMADO</h1>
      <p style="margin-top: var(--space-xs); color: var(--ink-70);">Número de pedido <strong>${escapeHtml(order.orderId)}</strong></p>

      <div style="text-align: left; margin-top: var(--space-lg); background: var(--bone-soft); padding: var(--space-md);">
        <h2 style="font-family: var(--font-display); font-size: var(--step-md); margin-bottom: var(--space-sm);">Resumen</h2>
        ${order.lines
          .map(
            (l) => `<div class="checkout-line">
              <span class="checkout-line__name">${escapeHtml(l.product.shortName)} · Talla ${escapeHtml(l.size)} × ${l.qty}</span>
              <span>${formatMXN(l.lineTotal)}</span>
            </div>`
          )
          .join('')}
        <div class="checkout-totals">
          <div class="checkout-line"><span>Subtotal</span><span>${formatMXN(order.subtotal)}</span></div>
          <div class="checkout-line checkout-line--grand"><span>Total</span><span>${formatMXN(order.total)}</span></div>
        </div>
        <p style="margin-top: var(--space-sm); font-size: var(--step-xs);"><strong>Nombre:</strong> ${escapeHtml(order.customer.fullName)}</p>
        <p style="font-size: var(--step-xs);"><strong>Dirección de entrega:</strong> ${escapeHtml(order.customer.street)} ${escapeHtml(order.customer.number)}, ${escapeHtml(order.customer.colonia)}, ${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.state)}, CP ${escapeHtml(order.customer.cp)}</p>
      </div>

      <p style="margin-top: var(--space-lg);">¿Tienes alguna pregunta sobre tu pedido?</p>
      <a class="btn btn-primary" style="margin-top: var(--space-sm);" href="${whatsappUrl(`Hola Maskaritas, tengo una pregunta sobre mi pedido ${order.orderId}.`)}" target="_blank" rel="noopener">WHATSAPP · ${escapeHtml(whatsappNumber)}</a>
    </div>
  `;
}
