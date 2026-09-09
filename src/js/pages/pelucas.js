import { mountChrome } from '../chrome.js';
import { initCatalogPage } from './catalog.js';
import { getProductsByCategory } from '../../data/products.js';

mountChrome();

initCatalogPage({
  mountId: 'catalog-root',
  baseList: getProductsByCategory('pelucas'),
  title: 'PELUCAS',
  subtitle: 'Para completar cualquier personaje.',
  showAudienceFilter: true,
});
