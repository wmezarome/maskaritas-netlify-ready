import { mountChrome } from '../chrome.js';
import { faqItems, exchangePolicy } from '../../data/siteConfig.js';
import { escapeHtml } from '../format.js';

mountChrome();

const root = document.getElementById('faq-root');

root.innerHTML = `
  <div style="max-width: 720px; margin-inline: auto; padding-block: var(--space-lg) var(--space-2xl);">
    <p class="section-label">AYUDA</p>
    <h1 class="display" style="font-size: var(--step-2xl);">PREGUNTAS FRECUENTES</h1>

    <div class="product-accordion" style="margin-top: var(--space-lg);">
      ${faqItems
        .map(
          (item) => `
        <details>
          <summary>${escapeHtml(item.q)}</summary>
          <p>${escapeHtml(item.a)}</p>
        </details>`
        )
        .join('')}
      <details id="cambios">
        <summary>Política de cambios</summary>
        <p>${escapeHtml(exchangePolicy.text)} <em>(${escapeHtml(exchangePolicy.status)})</em></p>
      </details>
    </div>
  </div>
`;
