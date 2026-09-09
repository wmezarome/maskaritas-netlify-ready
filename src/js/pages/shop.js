import { mountChrome } from '../chrome.js';
import { initCatalogPage } from './catalog.js';
import { products } from '../../data/products.js';

mountChrome();

initCatalogPage({
  mountId: 'catalog-root',
  baseList: products,
  title: 'SHOP',
  subtitle: 'Todo el catálogo Maskaritas.',
  showAudienceFilter: true,
});
