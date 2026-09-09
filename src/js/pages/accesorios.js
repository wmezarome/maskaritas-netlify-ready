import { mountChrome } from '../chrome.js';
import { initCatalogPage } from './catalog.js';
import { getProductsByCategory } from '../../data/products.js';

mountChrome();

initCatalogPage({
  mountId: 'catalog-root',
  baseList: getProductsByCategory('accesorios'),
  title: 'ACCESORIOS',
  subtitle: 'El detalle que completa el personaje.',
  showAudienceFilter: true,
});
