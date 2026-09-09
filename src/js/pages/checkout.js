import { mountChrome } from '../chrome.js';
import { cartDetails, cartSubtotal, clearCart } from '../cart.js';
import { formatMXN, escapeHtml } from '../format.js';
import { shippingConfig } from '../../data/siteConfig.js';

mountChrome();

const root = document.getElementById('checkout-root');
const lines = cartDetails();

if (!lines.length) {
  root.innerHTML = `
    <div style="padding-block: var(--space-2xl); text-align:center;">
      <p class="display" style="font-size: var(--step-lg);">TU BOLSA ESTÁ VACÍA.</p>
      <a href="/shop" class="btn btn-primary" style="margin-top: var(--space-md);">VER CATÁLOGO</a>
    </div>`;
} else {
  renderCheckout();
}

function renderCheckout() {
  const subtotal = cartSubtotal();
  const shippingKnown = typeof shippingConfig.flatRate === 'number';
  const shippingCost = shippingKnown ? shippingConfig.flatRate : null;
  const total = subtotal + (shippingCost || 0);

  root.innerHTML = `
    <h1 class="display" style="font-size: var(--step-2xl); padding-top: var(--space-lg);">CHECKOUT</h1>
    <div class="checkout-grid">
      <form id="checkout-form">
        <div class="checkout-step">
          <h2>01 · Datos de contacto</h2>
          <div class="field"><label for="fullName">Nombre completo</label><input id="fullName" name="fullName" required /></div>
          <div class="field-row">
            <div class="field"><label for="phone">WhatsApp / Teléfono</label><input id="phone" name="phone" type="tel" required /></div>
            <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required /></div>
          </div>
        </div>

        <div class="checkout-step">
          <h2>02 · Entrega</h2>
          <div class="field-row">
            <div class="field"><label for="street">Calle</label><input id="street" name="street" required /></div>
            <div class="field"><label for="number">Número</label><input id="number" name="number" required /></div>
          </div>
          <div class="field-row">
            <div class="field"><label for="colonia">Colonia</label><input id="colonia" name="colonia" required /></div>
            <div class="field"><label for="cp">Código Postal</label><input id="cp" name="cp" required /></div>
          </div>
          <div class="field-row">
            <div class="field"><label for="city">Ciudad</label><input id="city" name="city" value="Mérida" required /></div>
            <div class="field"><label for="state">Estado</label><input id="state" name="state" value="Yucatán" required /></div>
          </div>
          <div class="field"><label for="notes">Referencias / instrucciones</label><textarea id="notes" name="notes" rows="2"></textarea></div>
        </div>

        <div class="checkout-step">
          <h2>03 · Pago</h2>
          <p style="font-size: var(--step-xs); color: var(--ink-70);">El pago se procesa de forma segura a través de Openpay by BBVA México.</p>
          <div class="payment-demo-note">
            <strong>PAGO: DEMO / NOT CONFIGURED.</strong>
            Este proyecto aún no tiene credenciales reales de Openpay conectadas.
            Ningún cargo real se procesará en este modo. Ver README.md → "Configurar Openpay".
          </div>
          <button type="submit" class="btn btn-primary btn-block" style="margin-top: var(--space-md);">PAGAR (DEMO) — ${formatMXN(total)}</button>
        </div>
      </form>

      <aside class="checkout-summary">
        <h2>Tu pedido</h2>
        ${lines
          .map(
            (l) => `<div class="checkout-line">
              <span class="checkout-line__name">${escapeHtml(l.product.shortName)} · Talla ${escapeHtml(l.size)} × ${l.qty}</span>
              <span>${formatMXN(l.lineTotal)}</span>
            </div>`
          )
          .join('')}
        <div class="checkout-totals">
          <div class="checkout-line"><span>Subtotal</span><span>${formatMXN(subtotal)}</span></div>
          <div class="checkout-line"><span>Entrega</span><span>${shippingKnown ? formatMXN(shippingCost) : 'Se confirma por WhatsApp'}</span></div>
          <div class="checkout-line checkout-line--grand"><span>Total</span><span>${formatMXN(total)}</span></div>
        </div>
        <p style="margin-top: var(--space-sm); font-size: var(--step-2xs); color: var(--ink-70);">${escapeHtml(shippingConfig.notes)}</p>
      </aside>
    </div>
  `;

  document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'PROCESANDO…';

    const formData = new FormData(e.target);
    const customer = Object.fromEntries(formData.entries());

    // Frontend-only order numbers are fine for this demo, but must NOT
    // be relied on once real payments and concurrent customers exist —
    // see README.md → "Números de pedido".
    const orderId = `MSK-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;

    let paymentResult = { status: 'demo' };
    try {
      const res = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, customer, lines, subtotal, total }),
      });
      if (res.ok) paymentResult = await res.json();
    } catch {
      // Netlify Functions aren't available in plain `vite dev` — that's
      // expected locally. The order still completes in demo mode.
    }

    const order = { orderId, customer, lines, subtotal, total, shippingCost, paymentResult };
    sessionStorage.setItem('maskaritas_last_order', JSON.stringify(order));
    clearCart();
    window.location.href = '/confirmacion';
  });
}
