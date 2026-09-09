import { mountChrome } from '../chrome.js';
import { initCatalogPage } from './catalog.js';
import { getProductsByCollection } from '../../data/products.js';
import { collectionMeta } from '../../data/siteConfig.js';
import { escapeHtml } from '../format.js';

mountChrome();

// Netlify rewrites /colecciones/<slug> to this file while keeping the
// pretty URL in the address bar, so we read the slug from the real
// path. Falls back to ?slug= for local testing without Netlify's
// redirect engine (e.g. `vite preview`).
function getSlug() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const fromPath = pathParts[0] === 'colecciones' ? pathParts[1] : null;
  return fromPath || new URLSearchParams(window.location.search).get('slug') || '';
}

const slug = getSlug();
const meta = collectionMeta[slug];
const list = getProductsByCollection(slug);

document.title = `${meta ? meta.name : 'Colección'} | Maskaritas`;
const metaDesc = document.querySelector('meta[name="description"]');
if (metaDesc) metaDesc.setAttribute('content', `Colección ${meta ? meta.name : ''} Maskaritas. Entregas en Mérida, Yucatán.`);

initCatalogPage({
  mountId: 'catalog-root',
  baseList: list,
  title: meta ? meta.name.toUpperCase() : 'COLECCIÓN',
  subtitle: meta ? meta.subtitle : '',
  showAudienceFilter: true,
});
