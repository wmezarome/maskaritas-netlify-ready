import { mountChrome } from '../chrome.js';
import { shippingConfig, whatsappUrl } from '../../data/siteConfig.js';
import { escapeHtml } from '../format.js';

mountChrome();

const root = document.getElementById('envios-root');

root.innerHTML = `
  <div style="max-width: 640px; margin-inline: auto; padding-block: var(--space-lg) var(--space-2xl);">
    <p class="section-label">CUSTOMER CARE</p>
    <h1 class="display" style="font-size: var(--step-2xl);">ENVÍOS EN MÉRIDA</h1>
    <p style="margin-top: var(--space-sm); color: var(--ink-70);">
      Actualmente entregamos en ${escapeHtml(shippingConfig.zoneLabel)}. Compra en línea y recibe en casa —
      estamos trabajando para ampliar nuestra cobertura próximamente.
    </p>

    <div class="product-accordion" style="margin-top: var(--space-lg);">
      <details open>
        <summary>Tiempo de entrega</summary>
        <p>${escapeHtml(shippingConfig.estimatedDays)}.</p>
      </details>
      <details open>
        <summary>Costo de envío</summary>
        <p>${escapeHtml(shippingConfig.notes)}</p>
      </details>
      <details>
        <summary>¿Tienes dudas sobre tu entrega?</summary>
        <p><a class="link-underline" href="${whatsappUrl('Hola Maskaritas, tengo una duda sobre mi entrega.')}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a></p>
      </details>
    </div>
  </div>
`;
